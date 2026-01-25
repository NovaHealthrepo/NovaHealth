# Script to add complete Open Graph meta tags to all HTML files
# Adds og:title, og:description, og:type, og:locale, og:image, og:url

$htmlFiles = Get-ChildItem -Path $PSScriptRoot -Recurse -Filter "*.html"
$count = 0
$skipped = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if already has og:image
    if ($content -match 'property="og:image"') {
        Write-Host "Skipped (already has complete OG tags): $($file.FullName)" -ForegroundColor Yellow
        $skipped++
        continue
    }
    
    # Get the canonical URL path for og:url
    $urlPath = $file.FullName.Replace($PSScriptRoot, "").Replace("\", "/").TrimStart("/")
    
    # Extract existing title and description if available
    $ogTitle = "Nova Health 芯凝 - 專業上門復康護理服務"
    $ogDescription = "由註冊專業人員提供到戶物理治療及護理服務，專科專配、透明記錄"
    
    if ($content -match '<title>([^<]+)</title>') {
        $ogTitle = $matches[1]
    }
    if ($content -match '<meta\s+name="description"\s+content="([^"]+)"') {
        $ogDescription = $matches[1]
    }
    
    # Complete OG meta tags
    $ogTags = @"

    <!-- Open Graph Meta Tags for Social Media -->
    <meta property="og:title" content="$ogTitle" />
    <meta property="og:description" content="$ogDescription" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="zh_HK" />
    <meta property="og:image" content="https://www.novahealth.com.hk/images/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Nova Health 芯凝 - 專業上門復康護理服務" />
    <meta property="og:url" content="https://www.novahealth.com.hk/$urlPath" />
"@
    
    # Try to insert after existing OG tags
    if ($content -match '<!-- Open Graph Meta Tags') {
        # Find end of OG section and add new tags
        if ($content -match '(<meta\s+property="og:locale"[^>]*/>)') {
            $newContent = $content -replace '(<meta\s+property="og:locale"[^>]*/>)', "`$1`n    <meta property=`"og:image`" content=`"https://www.novahealth.com.hk/images/og-image.jpg`" />`n    <meta property=`"og:image:width`" content=`"1200`" />`n    <meta property=`"og:image:height`" content=`"630`" />`n    <meta property=`"og:image:alt`" content=`"Nova Health 芯凝 - 專業上門復康護理服務`" />`n    <meta property=`"og:url`" content=`"https://www.novahealth.com.hk/$urlPath`" />"
        } else {
            $newContent = $content -replace '(<meta\s+property="og:type"[^>]*/>)', "`$1`n    <meta property=`"og:locale`" content=`"zh_HK`" />`n    <meta property=`"og:image`" content=`"https://www.novahealth.com.hk/images/og-image.jpg`" />`n    <meta property=`"og:image:width`" content=`"1200`" />`n    <meta property=`"og:image:height`" content=`"630`" />`n    <meta property=`"og:image:alt`" content=`"Nova Health 芯凝 - 專業上門復康護理服務`" />`n    <meta property=`"og:url`" content=`"https://www.novahealth.com.hk/$urlPath`" />"
        }
    }
    # Insert after favicon tags
    elseif ($content -match '(<link\s+rel="icon"[^>]*favicon\.ico[^>]*/>)') {
        $newContent = $content -replace '(<link\s+rel="icon"[^>]*favicon\.ico[^>]*/>)', "`$1$ogTags"
    }
    # Insert after any meta tags
    elseif ($content -match '(<meta\s+name="robots"[^>]*/>)') {
        $newContent = $content -replace '(<meta\s+name="robots"[^>]*/>)', "`$1$ogTags"
    }
    else {
        Write-Host "Could not find insertion point: $($file.FullName)" -ForegroundColor Gray
        continue
    }
    
    Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.FullName)" -ForegroundColor Green
    $count++
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Updated: $count files" -ForegroundColor Green
Write-Host "  Skipped: $skipped files" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
