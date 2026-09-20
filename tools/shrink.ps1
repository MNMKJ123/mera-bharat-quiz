# Resizes and re-compresses page photos so they stay readable but small.
# Uses .NET System.Drawing - nothing to install.
#
#   powershell -NoProfile -File tools/shrink.ps1 -In pages -Out pages-small
#   powershell -NoProfile -File tools/shrink.ps1 -In pages -Out pages-small -MaxSide 1600 -Quality 70

param(
  [string]$In       = "pages",
  [string]$Out      = "pages-small",
  [int]   $MaxSide  = 1800,
  [int]   $Quality  = 72
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $In)) { Write-Output "input folder not found: $In"; exit 1 }
if (-not (Test-Path $Out)) { New-Item -ItemType Directory -Path $Out | Out-Null }

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
         Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                     [System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)

$files = Get-ChildItem -Path $In -Include *.jpg,*.jpeg,*.png -File -Recurse
if ($files.Count -eq 0) { Write-Output "no images found in $In"; exit 1 }

$totalBefore = 0
$totalAfter  = 0

foreach ($f in $files) {
  try {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
  } catch {
    Write-Output ("  SKIP  " + $f.Name + "  (could not open)")
    continue
  }

  $w = $img.Width; $h = $img.Height
  $scale = 1.0
  if ([Math]::Max($w, $h) -gt $MaxSide) { $scale = $MaxSide / [Math]::Max($w, $h) }
  $nw = [int]($w * $scale); $nh = [int]($h * $scale)

  $bmp = New-Object System.Drawing.Bitmap $nw, $nh
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, 0, 0, $nw, $nh)

  $dest = Join-Path $Out ([System.IO.Path]::GetFileNameWithoutExtension($f.Name) + ".jpg")
  $bmp.Save($dest, $codec, $params)

  $g.Dispose(); $bmp.Dispose(); $img.Dispose()

  $before = [Math]::Round($f.Length / 1KB)
  $after  = [Math]::Round((Get-Item $dest).Length / 1KB)
  $totalBefore += $before
  $totalAfter  += $after
  Write-Output ("  " + $f.Name.PadRight(22) + " " + "${w}x${h}".PadRight(12) + " -> " + "${nw}x${nh}".PadRight(12) + " " + "${before} KB".PadLeft(8) + " -> " + "${after} KB".PadLeft(8))
}

Write-Output ""
Write-Output ("total: " + $totalBefore + " KB -> " + $totalAfter + " KB  (" + $files.Count + " images)")
