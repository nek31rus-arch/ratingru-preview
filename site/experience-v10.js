(()=>{'use strict';
const header=document.querySelector('body>.site-header');if(header){const update=()=>document.documentElement.style.setProperty('--rr-header-height',Math.ceil(header.getBoundingClientRect().height)+'px');new ResizeObserver(update).observe(header);update();}
const modal=document.querySelector('.city-modal');if(!modal)return;
let saved=null,frame=0;
function position(){frame=0;if(!modal.open)return;const vv=window.visualViewport;const h=vv?.height||innerHeight,offset=vv?.offsetTop||0;const narrow=matchMedia('(max-width:700px)').matches;const gap=narrow?12:Math.min(70,Math.max(24,h*.07));modal.style.setProperty('--rr-city-top',(offset+gap)+'px');modal.style.setProperty('--rr-city-height',Math.max(190,Math.min(narrow?620:570,h-gap-(narrow?12:24)))+'px');}
function schedule(){if(!frame)frame=requestAnimationFrame(position);}
function lock(){if(saved)return;const body=document.body;saved={y:scrollY,position:body.style.position,top:body.style.top,width:body.style.width};body.style.position='fixed';body.style.top=-saved.y+'px';body.style.width='100%';position();}
function unlock(){if(!saved)return;const body=document.body,previous=saved;saved=null;body.style.position=previous.position;body.style.top=previous.top;body.style.width=previous.width;window.scrollTo({top:previous.y,behavior:'instant'});}
new MutationObserver(()=>{if(modal.open)lock();else unlock();}).observe(modal,{attributes:true,attributeFilter:['open']});
modal.addEventListener('rr-city-before-open',lock);modal.addEventListener('rr-city-open',position);modal.addEventListener('close',unlock);window.addEventListener('resize',schedule,{passive:true});window.visualViewport?.addEventListener('resize',schedule,{passive:true});window.visualViewport?.addEventListener('scroll',schedule,{passive:true});
})();
