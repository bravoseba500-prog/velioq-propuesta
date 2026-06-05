/* ════════════════════════════════
   MASCOTA INTERACTIVA
════════════════════════════════ */
const mascotWrap = document.getElementById('mascotWrap');
const mascotSVG  = document.getElementById('mascotSVG');
const pupilL = document.getElementById('pupilL');
const pupilR = document.getElementById('pupilR');
const glintL = document.getElementById('glintL');
const glintR = document.getElementById('glintR');
const mouth  = document.getElementById('mouth');
const browL  = document.getElementById('browL');
const browR  = document.getElementById('browR');
const blink  = document.getElementById('blinkGroup');
const bubble = document.getElementById('bubble');
const shadow = document.getElementById('mascotShadow');

// Expresiones de Peso — feliz / triste / victoria / neutral
// Platín — 5 expresiones
// Coordenadas recalibradas al SVG 260×260 — ojos en cx:95(L) cx:165(R), cuerpo cx:130 cy:124
const pesoFaces = {
  idle: {
    mouth:'M95 156 Q130 178 165 156', mouthFill:'none', mouthStroke:'#0F1321', mouthSW:'5',
    browL:'M78 93 Q95 85 112 90',  browR:'M148 90 Q165 85 182 93',
    hearts:false, starEyes:false, armWave:false
  },
  neutral: {
    mouth:'M95 156 Q130 178 165 156', mouthFill:'none', mouthStroke:'#0F1321', mouthSW:'5',
    browL:'M78 93 Q95 85 112 90',  browR:'M148 90 Q165 85 182 93',
    hearts:false, starEyes:false, armWave:false
  },
  happy: {
    // Sonrisa grande, cejas arqueadas arriba, brazo saluda
    mouth:'M86 154 Q130 184 174 154', mouthFill:'none', mouthStroke:'#0F1321', mouthSW:'6',
    browL:'M78 87 Q95 79 112 84',  browR:'M148 84 Q165 79 182 87',
    hearts:false, starEyes:false, armWave:true
  },
  victory: {
    // Sonrisa máxima, ojos estrella, ambos brazos arriba
    mouth:'M80 152 Q130 188 180 152', mouthFill:'none', mouthStroke:'#0F1321', mouthSW:'7',
    browL:'M76 82 Q95 72 114 78',  browR:'M146 78 Q165 72 184 82',
    hearts:false, starEyes:true, armWave:true
  },
  thinking: {
    // Sonrisa leve, ceja derecha levantada (pensativo)
    mouth:'M100 160 Q122 168 150 162', mouthFill:'none', mouthStroke:'#0F1321', mouthSW:'4',
    browL:'M78 93 Q95 87 112 91',  browR:'M148 86 Q165 78 182 84',
    hearts:false, starEyes:false, armWave:false
  },
  love: {
    // Sonrisa grande + corazones flotando
    mouth:'M86 154 Q130 184 174 154', mouthFill:'none', mouthStroke:'#0F1321', mouthSW:'6',
    browL:'M78 87 Q95 79 112 84',  browR:'M148 84 Q165 79 182 87',
    hearts:true, starEyes:false, armWave:false
  },
  sad: {
    // Boca hacia abajo, cejas caídas al centro
    mouth:'M98 166 Q122 154 155 163', mouthFill:'none', mouthStroke:'#0F1321', mouthSW:'5',
    browL:'M78 96 Q95 92 112 95',  browR:'M148 95 Q165 92 182 96',
    hearts:false, starEyes:false, armWave:false
  },
  surprised: {
    // Boca abierta oval, cejas muy arriba — sorpresa
    mouth:'M114 158 Q130 148 146 158 Q130 178 114 158', mouthFill:'#0F1321', mouthStroke:'#0F1321', mouthSW:'0',
    browL:'M76 82 Q95 72 114 78', browR:'M146 78 Q165 72 184 82',
    hearts:false, starEyes:false, armWave:false
  }
};

let pesoExprTimer = null;

function setPesoExpression(name) {
  const f = pesoFaces[name] || pesoFaces.neutral;
  clearTimeout(pesoExprTimer);

  // Boca y cejas
  mouth.setAttribute('d', f.mouth);
  mouth.setAttribute('fill', f.mouthFill);
  mouth.setAttribute('stroke', f.mouthStroke);
  mouth.setAttribute('stroke-width', f.mouthSW);
  browL.setAttribute('d', f.browL);
  browR.setAttribute('d', f.browR);

  // Brazo saludando
  const arm = document.getElementById('armWave');
  if (arm) {
    arm.style.transition = 'transform .3s ease';
    arm.style.transformOrigin = '60px 100px';
    arm.style.transform = f.armWave ? 'rotate(-15deg) translateY(-8px)' : 'none';
  }

  // Corazones
  const hg = document.getElementById('heartGroup');
  if (hg) hg.setAttribute('opacity', f.hearts ? '1' : '0');

  // Ojos estrella
  const eyeLEl = document.getElementById('eyeL');
  const eyeREl = document.getElementById('eyeR');
  if (f.starEyes) {
    if (eyeLEl) eyeLEl.setAttribute('opacity','0');
    if (eyeREl) eyeREl.setAttribute('opacity','0');
    let starL = document.getElementById('starEyeL');
    let starR = document.getElementById('starEyeR');
    if (!starL) {
      starL = document.createElementNS('http://www.w3.org/2000/svg','text');
      starL.id = 'starEyeL';
      starL.setAttribute('x','74'); starL.setAttribute('y','126');
      starL.setAttribute('font-size','28'); starL.textContent = '⭐';
      document.getElementById('mascotSVG').appendChild(starL);
    }
    if (!starR) {
      starR = document.createElementNS('http://www.w3.org/2000/svg','text');
      starR.id = 'starEyeR';
      starR.setAttribute('x','148'); starR.setAttribute('y','126');
      starR.setAttribute('font-size','28'); starR.textContent = '⭐';
      document.getElementById('mascotSVG').appendChild(starR);
    }
    starL.setAttribute('opacity','1'); starR.setAttribute('opacity','1');
  } else {
    if (eyeLEl) eyeLEl.setAttribute('opacity','1');
    if (eyeREl) eyeREl.setAttribute('opacity','1');
    const starL = document.getElementById('starEyeL');
    const starR = document.getElementById('starEyeR');
    if (starL) starL.setAttribute('opacity','0');
    if (starR) starR.setAttribute('opacity','0');
  }

  if (!window.lsLessonActive && name !== 'neutral' && name !== 'idle' && name !== 'victory') {
    pesoExprTimer = setTimeout(() => setPesoExpression('idle'), 2200);
  }
}

// Sonidos con Web Audio API (sin archivos externos)
let audioCtx = null;
function playSound(type) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const tone = (freq, dur, vol, wave) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = wave || 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + dur);
    };
    if (type === 'correct') {
      tone(523, 0.12, 0.1);
      tone(659, 0.18, 0.1);
    } else if (type === 'wrong') {
      tone(196, 0.28, 0.08, 'square');
    } else if (type === 'next') {
      tone(440, 0.1, 0.06);
    } else if (type === 'victory') {
      [523, 659, 784, 1047].forEach((f, i) => {
        setTimeout(() => {
          if (!audioCtx) return;
          const t = audioCtx.currentTime;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t);
          gain.gain.setValueAtTime(0.09, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(t);
          osc.stop(t + 0.22);
        }, i * 90);
      });
    }
  } catch (e) {}
}

// Expresiones de la mascota — burbujas rotativas
const bubbleTexts = [
  "¡Hola! Soy Platín 🪙<br>¿Cuánto sabís de tu plata?",
  "¡Eso sí que es buena pregunta! 🤔",
  "¡Wena! Aprende conmigo cada día 🔥",
  "La plata no llega sola... ¡pero yo te ayudo! 💪",
  "¿Sabías que el APV tiene beneficios tributarios? 🤑",
  "¡Recuerda tu racha diaria! 🔥",
];
let bubbleIdx=0, isBouncing=false;

// Mostrar burbuja al inicio
setTimeout(()=>bubble.classList.add('show'), 1200);
// Rotar frases (pausado durante lecciones)
setInterval(()=>{
  if (window.lsLessonActive) return;
  bubble.classList.remove('show');
  setTimeout(()=>{
    if (window.lsLessonActive) return;
    bubbleIdx=(bubbleIdx+1)%bubbleTexts.length;
    bubble.innerHTML=bubbleTexts[bubbleIdx];
    bubble.classList.add('show');
  },400);
},4500);

/* ════════════════════════════════
   CURSOR TRACKING — algoritmo exacto del cat-follow-cursor demo de Rive
   Mapea posición X/Y del cursor a rango 0-100 relativo al canvas (mascotWrap)
   Referencias: rive.app/community/files/24639-46040-cat-follow-cursor-demo
════════════════════════════════ */

// Valores iniciales — Peso mira al frente (50,50 = centro)
let xPos = 50, yPos = 50;

// Igual que mapCursorToRange() del demo de Rive
const mapCursorToRange = (position, dimension) => {
  const clampedPosition = Math.max(0, Math.min(position, dimension));
  return (clampedPosition / dimension) * 100;
};

// Aplica xPos/yPos (0-100) a los ojos de Peso
const applyEyePosition = (xVal, yVal) => {
  // Convierte 0-100 a desplazamiento de pupila (-5 a +5 px)
  const px = ((xVal - 50) / 50) * 5;
  const py = ((yVal - 50) / 50) * 5;

  // Ojo izquierdo — base cx:95 cy:114
  pupilL.setAttribute('cx', 95 + px);
  pupilL.setAttribute('cy', 114 + py);
  glintL.setAttribute('cx', 100 + px);
  glintL.setAttribute('cy', 108 + py);

  // Ojo derecho — base cx:165 cy:114
  pupilR.setAttribute('cx', 165 + px);
  pupilR.setAttribute('cy', 114 + py);
  glintR.setAttribute('cx', 170 + px);
  glintR.setAttribute('cy', 108 + py);
};

// Handler unificado — igual que updatePosition() del demo de Rive
const updatePosition = (clientX, clientY) => {
  const rect = mascotWrap.getBoundingClientRect();
  const canvasX = clientX - rect.left;
  const canvasY = clientY - rect.top;
  xPos = mapCursorToRange(canvasX, rect.width);
  yPos = mapCursorToRange(canvasY, rect.height);
  applyEyePosition(xPos, yPos);
};

// Reset al centro — igual que en el demo cuando el cursor sale
const resetEyesToCenter = () => {
  xPos = 50; yPos = 50;
  applyEyePosition(50, 50);
};

// Mouse move — window completo igual que el demo de Rive
window.addEventListener('mousemove', e => updatePosition(e.clientX, e.clientY));

// Touch move — soporte móvil (passive como en el demo de Rive)
window.addEventListener('touchmove', e => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  }
}, { passive: true });

// Touch end — reset al centro igual que en el demo de Rive
window.addEventListener('touchend', resetEyesToCenter);

// Mouse leave — reset al centro igual que en el demo de Rive
document.addEventListener('mouseleave', resetEyesToCenter);

// Aplicar posición inicial (mirando al frente)
applyEyePosition(50, 50);

// Parpadeo aleatorio
function doBlink(){
  blink.setAttribute('opacity','1');
  setTimeout(()=>blink.setAttribute('opacity','0'), 120);
}
setInterval(doBlink, Math.random()*3000+2000);
setInterval(()=>{
  if(Math.random()>.6){
    doBlink();
    setTimeout(doBlink, 200);
  }
}, 5000);

// Hover — reutiliza expresiones de Peso
function mascotHover(on){
  if(on){
    setPesoExpression('happy');
    mascotSVG.style.transform='scale(1.05)';
    mascotSVG.style.transition='transform .3s';
  } else {
    setPesoExpression('neutral');
    mascotSVG.style.transform='scale(1)';
  }
}

// Click — rebota y celebra
function mascotClick(){
  if(isBouncing) return;
  isBouncing=true;
  // Boca sorprendida (círculo)
  mouth.setAttribute('d','M102 148 Q120 152 138 148 Q120 168 102 148');
  mouth.setAttribute('fill','#1A1410');
  mouth.setAttribute('stroke','none');
  // Cejas sorprendidas — suben
  browL.setAttribute('d','M74 82 Q90 74 104 78');
  browR.setAttribute('d','M136 78 Q150 74 166 82');

  // Bounce animation
  mascotWrap.style.animation='none';
  let up=true, count=0;
  const interval = setInterval(()=>{
    if(up){ mascotSVG.style.transform=`translateY(-${10+count*2}px) scale(${1+count*.02})`; }
    else  { mascotSVG.style.transform=`translateY(0) scale(1)`; }
    up=!up; count++;
    if(count>6){
      clearInterval(interval);
      mascotSVG.style.transform='scale(1)';
      mascotSVG.style.transition='transform .3s';
      // Vuelve a sonrisa de costado (diseño Rive original)
      mouth.setAttribute('d','M88 150 Q106 164 142 152');
      mouth.setAttribute('fill','none');
      mouth.setAttribute('stroke','#1A1410');
      mouth.setAttribute('stroke-width','5');
      browL.setAttribute('d','M74 88 Q90 82 104 86');
      browR.setAttribute('d','M136 86 Q150 82 166 88');
      mascotWrap.style.animation='mascot-float 3s ease-in-out infinite';
      isBouncing=false;
    }
  },80);

  // Frase especial al click
  bubble.classList.remove('show');
  const clickTexts=["¡Weena! ¡Eso es! 🎉","¡Tú puedes! 💪","¡A aprender se ha dicho! 🔥","¡Eres el crack! 🏆"];
  setTimeout(()=>{
    bubble.innerHTML=clickTexts[Math.floor(Math.random()*clickTexts.length)];
    bubble.classList.add('show');
  },300);

  coins({clientX: mascotWrap.getBoundingClientRect().left+120, clientY: mascotWrap.getBoundingClientRect().top});
}

// CSS para bounce de mascot container
document.head.insertAdjacentHTML('beforeend',`<style>
  #mascotWrap { animation: mascot-float 3s ease-in-out infinite; }
  @keyframes mascot-float { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
  #mascotSVG  { transition: transform .15s ease; }
</style>`);
