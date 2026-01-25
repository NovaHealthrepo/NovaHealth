# PowerShell script to add PWA manifest and apple-touch-icon links to all HTML files

$rootDir = "c:\Users\User\Desktop\NovaHealth"
$htmlFiles = Get-ChildItem -Path $rootDir -Filter "*.html" -Recurse

$updatedCount = 0
$skippedCount = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check if already has manifest link
    if ($content -match '<link rel="manifest"') {
        Write-Host "Skipped (already has manifest): $($file.FullName)"
        $skippedCount++
        continue
    }
    
    # Calculate relative path for subdirectories
    $relativePath = $file.DirectoryName.Replace($rootDir, "").TrimStart("\")
    $depth = if ($relativePath) { ($relativePath -split "\\").Count } else { 0 }
    $relativePrefix = if ($depth -gt 0) { "../" * $depth } else { "" }
    
    # Prepare the links to add (root files have no prefix, subdirectories use ../)
    if ($depth -eq 0) {
        $manifestLink = '    <link rel="manifest" href="site.webmanifest" />'
        $appleTouchIconLink = '    <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />'
    } else {
        $manifestLink = "    <link rel=""manifest"" href=""$($relativePrefix)site.webmanifest"" />"
        $appleTouchIconLink = "    <link rel=""apple-touch-icon"" sizes=""180x180"" href=""$($relativePrefix)images/apple-touch-icon.png"" />"
    }
    
    # Find the insertion point (after favicon.ico link or at the end of head meta tags)
    if ($content -match '(<link rel="icon" type="image/x-icon"[^>]*>)') {
        # Insert after favicon.ico
        $insertionPoint = $matches[1]
        $newContent = $content -replace [regex]::Escape($insertionPoint), "$insertionPoint`r`n$appleTouchIconLink`r`n$manifestLink"
    }
    elseif ($content -match '(<meta name="robots"[^>]*>)') {
        # Insert after robots meta tag
        $insertionPoint = $matches[1]
        $newContent = $content -replace [regex]::Escape($insertionPoint), "$insertionPoint`r`n$appleTouchIconLink`r`n$manifestLink"
    }
    else {
        Write-Host "Warning: Could not find insertion point in $($file.FullName)"
        $skippedCount++
        continue
    }
    
    # Write the updated content
    Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.FullName)"
    $updatedCount++
}

Write-Host "`nSummary:"
Write-Host "Updated: $updatedCount files"
Write-Host "Skipped: $skippedCount files"
