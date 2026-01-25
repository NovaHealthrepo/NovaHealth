# Script to add favicon.ico fallback to all HTML files
# This adds <link rel="icon" type="image/x-icon" href="favicon.ico"> after existing favicon.png

$htmlFiles = Get-ChildItem -Path $PSScriptRoot -Recurse -Filter "*.html"
$count = 0
$skipped = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if already has favicon.ico
    if ($content -match 'favicon\.ico') {
        Write-Host "Skipped (already has favicon.ico): $($file.FullName)" -ForegroundColor Yellow
        $skipped++
        continue
    }
    
    # Calculate relative path to root based on file depth
    $relativePath = $file.DirectoryName.Replace($PSScriptRoot, "").TrimStart("\")
    $depth = if ($relativePath -eq "") { 0 } else { ($relativePath -split "\\").Count }
    $prefix = if ($depth -eq 0) { "" } else { ("../" * $depth) }
    
    # Pattern to find existing favicon.png link
    $pattern = '(<link\s+rel="icon"\s+type="image/png"\s+href="[^"]*favicon\.png"\s*/?>)'
    
    if ($content -match $pattern) {
        # Add favicon.ico link after favicon.png link
        $faviconIcoLink = "`n    <link rel=`"icon`" type=`"image/x-icon`" href=`"${prefix}favicon.ico`" />"
        $newContent = $content -replace $pattern, "`$1$faviconIcoLink"
        
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.FullName)" -ForegroundColor Green
        $count++
    } else {
        Write-Host "No favicon.png found: $($file.FullName)" -ForegroundColor Gray
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Updated: $count files" -ForegroundColor Green
Write-Host "  Skipped: $skipped files (already had favicon.ico)" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
