# Tools for reading photographed book pages

Both work with no installation — Node and Windows' own .NET only.
There is no ImageMagick or ffmpeg on this machine, and none is needed.

## 1. Pull the page images out of a PDF

```bash
node tools/pdf-images.js "path\to\photos.pdf" pages
```

Writes each embedded image to `pages/page-001.jpg`, `page-002.jpg`, …
Phone photos are JPEG, so their bytes are written straight out with no
re-encoding and no quality loss. Flate-encoded bitmaps are rebuilt as PNG.

## 2. Shrink them

```bash
powershell -NoProfile -File tools/shrink.ps1 -In pages -Out pages-small
```

Defaults: longest side 1800 px, JPEG quality 72. Tune with
`-MaxSide 1600 -Quality 70`.

**Measured on a real page photo:** 1855×1340, 907 KB → 1600×1156, **113 KB**.
An 8× reduction, and every chapter heading and page number stayed sharp.

## If a PDF gives nothing

Some PDFs store a page as one big flattened image, or as vector drawings with
no bitmap at all. The extractor reports what it skipped and why. If it finds
nothing, just send the photos themselves rather than a PDF — that works too,
and skips a step.

## Known limitation: Adobe CMYK JPEGs

Images lifted out of print-workflow PDFs (SOF's own sample papers are like
this) come out with inverted colours. They are CMYK JPEGs carrying an Adobe
transform marker, and neither the raw bytes nor .NET's decoder apply the
inversion.

This does **not** affect photographs from a phone, which are ordinary RGB.
It only matters when mining SOF's published PDFs for their artwork, and the
text extractor (`pdftext.js` approach) is the better route for those anyway.
