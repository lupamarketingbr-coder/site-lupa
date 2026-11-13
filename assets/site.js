// Public forms only. No admin endpoints, credentials or client records belong here.
document.querySelectorAll('.mobile-menu-links a').forEach(link=>link.addEventListener('click',()=>link.closest('details').removeAttribute('open')));
const service=document.getElementById('servico');
if(service){const selected=new URLSearchParams(location.search).get('solucao');if([...service.options].some(o=>o.value===selected))service.value=selected;}
document.querySelectorAll('.lead-form').forEach(form=>form.addEventListener('submit',async event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const button=form.querySelector('button[type="submit"]'),success=form.querySelector('.success'),error=form.querySelector('.error');
 const label=button.textContent;button.disabled=true;button.textContent='Enviando…';success.hidden=true;error.hidden=true;
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
 try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});const result=await response.json();if(!response.ok||result.success!==true)throw new Error('Envio não confirmado');success.hidden=false;form.reset();success.scrollIntoView({behavior:'smooth',block:'center'});}
 catch{error.hidden=false;error.scrollIntoView({behavior:'smooth',block:'center'});}
 finally{clearTimeout(timeout);button.disabled=false;button.textContent=label;}
}));
