const fs = require('fs');
const path = require('path');

const baseUrl = 'https://novahealth.com.hk';
const rootDir = __dirname;

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function getCanonicalUrl(filePath) {
  const relativePath = path.relative(rootDir, filePath);
  const urlPath = relativePath
    .replace(/\\/g, '/')
    .replace('.html', '');
  
  return `${baseUrl}/${urlPath}`;
}

function addCanonicalLink(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if canonical link already exists
  if (content.includes('<link rel="canonical"')) {
    console.log(`⏭️  Skipping ${filePath} - canonical link already exists`);
    return;
  }
  
  const canonicalUrl = getCanonicalUrl(filePath);
  const canonicalTag = `    <link rel="canonical" href="${canonicalUrl}" />`;
  
  // Find the position to insert (after <link rel="manifest">)
  const manifestPos = content.indexOf('<link rel="manifest"');
  if (manifestPos !== -1) {
    const lineEnd = content.indexOf('>', manifestPos) + 1;
    content = content.slice(0, lineEnd) + '\n' + canonicalTag + content.slice(lineEnd);
  } else {
    // Fallback: insert before <title> tag
    const titlePos = content.indexOf('<title>');
    if (titlePos !== -1) {
      content = content.slice(0, titlePos) + canonicalTag + '\n    ' + content.slice(titlePos);
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Added canonical link to ${filePath}`);
  console.log(`   ${canonicalUrl}\n`);
}

// Main execution
console.log('🔍 Scanning for HTML files...\n');
const htmlFiles = getAllHtmlFiles(rootDir);

console.log(`📄 Found ${htmlFiles.length} HTML files\n`);

htmlFiles.forEach(file => {
  addCanonicalLink(file);
});

console.log('\n✨ Done!');
