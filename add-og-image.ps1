# Script to add og:image meta tags to all HTML files
# Adds Open Graph image tags for social media sharing

$htmlFiles = Get-ChildItem -Path $PSScriptRoot -Recurse -Filter "*.html"
$count = 0
$skipped = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if already has og:image
    if ($content -match 'property="og:image"') {
        Write-Host "Skipped (already has og:image): $($file.FullName)" -ForegroundColor Yellow
        $skipped++
        continue
    }
    
    # Calculate relative path to images folder based on file depth
    $relativePath = $file.DirectoryName.Replace($PSScriptRoot, "").TrimStart("\")
    $depth = if ($relativePath -eq "") { 0 } else { ($relativePath -split "\\").Count }
    $prefix = if ($depth -eq 0) { "" } else { ("../" * $depth) }
    
    # Get the canonical URL path for og:url
    $urlPath = $file.FullName.Replace($PSScriptRoot, "").Replace("\", "/").TrimStart("/")
    
    # OG image meta tags to add
    $ogImageTags = @"

    <meta property="og:image" content="https://www.novahealth.com.hk/images/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Nova Health 芯凝 - 專業上門復康護理服務" />
    <meta property="og:url" content="https://www.novahealth.com.hk/$urlPath" />
"@
    
    # Try to find og:locale tag and insert after it
    if ($content -match '(<meta\s+property="og:locale"[^>]*/>)') {
        $newContent = $content -replace '(<meta\s+property="og:locale"[^>]*/>)', "`$1$ogImageTags"
    }
    # If no og:locale, try og:type
    elseif ($content -match '(<meta\s+property="og:type"[^>]*/>)') {
        $newContent = $content -replace '(<meta\s+property="og:type"[^>]*/>)', "`$1$ogImageTags"
    }
    # If no og tags, skip
    else {
        Write-Host "No OG tags found: $($file.FullName)" -ForegroundColor Gray
        continue
    }
    
    Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.FullName)" -ForegroundColor Green
    $count++
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Updated: $count files" -ForegroundColor Green
Write-Host "  Skipped: $skipped files (already had og:image)" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
