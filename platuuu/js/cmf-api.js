/* ════════════════════════════════
   QUIZ ENGINE — 8 preguntas, feedback Duolingo
════════════════════════════════ */
const questions=[
  {
    q:"¿Qué es el APV?",
    opts:["Un impuesto nuevo","Ahorro Previsional Voluntario","Un tipo de tarjeta de crédito","Aporte Para la Vivienda"],
    ans:1,
    ok:"✅ ¡Correcto! El APV es Ahorro Previsional Voluntario — ahorro extra para la jubilación con beneficios tributarios.",
    fail:"❌ El APV es Ahorro Previsional Voluntario. Te devuelve parte de lo aportado en la declaración anual."
  },
  {
    q:"Si ganas $800.000, ¿cuánto deberías ahorrar según la regla 50/30/20?",
    opts:["$40.000","$80.000","$160.000","$240.000"],
    ans:2,
    ok:"✅ ¡Exacto! El 20% de $800.000 son $160.000. La regla: 50% necesidades, 30% gustos, 20% ahorro.",
    fail:"❌ El 20% de $800.000 son $160.000. CMF Educa recomienda destinar ese porcentaje al ahorro mensual."
  },
  {
    q:"¿Cuál es la PEOR estrategia para pagar deudas?",
    opts:["Pagar la deuda con mayor tasa primero","Pagar solo el mínimo de cada tarjeta","Método bola de nieve","Consolidar en un crédito menor tasa"],
    ans:1,
    ok:"✅ ¡Correcto! Pagar solo el mínimo genera intereses sobre intereses — la peor trampa del sistema bancario.",
    fail:"❌ Pagar solo el mínimo es la peor trampa. Los intereses se acumulan mes a mes sin fin."
  },
  {
    q:"¿Para qué sirve un fondo de emergencia?",
    opts:["Comprar acciones baratas","Cubrir imprevistos sin endeudarte","Pagar el pie de un departamento","Evitar el impuesto a la renta"],
    ans:1,
    ok:"✅ ¡Bien! Un fondo de emergencia (3–6 meses de gastos) te protege de imprevistos sin usar la tarjeta.",
    fail:"❌ El fondo de emergencia cubre gastos imprevistos — desempleo, salud, reparaciones — sin endeudarte."
  },
  {
    q:"¿Qué es la UF?",
    opts:["Un fondo mutuo del Banco Central","Unidad de Fomento, reajustada diariamente","Un impuesto a las compras online","Una criptomoneda chilena"],
    ans:1,
    ok:"✅ ¡Correcto! La UF se reajusta diariamente y se usa en créditos hipotecarios y contratos de largo plazo.",
    fail:"❌ La UF (Unidad de Fomento) es un valor reajustado diariamente, muy usado en créditos y arriendos en Chile."
  },
  {
    q:"Si la inflación es 4% y tu cuenta de ahorro paga 1% anual, ¿qué pasa con tu plata?",
    opts:["Crece en poder de compra","Se mantiene igual","Pierde poder de compra","El banco te compensa la diferencia"],
    ans:2,
    ok:"✅ ¡Exacto! Si la rentabilidad es menor que la inflación, tu plata compra menos con el tiempo.",
    fail:"❌ Con inflación al 4% y 1% de interés, pierdes poder de compra. Busca alternativas que superen la inflación."
  },
  {
    q:"¿Qué diferencia principal hay entre un fondo mutuo y una cuenta de ahorro?",
    opts:["El fondo mutuo no tiene riesgo","La cuenta de ahorro invierte en acciones","El fondo mutuo invierte en distintos activos con más riesgo/retorno","Son lo mismo en Chile"],
    ans:2,
    ok:"✅ ¡Correcto! Los fondos mutuos invierten en acciones, bonos u otros activos — más riesgo, más potencial de retorno.",
    fail:"❌ Un fondo mutuo invierte en un portafolio de activos. Puede subir o bajar, a diferencia de una cuenta de ahorro."
  },
  {
    q:"¿Cuál es la tasa de interés máxima legal para créditos de consumo en Chile (referencia CMF)?",
    opts:["15% anual","25% anual","~35% anual","60% anual"],
    ans:2,
    ok:"✅ ¡Bien! La tasa máxima convencional ronda ~35% anual — por eso conviene comparar antes de endeudarte.",
    fail:"❌ La tasa máxima convencional para consumo ronda ~35% anual (CMF). Las tiendas pueden cobrar aún más."
  }
];
let qi=0, score=0, lives=3, answered=false, quizEnded=false;
const resultData=[
  {badge:"🌱 Nivel Semilla",   bg:"#EAFAF1", color:"#2ECC71", msg:"Todo el mundo empieza desde cero. Platuuu construye tu camino desde la base."},
  {badge:"🌿 Nivel Brote",     bg:"#FFF8DC", color:"#F5B800", msg:"¡Vas encaminado! Sabes lo básico — Platuuu te lleva al siguiente nivel."},
  {badge:"🌳 Nivel Árbol",     bg:"#FEF9E7", color:"#FF6B35", msg:"¡Buena base financiera! Con práctica diaria llegarás lejos."},
  {badge:"💎 Nivel Diamante",  bg:"#F0EEFF", color:"#7C6FFF", msg:"¡Crack! Dominas los conceptos clave. Platuuu te reta con los caminos avanzados."}
];

function getResultTier(correct, total) {
  const pct = correct / total;
  if (pct >= 0.875) return 3;
  if (pct >= 0.625) return 2;
  if (pct >= 0.375) return 1;
  return 0;
}

function renderQ(){
  const q=questions[qi];
  const qBody=document.getElementById('qBody');
  document.getElementById('qLbl').textContent=`Pregunta ${qi+1} de ${questions.length}`;
  document.getElementById('qXP').style.width=(qi/questions.length*100)+'%';
  document.getElementById('qText').textContent=q.q;
  const opts=document.getElementById('qOpts');
  opts.innerHTML='';
  q.opts.forEach((o,i)=>{
    const btn=document.createElement('button');
    btn.className='q-opt';
    btn.innerHTML=`<div class="opt-key">${String.fromCharCode(65+i)}</div>${o}`;
    btn.onclick=()=>selectOpt(i);
    opts.appendChild(btn);
  });
  document.getElementById('qFb').classList.remove('show','ok','bad');
  const nxt=document.getElementById('qNext');
  nxt.classList.remove('show');
  nxt.onclick=nextQ;
  answered=false;
  qBody.style.display='';
}

function selectOpt(i){
  if(answered||quizEnded) return;
  answered=true;
  const q=questions[qi];
  const opts=document.querySelectorAll('.q-opt');
  const qCard=document.getElementById('qCard');
  opts.forEach(o=>o.classList.add('disabled'));
  const fb=document.getElementById('qFb');
  const nxt=document.getElementById('qNext');

  if(i===q.ans){
    opts[i].classList.add('correct','bounce-anim');
    score++;
    fb.textContent=q.ok;
    fb.className='q-fb show ok';
    playSound('correct');
    setPesoExpression('happy');
    coins({clientX:window.innerWidth/2,clientY:window.innerHeight/2});
    bubble.innerHTML="¡Correcto! 🎉 ¡Weena!";
    bubble.classList.add('show');
  } else {
    opts[i].classList.add('wrong','shake-anim');
    opts[q.ans].classList.add('correct');
    lives--;
    updateLives();
    fb.textContent=q.fail;
    fb.className='q-fb show bad';
    playSound('wrong');
    setPesoExpression('sad');
    qCard.classList.add('shake-anim');
    setTimeout(()=>qCard.classList.remove('shake-anim'),400);
    bubble.innerHTML=lives>0 ? "Ánimo, ¡en el próximo! 💪" : "Se acabaron las vidas… pero aprendiste 💪";
    bubble.classList.add('show');
  }

  nxt.classList.add('show');
  nxt.textContent = (lives<=0 || qi>=questions.length-1) ? 'Ver mi resultado →' : 'Siguiente →';
  nxt.focus();
}

function updateLives(){
  const hearts=document.querySelectorAll('.heart');
  hearts.forEach((h,i)=>h.textContent = i<lives ? '❤️' : '🖤');
}

function nextQ(){
  if(quizEnded) return;
  playSound('next');
  const qBody=document.getElementById('qBody');
  if(lives<=0 || qi>=questions.length-1){
    qBody.classList.add('q-slide-out');
    setTimeout(showResult, 250);
    return;
  }
  qBody.classList.add('q-slide-out');
  setTimeout(()=>{
    qBody.classList.remove('q-slide-out');
    qi++;
    renderQ();
    qBody.classList.add('q-slide-in');
    setTimeout(()=>qBody.classList.remove('q-slide-in'), 320);
  }, 250);
}

function showResult(){
  if(quizEnded) return;
  quizEnded=true;
  document.getElementById('qBody').style.display='none';
  const r=document.getElementById('qResult');
  r.classList.add('show');
  const tier=getResultTier(score, questions.length);
  const d=resultData[tier];
  document.getElementById('rScore').textContent=score+'/'+questions.length;
  const badge=document.getElementById('rBadge');
  badge.textContent=d.badge;
  badge.style.background=d.bg;
  badge.style.color=d.color;
  badge.style.border=`1px solid ${d.color}44`;
  document.getElementById('rMsg').textContent=d.msg;
  document.getElementById('qXP').style.width='100%';
  playSound('victory');
  setPesoExpression('victory');
  coins({clientX:window.innerWidth/2,clientY:window.innerHeight/2});
  bubble.innerHTML="¡Terminaste! 🏆<br>¡Empieza Platuuu!";
  bubble.classList.add('show');
}

renderQ();

// Atajos de teclado A/B/C/D en el quiz
document.addEventListener('keydown', e => {
  if (quizEnded || answered) return;
  const keyMap = { a:0, b:1, c:2, d:3 };
  const idx = keyMap[e.key.toLowerCase()];
  if (idx !== undefined) {
    const opts = document.querySelectorAll('#qOpts .q-opt');
    if (opts[idx] && !opts[idx].classList.contains('disabled')) selectOpt(idx);
  }
});

/* ════════════════════════════════
   RIVE ANIMATED EMOJIS — landing (stats + quiz result)
   Usa nombres distintos a script 1 para evitar colisión global
════════════════════════════════ */

const RIVE_EMOJIS_SRC = 'https://public.rive.app/community/runtime-files/24644-46045-rive-s-animated-emojis.riv';
const landingRiveInstances = [];

function loadLandingRiveFile(src, onSuccess, onError) {
  try {
    const RiveFileClass = (typeof RiveFile !== 'undefined') ? RiveFile
                        : (typeof rive !== 'undefined' && rive.RiveFile) ? rive.RiveFile
                        : null;
    if (!RiveFileClass) { onError('Rive not loaded'); return; }
    const file = new RiveFileClass({
      src: src,
      onLoad: () => onSuccess(file),
      onLoadError: onError,
    });
    file.init().catch(onError);
  } catch(e) { onError(e); }
}

function setupLandingRiveInstance(loadedRiveFile, canvasId, component, stateMachine) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  try {
    const RiveClass   = (typeof Rive   !== 'undefined') ? Rive   : rive.Rive;
    const LayoutClass = (typeof Layout !== 'undefined') ? Layout : rive.Layout;
    const FitEnum     = (typeof Fit    !== 'undefined') ? Fit    : rive.Fit;
    const instance = new RiveClass({
      riveFile: loadedRiveFile,
      useOffscreenRenderer: true,
      stateMachines: stateMachine,
      canvas: canvas,
      artboard: component,
      layout: new LayoutClass({ fit: FitEnum.Contain }),
      autoplay: true,
      onLoad: () => { instance.resizeDrawingSurfaceToCanvas(); },
    });
    landingRiveInstances.push(instance);
  } catch(e) {}
}

loadLandingRiveFile(
  RIVE_EMOJIS_SRC,
  (file) => {
    setupLandingRiveInstance(file, 'rive-fire',     'Onfire',   'controller');
    setupLandingRiveInstance(file, 'rive-bullseye', 'Bullseye', 'controller');
    setupLandingRiveInstance(file, 'rive-result',   'Tada',     'controller');
    ['rive-fire','rive-bullseye'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'inline-block';
    });
  },
  () => {}
);

const _origShowResult = showResult;
showResult = function() {
  _origShowResult();
  setTimeout(() => {
    const c = document.getElementById('rive-result');
    if (c) {
      c.classList.add('show');
      landingRiveInstances.forEach(i => { try { i.resizeDrawingSurfaceToCanvas(); } catch(e){} });
    }
  }, 300);
};

window.addEventListener('resize', () => {
  landingRiveInstances.forEach(i => { if(i) try { i.resizeDrawingSurfaceToCanvas(); } catch(e){} });
}, false);
