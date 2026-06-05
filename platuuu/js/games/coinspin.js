/* ════════════════════════════════════════════════════
   🎰 COINSPÍN — Coin Master estilo finanzas chilenas
   Java port: CoinMasterClone.java → girarRuleta /
   aplicarPremio + alcancía + lecciones CMF
════════════════════════════════════════════════════ */
const CM_SYM=[
  {id:'ingreso',icon:'💰',label:'INGRESO',prob:50,color:'#F5B800',bg:'rgba(245,184,0,.2)'},
  {id:'gasto',  icon:'💸',label:'GASTO',  prob:20,color:'#E74C3C',bg:'rgba(231,76,60,.2)'},
  {id:'ahorro', icon:'🛡️',label:'AHORRO', prob:15,color:'#2ECC71',bg:'rgba(46,204,113,.2)'},
  {id:'bono',   icon:'⭐',label:'BONO',   prob:15,color:'#7C6FFF',bg:'rgba(124,111,255,.2)'},
];
const CM_ALCANCIA=[
  {icon:'🐷',name:'Alcancía Básica',nextCost:500,   mult:1.0,spins:5},
  {icon:'🏦',name:'Cuenta Vista',   nextCost:1500,  mult:1.5,spins:8},
  {icon:'📈',name:'Fondo Mutuo',    nextCost:4000,  mult:2.5,spins:12},
  {icon:'🏠',name:'Inversión Real', nextCost:null,  mult:4.0,spins:15},
];
const CM_INGRESOS=['Sueldo mensual','Pago freelance','Venta marketplace','Gratificación','Devolución impuestos','Aguinaldo'];
const CM_GASTOS  =['SOAP vehículo','Revisión técnica','Factura de luz','Cuota inesperada','Multa de tránsito','Deducible seguro'];
const CM_AHORROS =['Depósito APV','Fondo de emergencia','Cuenta 2 AFP','Ahorro CAV'];
const CM_LESSONS=[
  null,
  {q:'¿Qué ventaja tiene la Cuenta Vista sobre guardar efectivo en casa?',
   opts:['Ninguna diferencia','Protege tu dinero, permite pagos y puede dar interés','Es más difícil de usar'],ans:1,
   ok:'✅ ¡Correcto! La Cuenta Vista asegura tu plata, permite pagos digitales y algunos bancos la remuneran.',
   fail:'❌ La Cuenta Vista protege del robo, digitaliza tu dinero y en algunos bancos genera pequeños intereses.'},
  {q:'¿Qué característica principal define a un Fondo Mutuo en Chile?',
   opts:['Rentabilidad fija garantizada','Invierte en activos diversificados — más riesgo, más retorno potencial','Solo para empresas'],ans:1,
   ok:'✅ ¡Exacto! Los Fondos Mutuos invierten en acciones, bonos y activos regulados por la CMF.',
   fail:'❌ Un Fondo Mutuo NO garantiza rentabilidad. Invierte en portafolios diversificados con riesgo regulado.'},
  {q:'¿Por qué comprar una propiedad en Chile se considera una inversión?',
   opts:['Porque siempre baja de precio','Genera arriendo (renta) y puede valorizarse con los años','El banco garantiza la ganancia'],ans:1,
   ok:'✅ ¡Correcto! Una propiedad genera dos retornos: arriendo mensual y aumento de valor en el tiempo (plusvalía).',
   fail:'❌ La propiedad genera renta (arriendo) y plusvalía (aumento de valor). Sin garantías, pero históricamente sube.'},
];
let cm={};

/* ════════════════════════════════════════════════════
   📚 CAMINO AHORRO — lecciones, persistencia, cooldown
════════════════════════════════════════════════════ */
const CM_PATH_LESSONS=[
  {title:'¿Qué es el ahorro?',
   q:'¿Cuál es el primer paso para empezar a ahorrar?',
   opts:['Abrir una cuenta de inversión','Registrar todos tus gastos','Pedir un crédito'],ans:1,
   ok:'✅ ¡Correcto! No puedes ahorrar lo que no conoces. Registrar gastos es el paso 1 (CMF Educa).',
   fail:'❌ El primer paso es registrar tus gastos. No puedes ahorrar lo que no ves.',xp:200},
  {title:'Regla 50/30/20',
   q:'Si ganas $600.000, ¿cuánto destinar al ahorro?',
   opts:['$60.000','$120.000','$180.000'],ans:1,
   ok:'✅ ¡Exacto! 20% de $600.000 = $120.000. Regla: 50% necesidades, 30% gustos, 20% ahorro.',
   fail:'❌ El 20% de $600.000 son $120.000. La regla 50/30/20 destina ese porcentaje al ahorro.',xp:300},
  {title:'¿Qué es el APV?',
   q:'¿Qué beneficio tiene el APV en Chile?',
   opts:['Te presta dinero el Estado','Descuenta impuestos y ahorra para jubilación','Es un seguro de cesantía'],ans:1,
   ok:'✅ ¡Correcto! El APV permite ahorrar para la jubilación con descuentos tributarios de hasta 15%.',
   fail:'❌ El APV reduce tus impuestos y acumula para jubilarte mejor. No es préstamo ni seguro.',xp:400},
  {title:'Fondo de emergencia',
   q:'¿Cuántos meses de gastos debe tener tu fondo de emergencia?',
   opts:['1 mes','3 a 6 meses','12 meses'],ans:1,
   ok:'✅ ¡Perfecto! La CMF recomienda entre 3 y 6 meses de gastos en un lugar de fácil acceso.',
   fail:'❌ La CMF recomienda entre 3 y 6 meses de gastos en un lugar de fácil acceso.',xp:500},
];
const CM_PASSIVE=[0,100,250,500]; // retorno pasivo por nivel de alcancía al iniciar sesión
const CM_COOLDOWN_MS=10*3600*1000; // 10 horas entre tandas de giros
const CM_STORE='cm_progress';

/* ── Persistencia localStorage ── */
function cmSave(){
  if(!cm.canvas) return;
  try{
    localStorage.setItem(CM_STORE,JSON.stringify({
      alcLevel:cm.alcLevel||0, xp:cm.xp||0, coins:cm.coins||0,
      shield:cm.shield||0, spinSessions:cm.spinSessions||0,
      lessonIndex:cm.lessonIndex||0,
      spinsEmptyAt:cm.spinsEmptyAt||null,
      lastSession:Date.now(),
    }));
  }catch(e){}
}
function cmLoad(){
  try{ const s=localStorage.getItem(CM_STORE); return s?JSON.parse(s):null; }
  catch(e){ return null; }
}

/* ── Retorno pasivo por nivel alcancía ── */
function cmPassiveIncome(){
  const al=cm.alcLevel||0;
  const income=CM_PASSIVE[Math.min(al,CM_PASSIVE.length-1)];
  if(!income) return;
  cm.coins+=income;
  const alc=CM_ALCANCIA[Math.min(al,CM_ALCANCIA.length-1)];
  spawnScorePop(document.getElementById('go-ahorro'),
    alc.icon+' +$'+income.toLocaleString('es-CL')+' de '+alc.name,
    window.innerWidth/2,110);
  cmSound('match');
  setTimeout(()=>{cmUpdateHUD();cmDraw();},200);
}

/* ── Decisión post-giros-agotados ── */
function cmPathCheck(){
  cm.spinSessions=(cm.spinSessions||0)+1;
  cmSave();
  const s=cm.spinSessions, li=cm.lessonIndex||0;
  // ¿Completado?
  if(s>=12 && li>=CM_PATH_LESSONS.length){ setTimeout(cmShowCompletion,320); return; }
  // ¿Trigger de lección? (cada 3 sesiones)
  if(s%3===0 && li<CM_PATH_LESSONS.length){ setTimeout(()=>cmShowPathLesson(li),320); return; }
  // Regular: cooldown
  cm.spinsEmptyAt=Date.now();
  cmSave();
  setTimeout(cmShowCooldown,320);
}

/* ── Lección de camino ── */
function cmShowPathLesson(idx){
  const lesson=CM_PATH_LESSONS[idx];
  if(!lesson) return;
  document.getElementById('cm-res-icon').textContent='📚';
  document.getElementById('cm-res-title').textContent=lesson.title;
  document.getElementById('cm-res-sub').textContent='Lección '+(idx+1)+'/4 · Camino Ahorro';
  const lesEl=document.getElementById('cm-lesson');
  lesEl.style.display='block';
  document.getElementById('cm-lesson-q').textContent=lesson.q;
  document.getElementById('cm-lesson-fb').style.display='none';
  document.getElementById('cm-lesson-fb').className='dc-lesson-fb';
  const opts=document.getElementById('cm-lesson-opts'); opts.innerHTML='';
  lesson.opts.forEach((o,i)=>{
    const btn=document.createElement('button'); btn.className='dc-lesson-opt';
    btn.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+i)}</span>${o}`;
    btn.onclick=()=>cmAnswerPathLesson(i,lesson,idx);
    opts.appendChild(btn);
  });
  const mb=document.getElementById('cm-main-btn');
  mb.textContent='Continuar →'; mb.style.display='none';
  mb.onclick=()=>cmContinueAfterLesson(idx);
  document.getElementById('cm-result').classList.add('show');
}

function cmAnswerPathLesson(i,lesson,idx){
  document.querySelectorAll('#cm-lesson-opts .dc-lesson-opt').forEach(b=>b.disabled=true);
  const btns=document.querySelectorAll('#cm-lesson-opts .dc-lesson-opt');
  const fb=document.getElementById('cm-lesson-fb');
  if(i===lesson.ans){
    if(btns[i])btns[i].classList.add('correct');
    fb.textContent=lesson.ok; fb.className='dc-lesson-fb ok'; fb.style.display='block';
    cm.coins+=(lesson.xp||200); // recompensa en monedas (no XP de alcancía)
    cmUpdateHUD();
    document.getElementById('cm-main-btn').style.display='block';
    cmSound('upgrade');
    if(typeof coins==='function') coins({clientX:window.innerWidth/2,clientY:window.innerHeight/3});
  } else {
    if(btns[i])btns[i].classList.add('wrong');
    if(btns[lesson.ans])btns[lesson.ans].classList.add('correct');
    fb.innerHTML=lesson.fail+`<br><button class="dc-lesson-opt" style="margin-top:8px;width:100%;justify-content:center;" onclick="cmShowPathLesson(${idx})">🔄 Reintentar</button>`;
    fb.className='dc-lesson-fb bad'; fb.style.display='block';
  }
}

function cmContinueAfterLesson(idx){
  cm.lessonIndex=(cm.lessonIndex||0)+1;
  // ¿Camino completo tras esta lección?
  if(cm.lessonIndex>=CM_PATH_LESSONS.length && (cm.spinSessions||0)>=12){
    cmShowCompletion(); return;
  }
  // Lección correcta → iniciar cooldown (vuelve mañana con giros nuevos)
  cm.spinsEmptyAt=Date.now();
  cmSave();
  document.getElementById('cm-result').classList.remove('show');
  setTimeout(cmShowCooldown, 200);
}

/* ── Cooldown 10h — sin bypass, solo Cerrar ── */
function cmShowCooldown(){
  if(cm._cdInterval){clearInterval(cm._cdInterval);cm._cdInterval=null;}
  const alcCfg=CM_ALCANCIA[Math.min(cm.alcLevel||0,CM_ALCANCIA.length-1)];
  const fc=v=>v>=1000?'$'+Math.round(v/1000)+'K':'$'+(v||0).toLocaleString('es-CL');

  document.getElementById('cm-res-icon').textContent='🌙';
  document.getElementById('cm-res-title').textContent='Vuelve mañana';
  const sub=document.getElementById('cm-res-sub');
  document.getElementById('cm-lesson').style.display='none';
  // Ocultar botón principal (sin bypass)
  const mb=document.getElementById('cm-main-btn');
  mb.style.display='none';

  const tick=()=>{
    const empty=cm.spinsEmptyAt||Date.now();
    const rem=Math.max(0,CM_COOLDOWN_MS-(Date.now()-empty));
    if(rem<=0){
      // Cooldown expiró: dar giros completos del nivel y cerrar overlay
      clearInterval(cm._cdInterval); cm._cdInterval=null;
      cm.spins=alcCfg.spins; cm.spinsEmptyAt=null;
      document.getElementById('cm-result').classList.remove('show');
      cmSave(); cmUpdateHUD(); cmDraw(); return;
    }
    const hh=Math.floor(rem/3600000);
    const mm=Math.floor((rem%3600000)/60000);
    const ss=Math.floor((rem%60000)/1000);
    sub.innerHTML=
      `🕐 Giros listos en <strong>${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}</strong><br>`+
      `<span style="font-size:12px;opacity:.5;">${alcCfg.icon} ${alcCfg.name} · ${fc(cm.coins||0)} acumulados</span>`;
  };
  tick();
  cm._cdInterval=setInterval(tick,1000);
  document.getElementById('cm-result').classList.add('show');
}

/* ── Pantalla de completación del camino ── */
function cmShowCompletion(){
  if(cm._cdInterval){clearInterval(cm._cdInterval);cm._cdInterval=null;}
  cm._won = true;
  document.getElementById('cm-res-icon').textContent='🏆';
  document.getElementById('cm-res-title').textContent='¡Camino Ahorro completado!';
  document.getElementById('cm-res-sub').textContent=
    '4 lecciones completadas · $'+cm.coins.toLocaleString('es-CL')+' acumulados';
  document.getElementById('cm-lesson').style.display='none';
  const mb=document.getElementById('cm-main-btn');
  mb.textContent='🎓 Ver mi certificado'; mb.style.display='block';
  mb.onclick=()=>{
    // Reset path (conserva alcancía y monedas como trofeo)
    cm.spinSessions=0; cm.lessonIndex=0; cm.spins=CM_ALCANCIA[Math.min(cm.alcLevel||0,3)].spins;
    cm.spinsEmptyAt=null;
    cmSave();
    document.getElementById('cm-result').classList.remove('show');
    cmUpdateHUD(); cmDraw();
  };
  if(typeof coins==='function') coins({clientX:window.innerWidth/2,clientY:window.innerHeight/3});
  cmSound('win');
  document.getElementById('cm-result').classList.add('show');
}

/* Java: girarRuleta() — weighted random */
function cmSpinOne(){
  let r=Math.random()*100;
  for(let i=0;i<CM_SYM.length;i++){r-=CM_SYM[i].prob;if(r<=0)return i;}
  return 0;
}

function cmSound(kind){
  try{
    if(!window._cmAC) window._cmAC=new(window.AudioContext||window.webkitAudioContext)();
    const ac=window._cmAC;if(ac.state==='suspended')ac.resume();
    const t=ac.currentTime;
    const tone=(f,dur,vol=.07,type='sine')=>{
      const o=ac.createOscillator(),g=ac.createGain();
      o.type=type;o.frequency.value=f;
      g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
      o.connect(g);g.connect(ac.destination);o.start(t);o.stop(t+dur);
    };
    if(kind==='spin')    for(let i=0;i<6;i++)setTimeout(()=>tone(150+Math.random()*350,.06,.04),i*60);
    else if(kind==='land')   tone(440,.1,.07);
    else if(kind==='match')  {tone(523,.07,.09);setTimeout(()=>tone(659,.09,.08),80);}
    else if(kind==='win')    [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.18,.1),i*90));
    else if(kind==='bad')    tone(160,.22,.07,'square');
    else if(kind==='shield') tone(660,.12,.08);
    else if(kind==='bono')   {tone(784,.1,.08);setTimeout(()=>tone(988,.1,.08),120);}
    else if(kind==='upgrade')[523,659,784,880,1047].forEach((f,i)=>setTimeout(()=>tone(f,.22,.09,'triangle'),i*110));
  }catch(e){}
}

function initCC(){
  if(cm.rafId){cancelAnimationFrame(cm.rafId);cm.rafId=null;}
  if(cm._cdInterval){clearInterval(cm._cdInterval);cm._cdInterval=null;}
  document.getElementById('cm-result').classList.remove('show');
  document.getElementById('cm-upgrade-wrap').style.display='none';

  // Cargar progreso persistido
  const saved=cmLoad();
  const alcLevel=saved?.alcLevel||0;
  const alcCfg=CM_ALCANCIA[Math.min(alcLevel,CM_ALCANCIA.length-1)];
  const now=Date.now();
  const spinsEmptyAt=saved?.spinsEmptyAt||null;
  const cdRemaining=spinsEmptyAt?Math.max(0,CM_COOLDOWN_MS-(now-spinsEmptyAt)):0;

  const vw=window.innerWidth;
  const w=Math.min(vw>768?400:vw-28,390);
  const canvas=document.getElementById('cmCanvas');
  canvas.width=w;canvas.height=w;
  canvas.style.width=w+'px';canvas.style.height=w+'px';

  cm={
    canvas,ctx:canvas.getContext('2d'),W:w,
    alcLevel,
    coins:saved?.coins||0,
    spins:cdRemaining>0?0:alcCfg.spins,
    shield:saved?.shield||0,
    xp:saved?.xp||0,
    spinSessions:saved?.spinSessions||0,
    lessonIndex:saved?.lessonIndex||0,
    spinsEmptyAt:cdRemaining>0?spinsEmptyAt:null,
    _cdInterval:null,
    reelSym:[0,1,2],
    reelLanded:[false,false,false],
    spinning:false,
    spinResult:null,
    spinStart:0,
    _lastChange:[0,0,0],
    lastResult:null,
    showResultUntil:0,
    _upgradeReady:false,
    rafId:null,
    _won:false,
  };

  // Power-up pending: giros extra comprados en la tienda
  const cmPuSpins = parseInt(localStorage.getItem('pm_pu_cm_spins') || '0');
  if (cmPuSpins) { cm.spins += cmPuSpins; localStorage.removeItem('pm_pu_cm_spins'); }

  cmUpdateHUD();

  // Retorno pasivo si es sesión nueva (>1h desde la última)
  const lastSession=saved?.lastSession||0;
  if(now-lastSession>3600000) setTimeout(cmPassiveIncome,700);

  // Mostrar cooldown solo si NO viene del mapa
  const fromMap = !!localStorage.getItem('pm_pending');
  if(cdRemaining>0 && !fromMap){
    setTimeout(cmShowCooldown,500);
  } else if(fromMap && cm.spins===0){
    cm.spins = alcCfg.spins; // dar giros para jugar desde el mapa
  }

  cmDraw();
}

/* Java: aplicarPremio() */
function cmApplyResult(results){
  const alcCfg=CM_ALCANCIA[Math.min(cm.alcLevel||0,CM_ALCANCIA.length-1)];
  const base=50000+Math.floor(Math.random()*150000);
  const prize=Math.round(base*alcCfg.mult);

  const cnt=[0,0,0,0];results.forEach(r=>cnt[r]++);
  const topIdx=cnt.indexOf(Math.max(...cnt));
  const sym=CM_SYM[topIdx];
  const isTriple=cnt[topIdx]===3,isDouble=cnt[topIdx]===2;
  const multi=isTriple?3:isDouble?1.5:1;

  if(sym.id==='ingreso'){
    const amt=Math.round(prize*multi);
    cm.coins+=amt;cm.xp+=amt;
    cm.lastResult={sym,text:CM_INGRESOS[Math.floor(Math.random()*CM_INGRESOS.length)],amount:amt,extra:isTriple?'¡TRIPLE! ×3':isDouble?'¡DOBLE! ×1.5':''};
    cmSound(isTriple?'win':'match');
  } else if(sym.id==='gasto'){
    if(cm.shield>0){
      cm.shield--;
      cm.lastResult={sym:CM_SYM[2],text:'¡Escudo bloqueó el gasto!',amount:0,extra:'🛡️ Protegido'};
      cmSound('shield');
    } else {
      const loss=Math.round(prize*0.4);
      cm.coins=Math.max(0,cm.coins-loss);
      cm.lastResult={sym,text:CM_GASTOS[Math.floor(Math.random()*CM_GASTOS.length)],amount:-loss,extra:''};
      cmSound('bad');
    }
  } else if(sym.id==='ahorro'){
    const gained=isTriple?2:1;
    cm.shield=Math.min(cm.shield+gained,3);
    const bonus=Math.round(prize*0.25);
    cm.coins+=bonus;cm.xp+=bonus;
    cm.lastResult={sym,text:CM_AHORROS[Math.floor(Math.random()*CM_AHORROS.length)],amount:bonus,extra:`🛡️ +${gained} escudo`};
    cmSound('shield');
  } else {
    const extra=isTriple?3:isDouble?2:1;
    cm.spins+=extra;
    cm.lastResult={sym,text:'¡Giro extra!',amount:0,extra:`+${extra} 🎰`};
    cmSound('bono');
  }

  cm.showResultUntil=performance.now()+2400;
  cmUpdateHUD();cmCheckUpgrade();
  cm.rafId=requestAnimationFrame(cmResultLoop);
}

function cmResultLoop(ts){
  cmDraw();
  if(ts<cm.showResultUntil){ cm.rafId=requestAnimationFrame(cmResultLoop); return; }
  cm.lastResult=null; cm.rafId=null;
  // ── Post-result: upgrade listo → auto-mostrar lección ──
  if(cm._upgradeReady){
    cm._upgradeReady=false;
    if(typeof coins==='function') coins({clientX:window.innerWidth/2,clientY:window.innerHeight/3});
    cmSound('upgrade');
    setTimeout(cmUpgrade, 420);
  } else if(cm.spins<=0){
    // ── Sin giros → overlay ──
    setTimeout(cmShowNoSpins, 320);
  } else {
    cmDraw();
  }
}

function cmCheckUpgrade(){
  const al=cm.alcLevel||0;
  if(al>=CM_ALCANCIA.length-1) return;
  const needed=CM_ALCANCIA[al].nextCost;
  const canUp=cm.xp>=needed;
  const wrap=document.getElementById('cm-upgrade-wrap');
  const cost=document.getElementById('cm-upgrade-cost');
  if(wrap) wrap.style.display=canUp?'block':'none';
  if(cost&&canUp) cost.textContent='$'+needed.toLocaleString('es-CL')+' XP';
  // Marcar para auto-trigger después de que termine la animación de resultado
  if(canUp && !cm._upgradeReady) cm._upgradeReady=true;
}

/* ── Sin giros: delega al path manager ── */
function cmShowNoSpins(){ cmPathCheck(); }

function cmUpgrade(){
  const al=cm.alcLevel||0;
  if(al>=CM_ALCANCIA.length-1) return;
  if(cm.xp<CM_ALCANCIA[al].nextCost) return;
  const lesson=CM_LESSONS[al+1];
  if(lesson) cmShowLesson(lesson,al+1); else cmConfirmUpgrade(al+1);
}

function cmShowLesson(lesson,nextLevel){
  const newCfg=CM_ALCANCIA[Math.min(nextLevel,CM_ALCANCIA.length-1)];
  document.getElementById('cm-res-icon').textContent=newCfg.icon;
  document.getElementById('cm-res-title').textContent='¡Subiendo a '+newCfg.name+'!';
  document.getElementById('cm-res-sub').textContent='XP acumulada: $'+cm.xp.toLocaleString('es-CL');
  document.getElementById('cm-lesson').style.display='block';
  document.getElementById('cm-lesson-q').textContent=lesson.q;
  document.getElementById('cm-lesson-fb').style.display='none';
  document.getElementById('cm-lesson-fb').className='dc-lesson-fb';
  const opts=document.getElementById('cm-lesson-opts');opts.innerHTML='';
  lesson.opts.forEach((o,i)=>{
    const btn=document.createElement('button');btn.className='dc-lesson-opt';
    btn.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+i)}</span>${o}`;
    btn.onclick=()=>cmAnswerLesson(i,lesson,nextLevel);opts.appendChild(btn);
  });
  const mb=document.getElementById('cm-main-btn');
  mb.textContent='Confirmar subida →';mb.style.display='none';
  mb.onclick=()=>cmConfirmUpgrade(nextLevel);
  document.getElementById('cm-result').classList.add('show');
}

function cmAnswerLesson(i,lesson,nextLevel){
  document.querySelectorAll('#cm-lesson-opts .dc-lesson-opt').forEach(b=>b.disabled=true);
  const btns=document.querySelectorAll('#cm-lesson-opts .dc-lesson-opt');
  const fb=document.getElementById('cm-lesson-fb');
  if(i===lesson.ans){
    if(btns[i])btns[i].classList.add('correct');
    fb.textContent=lesson.ok;fb.className='dc-lesson-fb ok';fb.style.display='block';
    document.getElementById('cm-main-btn').style.display='block';
    cmSound('upgrade');
  } else {
    if(btns[i])btns[i].classList.add('wrong');
    if(btns[lesson.ans])btns[lesson.ans].classList.add('correct');
    fb.innerHTML=lesson.fail+`<br><button class="dc-lesson-opt" style="margin-top:8px;width:100%;justify-content:center;" onclick="cmRetryLesson(${nextLevel})">🔄 Reintentar</button>`;
    fb.className='dc-lesson-fb bad';fb.style.display='block';
  }
}
function cmRetryLesson(nl){const l=CM_LESSONS[nl];if(l)cmShowLesson(l,nl);}

function cmConfirmUpgrade(nextLevel){
  const needed=CM_ALCANCIA[Math.max(0,nextLevel-1)].nextCost;
  if(!needed) return; // max level
  cm.xp-=needed;cm.alcLevel=nextLevel;
  const newCfg=CM_ALCANCIA[Math.min(nextLevel,CM_ALCANCIA.length-1)];
  cm.spins=Math.max(cm.spins,newCfg.spins);
  if(typeof coins==='function') coins({clientX:window.innerWidth/2,clientY:window.innerHeight/3});
  document.getElementById('cm-result').classList.remove('show');
  document.getElementById('cm-upgrade-wrap').style.display='none';
  cmUpdateHUD();cmDraw();
}

function cmDoSpin(){
  if(cm.spinning||cm.spins<=0||performance.now()<cm.showResultUntil) return;
  cm.lastResult=null;
  cm.spins--;cm.spinning=true;
  cm.spinResult=[cmSpinOne(),cmSpinOne(),cmSpinOne()];
  cm.spinStart=performance.now();
  cm.reelLanded=[false,false,false];
  cm._lastChange=[cm.spinStart,cm.spinStart,cm.spinStart];
  cmUpdateHUD();cmSound('spin');
  if(cm.rafId)cancelAnimationFrame(cm.rafId);
  cm.rafId=requestAnimationFrame(cmLoop);
}

function cmLoop(ts){
  if(!cm.ctx) return;
  const elapsed=ts-cm.spinStart;
  const LAND=[900,1200,1550];
  for(let i=0;i<3;i++){
    if(cm.reelLanded[i]) continue;
    if(elapsed>=LAND[i]){
      cm.reelSym[i]=cm.spinResult[i];cm.reelLanded[i]=true;cmSound('land');
    } else {
      const prog=Math.max(0,(elapsed-200)/(LAND[i]-200));
      const period=40+prog*prog*260;
      if(ts-cm._lastChange[i]>period){cm.reelSym[i]=(cm.reelSym[i]+1)%4;cm._lastChange[i]=ts;}
    }
  }
  cmDraw();
  if(cm.reelLanded.every(v=>v)){
    cm.spinning=false;cm.rafId=null;
    setTimeout(()=>cmApplyResult(cm.spinResult),200); return;
  }
  cm.rafId=requestAnimationFrame(cmLoop);
}

function cmUpdateHUD(){
  const alcCfg=CM_ALCANCIA[Math.min(cm.alcLevel||0,CM_ALCANCIA.length-1)];
  const fc=v=>v>=1000?'$'+Math.round(v/1000)+'K':'$'+(v||0).toLocaleString('es-CL');
  const el=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  el('cm-coins',fc(cm.coins||0));
  el('cm-spins',cm.spins||0);
  el('cm-shield',cm.shield||0);
  const xpPct=alcCfg.nextCost?Math.min(100,(cm.xp||0)/alcCfg.nextCost*100):100;
  const xpEl=document.getElementById('cm-xp');if(xpEl)xpEl.style.width=xpPct+'%';
  const btn=document.getElementById('cm-spin-btn');
  if(btn){
    btn.disabled=!(cm.spins>0)&&!cm.spinning;
    btn.style.opacity=(cm.spins>0)?'1':'.4';
    btn.textContent=cm.spins>0?`🎰 Girar (${cm.spins} giros)`:'Sin giros — sube alcancía';
  }
}

function cmDraw(){
  const{ctx,W}=cm;if(!ctx)return;
  const H=W;
  ctx.clearRect(0,0,W,H);
  // Dark bg
  const gbg=ctx.createLinearGradient(0,0,0,H);
  gbg.addColorStop(0,'#0d0f1a');gbg.addColorStop(1,'#111827');
  ctx.fillStyle=gbg;ctx.fillRect(0,0,W,H);

  /* ── Alcancía (top 27%) ── */
  const alcH=Math.floor(H*0.27);
  const alc=CM_ALCANCIA[Math.min(cm.alcLevel||0,CM_ALCANCIA.length-1)];
  ctx.save();
  ctx.font=`${Math.floor(alcH*0.54)}px serif`;
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.shadowColor=alc.mult>=3?'#FF6B35':alc.mult>=2?'#7C6FFF':'#F5B800';
  ctx.shadowBlur=18;ctx.fillText(alc.icon,W/2,alcH*0.36);ctx.shadowBlur=0;
  ctx.font=`bold ${Math.floor(W*0.046)}px 'Poppins',sans-serif`;
  ctx.fillStyle='white';ctx.textBaseline='alphabetic';
  ctx.fillText(alc.name,W/2,alcH*0.64);ctx.restore();

  // ── Progreso del camino: 4 puntos + sesión actual ──
  const li=cm.lessonIndex||0, ss=cm.spinSessions||0;
  const block=Math.floor(ss/3), blockProg=ss%3;
  if(li<CM_PATH_LESSONS.length){
    // Dots (4 lecciones)
    for(let d=0;d<4;d++){
      const dx=W/2+(d-1.5)*14, dy=alcH*0.735;
      ctx.fillStyle=d<li?'#2ECC71':d===li?'#F5B800':'rgba(255,255,255,.18)';
      ctx.beginPath();ctx.arc(dx,dy,3.5,0,Math.PI*2);ctx.fill();
    }
    // Session label
    ctx.font=`${Math.floor(W*0.027)}px 'JetBrains Mono',monospace`;
    ctx.fillStyle='rgba(255,255,255,.38)';ctx.textAlign='center';ctx.textBaseline='alphabetic';
    ctx.fillText(`Bloque ${Math.min(block+1,4)}/4 · Sesión ${blockProg}/3`,W/2,alcH*0.77);
  } else {
    ctx.font=`${Math.floor(W*0.03)}px serif`;
    ctx.textAlign='center';ctx.textBaseline='alphabetic';
    ctx.fillText('🏆',W/2,alcH*0.73);
    ctx.font=`${Math.floor(W*0.026)}px 'JetBrains Mono',monospace`;
    ctx.fillStyle='#2ECC71';
    ctx.fillText('Camino completado',W/2,alcH*0.77);
  }

  /* ── XP bar mejorada (8px, % visible, texto dinámico) ── */
  const bx=W*0.08,by=alcH*0.78,bw=W*0.84,bh=8;
  // Track bg
  ctx.fillStyle='rgba(255,255,255,.08)';
  ctx.beginPath();if(ctx.roundRect)ctx.roundRect(bx,by,bw,bh,4);else ctx.rect(bx,by,bw,bh);ctx.fill();

  if(alc.nextCost){
    const xpVal=cm.xp||0;
    const pct=Math.min(1,xpVal/alc.nextCost);
    const isReady=pct>=1;

    if(pct>0){
      const fg=ctx.createLinearGradient(bx,0,bx+bw,0);
      if(isReady){
        fg.addColorStop(0,'#2ECC71');fg.addColorStop(1,'#1abc9c');
        ctx.shadowColor='#2ECC71';ctx.shadowBlur=10;
      } else {
        fg.addColorStop(0,'#F5B800');fg.addColorStop(1,'#FF6B35');
      }
      ctx.fillStyle=fg;ctx.beginPath();
      if(ctx.roundRect)ctx.roundRect(bx,by,bw*pct,bh,4);else ctx.rect(bx,by,bw*pct,bh);
      ctx.fill();ctx.shadowBlur=0;
    }

    // % badge (right-aligned in bar)
    const pctStr=Math.floor(pct*100)+'%';
    ctx.font=`bold ${Math.floor(W*0.024)}px 'JetBrains Mono',monospace`;
    ctx.textAlign='right';ctx.textBaseline='middle';
    ctx.fillStyle='rgba(255,255,255,.55)';
    ctx.fillText(pctStr,bx+bw-5,by+bh/2);

    // Descriptive text below bar
    const fs=Math.floor(W*0.03);
    ctx.font=`${fs}px 'JetBrains Mono',monospace`;
    ctx.textAlign='center';ctx.textBaseline='alphabetic';
    if(isReady){
      ctx.fillStyle='#2ECC71';
      ctx.fillText('✅ ¡Listo para subir de nivel!',W/2,alcH*0.98);
    } else {
      const rem=alc.nextCost-xpVal;
      ctx.fillStyle='rgba(255,255,255,.48)';
      ctx.fillText('Faltan $'+Math.round(rem/1000)+'K XP para subir nivel',W/2,alcH*0.98);
    }
  } else {
    // Max level: full gold bar
    ctx.fillStyle='rgba(245,184,0,.65)';ctx.beginPath();
    if(ctx.roundRect)ctx.roundRect(bx,by,bw,bh,4);else ctx.rect(bx,by,bw,bh);ctx.fill();
    ctx.font=`${Math.floor(W*0.028)}px 'JetBrains Mono',monospace`;
    ctx.fillStyle='rgba(245,184,0,.6)';ctx.textAlign='center';ctx.textBaseline='alphabetic';
    ctx.fillText('NIVEL MÁXIMO · ×'+alc.mult+' multiplicador',W/2,alcH*0.98);
  }
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(W*0.06,alcH+2);ctx.lineTo(W*0.94,alcH+2);ctx.stroke();

  /* ── 3 Reels (27% → 73%) ── */
  const reelTop=alcH+8;
  const reelSH=Math.floor(H*0.44);
  const slotW=Math.floor(W*0.26);
  const slotH=Math.floor(reelSH*0.76);
  const gap=Math.floor(W*0.04);
  const totalW=slotW*3+gap*2;
  const sx0=(W-totalW)/2;
  const sy=reelTop+(reelSH-slotH)/2;

  for(let i=0;i<3;i++){
    const sx=sx0+i*(slotW+gap);
    const sym=CM_SYM[cm.reelSym[i]];
    const landed=!cm.spinning||cm.reelLanded[i];
    ctx.save();
    ctx.fillStyle=landed?sym.bg:'rgba(255,255,255,.04)';
    ctx.strokeStyle=landed?sym.color+'cc':'rgba(255,255,255,.1)';
    ctx.lineWidth=landed?2:1.5;
    if(landed){ctx.shadowColor=sym.color;ctx.shadowBlur=14;}
    ctx.beginPath();if(ctx.roundRect)ctx.roundRect(sx,sy,slotW,slotH,12);else ctx.rect(sx,sy,slotW,slotH);
    ctx.fill();ctx.stroke();ctx.shadowBlur=0;
    ctx.font=`${Math.floor(slotH*0.5)}px serif`;
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(sym.icon,sx+slotW/2,sy+slotH*0.48);
    ctx.font=`bold ${Math.floor(W*0.026)}px 'JetBrains Mono',monospace`;
    ctx.fillStyle=landed?sym.color:'rgba(255,255,255,.25)';
    ctx.textBaseline='alphabetic';
    ctx.fillText(sym.label,sx+slotW/2,sy+slotH+Math.floor(W*0.042));
    ctx.restore();
  }

  // Triple flash
  if(!cm.spinning&&cm.reelLanded.every(v=>v)&&cm.lastResult){
    const[a,b,c]=cm.reelSym;
    if(a===b&&b===c){
      ctx.save();ctx.font=`bold ${Math.floor(W*0.048)}px 'Poppins',sans-serif`;
      ctx.fillStyle='#F5B800';ctx.textAlign='center';ctx.textBaseline='alphabetic';
      ctx.shadowColor='#F5B800';ctx.shadowBlur=18;
      ctx.fillText('★ MATCH × 3 ★',W/2,sy+slotH+Math.floor(W*0.105));
      ctx.shadowBlur=0;ctx.restore();
    }
  }

  /* ── Result area (73% → 100%) ── */
  const msgY=reelTop+reelSH+4;
  if(cm.lastResult){
    const res=cm.lastResult;
    const msgH=Math.floor(H*0.22);
    ctx.save();
    ctx.fillStyle=res.sym.bg;ctx.strokeStyle=res.sym.color+'99';ctx.lineWidth=1.5;
    ctx.beginPath();if(ctx.roundRect)ctx.roundRect(W*0.05,msgY,W*0.9,msgH,12);else ctx.rect(W*0.05,msgY,W*0.9,msgH);
    ctx.fill();ctx.stroke();
    if(res.amount!==0){
      const amtStr=(res.amount>0?'+':'')+res.amount.toLocaleString('es-CL');
      ctx.font=`bold ${Math.floor(msgH*0.4)}px 'Poppins',sans-serif`;
      ctx.fillStyle=res.sym.color;ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.shadowColor=res.sym.color;ctx.shadowBlur=8;
      ctx.fillText('$'+Math.abs(res.amount).toLocaleString('es-CL'),W/2,msgY+msgH*0.32);ctx.shadowBlur=0;
    }
    ctx.font=`${Math.floor(msgH*0.2)}px 'Poppins',sans-serif`;
    ctx.fillStyle='rgba(255,255,255,.75)';ctx.textBaseline='middle';
    ctx.fillText(res.text,W/2,msgY+(res.amount?msgH*0.63:msgH*0.44));
    if(res.extra){
      ctx.font=`bold ${Math.floor(msgH*0.18)}px 'JetBrains Mono',monospace`;
      ctx.fillStyle=res.sym.color;
      ctx.fillText(res.extra,W/2,msgY+msgH*0.84);
    }
    ctx.restore();
  } else if(!cm.spinning&&cm.shield>0){
    ctx.font=`${Math.floor(W*0.034)}px serif`;
    ctx.textAlign='center';ctx.textBaseline='alphabetic';
    ctx.fillText('🛡️'.repeat(Math.min(cm.shield,3)),W/2,msgY+26);
    ctx.font=`${Math.floor(W*0.025)}px 'JetBrains Mono',monospace`;
    ctx.fillStyle='rgba(46,204,113,.6)';
    ctx.fillText('Escudo activo · bloquea el próximo gasto',W/2,msgY+46);
  }
}
/* ─── Keyboard for CoinCatch ─── */
document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')ccKeys.left=true;if(e.key==='ArrowRight')ccKeys.right=true;});
document.addEventListener('keyup',e=>{if(e.key==='ArrowLeft')ccKeys.left=false;if(e.key==='ArrowRight')ccKeys.right=false;});
