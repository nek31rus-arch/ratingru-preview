(()=>{'use strict';
const config=document.currentScript.dataset;
if(config.alias){const target=new URL(config.alias,location.href);target.search=location.search;target.hash=location.hash;location.replace(target.href);return;}
const media=matchMedia('(max-width:700px)');
const layout=media.matches?'mobile':'desktop';
const article=config.page==='article',resizeKey='ratingru-article-layout-reload';
let articleNavigation=window.__rrArticleNavigation;
// document.write runs this file twice. Decide reload intent once, before fetching the layout.
if(article&&!articleNavigation){
 let responsive=false;
 try{const saved=JSON.parse(sessionStorage.getItem(resizeKey)||'null');sessionStorage.removeItem(resizeKey);responsive=!!saved&&saved.url===location.href&&Date.now()-saved.at<10000}catch{}
 const entry=performance.getEntriesByType('navigation')[0];
 const reloaded=entry?entry.type==='reload':performance.navigation?.type===1;
 articleNavigation=window.__rrArticleNavigation={reset:layout==='mobile'&&reloaded&&!responsive};
 if(articleNavigation.reset){
  history.scrollRestoration='manual';
  history.replaceState(history.state,'',location.pathname+location.search);
  window.scrollTo(0,0);
 }
}
function reloadForLayout(){
 // Responsive layout changes are not a reader's Refresh command: preserve their place.
 if(article){try{sessionStorage.setItem(resizeKey,JSON.stringify({url:location.href,at:Date.now()}))}catch{}history.scrollRestoration='auto'}
 location.reload();
}
if(config.rendered){
 if(config.rendered!==layout){reloadForLayout();return;}
 media.addEventListener('change',reloadForLayout);
 if(articleNavigation?.reset){
  const top=()=>{if(!articleNavigation.reset)return;const root=document.documentElement,previous=root.style.scrollBehavior;root.style.scrollBehavior='auto';window.scrollTo(0,0);root.style.scrollBehavior=previous};
  const ready=()=>{top();requestAnimationFrame(()=>requestAnimationFrame(top));document.fonts.ready.then(top)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
  window.addEventListener('load',top,{once:true});window.addEventListener('pageshow',top,{once:true});
  // A later, deliberate in-page jump takes priority over startup positioning.
  window.addEventListener('hashchange',()=>{articleNavigation.reset=false;history.scrollRestoration='auto'});
  window.addEventListener('pagehide',()=>{history.scrollRestoration='auto'},{once:true});
 }else{
  const scrollToHash=()=>{if(location.hash){let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}document.getElementById(id)?.scrollIntoView();}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scrollToHash,{once:true});else scrollToHash();
 }
 return;
}
if(!['home','catalog','article'].includes(config.page))return;
fetch(new URL('layouts/'+config.page+'-'+layout+'.html',location.href),{credentials:'same-origin',cache:'no-cache'})
 .then(response=>{if(!response.ok)throw new Error('Layout unavailable');return response.text();})
 .then(html=>{document.open();document.write(html);document.close();})
 .catch(()=>{const error=document.getElementById('load-error');if(error)error.hidden=false;});
})();
