(()=>{'use strict';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons={
van:'<path d="M3 10h18v20H3zM21 16h6l7 8v6H21M26 17v7h8M3 30h4m8 0h10m7 0h3"/><circle cx="11" cy="31" r="4"/><circle cx="28" cy="31" r="4"/><path d="M6 14h12"/>',
sofa:'<path d="M8 21v-7a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v7M8 28H5V18h6v8h18v-8h6v10h-3M8 28v5m24-5v5M11 26h18M20 11v11"/>',
tools:'<path d="m7 7 7 2 3 7-5 5-7-3-2-7 5 5 4-4-5-5ZM16 20l15 15 4-4-15-15M30 5l5 5-4 5-5-5zM26 11 9 28l-4 7 7-4 10-10"/>',
interior:'<path d="M5 6h30v29H5zM5 20h13V6M18 20v15M26 35V24h9M9 26h5M24 12h7M27.5 9v6"/>',
cleaning:'<path d="m24 5 5 3-10 16-5-3zM13 21l8 5 1 10H4l4-10zM10 29l-2 7m8-7v7M31 18v8m-4-4h8"/>',
repair:'<rect x="5" y="6" width="24" height="10" rx="2"/><path d="M29 11h6v10H18v6m-3 0h6v10h-6zM10 10h14"/>',
language:'<path d="M5 6h26v20H15l-8 8v-8H5zM11 21l5-10 5 10m-8-4h6M25 12h3m-3 5h3"/>',
restaurant:'<circle cx="21" cy="20" r="10"/><circle cx="21" cy="20" r="6"/><path d="M4 5v11m4-11v11m-4-5h4m-2 5v20M36 5v31m0-31c-5 4-5 12 0 14"/>',
service:'<path d="m27 5-6 6 7 7 6-6a10 10 0 0 1-13 12L10 35l-5-5 11-11A10 10 0 0 1 27 5Z"/><circle cx="9" cy="30" r="1"/>',
car:'<path d="m8 15 4-9h16l4 9M7 15h26v17H7zM7 25h26M11 32v4m18-4v4M11 20h5m8 0h5"/>'};
function ratingIcon(name){return '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+(icons[name]||icons.interior)+'</svg>'}
const arrow='<svg class="icon rating-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';

// The chosen city has priority. No IP lookup, location permission or third-party request.
const currentCity=()=>document.querySelector('.news-location [data-city-label]')?.textContent.trim()||'Вся Россия';
async function init(){if(window.rrNewsRoute)await window.rrNewsRoute;const block=document.querySelector('[data-related-ratings]');if(!block)return;
const cityButton=block.querySelector('[data-ratings-city]');cityButton.addEventListener('click',()=>{const picker=document.querySelector('.city-modal');picker?.addEventListener('close',()=>cityButton.focus({preventScroll:true}),{once:true});document.querySelector('.news-location').click()});
let data;try{const response=await fetch('ratings-data.json');if(!response.ok)throw new Error('Unavailable');data=await response.json()}catch{block.hidden=true;return}
const topics=(block.dataset.ratingTopics||'').split(/\s+/).filter(Boolean);if(!topics.length){block.hidden=true;return}
const content=block.querySelector('[data-ratings-content]'),note=block.querySelector('[data-ratings-note]');let lastCity='',opener=null;
const modal=document.createElement('dialog');modal.className='ratings-demo';modal.setAttribute('aria-labelledby','ratings-demo-title');modal.innerHTML='<div class="ratings-demo-top"><span class="eyebrow">Демонстрационный материал</span><button type="button" class="ratings-demo-close" aria-label="Закрыть пример рейтинга">×</button></div><h2 id="ratings-demo-title"></h2><p class="ratings-demo-city"></p><p data-demo-focus></p><p>Это пример тематической подборки. Этот рейтинг ещё не подготовлен. Показан пример будущей страницы, без оценок реальных компаний.</p><a class="text-link" href="category.html">Перейти ко всем рейтингам →</a>';document.body.append(modal);
modal.querySelector('button').addEventListener('click',()=>modal.close());modal.addEventListener('close',()=>opener?.focus({preventScroll:true}));modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()}});
function render(){const city=currentCity();if(city===lastCity)return;const changed=Boolean(lastCity);lastCity=city;if(changed){const u=new URL(location.href);if(u.searchParams.has('city')){u.searchParams.set('city',city);history.replaceState(null,'',u)}if(parent!==window)parent.postMessage({type:'ratingru:city-changed',city},location.origin);}block.querySelector('[data-city-label]').textContent=city;const picked=data.articles.filter(a=>a.city===city&&topics.some(t=>a.topics.includes(t))&&(a.status==='available'||(data.includeDemos&&a.status==='demo'))).sort((a,b)=>topics.findIndex(t=>a.topics.includes(t))-topics.findIndex(t=>b.topics.includes(t))||a.id.localeCompare(b.id)).slice(0,Math.min(5,data.limit||5));
if(!picked.length){content.innerHTML='<p class="ratings-empty">'+(city==='Вся Россия'?'Выберите город — покажем рейтинги, связанные с этой новостью.':'Для этого города пока нет рейтингов по теме новости. Можно выбрать другой город.')+'</p>';note.hidden=true;return}
content.innerHTML='<div class="ratings-columns" aria-hidden="true"><span class="ratings-col-main">Тематический рейтинг</span><span>Город</span><span></span></div><ul class="ratings-list">'+picked.map(a=>{const actual=a.status==='available',url=actual?new URL(a.url,location.href):null;if(url)url.searchParams.set('city',city);const open=actual?'<a href="'+escape(url.pathname.split('/').pop()+url.search)+'"':'<button type="button" data-demo-rating="'+escape(a.id)+'"';return '<li>'+open+' class="rating-row"><span class="rating-art" aria-hidden="true">'+ratingIcon(a.icon)+'</span><span class="rating-name"><span class="rating-type">Рейтинг'+(a.isDemo?'<small>Демо</small>':'')+'</span><strong class="rating-title">'+escape(a.headline||a.title)+'</strong></span><span class="rating-city-label">'+escape(a.city)+'</span>'+arrow+(actual?'</a>':'</button>')+'</li>'}).join('')+'</ul>';
note.hidden=false;note.textContent=picked.some(a=>a.status==='demo')?'Демонстрационная подборка: числа в заголовках показывают формат будущих рейтингов. Состав компаний ещё не подготовлен.':'В подборке — доступный демонстрационный рейтинг. Данные участников в нём условные.';
content.querySelectorAll('[data-demo-rating]').forEach(button=>button.addEventListener('click',()=>{const article=picked.find(a=>a.id===button.dataset.demoRating);opener=button;modal.querySelector('h2').textContent=article.headline||article.title;modal.querySelector('.ratings-demo-city').textContent=article.city;modal.querySelector('[data-demo-focus]').textContent='В будущем рейтинге: '+article.focus.charAt(0).toLowerCase()+article.focus.slice(1)+'.';const u=new URL('category.html',location.href);u.searchParams.set('city',city);modal.querySelector('a').href=u.href;modal.showModal()}));}
render();if(new URLSearchParams(location.search).get('focus')==='ratings')document.fonts.ready.then(()=>block.querySelector('.ratings-heading').scrollIntoView({behavior:'instant',block:'start'}));const label=document.querySelector('.news-location [data-city-label]');if(label)new MutationObserver(render).observe(label,{childList:true,characterData:true,subtree:true});
// Renders immediately after the shared city picker updates its canonical label.
}
init();
})();
