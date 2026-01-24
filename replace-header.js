/**
 * Header Replacement Script
 *
 * This script replaces all <header>...</header> sections in HTML files
 * with the content from header.md
 *
 * Usage: node replace-header.js
 */

const fs = require("fs");
const path = require("path");

// Base directory to scan
const BASE_DIR = __dirname;
const HEADER_FILE = path.join(BASE_DIR, "header.md");

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
 * Calculate the relative path prefix based on file location
 * e.g., files in subdirectories need "../" prefix, root files need "./"
 */
function getRelativePrefix(htmlPath) {
  const relativePath = path.relative(BASE_DIR, htmlPath);
  const depth = relativePath.split(path.sep).length - 1;

  if (depth === 0) {
    return "./";
  }
  return "../".repeat(depth);
}

/**
 * Adjust the header content for the specific file location
 * Replaces "../" prefixes with the correct relative path
 */
function adjustHeaderForFile(headerContent, htmlPath) {
  const prefix = getRelativePrefix(htmlPath);

  // The header.md uses "../" for all links (designed for subfolders)
  // We need to adjust this based on the file's actual location
  if (prefix === "./") {
    // Root level files: replace "../" with "./"
    return headerContent
      .replace(/href="\.\.\/index\.html"/g, 'href="./index.html"')
      .replace(/href="\.\.\/pricing\.html"/g, 'href="./pricing.html"')
      .replace(/href="\.\.\/join-us\.html"/g, 'href="./join-us.html"')
      .replace(/href="\.\.\/contact\.html"/g, 'href="./contact.html"')
      .replace(/href="\.\.\/about-us\//g, 'href="./about-us/')
      .replace(/href="\.\.\/health-info\//g, 'href="./health-info/')
      .replace(/href="\.\.\/physiotherapy\//g, 'href="./physiotherapy/')
      .replace(
        /href="\.\.\/occupational-speech-therapy\//g,
        'href="./occupational-speech-therapy/',
      )
      .replace(/href="\.\.\/nursing\//g, 'href="./nursing/')
      .replace(/href="\.\.\/home-care-worker\//g, 'href="./home-care-worker/');
  }

  // For files in subdirectories, the "../" prefix is correct
  return headerContent;
}

/**
 * Replace the header in an HTML file
 */
function replaceHeader(htmlPath, newHeaderContent) {
  let htmlContent = fs.readFileSync(htmlPath, "utf-8");

  // Regex to match the entire header element (including nested content)
  // Also match if header was already removed and only comment remains
  const headerRegex = /<header\s+class="header"[\s\S]*?<\/header>/i;
  const headerCommentOnlyRegex = /<!-- Header -->\s*\n\s*\n/i;

  let newHtmlContent;

  // Adjust the header content for this specific file's location
  const adjustedHeader = adjustHeaderForFile(newHeaderContent, htmlPath);

  if (headerRegex.test(htmlContent)) {
    // Full header exists - replace it
    newHtmlContent = htmlContent.replace(headerRegex, adjustedHeader);
  } else if (headerCommentOnlyRegex.test(htmlContent)) {
    // Only comment placeholder remains - replace it
    newHtmlContent = htmlContent.replace(
      headerCommentOnlyRegex,
      adjustedHeader + "\n\n",
    );
  } else {
    return {
      success: false,
      reason: "No matching header or placeholder found",
    };
  }

  if (newHtmlContent === htmlContent) {
    return { success: false, reason: "No changes made" };
  }

  fs.writeFileSync(htmlPath, newHtmlContent, "utf-8");
  return { success: true };
}

/**
 * Main function
 */
function main() {
  console.log("=".repeat(70));
  console.log("Header Replacement Script");
  console.log("=".repeat(70));

  // Read the header template
  if (!fs.existsSync(HEADER_FILE)) {
    console.error(`Error: Header file not found: ${HEADER_FILE}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(HEADER_FILE, "utf-8");

  // Extract only the header element from the file (from <header to </header>)
  const headerMatch = rawContent.match(/(<header[\s\S]*?<\/header>)/);
  if (!headerMatch) {
    console.error("Error: Could not extract header from header.md");
    console.error("Make sure the file contains <header> and </header>");
    process.exit(1);
  }

  const headerContent = headerMatch[1];
  console.log(`Loaded header template from: header.md`);
  console.log(`Header template length: ${headerContent.length} characters\n`);

  // Find all HTML files
  const htmlFiles = findHtmlFiles(BASE_DIR);
  console.log(`Found ${htmlFiles.length} HTML files\n`);
  console.log("-".repeat(70));

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const htmlPath of htmlFiles) {
    const relativePath = path.relative(BASE_DIR, htmlPath);

    const result = replaceHeader(htmlPath, headerContent);

    if (result.success) {
      console.log(`[UPDATED] ${relativePath}`);
      successCount++;
    } else {
      console.log(`[SKIPPED] ${relativePath} - ${result.reason}`);
      skipCount++;
    }
  }

  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("SUMMARY");
  console.log("=".repeat(70));
  console.log(`Total HTML files: ${htmlFiles.length}`);
  console.log(`  Updated: ${successCount}`);
  console.log(`  Skipped: ${skipCount}`);
  console.log(`  Errors: ${errorCount}`);
  console.log("=".repeat(70));
}

// Run the script
main();
