(()=>{'use strict';
const menu=document.getElementById('news-menu'),toggle=document.querySelector('[data-menu-toggle]');
if(toggle)new MutationObserver(()=>toggle.setAttribute('aria-label',toggle.getAttribute('aria-expanded')==='true'?'Закрыть меню':'Открыть меню')).observe(toggle,{attributes:true,attributeFilter:['aria-expanded']});
if(menu){const city=document.createElement('button');city.type='button';city.className='menu-city';city.innerHTML='<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></svg><span>Город для рейтингов</span>';city.addEventListener('click',()=>{menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');document.querySelector('.news-location').click()});menu.append(city);menu.addEventListener('keydown',e=>{if(e.key==='Escape')toggle.focus()})}
const params=new URLSearchParams(location.search),search=document.querySelector('[data-news-search]'),clear=document.querySelector('[data-news-clear]');
const chips=[...document.querySelectorAll('[data-news-filter]')],cards=[...document.querySelectorAll('[data-news-card]')];
let selected=chips.some(b=>b.dataset.newsFilter===params.get('category'))?params.get('category'):'all';
const normalize=s=>s.toLowerCase().replace(/ё/g,'е').trim();
if(search)search.value=params.get('q')||'';
function filter(){if(!search)return;const term=normalize(search.value);let n=0;cards.forEach(card=>{card.hidden=!((selected==='all'||card.dataset.category===selected)&&normalize(card.textContent).includes(term));if(!card.hidden)n++});document.querySelector('[data-news-count]').textContent=n+' '+(n===1?'публикация':n>1&&n<5?'публикации':'публикаций');document.querySelector('[data-news-empty]').hidden=n>0;document.querySelector('.feed-end').hidden=n===0;clear.hidden=!search.value;chips.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.newsFilter===selected)))}
chips.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.newsFilter;filter()}));search?.addEventListener('input',filter);search?.addEventListener('keydown',e=>{if(e.key==='Escape'){search.value='';filter()}});clear?.addEventListener('click',()=>{search.value='';filter();search.focus()});document.querySelector('[data-news-reset]')?.addEventListener('click',()=>{selected='all';search.value='';filter();search.focus()});filter();
async function setupStory(){
 if(window.rrNewsRoute)await window.rrNewsRoute;
 document.querySelectorAll('[data-news-brief]').forEach(brief=>{
  const tabs=[...brief.querySelectorAll('[role=tab]')],panels=[...brief.querySelectorAll('[role=tabpanel]')];
  function choose(index,focus=false){tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].setAttribute('aria-hidden',String(i!==index));panels[i].inert=i!==index;panels[i].tabIndex=i===index?0:-1});brief.style.setProperty('--brief-step',index);brief.querySelector('[data-brief-step]').textContent=String(index+1).padStart(2,'0')+' / 03';if(focus)tabs[index].focus()}
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>choose(index));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;else if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();choose(next,true)}})});choose(0);
 });
 const copy=document.querySelector('[data-copy-story]'),status=document.querySelector('[data-action-status]');if(copy){copy.setAttribute('aria-label','Скопировать ссылку на новость');copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);status.textContent='Ссылка скопирована — можно поделиться.'}catch{status.textContent='Скопируйте адрес новости из строки браузера.'}})}
 const bar=document.querySelector('.reading-progress>span');if(!bar)return;let queued=false;
 const progress=()=>{queued=false;const content=document.querySelector('.story-content');if(!content)return;const top=content.getBoundingClientRect().top+scrollY,end=top+content.offsetHeight-innerHeight*.6;bar.style.width=(Math.max(0,Math.min(1,(scrollY-top+innerHeight*.3)/Math.max(1,end-top)))*100)+'%'};
 addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(progress)}},{passive:true});addEventListener('resize',progress);progress();
}
setupStory();
})();
