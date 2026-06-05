/* ═══════════════════════════
   📊 BUDGET SWIPE mejorado
═══════════════════════════ */
const BS_EXPENSES=[
  {icon:'🏠',name:'Arriendo',amt:350000,ans:'needs',hint:'El arriendo es una necesidad básica del hogar'},
  {icon:'🎬',name:'Netflix',amt:10990,ans:'wants',hint:'Los servicios de streaming son gustos'},
  {icon:'💡',name:'Cuenta de Luz',amt:45000,ans:'needs',hint:'Los servicios básicos son necesidades'},
  {icon:'🍔',name:'McDonalds',amt:12000,ans:'wants',hint:'Comer afuera frecuente es un gusto'},
  {icon:'🏦',name:'APV mensual',amt:50000,ans:'savings',hint:'El APV es ahorro con beneficios tributarios'},
  {icon:'☕',name:'Starbucks diario',amt:25000,ans:'wants',hint:'El café premium frecuente es un gusto costoso'},
  {icon:'💊',name:'Medicamentos',amt:30000,ans:'needs',hint:'La salud es siempre una necesidad prioritaria'},
  {icon:'🚌',name:'Tarjeta Bip!',amt:20000,ans:'needs',hint:'El transporte para trabajar es necesidad'},
  {icon:'👟',name:'Zapatillas Nike',amt:120000,ans:'wants',hint:'La ropa de lujo es un gusto'},
  {icon:'📱',name:'Plan celular',amt:15000,ans:'needs',hint:'Un plan básico de celular es necesario hoy'},
  {icon:'🏦',name:'Fondo Mutuo',amt:80000,ans:'savings',hint:'Los fondos mutuos son ahorro e inversión'},
  {icon:'🎵',name:'Spotify',amt:4990,ans:'wants',hint:'Los servicios de música son gustos'},
  {icon:'🦷',name:'Dentista',amt:60000,ans:'needs',hint:'La salud preventiva es una necesidad'},
  {icon:'🍕',name:'Rappi/PedidosYa',amt:45000,ans:'wants',hint:'Los pedidos a domicilio frecuentes son gustos'},
  {icon:'📚',name:'Curso online',amt:35000,ans:'savings',hint:'La educación es inversión en tu futuro'},
];
let bsState={};
const bsZoneCounts={needs:0,wants:0,savings:0};

function initBS(){
  document.getElementById('bs-result').classList.remove('show');
  clearInterval(bsState.timerInt);
  let timerSec=12;
  try {
    const _pend = localStorage.getItem('pm_pending');
    if (_pend) {
      const { targetLevel } = JSON.parse(_pend);
      if (targetLevel === 2) timerSec=10;
      else if (targetLevel === 3) timerSec=8;
      else if (targetLevel === 4) timerSec=6;
    }
  } catch(e) {}
  // Power-up pending: segundos extra comprados en la tienda
  const bsPuFreeze = parseInt(localStorage.getItem('pm_pu_bs_freeze') || '0');
  if (bsPuFreeze) { timerSec += bsPuFreeze; localStorage.removeItem('pm_pu_bs_freeze'); }
  bsState={queue:[...BS_EXPENSES].sort(()=>Math.random()-.5),idx:0,score:0,streak:0,maxStreak:0,timerSec,timerInt:null,_won:false};
  bsZoneCounts.needs=0;bsZoneCounts.wants=0;bsZoneCounts.savings=0;
  ['needs','wants','savings'].forEach(k=>{
    const el=document.getElementById('bsc-'+k);
    if(el){el.textContent='0';el.classList.remove('show');}
  });
  document.getElementById('bs-score').textContent='0';
  document.getElementById('bs-streak').textContent='0';
  document.getElementById('bs-left').textContent=BS_EXPENSES.length;
  document.getElementById('bs-prog').style.width='100%';
  document.getElementById('bs-timer-fill').style.width='100%';
  document.getElementById('bs-timer-fill').style.background='var(--green)';
  bsShowCard();
  bsInitDrag();
  bsStartTimer();
}

function bsStartTimer(){
  clearInterval(bsState.timerInt);
  bsState.timerSec=12;
  const fill=document.getElementById('bs-timer-fill');
  fill.style.width='100%';fill.style.background='var(--green)';
  bsState.timerInt=setInterval(()=>{
    bsState.timerSec-=0.1;
    const pct=Math.max(0,(bsState.timerSec/12)*100);
    fill.style.width=pct+'%';
    if(pct<35) fill.style.background='var(--red)';
    else if(pct<60) fill.style.background='var(--orange)';
    if(bsState.timerSec<=0){
      clearInterval(bsState.timerInt);
      // Time out = cuenta como error
      bsState.streak=0;
      document.getElementById('bs-streak').textContent='0';
      spawnScorePop(document.getElementById('go-presupuesto'),'⏱️ ¡Tiempo!',window.innerWidth/2,200);
      bsState.idx++;
      setTimeout(()=>{bsShowCard();bsStartTimer();},400);
    }
  },100);
}

function bsShowCard(){
  if(bsState.idx>=bsState.queue.length){bsEndGame();return;}
  const e=bsState.queue[bsState.idx];
  document.getElementById('bs-icon').textContent=e.icon;
  document.getElementById('bs-name').textContent=e.name;
  document.getElementById('bs-amt').textContent='$'+e.amt.toLocaleString('es-CL')+'/mes';
  document.getElementById('bs-hint').textContent=e.hint;
  document.getElementById('bs-counter').textContent=(bsState.idx+1)+'/'+bsState.queue.length;
  document.getElementById('bs-left').textContent=bsState.queue.length-bsState.idx;
  document.getElementById('bs-prog').style.width=((bsState.queue.length-bsState.idx)/bsState.queue.length*100)+'%';
  // Indicadores de dirección según respuesta correcta
  const dirMap={needs:['bsd-left','🏠 Necesidad'],wants:['bsd-up','🎮 Gusto'],savings:['bsd-right','🏦 Ahorro']};
  ['bsd-left','bsd-right','bsd-up'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.style.opacity='0';
  });
  const card=document.getElementById('bsCard');
  card.style.transition='none';card.style.left='50%';card.style.top='50%';
  card.style.transform='translate(-50%,-50%) rotate(0deg)';card.style.opacity='1';
}

function bsSwipe(cat){
  const e=bsState.queue[bsState.idx];if(!e)return;
  clearInterval(bsState.timerInt);
  const ok=e.ans===cat;
  const card=document.getElementById('bsCard');

  if(ok){
    bsState.score+=100+bsState.streak*15;
    bsState.streak++;
    bsState.maxStreak=Math.max(bsState.maxStreak,bsState.streak);
    bsZoneCounts[cat]++;
    const cnt=document.getElementById('bsc-'+cat);
    if(cnt){cnt.textContent=bsZoneCounts[cat];cnt.classList.add('show');}
    spawnScorePop(document.getElementById('go-presupuesto'),'✅ +'+(100+bsState.streak*15),window.innerWidth/2,window.innerHeight/2-80);
    card.style.background='rgba(46,204,113,.15)';
    card.style.borderColor='rgba(46,204,113,.4)';
    if(bsState.streak>=3) spawnScorePop(document.getElementById('go-presupuesto'),'🔥 Racha x'+bsState.streak+'!',window.innerWidth/2,window.innerHeight/2-120);
  } else {
    bsState.streak=0;
    spawnScorePop(document.getElementById('go-presupuesto'),'❌ '+({'needs':'🏠','wants':'🎮','savings':'🏦'}[e.ans]||'?'),window.innerWidth/2,window.innerHeight/2-80);
    card.style.background='rgba(231,76,60,.12)';
    card.style.borderColor='rgba(231,76,60,.35)';
  }

  document.getElementById('bs-score').textContent=bsState.score.toLocaleString('es-CL');
  document.getElementById('bs-streak').textContent=bsState.streak;

  const dx=cat==='needs'?-240:cat==='savings'?240:0;
  const dy=cat==='wants'?-240:0;
  card.style.transition='all .28s ease';
  card.style.transform=`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) rotate(${dx/10}deg)`;
  card.style.opacity='0';

  const zMap={needs:'bsz-needs',wants:'bsz-wants',savings:'bsz-savings'};
  const z=document.getElementById(zMap[cat]);
  if(z){z.classList.add('hl');setTimeout(()=>z.classList.remove('hl'),450);}

  setTimeout(()=>{bsState.idx++;bsShowCard();bsStartTimer();},320);
}

function bsEndGame(){
  clearInterval(bsState.timerInt);
  const total=bsState.queue.length;
  const correct=Object.values(bsZoneCounts).reduce((a,b)=>a+b,0);
  const pct=Math.round(correct/total*100);
  if(pct>=70) bsState._won=true;
  document.getElementById('bs-res-icon').textContent=pct>=80?'🏆':pct>=55?'📊':'📚';
  document.getElementById('bs-res-title').textContent=pct>=80?'¡Maestro del presupuesto!':pct>=55?'¡Buen intento!':'¡Sigue practicando!';
  document.getElementById('bs-res-sub').textContent=correct+'/'+total+' correctos · '+pct+'% · '+bsState.score.toLocaleString('es-CL')+' pts · Racha máx: '+bsState.maxStreak;
  document.getElementById('bs-result').classList.add('show');
  showRiveEmoji('bs-rive', pct>=70?'Tada':'Mindblown');
  if(pct>=70) coins({clientX:window.innerWidth/2,clientY:window.innerHeight/3});
}

function bsInitDrag(){
  const card=document.getElementById('bsCard');
  let drag=false,sx,sy,cx,cy;
  const pos=e=>e.touches?{x:e.touches[0].clientX,y:e.touches[0].clientY}:{x:e.clientX,y:e.clientY};
  card.onmousedown=card.ontouchstart=e=>{
    drag=true;const p=pos(e),rect=card.getBoundingClientRect();
    sx=p.x;sy=p.y;cx=rect.left+rect.width/2;cy=rect.top+rect.height/2;
    card.style.transition='none';e.preventDefault();
  };
  const move=e=>{
    if(!drag)return;const p=pos(e);
    const dx=p.x-sx,dy=p.y-sy;
    card.style.left=(cx+dx)+'px';card.style.top=(cy+dy)+'px';
    card.style.transform=`translate(-50%,-50%) rotate(${dx/16}deg)`;
    // Mostrar indicadores de dirección
    ['bsd-left','bsd-right','bsd-up'].forEach(id=>{
      const el=document.getElementById(id);
      if(!el) return;
      if((id==='bsd-left'&&dx<-40)||(id==='bsd-right'&&dx>40)||(id==='bsd-up'&&dy<-40))
        el.style.opacity='1';
      else el.style.opacity='0';
    });
    ['bsz-needs','bsz-wants','bsz-savings'].forEach(id=>{
      const z=document.getElementById(id),r=z.getBoundingClientRect();
      z.classList.toggle('hl',p.x>r.left&&p.x<r.right&&p.y>r.top&&p.y<r.bottom);
    });
    e.preventDefault();
  };
  const up=e=>{
    if(!drag)return;drag=false;
    ['bsd-left','bsd-right','bsd-up'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.opacity='0';});
    const p=e.changedTouches?{x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}:{x:e.clientX,y:e.clientY};
    let dropped=false;
    [['bsz-needs','needs'],['bsz-wants','wants'],['bsz-savings','savings']].forEach(([id,cat])=>{
      const z=document.getElementById(id),r=z.getBoundingClientRect();
      z.classList.remove('hl');
      if(p.x>r.left&&p.x<r.right&&p.y>r.top&&p.y<r.bottom){bsSwipe(cat);dropped=true;}
    });
    if(!dropped){
      card.style.transition='all .3s cubic-bezier(.34,1.56,.64,1)';
      card.style.left='50%';card.style.top='50%';
      card.style.transform='translate(-50%,-50%) rotate(0deg)';
      card.style.background='';card.style.borderColor='';
    }
  };
  document.addEventListener('mousemove',move);
  document.addEventListener('touchmove',move,{passive:false});
  document.addEventListener('mouseup',up);
  document.addEventListener('touchend',up);
}
