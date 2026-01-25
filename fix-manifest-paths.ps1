# Script to fix all manifest and apple-touch-icon paths

$rootDir = "c:\Users\User\Desktop\NovaHealth"
$htmlFiles = Get-ChildItem -Path $rootDir -Filter "*.html" -Recurse

$fixedCount = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Calculate depth
    $relativePath = $file.DirectoryName.Replace($rootDir, "").TrimStart("\")
    $depth = if ($relativePath) { ($relativePath -split "\\").Count } else { 0 }
    
    # Determine correct paths
    if ($depth -eq 0) {
        $correctApple = 'href="images/apple-touch-icon.png"'
        $correctManifest = 'href="site.webmanifest"'
    } else {
        $prefix = "../" * $depth
        $correctApple = "href=""$($prefix)images/apple-touch-icon.png"""
        $correctManifest = "href=""$($prefix)site.webmanifest"""
    }
    
    # Fix apple-touch-icon - match any path
    if ($content -match 'href="[^"]*apple-touch-icon\.png"') {
        $content = $content -replace 'href="[^"]*apple-touch-icon\.png"', $correctApple
        $modified = $true
    }
    
    # Fix manifest - match any path  
    if ($content -match 'href="[^"]*site\.webmanifest"') {
        $content = $content -replace 'href="[^"]*site\.webmanifest"', $correctManifest
        $modified = $true
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed: $($file.Name) (depth: $depth)"
        $fixedCount++
    }
}

Write-Host "`nTotal files fixed: $fixedCount"
