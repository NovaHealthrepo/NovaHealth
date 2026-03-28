"""Compare HTML files vs sitemap URLs to find missing pages."""
import os
import re

root = r'c:\Users\lok20\Desktop\NovaHealth'

# Get all HTML files
html_files = set()
for dp, dn, fns in os.walk(root):
    dn[:] = [d for d in dn if not d.startswith('.')]
    for fn in fns:
        if fn.endswith('.html'):
            rel = os.path.relpath(os.path.join(dp, fn), root)
            rel = rel.replace('\\', '/')
            url_path = rel.replace('.html', '')
            if url_path == 'index':
                url_path = ''
            html_files.add(url_path)

# Get sitemap URLs
with open(os.path.join(root, 'sitemap.xml'), 'r', encoding='utf-8') as f:
    content = f.read()
sitemap_urls = set()
for m in re.finditer(r'<loc>https://novahealth\.com\.hk/([^<]*)</loc>', content):
    sitemap_urls.add(m.group(1))
sitemap_urls.add('')  # homepage

missing = html_files - sitemap_urls
extra = sitemap_urls - html_files

print(f'HTML files: {len(html_files)}')
print(f'Sitemap URLs: {len(sitemap_urls)}')
print()
if missing:
    print('Missing from sitemap:')
    for p in sorted(missing):
        print(f'  {p or "(root)"}')
if extra:
    print('Extra in sitemap:')
    for p in sorted(extra):
        print(f'  {p or "(root)"}')
if not missing and not extra:
    print('Sitemap is complete!')
