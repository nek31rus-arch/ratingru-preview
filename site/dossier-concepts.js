/* Approved A navigation and one consistent icon/caption row per page. */
(()=>{'use strict';
const paths=['<path d="M6 3h8l4 4v14H6ZM14 3v5h4M9 12h6M9 16h4"/>','<path d="M3 4h18v13H8l-5 4V4Zm4 5h10M7 13h6"/>','<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>'];
const labels=['Оценка','Отзывы','Проверка'];
const icon=i=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[i]}</svg>`;
document.querySelectorAll('.chosen-dossier:has(.dossier-nav)').forEach(d=>{
 d.classList.add('concept-dossier');d.dataset.concept='a';
 const nav=d.querySelector('.dossier-nav'),tabs=[...nav.querySelectorAll('[role=tab]')];nav.className='dossier-switch';
 tabs.forEach((b,i)=>{b.setAttribute('aria-label',labels[i]);b.innerHTML=`${icon(i)}<span class="switch-label">${labels[i]}</span>`});
 const cue=document.createElement('div');cue.className='dossier-cue';cue.innerHTML='<span>Три стороны выбора</span>';d.querySelector('.dossier-cap').after(cue);
 const captions=[d.querySelector('.dossier-copy .dossier-kicker'),d.querySelector('.dossier-review .dossier-kicker'),d.querySelector('.dossier-check .dossier-kicker')];
 captions.forEach((caption,i)=>{if(!caption)return;const row=document.createElement('div');row.className='dossier-caption-row';caption.before(row);row.innerHTML=icon(i);row.append(caption);if(i===2)d.querySelector('.dossier-check-icon')?.remove()});
});
})();
