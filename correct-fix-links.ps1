# CORRECT fix with case-insensitive path replacement

$rootDir = "C:\Users\User\Desktop\NovaHealth"
$htmlFiles = Get-ChildItem -Path $rootDir -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Calculate correct paths (case-insensitive)
    $fileDir = $file.DirectoryName
    if ($fileDir -eq $rootDir) {
        $depth = 0
    } else {
        $relativePath = $fileDir.Substring($rootDir.Length + 1)
        $depth = ($relativePath -split "\\").Count
    }
    
    if ($depth -eq 0) {
        $appleLink = '<link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />'
        $manifestLink = '<link rel="manifest" href="site.webmanifest" />'
    } else {
        $prefix = "../" * $depth
        $appleLink = "<link rel=""apple-touch-icon"" sizes=""180x180"" href=""$($prefix)images/apple-touch-icon.png"" />"
        $manifestLink = "<link rel=""manifest"" href=""$($prefix)site.webmanifest"" />"
    }
    
    # Remove any existing apple-touch-icon and manifest lines
    $content = $content -replace '\s*<link rel="apple-touch-icon"[^>]*>\r?\n?', ''
    $content = $content -replace '\s*<link rel="manifest"[^>]*>\r?\n?', ''
    
    # Find favicon.ico line and add after it
    if ($content -match '(<link rel="icon" type="image/x-icon"[^>]*>)') {
        $faviconLine = $matches[1]
        $replacement = "$faviconLine`r`n    $appleLink`r`n    $manifestLink"
        $content = $content -replace [regex]::Escape($faviconLine), $replacement
    }
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Fixed: $($file.Name) (depth: $depth)"
}

Write-Host "`nAll files processed correctly"
