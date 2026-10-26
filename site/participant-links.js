(()=>{'use strict';
const interactive='a,button,input,select,textarea,label,summary,[contenteditable="true"]';
document.querySelectorAll('.comparison-table tbody tr').forEach(row=>{
 const link=row.querySelector('a[href^="#participant-"]');
 if(!link)return;
 row.dataset.participantLink=link.getAttribute('href');
 const activate=event=>{
  if(event.defaultPrevented||event.target.closest(interactive))return;
  if(event.button!==0&&event.button!==1)return;
  const selection=window.getSelection();if(selection&&!selection.isCollapsed)return;
  event.preventDefault();
  if(event.button===1||event.metaKey||event.ctrlKey||event.shiftKey){window.open(link.href,'_blank','noopener');return;}
  link.click();
 };
 row.addEventListener('click',activate);row.addEventListener('auxclick',activate);
});
})();
