/* ═══════════════════════════
   OPEN / CLOSE
═══════════════════════════ */
const pathInits = { ahorro:initCC, inversion:initTC, deudas:initDC, presupuesto:initBS };

function openPathGame(id) {
  document.getElementById('go-'+id).classList.add('open');
  document.body.style.overflow = 'hidden';
  pathInits[id]?.();
}
function closePathGame(id) {
  document.getElementById('go-'+id).classList.remove('open');
  document.body.style.overflow = '';
  clearInterval(tcTimerInt);
  if(cm.rafId){ cancelAnimationFrame(cm.rafId); cm.rafId=null; }
  if(cm._cdInterval){ clearInterval(cm._cdInterval); cm._cdInterval=null; }
  cmSave();
  if(dc.rafId){ cancelAnimationFrame(dc.rafId); dc.rafId=null; }
  if(dc.timerInt){ clearInterval(dc.timerInt); dc.timerInt=null; }

  const pending = localStorage.getItem('pm_pending');
  if (!pending) return;

  // Determinar si el jugador ganó según el juego activo
  const won = (id === 'deudas'     && dc.state === 'won')
           || (id === 'ahorro'      && !!cm._won)
           || (id === 'inversion'   && !!tcState._won)
           || (id === 'presupuesto' && !!bsState._won);

  localStorage.removeItem('pm_pending');

  if (won) {
    const { nodeId, pathId } = JSON.parse(pending);
    pmCompleteNode(nodeId, pathId);
    pmAwardCoins(5, pathId);
    pmGainLife(pathId);
    pmCheckBadges(pathId);
    showAchievement('🏆', '¡Nivel superado!', 'Sigue así', 150);
    openPath(pathId);
  } else {
    // Salió sin ganar: volver al mapa sin marcar nodo
    const { pathId } = JSON.parse(pending);
    openPath(pathId);
  }
}
/* ═══════════════════════════
   SCORE POP HELPER
═══════════════════════════ */
function spawnScorePop(parent,txt,x,y){
  const el=document.createElement('div');
  el.className='score-pop';el.textContent=txt;
  el.style.left=x+'px';el.style.top=y+'px';
  parent.appendChild(el);setTimeout(()=>el.remove(),1050);
}

/* ═══════════════════════════
   RIVE EMOJIS en resultados
   Patrón caching: loadRiveFile() + setupRiveInstance()
   rive.app/community/files/24644-46045-rive-s-animated-emojis
═══════════════════════════ */
const RIVE_SRC='https://public.rive.app/community/runtime-files/24644-46045-rive-s-animated-emojis.riv';
let riveFileCache=null;
const riveInstances={};

function loadRiveFile(src,onSuccess,onError){
  try{
    const RC=(typeof RiveFile!=='undefined')?RiveFile:(typeof rive!=='undefined'&&rive.RiveFile)?rive.RiveFile:null;
    if(!RC){onError('not loaded');return;}
    const f=new RC({src,onLoad:()=>onSuccess(f),onLoadError:onError});
    f.init().catch(onError);
  }catch(e){onError(e);}
}

function setupRiveInstance(file,canvasId,component){
  const canvas=document.getElementById(canvasId);
  if(!canvas)return;
  try{
    const RC=(typeof Rive!=='undefined')?Rive:rive.Rive;
    const LC=(typeof Layout!=='undefined')?Layout:rive.Layout;
    const FC=(typeof Fit!=='undefined')?Fit:rive.Fit;
    const inst=new RC({
      riveFile:file,useOffscreenRenderer:true,
      stateMachines:'controller',canvas,artboard:component,
      layout:new LC({fit:FC.Contain}),autoplay:true,
      onLoad:()=>inst.resizeDrawingSurfaceToCanvas()
    });
    riveInstances[canvasId]=inst;
  }catch(e){}
}

function showRiveEmoji(canvasId,component){
  const canvas=document.getElementById(canvasId);
  if(!canvas) return;
  const icon=canvas.nextElementSibling;
  const fallbacks={Tada:'🎉',Mindblown:'😵',Onfire:'🔥',Bullseye:'🎯'};
  const showFallback=()=>{
    canvas.classList.remove('show');
    if(icon){
      icon.textContent=fallbacks[component]||'✨';
      icon.style.display='';
      icon.classList.add('bounce');
    }
  };
  canvas.classList.add('show');
  if(icon) icon.style.display='none';
  if(riveFileCache){
    setupRiveInstance(riveFileCache,canvasId,component);
  } else {
    loadRiveFile(RIVE_SRC,(file)=>{
      riveFileCache=file;
      setupRiveInstance(file,canvasId,component);
    }, showFallback);
  }
}

window.addEventListener('resize',()=>{
  Object.values(riveInstances).forEach(i=>{try{i.resizeDrawingSurfaceToCanvas();}catch(e){}});
});
/* ════════════════════════════════
   XP BAR on scroll
════════════════════════════════ */
window.addEventListener('scroll',()=>{
  const pct = window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
  document.getElementById('xpFill').style.width = pct+'%';
});

/* ════════════════════════════════
   REVEAL on scroll
════════════════════════════════ */
const revObs = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{ if(e.isIntersecting) setTimeout(()=>e.target.classList.add('in'),i*80); });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>{
  revObs.observe(el);
  // Revelar de inmediato lo que ya está en pantalla
  const r=el.getBoundingClientRect();
  if(r.top<window.innerHeight && r.bottom>0) el.classList.add('in');
});

/* ════════════════════════════════
   COUNT UP
════════════════════════════════ */
const cntObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target, to=parseInt(el.dataset.to), dur=1200;
    let start=null;
    function step(ts){
      if(!start) start=ts;
      const prog=Math.min((ts-start)/dur,1);
      el.textContent=Math.floor(prog*to).toLocaleString('es-CL');
      if(prog<1) requestAnimationFrame(step); else el.textContent=to.toLocaleString('es-CL');
    }
    requestAnimationFrame(step);
    cntObs.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('.count').forEach(el=>cntObs.observe(el));
/* ════════════════════════════════
   COIN PARTICLES
════════════════════════════════ */
function coins(e){
  const emojis=['🪙','💰','⭐','✨','💛','🤑'];
  for(let i=0;i<12;i++){
    setTimeout(()=>{
      const p=document.createElement('div');
      p.className='particle';
      p.textContent=emojis[Math.floor(Math.random()*emojis.length)];
      p.style.left=(e.clientX+Math.random()*80-40)+'px';
      p.style.top =(e.clientY+Math.random()*40-20)+'px';
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),1100);
    },i*45);
  }
}
