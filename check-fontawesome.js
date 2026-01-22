/**
 * FontAwesome Icon Checker Script
 *
 * This script scans all HTML files in the NovaHealth project and checks
 * if all FontAwesome icon classes used are defined in the associated CSS files.
 *
 * Usage: node check-fontawesome.js
 */

const fs = require("fs");
const path = require("path");

// Base directory to scan
const BASE_DIR = __dirname;

/**
 * Recursively find all HTML files in a directory
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (
        !file.startsWith(".") &&
        file !== "node_modules" &&
        file !== "fonts" &&
        file !== "images"
      ) {
        findHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith(".html")) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

/**
 * Extract CSS file paths from an HTML file
 * Returns absolute paths to CSS files
 */
function extractCssLinks(htmlPath) {
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");
  const htmlDir = path.dirname(htmlPath);
  const cssLinks = [];

  // Match <link rel="stylesheet" href="..."> or <link href="..." rel="stylesheet">
  // Also match preload patterns
  const linkRegex = /<link[^>]*href=["']([^"']+\.css)["'][^>]*>/gi;
  let match;

  while ((match = linkRegex.exec(htmlContent)) !== null) {
    const cssHref = match[1];
    // Resolve relative path to absolute
    const cssAbsPath = path.resolve(htmlDir, cssHref);
    if (fs.existsSync(cssAbsPath) && !cssLinks.includes(cssAbsPath)) {
      cssLinks.push(cssAbsPath);
    }
  }

  return cssLinks;
}

/**
 * Extract all FontAwesome pseudo element definitions from CSS files
 * Returns a Set of icon class names (e.g., 'fa-heart', 'fa-home')
 */
function extractFaDefinitionsFromCss(cssPaths) {
  const definedIcons = new Set();

  for (const cssPath of cssPaths) {
    try {
      const cssContent = fs.readFileSync(cssPath, "utf-8");

      // Match .fa-xxx::before { content: "..."; } patterns
      // This regex captures the icon name from pseudo element definitions
      const pseudoRegex = /\.(fa-[\w-]+)::before\s*\{[^}]*content\s*:/gi;
      let match;

      while ((match = pseudoRegex.exec(cssContent)) !== null) {
        definedIcons.add(match[1]);
      }
    } catch (err) {
      console.error(`  Error reading CSS file: ${cssPath}`);
    }
  }

  return definedIcons;
}

/**
 * Extract all FontAwesome icon classes used in HTML
 * Returns a Set of icon class names (e.g., 'fa-heart', 'fa-home')
 */
function extractFaUsageFromHtml(htmlPath) {
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");
  const usedIcons = new Set();

  // Match class attributes containing fa- icons
  // Pattern: class="... fa-xxx ..." or class='... fa-xxx ...'
  const classRegex = /class\s*=\s*["']([^"']+)["']/gi;
  let match;

  while ((match = classRegex.exec(htmlContent)) !== null) {
    const classValue = match[1];
    // Extract fa-xxx patterns from the class value
    const faIconRegex = /\b(fa-[\w-]+)\b/g;
    let iconMatch;

    while ((iconMatch = faIconRegex.exec(classValue)) !== null) {
      const iconClass = iconMatch[1];
      // Exclude base classes and modifiers that don't need ::before definitions
      const excludePatterns = [
        "fa-solid",
        "fa-regular",
        "fa-light",
        "fa-thin",
        "fa-duotone",
        "fa-brands",
        "fa-fw",
        "fa-lg",
        "fa-2x",
        "fa-3x",
        "fa-4x",
        "fa-5x",
        "fa-6x",
        "fa-7x",
        "fa-8x",
        "fa-9x",
        "fa-10x",
        "fa-xs",
        "fa-sm",
        "fa-xl",
        "fa-2xl",
        "fa-spin",
        "fa-pulse",
        "fa-beat",
        "fa-fade",
        "fa-bounce",
        "fa-flip",
        "fa-shake",
        "fa-rotate-90",
        "fa-rotate-180",
        "fa-rotate-270",
        "fa-flip-horizontal",
        "fa-flip-vertical",
        "fa-flip-both",
        "fa-stack",
        "fa-stack-1x",
        "fa-stack-2x",
        "fa-inverse",
        "fa-pull-left",
        "fa-pull-right",
        "fa-border",
        "fa-li",
        "fa-ul",
      ];

      if (!excludePatterns.includes(iconClass)) {
        usedIcons.add(iconClass);
      }
    }
  }

  return usedIcons;
}

/**
 * Main function to check all HTML files
 */
function checkAllHtmlFiles() {
  console.log("=".repeat(70));
  console.log("FontAwesome Icon Checker");
  console.log("=".repeat(70));
  console.log(`Scanning directory: ${BASE_DIR}\n`);

  const htmlFiles = findHtmlFiles(BASE_DIR);
  console.log(`Found ${htmlFiles.length} HTML files\n`);
  console.log("-".repeat(70));

  let totalOk = 0;
  let totalWithIssues = 0;
  const allMissingIcons = new Map(); // Track all missing icons globally

  for (const htmlPath of htmlFiles) {
    const relativePath = path.relative(BASE_DIR, htmlPath);

    // Step 1: Locate CSS files
    const cssFiles = extractCssLinks(htmlPath);

    if (cssFiles.length === 0) {
      console.log(`[WARN] ${relativePath}`);
      console.log("        No CSS files found linked in this HTML\n");
      continue;
    }

    // Step 2: Extract FontAwesome definitions from CSS
    const definedIcons = extractFaDefinitionsFromCss(cssFiles);

    // Step 3: Extract FontAwesome usage from HTML
    const usedIcons = extractFaUsageFromHtml(htmlPath);

    // Step 4: Find missing icons
    const missingIcons = [];
    for (const icon of usedIcons) {
      if (!definedIcons.has(icon)) {
        missingIcons.push(icon);

        // Track globally
        if (!allMissingIcons.has(icon)) {
          allMissingIcons.set(icon, []);
        }
        allMissingIcons.get(icon).push(relativePath);
      }
    }

    // Step 5: Report results
    if (missingIcons.length === 0) {
      console.log(`[OK] ${relativePath}`);
      console.log(
        `     CSS: ${cssFiles.map((f) => path.relative(BASE_DIR, f)).join(", ")}`,
      );
      console.log(`     Icons used: ${usedIcons.size}, All defined: ✓\n`);
      totalOk++;
    } else {
      console.log(`[MISSING] ${relativePath}`);
      console.log(
        `     CSS: ${cssFiles.map((f) => path.relative(BASE_DIR, f)).join(", ")}`,
      );
      console.log(
        `     Icons used: ${usedIcons.size}, Missing: ${missingIcons.length}`,
      );
      console.log(`     Missing icons: ${missingIcons.join(", ")}\n`);
      totalWithIssues++;
    }
  }

  // Summary
  console.log("=".repeat(70));
  console.log("SUMMARY");
  console.log("=".repeat(70));
  console.log(`Total HTML files: ${htmlFiles.length}`);
  console.log(`  OK: ${totalOk}`);
  console.log(`  With missing icons: ${totalWithIssues}`);

  if (allMissingIcons.size > 0) {
    console.log("\n" + "-".repeat(70));
    console.log("ALL MISSING ICONS (add these to your CSS):");
    console.log("-".repeat(70));

    // Sort icons alphabetically
    const sortedIcons = Array.from(allMissingIcons.keys()).sort();
    for (const icon of sortedIcons) {
      const files = allMissingIcons.get(icon);
      console.log(
        `  .${icon}::before { content: "\\????"; }  /* Used in ${files.length} file(s) */`,
      );
    }

    console.log("\nFiles affected by each missing icon:");
    for (const icon of sortedIcons) {
      const files = allMissingIcons.get(icon);
      console.log(`  ${icon}:`);
      for (const file of files) {
        console.log(`    - ${file}`);
      }
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log("Scan complete!");
  console.log("=".repeat(70));
}

// Run the script
checkAllHtmlFiles();
