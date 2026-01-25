# Remove manifest and apple-touch-icon links, then re-add them correctly

$rootDir = "c:\Users\User\Desktop\NovaHealth"
$htmlFiles = Get-ChildItem -Path $rootDir -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    $lines = Get-Content -Path $file.FullName -Encoding UTF8
    $newLines = @()
    $iconAdded = $false
    
    # Calculate correct paths
    $relativePath = $file.DirectoryName.Replace($rootDir, "").TrimStart("\")
    $depth = if ($relativePath) { ($relativePath -split "\\").Count } else { 0 }
    
    if ($depth -eq 0) {
        $appleLink = '    <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png" />'
        $manifestLink = '    <link rel="manifest" href="site.webmanifest" />'
    } else {
        $prefix = "../" * $depth
        $appleLink = "    <link rel=""apple-touch-icon"" sizes=""180x180"" href=""$($prefix)images/apple-touch-icon.png"" />"
        $manifestLink = "    <link rel=""manifest"" href=""$($prefix)site.webmanifest"" />"
    }
    
    foreach ($line in $lines) {
        # Skip existing apple-touch-icon and manifest lines
        if ($line -match 'apple-touch-icon' -or $line -match 'rel="manifest"') {
            continue
        }
        
        # Add new links after favicon.ico
        if ($line -match 'favicon\.ico' -and -not $iconAdded) {
            $newLines += $line
            $newLines += $appleLink
            $newLines += $manifestLink
            $iconAdded = $true
        } else {
            $newLines += $line
        }
    }
    
    $newLines | Set-Content -Path $file.FullName -Encoding UTF8
    Write-Host "Processed: $($file.Name)"
}

Write-Host "`nDone - fixed all 91 files"
