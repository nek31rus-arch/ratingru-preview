/* Compose before the common controls initialize. Keep a single live rating widget. */
(()=>{
 if(!document.body.classList.contains('mobile-home'))return;
 if(document.body.classList.contains('mobile-selected')){
  const breakpoint=matchMedia('(max-width:700px)'),title=document.querySelector('.hero-copy h1'),ring=document.querySelector('#dossier-slot .rating-widget'),score=document.querySelector('#dossier-slot .dossier-score-grid');let composition=null;
  function compose(){if(breakpoint.matches&&!composition){composition=document.createElement('div');composition.className='mobile-hero-composition';title.before(composition);composition.append(title);const face=document.createElement('div');face.className='hero-metal chosen-dossier metal-v3';face.append(ring);composition.append(face)}else if(!breakpoint.matches&&composition){composition.before(title);document.querySelector("#ds-panel-1").prepend(ring);composition.remove();composition=null}document.dispatchEvent(new Event('mobilelayoutchange'))}
  compose();breakpoint.addEventListener('change',compose);
 }
 document.querySelectorAll('.mobile-faq details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)document.querySelectorAll('.mobile-faq details').forEach(other=>{if(other!==item)other.open=false})}));
})();
