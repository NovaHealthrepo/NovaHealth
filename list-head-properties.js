const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Function to get all HTML files recursively
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

// Function to extract head elements from HTML
function extractHeadElements(htmlContent, filePath) {
  const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  
  if (!headMatch) {
    return [];
  }
  
  const headContent = headMatch[1];
  const elements = [];
  
  // Extract meta tags
  const metaRegex = /<meta([^>]*)>/gi;
  let match;
  while ((match = metaRegex.exec(headContent)) !== null) {
    const attrs = match[1];
    const element = {
      file: filePath,
      tag: 'meta',
      attributes: attrs.trim()
    };
    
    // Extract specific attributes
    const nameMatch = attrs.match(/name=["']([^"']*)["']/i);
    const propertyMatch = attrs.match(/property=["']([^"']*)["']/i);
    const contentMatch = attrs.match(/content=["']([^"']*)["']/i);
    const charsetMatch = attrs.match(/charset=["']?([^"'\s>]*)["']?/i);
    
    if (nameMatch) element.name = nameMatch[1];
    if (propertyMatch) element.property = propertyMatch[1];
    if (contentMatch) element.content = contentMatch[1];
    if (charsetMatch) element.charset = charsetMatch[1];
    
    elements.push(element);
  }
  
  // Extract title
  const titleMatch = headContent.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    elements.push({
      file: filePath,
      tag: 'title',
      content: titleMatch[1].trim()
    });
  }
  
  // Extract link tags
  const linkRegex = /<link([^>]*)>/gi;
  while ((match = linkRegex.exec(headContent)) !== null) {
    const attrs = match[1];
    const element = {
      file: filePath,
      tag: 'link',
      attributes: attrs.trim()
    };
    
    const relMatch = attrs.match(/rel=["']([^"']*)["']/i);
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    const typeMatch = attrs.match(/type=["']([^"']*)["']/i);
    
    if (relMatch) element.rel = relMatch[1];
    if (hrefMatch) element.href = hrefMatch[1];
    if (typeMatch) element.type = typeMatch[1];
    
    elements.push(element);
  }
  
  // Extract script tags in head
  const scriptRegex = /<script([^>]*)>[\s\S]*?<\/script>/gi;
  while ((match = scriptRegex.exec(headContent)) !== null) {
    const attrs = match[1];
    const element = {
      file: filePath,
      tag: 'script',
      attributes: attrs.trim()
    };
    
    const srcMatch = attrs.match(/src=["']([^"']*)["']/i);
    const typeMatch = attrs.match(/type=["']([^"']*)["']/i);
    
    if (srcMatch) element.src = srcMatch[1];
    if (typeMatch) element.type = typeMatch[1];
    
    elements.push(element);
  }
  
  // Extract style tags
  const styleRegex = /<style([^>]*)>[\s\S]*?<\/style>/gi;
  while ((match = styleRegex.exec(headContent)) !== null) {
    elements.push({
      file: filePath,
      tag: 'style',
      attributes: match[1].trim()
    });
  }
  
  // Extract base tag
  const baseMatch = headContent.match(/<base([^>]*)>/i);
  if (baseMatch) {
    const attrs = baseMatch[1];
    const element = {
      file: filePath,
      tag: 'base',
      attributes: attrs.trim()
    };
    
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    if (hrefMatch) element.href = hrefMatch[1];
    
    elements.push(element);
  }
  
  return elements;
}

// Main function
function main() {
  const rootDir = __dirname;
  console.log('Scanning for HTML files...');
  
  const htmlFiles = getAllHtmlFiles(rootDir);
  console.log(`Found ${htmlFiles.length} HTML files`);
  
  const allElements = [];
  
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(rootDir, file);
    const elements = extractHeadElements(content, relativePath);
    allElements.push(...elements);
  });
  
  console.log(`Extracted ${allElements.length} head elements`);
  
  // Prepare data for Excel
  const worksheetData = allElements.map(el => ({
    'File': el.file,
    'Tag': el.tag,
    'Name': el.name || '',
    'Property': el.property || '',
    'Content': el.content || '',
    'Rel': el.rel || '',
    'Href': el.href || '',
    'Src': el.src || '',
    'Type': el.type || '',
    'Charset': el.charset || '',
    'All Attributes': el.attributes || ''
  }));
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(worksheetData);
  
  // Set column widths
  ws['!cols'] = [
    { wch: 40 },  // File
    { wch: 10 },  // Tag
    { wch: 20 },  // Name
    { wch: 20 },  // Property
    { wch: 50 },  // Content
    { wch: 15 },  // Rel
    { wch: 30 },  // Href
    { wch: 30 },  // Src
    { wch: 15 },  // Type
    { wch: 10 },  // Charset
    { wch: 60 }   // All Attributes
  ];
  
  XLSX.utils.book_append_sheet(wb, ws, 'Head Properties');
  
  // Write to file
  const outputFile = 'head-properties.xlsx';
  XLSX.writeFile(wb, outputFile);
  
  console.log(`\nExcel file created: ${outputFile}`);
  console.log(`Total elements: ${allElements.length}`);
}

main();
