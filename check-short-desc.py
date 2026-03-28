"""List the shortest meta descriptions with actual text."""
import os
import re

root = r'c:\Users\lok20\Desktop\NovaHealth'
results = []

for dp, dn, fns in os.walk(root):
    dn[:] = [d for d in dn if not d.startswith('.')]
    for fn in fns:
        if not fn.endswith('.html'):
            continue
        fpath = os.path.join(dp, fn)
        rel = os.path.relpath(fpath, root).replace('\\', '/')
        with open(fpath, 'r', encoding='utf-8-sig') as f:
            html = f.read()

        # Match both single-line and multi-line meta description
        match = re.search(
            r'name="description"\s+content="([^"]*)"',
            html, re.DOTALL
        )
        if not match:
            match = re.search(
                r'name="description"[\s\S]*?content="([^"]*)"',
                html[:2000]
            )
        if match:
            desc = match.group(1).strip()
            desc = re.sub(r'\s+', ' ', desc)
            results.append((len(desc), rel, desc))

results.sort()
# Print shortest 20 (excluding footer pages)
for length, path, desc in results:
    if length < 35 and 'footer/' not in path:
        print(f'{length:>3} | {path}')
        print(f'    {desc}')
        print()
