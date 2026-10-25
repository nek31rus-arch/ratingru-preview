/* Prepare the article dossier before shared tabs and rating widgets initialize. */
(()=>{'use strict';const slot=document.getElementById('article-dossier-slot');if(!slot||!window.renderDossier)return;
slot.innerHTML=window.renderDossier(3);const dossier=slot.querySelector('.chosen-dossier');dossier.classList.add('article-dossier');
const ring=dossier.querySelector('.rating-widget');ring.dataset.label='Пример шкалы';ring.dataset.scoreDescription='Пример оформления шкалы, не оценка всех автошкол';ring.style.setProperty('--ring-size','130px');
dossier.querySelector('.dossier-cap small').textContent='КАК ЧИТАТЬ РАЗБОР';
dossier.querySelector('.dossier-copy h2').innerHTML='Условия. Отзывы. Проверка.';
dossier.querySelector('.dossier-copy p').textContent='Сопоставляйте основания, а не только итоговый балл.';
dossier.querySelector('.dossier-foot').innerHTML='<span aria-hidden="true"></span>Демонстрация шкалы. Это не оценка всех автошкол.';
if(document.body.dataset.layout==='mobile'){
 dossier.classList.add('integrated-dossier');const holder=document.querySelector('.article-hero-rating');holder.append(ring);
 const score=dossier.querySelector('#ds-panel-1'),copy=score.querySelector('.dossier-copy'),ledger=score.querySelector('.dossier-ledger');score.replaceChildren(copy,ledger);
 const paths=['<path d="M45 25h20l7 7v29H45V25Zm20 0v9h7M51 43h14M51 50h10"/>','<path d="M41 28h34v25H53l-12 9V28Zm7 9h20m-20 8h13"/>','<path d="m58 24 17 6v14c0 11-17 19-17 19s-17-8-17-19V30l17-6Z"/><path d="m50 43 6 6 11-13"/>'];
 const nav=dossier.querySelector('.dossier-nav');nav.classList.add('map-tabs');nav.querySelectorAll('[role=tab]').forEach((tab,i)=>{tab.innerHTML='<svg viewBox="0 0 116 86" fill="none" aria-hidden="true"><rect x="18" y="9" width="80" height="68" rx="6"/>'+paths[i]+'</svg><span>'+['Оценка','Отзывы','Проверка'][i]+'</span>';});
}
})();
