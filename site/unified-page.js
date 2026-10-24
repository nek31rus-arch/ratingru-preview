(()=>{'use strict';
const config=document.currentScript.dataset;
if(config.alias){const target=new URL(config.alias,location.href);target.search=location.search;target.hash=location.hash;location.replace(target.href);return;}
const media=matchMedia('(max-width:700px)');
const layout=media.matches?'mobile':'desktop';
if(config.rendered){
 media.addEventListener('change',()=>location.reload());
 const scrollToHash=()=>{if(location.hash){let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}document.getElementById(id)?.scrollIntoView();}};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scrollToHash,{once:true});else scrollToHash();
 return;
}
if(!['home','catalog','article'].includes(config.page))return;
fetch(new URL('layouts/'+config.page+'-'+layout+'.html',location.href),{credentials:'same-origin',cache:'no-cache'})
 .then(response=>{if(!response.ok)throw new Error('Layout unavailable');return response.text();})
 .then(html=>{document.open();document.write(html);document.close();})
 .catch(()=>{document.getElementById('load-error').hidden=false;});
})();
