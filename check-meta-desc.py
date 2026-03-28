"""Check meta description lengths across all pages."""
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

        match = re.search(r'name="description"\s+content="([^"]*)"', html)
        if not match:
            match = re.search(r'content="([^"]*)"\s+name="description"', html)
        if match:
            desc = match.group(1)
            results.append((len(desc), rel, desc))
        else:
            results.append((0, rel, '(MISSING)'))

results.sort()
print(f'{"Len":>4} | {"File":<60} | Description')
print('-' * 120)
for length, path, desc in results:
    if length < 80:
        print(f'{length:>4} | {path:<60} | {desc[:60]}')
print()
print(f'Total: {len(results)} pages')
print(f'Under 50 chars: {sum(1 for l,_,_ in results if l < 50)}')
print(f'Under 80 chars: {sum(1 for l,_,_ in results if l < 80)}')
print(f'Over 160 chars: {sum(1 for l,_,_ in results if l > 160)}')
