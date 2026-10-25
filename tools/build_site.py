#!/usr/bin/env python3
"""Validate the static preview and assemble the Pages artifact."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib,re,shutil
ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/'site';OUT=ROOT/'_site'
PAGES={'index.html','home.html','category.html','catalog-mobile.html','article.html','article-desktop.html','article-mobile.html'}
ROOT_ASSETS={'article-dossier.js','experience-v10.css','experience-v10.js','dossier-concepts.css','dossier-concepts.js','approved.css','article-comments.js','article-desktop.css','article-final.css','article-mobile.css','article-mobile.js','article-refinements.css','catalog-mobile.css','cities.css','cities.js','common.css','common.js','dossier-integrated.css','dossier-integrated.js','dossier.js','final-home.css','logo.svg','metal-dial.css','metal-dial.js','mobile-compose-v5.js','mobile-selected.css','mobile.css','refinements.css','unified-page.js','unified-nav.css','selected-render.js','selected.css','selected.js','site.css','site.js','ui-refinements.css','robots.txt','.nojekyll'}
MEDIA={'assets/'+x for x in ['bank.webp','bank-480.webp','driving.webp','driving-480.webp','restaurant.webp','restaurant-480.webp']}
FONTS={'fonts/'+x for x in ['Golos.woff2','Unbounded.woff2','OFL-Golos.txt','OFL-Unbounded.txt']}
LAYOUTS={'layouts/'+page+'-'+kind+'.html' for page in ['home','catalog','article'] for kind in ['desktop','mobile']}
ALLOWED=PAGES|LAYOUTS|ROOT_ASSETS|MEDIA|FONTS
class Document(HTMLParser):
 def __init__(self,text):super().__init__();self.ids=[];self.refs=[];self.robots=[];self.in_head=False;self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='head':self.in_head=True
  if 'id'in a:self.ids.append(a['id'])
  if tag=='meta' and a.get('name','').lower()=='robots':self.robots.append((self.in_head,a.get('content')))
  for key in ['href','src']:
   if key in a:self.refs.append(a[key])
  for part in a.get('srcset','').split(','):
   if part.strip():self.refs.append(part.strip().split()[0])
 def handle_endtag(self,tag):
  if tag=='head':self.in_head=False
actual={str(f.relative_to(SITE)) for f in SITE.rglob('*') if f.is_file()}
assert actual==ALLOWED,('Unexpected or missing files',sorted(actual-ALLOWED),sorted(ALLOWED-actual))
assert not any(f.is_symlink() for f in SITE.rglob('*'))
for name in sorted(actual):
 f=SITE/name
 if f.suffix in {'.html','.css','.js','.txt','.svg'}:
  text=f.read_text()
  assert not re.search(r'/Users/|127\.0\.0\.1|localhost|file://|plugin://|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}',text),('Non-public marker',name)
 if name in PAGES|LAYOUTS:
  doc=Document(text);assert doc.robots==[(True,'noindex, nofollow')],('robots',name)
  assert len(doc.ids)==len(set(doc.ids)),('duplicate IDs',name)
  for ref in doc.refs:
   u=urlsplit(ref)
   if u.scheme or u.netloc:continue
   assert not u.path.startswith('/'),('Root-relative URL',name,ref)
   target=SITE/unquote(u.path) if u.path else f
   assert target.is_file(),('Broken local reference',name,ref)
   if u.fragment and target.suffix=='.html':
    route={'index.html':'home','category.html':'catalog','article.html':'article'}.get(target.name)
    ids=set(Document(target.read_text()).ids)
    if route:
     for kind in ['desktop','mobile']:ids.update(Document((SITE/'layouts'/f'{route}-{kind}.html').read_text()).ids)
    assert u.fragment in ids or u.fragment=='cities',('Broken anchor',name,ref)
 elif f.suffix=='.css':
  for ref in re.findall(r'url\([\'\"]?([^\)\'\"]+)',text):
   if not ref.startswith(('data:','http:','https:','#')):assert (f.parent/urlsplit(ref).path).is_file(),(name,ref)
assert not re.search(r'(?im)^\s*Disallow\s*:\s*/', (SITE/'robots.txt').read_text())
if OUT.exists():shutil.rmtree(OUT)
shutil.copytree(SITE,OUT)
# New approved assets become visible immediately after a deployment.
for f in OUT.rglob('*.html'):
 text=f.read_text()
 def version(m):
  prefix,path,suffix=m.groups();asset=OUT/path
  return prefix+path+'?v='+hashlib.sha256(asset.read_bytes()).hexdigest()[:16]+suffix
 text=re.sub(r'((?:src|href)=")([^"?]+\.(?:css|js))(?:\?[^"#]*)?(" )',version,text)
 # Resource attributes are also commonly followed immediately by a closing tag.
 text=re.sub(r'((?:src|href)=")([^"?]+\.(?:css|js))(?:\?[^"#]*)?(")',version,text)
 f.write_text(text)
print(f'Validated {len(PAGES)} entry/alias pages, {len(LAYOUTS)} approved layouts and {len(actual)-len(PAGES)-len(LAYOUTS)} required resources. Pages artifact: _site/')
