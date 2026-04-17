from pathlib import Path
import re
path = Path(r'c:\OneDrive\Projek\menuwarunkmilenial\index.html')
text = path.read_text(encoding='utf-8')
text, n = re.subn(r'onclick="setTimeout\(\s*\(\) => \{\s*document\.getElementById\(\'([^\']+)\'\)\.scrollIntoView\(\{[^\}]+\}\);\s*\},\s*300\)"', r'data-scroll-target="\1"', text)
text = text.replace('<h2></h2>', '<br>')
text = text.replace('ICE 23K]', 'ICE [23K]')
all_occurrences = list(re.finditer(r'id="menu-item-sambal-geprek"', text))
ids = ['menu-item-sambal-dadak', 'menu-item-sambal-ijo', 'menu-item-sambal-matah']
for i, m in enumerate(all_occurrences[:3]):
    start, end = m.span()
    text = text[:start] + f'id="{ids[i]}"' + text[end:]
first = text.find('id="menu-item-degan-susu"')
if first != -1:
    second = text.find('id="menu-item-degan-susu"', first + 1)
    if second != -1:
        text = text[:second] + 'id="menu-item-degan-original"' + text[second + len('id="menu-item-degan-susu"'):]
text = text.replace('id="menu-item-telur-dadar"', 'id="menu-item-kerupuk"')
path.write_text(text, encoding='utf-8')
print('updated', n, 'onclick entries replaced')
