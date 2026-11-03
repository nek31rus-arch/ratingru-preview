/* Test-site link policy: static and dynamically rendered links. */
(()=>{'use strict';
function mark(a){const rel=new Set((a.getAttribute('rel')||'').split(/\s+/).filter(Boolean));if(rel.has('nofollow'))return;rel.add('nofollow');a.setAttribute('rel',[...rel].join(' '));}
function scan(node){if(node.nodeType!==1&&node.nodeType!==9)return;if(node.matches?.('a[href],area[href]'))mark(node);node.querySelectorAll('a[href],area[href]').forEach(mark);}
function start(){scan(document);new MutationObserver(changes=>{for(const change of changes){if(change.type==='attributes')scan(change.target);else change.addedNodes.forEach(scan);}}).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['href','rel']});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
