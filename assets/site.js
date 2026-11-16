// Public forms only. No admin endpoints, credentials or client records belong here.
document.querySelectorAll('.mobile-menu-links a').forEach(link=>link.addEventListener('click',()=>link.closest('details').removeAttribute('open')));
const service=document.getElementById('servico');
if(service){const selected=new URLSearchParams(location.search).get('solucao');if([...service.options].some(o=>o.value===selected))service.value=selected;}
document.querySelectorAll('.lead-form').forEach(form=>form.addEventListener('submit',async event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const button=form.querySelector('button[type="submit"]'),success=form.querySelector('.success'),error=form.querySelector('.error');
 const label=button.textContent;button.disabled=true;button.textContent='Enviando…';success.hidden=true;error.hidden=true;
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
 try{const fields=new FormData(form);let body=fields,headers={Accept:'application/json'};
 if(form.dataset.redeIntake==='true'){const data=Object.fromEntries(fields);data.adult_confirmed=fields.get('adult_confirmed')==='on';data.privacy_accepted=fields.get('privacy_accepted')==='on';data.experience=('Canal: '+(data.channel||'Não informado')+'\n'+(data.experience||'')).slice(0,2000);body=JSON.stringify(data);headers['Content-Type']='application/json';}
 const response=await fetch(form.action,{method:'POST',body,headers,signal:controller.signal});const result=await response.json();if(!response.ok||result.success!==true)throw new Error('Envio não confirmado');success.hidden=false;form.reset();success.scrollIntoView({behavior:'smooth',block:'center'});}
 catch{error.hidden=false;error.scrollIntoView({behavior:'smooth',block:'center'});}
 finally{clearTimeout(timeout);button.disabled=false;button.textContent=label;}
}));
