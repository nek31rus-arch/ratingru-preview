(()=>{'use strict';const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];let toastTimer;
function toast(t){const el=$('.status-toast');el.textContent=t;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,4200)}
let dataPromise;const data=()=>dataPromise||(dataPromise=fetch('practice-data.json').then(r=>{if(!r.ok)throw new Error('data');return r.json()}));
$$('[data-idea]').forEach(a=>a.addEventListener('click',async e=>{e.preventDefault();try{const d=await data(),x=d.items.find(x=>x.id===a.dataset.idea);if(!x)return;const modal=$('.idea-modal');$('h2',modal).textContent=x.title;const ul=$('ul',modal);ul.replaceChildren(...x.outline.map(t=>{const li=document.createElement('li');li.textContent=t;return li}));modal.showModal()}catch{toast('Не удалось открыть описание темы. Обновите страницу.')}}));
$('.idea-modal .close')?.addEventListener('click',()=>$('.idea-modal').close());$('.idea-modal')?.addEventListener('click',e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close()}});
})();
