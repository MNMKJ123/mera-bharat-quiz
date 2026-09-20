# Rotates scanned pages upright. The phone scans came in 90 degrees over.
# Usage: powershell -File tools/rotate.ps1 <folder> <Rotate90FlipNone|Rotate270FlipNone>
param(
  [Parameter(Mandatory = $true)][string]$Folder,
  [string]$How = "Rotate270FlipNone"
)
Add-Type -AssemblyName System.Drawing

$out = Join-Path $Folder "upright"
if (-not (Test-Path $out)) { New-Item -ItemType Directory -Path $out | Out-Null }

$files = Get-ChildItem -Path $Folder -Filter *.jpg | Sort-Object Name
$n = 0
foreach ($f in $files) {
  $img = [System.Drawing.Image]::FromFile($f.FullName)
  $img.RotateFlip([System.Drawing.RotateFlipType]::$How)

  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
           Where-Object { $_.MimeType -eq "image/jpeg" }
  $parms = New-Object System.Drawing.Imaging.EncoderParameters 1
  $parms.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
      [System.Drawing.Imaging.Encoder]::Quality, [int64]82)

  $dest = Join-Path $out $f.Name
  $img.Save($dest, $codec, $parms)
  $img.Dispose()
  $n++
}
Write-Output "rotated $n files into $out"
