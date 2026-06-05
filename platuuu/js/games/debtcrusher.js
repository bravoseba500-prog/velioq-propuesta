/* ════════════════════════════════════════════════════
   💳  DEBTCRUSHER  —  Canvas Match-3  (Java port)
   Lógica: CandyCrush.java → fillBoard / swap /
   crushMatches / dropCandies + animaciones RAF
════════════════════════════════════════════════════ */
const DC_TYPES=[
  {label:'VISA 18%',   icon:'💳',bg:'#2E3E9E',hi:'rgba(255,255,255,.18)',base:150000},
  {label:'CAE UF+2%',  icon:'🎓',bg:'#7C3AED',hi:'rgba(255,255,255,.18)',base:200000},
  {label:'Consumo 35%',icon:'🏦',bg:'#DC2626',hi:'rgba(255,255,255,.18)',base:120000},
  {label:'Auto 12%',   icon:'🚗',bg:'#D97706',hi:'rgba(255,255,255,.18)',base:180000},
  {label:'Casa 4%',    icon:'🏠',bg:'#059669',hi:'rgba(255,255,255,.18)',base:500000},
  {label:'Tienda 52%!',icon:'🛍️',bg:'#DB2777',hi:'rgba(255,255,255,.18)',base:80000},
];
const DC_ROWS=6, DC_COLS=6;
let dc={};

function dcSound(kind){
  try{
    if(!window._dcAC) window._dcAC=new(window.AudioContext||window.webkitAudioContext)();
    const ac=window._dcAC;
    if(ac.state==='suspended') ac.resume();
    const t=ac.currentTime;
    const tone=(f,dur,vol=.07,type='sine')=>{
      const o=ac.createOscillator(),g=ac.createGain();
      o.type=type; o.frequency.value=f;
      g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(.001,t+dur);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t+dur);
    };
    if(kind==='select')   tone(440,.05,.04);
    else if(kind==='swap')    { tone(330,.07,.06); }
    else if(kind==='bad')     tone(160,.22,.07,'square');
    else if(kind==='match')   { tone(523,.07,.09); setTimeout(()=>tone(659,.09,.08),70); }
    else if(kind==='cascade') tone(880,.1,.08);
    else if(kind==='win')     [523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,.18,.09),i*90));
  }catch(e){}
}

/* ── Canvas helpers ── */
function dcRR(ctx,x,y,w,h,r,fill){
  ctx.beginPath();
  if(ctx.roundRect) ctx.roundRect(x,y,w,h,r);
  else{ ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath(); }
  if(fill) ctx.fill(); else ctx.stroke();
}
const dcEase=t=>t<.5?2*t*t:-1+(4-2*t)*t;          // ease in-out quad
const dcEaseOut=t=>1-Math.pow(1-t,3);               // ease out cubic
const dcEaseBounce=t=>{ // tiny bounce for drop
  const n1=7.5625,d1=2.75;
  if(t<1/d1) return n1*t*t;
  if(t<2/d1) return n1*(t-=1.5/d1)*t+.75;
  if(t<2.5/d1) return n1*(t-=2.25/d1)*t+.9375;
  return n1*(t-=2.625/d1)*t+.984375;
};

/* ═══ NIVEL CONFIG (1–20) ═══════════════════════════════
   Tier 1 (L1-5):   match-3 base
   Tier 2 (L6-10):  + poder Consolidación (limpia fila)
   Tier 3 (L11-15): + celdas bloqueadas 🔒
   Tier 4 (L16-20): + timer 90s
═══════════════════════════════════════════════════════ */
const DC_GOALS=[0,
  2e6,3.5e6,5e6,6.5e6,8e6,          // 1-5
  10e6,12.5e6,15e6,18e6,21e6,        // 6-10
  24e6,28e6,32e6,37e6,43e6,          // 11-15
  49e6,56e6,64e6,73e6,83e6           // 16-20
];
const DC_MOVES=[0,
  30,33,36,39,42,                    // 1-5
  40,43,46,49,52,                    // 6-10  (extra: consolidación)
  48,51,54,57,60,                    // 11-15 (extra: bloqueadas)
  38,40,42,44,46                     // 16-20 (timer presiona)
];
function dcLevelCfg(level){
  const l=Math.max(1,Math.min(level,20));
  return {
    goal:   DC_GOALS[l]||83e6,
    moves:  DC_MOVES[l]||46,
    tier:   l<=5?1:l<=10?2:l<=15?3:4,
    hasConsolidacion: l>=6,
    hasBlocked:       l>=11,
    blockedCount:     l>=11 ? Math.min(2+(l-11)*2,8) : 0,
    hasTimer:         l>=16,
    timerSec:         l>=16 ? 90 : null,
  };
}

/* ── Calcula cell-size responsivo ── */
function dcCalcCS(){
  const vw=window.innerWidth;
  if(vw>768){
    // Desktop: celda entre 72-80px, grid ~480px
    return Math.min(Math.floor((vw*0.38)/DC_COLS), 80);
  }
  // Móvil: ajusta al ancho disponible, máx 60px
  return Math.min(Math.floor((vw-28)/DC_COLS), 60);
}

/* ── Aplica tamaño al canvas (usado en init y resize) ── */
function dcApplySize(){
  const canvas=document.getElementById('dcCanvas');
  if(!canvas) return;
  const cs=dcCalcCS();
  const w=cs*DC_COLS;
  canvas.width=w; canvas.height=w;
  canvas.style.width=w+'px'; canvas.style.height=w+'px';
  if(dc.ctx){ dc.cs=cs; dcDraw(); }
  return cs;
}

function initDC(){
  if(dc.rafId){ cancelAnimationFrame(dc.rafId); dc.rafId=null; }
  if(dc.timerInt){ clearInterval(dc.timerInt); dc.timerInt=null; }
  document.getElementById('dc-result').classList.remove('show');
  const rive=document.getElementById('dc-rive'); if(rive) rive.classList.remove('show');

  // Si viene del mapa, forzar el nivel correspondiente al nodo
  try {
    const _pend = localStorage.getItem('pm_pending');
    if (_pend) {
      const { targetLevel } = JSON.parse(_pend);
      if (targetLevel) dc.level = targetLevel;
    }
  } catch(e) {}

  const level=dc.level||1;
  const cfg=dcLevelCfg(level);
  const cs=dcApplySize();
  const canvas=document.getElementById('dcCanvas');

  dc={
    canvas, ctx:canvas.getContext('2d'), cs,
    board:   Array.from({length:DC_ROWS},()=>new Int8Array(DC_COLS)),
    blocked: Array.from({length:DC_ROWS},()=>new Uint8Array(DC_COLS)), // 0=free,1=cracked,2=locked
    sel:null, state:'idle',
    anim:null, crushMask:null, dropMap:null,
    lastSwapCells:null, consolMode:false, consolCd:0,
    crushedCount: new Int32Array(DC_TYPES.length),
    moves:cfg.moves, score:0, combo:1, chain:0,
    goal:cfg.goal, level,
    hasConsolidacion:cfg.hasConsolidacion,
    hasBlocked:cfg.hasBlocked,
    hasTimer:cfg.hasTimer,
    timerSec:cfg.timerSec, timerMax:cfg.timerSec,
    timerInt:null, rafId:null,
  };

  // Celdas bloqueadas para niveles 11+
  if(cfg.hasBlocked) dcPlaceBlocked(cfg.blockedCount);

  // Consolidación UI
  const consolWrap=document.getElementById('dc-consol-wrap');
  if(consolWrap) consolWrap.style.display=cfg.hasConsolidacion?'block':'none';
  dcUpdateConsolBtn();

  // Timer UI
  const timerWrap=document.getElementById('dc-timer-wrap');
  if(timerWrap) timerWrap.style.display=cfg.hasTimer?'block':'none';
  if(cfg.hasTimer) dcStartTimer();

  // Hint según tier
  const hint=document.getElementById('dc-hint-txt');
  if(hint){
    const tips=['','Intercambia · 3+ iguales = aplastado · cadenas gratis',
      'Nivel 6+: usa 🔱 Consolidar para limpiar una fila entera',
      'Nivel 11+: celdas 🔒 necesitan 2 matches adyacentes para liberarse',
      'Nivel 16+: ¡también hay timer! Combos rápidos para ganar tiempo'];
    hint.textContent=tips[Math.min(cfg.tier,4)];
  }

  canvas.onclick=null; canvas.ontouchend=null;
  canvas.removeEventListener('click',dcClick);
  canvas.removeEventListener('touchend',dcTouch);
  canvas.addEventListener('click',dcClick,{passive:true});
  canvas.addEventListener('touchend',dcTouch,{passive:false});

  dcFillBoard();
  // Power-up pending: movimientos extra comprados en la tienda
  const dcPuMoves = parseInt(localStorage.getItem('pm_pu_dc_moves') || '0');
  if (dcPuMoves) { dc.moves += dcPuMoves; localStorage.removeItem('pm_pu_dc_moves'); }
  dcUpdateHUD();
  dcDraw();
}

function dcPlaceBlocked(count){
  const pos=[];
  for(let r=1;r<DC_ROWS-1;r++) for(let c=0;c<DC_COLS;c++) pos.push([r,c]);
  for(let i=pos.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pos[i],pos[j]]=[pos[j],pos[i]]; }
  for(let k=0;k<Math.min(count,pos.length);k++){ const[r,c]=pos[k]; dc.blocked[r][c]=2; }
}

function dcStartTimer(){
  if(dc.timerInt) clearInterval(dc.timerInt);
  dc.timerInt=setInterval(()=>{
    if(dc.state==='won'||dc.state==='lost') return;
    dc.timerSec--;
    const fill=document.getElementById('dc-timer-fill');
    const lbl=document.getElementById('dc-timer-lbl');
    if(fill) fill.style.width=Math.max(0,dc.timerSec/dc.timerMax*100)+'%';
    if(lbl) lbl.textContent=dc.timerSec+'s';
    if(dc.timerSec<=10&&fill) fill.style.background='#E74C3C';
    if(dc.timerSec<=0){ clearInterval(dc.timerInt); dc.timerInt=null; dcTimeOut(); }
  },1000);
}
function dcTimeOut(){
  dc.state='lost';
  dcShowLoseScreen('⏱️','¡Tiempo agotado!');
}

/* ── Java: fillBoard() — tablero inicial sin matches ── */
function dcFillBoard(){
  for(let r=0;r<DC_ROWS;r++)
    for(let c=0;c<DC_COLS;c++){
      let t, tries=0;
      do{ t=Math.floor(Math.random()*DC_TYPES.length); tries++; }
      while(tries<20&&(
        (c>=2&&dc.board[r][c-1]===t&&dc.board[r][c-2]===t)||
        (r>=2&&dc.board[r-1][c]===t&&dc.board[r-2][c]===t)
      ));
      dc.board[r][c]=t;
    }
}

/* ── Java: swap() ── */
function dcSwapCells(r1,c1,r2,c2){
  const tmp=dc.board[r1][c1];
  dc.board[r1][c1]=dc.board[r2][c2];
  dc.board[r2][c2]=tmp;
}

/* ── Java: crushMatches() — skip bloqueadas, libéralas si adyacentes ── */
function dcCrushMatches(){
  const crush=Array.from({length:DC_ROWS},()=>new Uint8Array(DC_COLS));
  let found=false;
  // Horizontal (skip bloqueadas)
  for(let r=0;r<DC_ROWS;r++)
    for(let c=0;c<DC_COLS-2;c++){
      const t=dc.board[r][c];
      if(t<0||dc.blocked[r][c]||dc.blocked[r][c+1]||dc.blocked[r][c+2]) continue;
      if(t===dc.board[r][c+1]&&t===dc.board[r][c+2]){
        crush[r][c]=crush[r][c+1]=crush[r][c+2]=1; found=true;
      }
    }
  // Vertical
  for(let c=0;c<DC_COLS;c++)
    for(let r=0;r<DC_ROWS-2;r++){
      const t=dc.board[r][c];
      if(t<0||dc.blocked[r][c]||dc.blocked[r+1][c]||dc.blocked[r+2][c]) continue;
      if(t===dc.board[r+1][c]&&t===dc.board[r+2][c]){
        crush[r][c]=crush[r+1][c]=crush[r+2][c]=1; found=true;
      }
    }
  if(!found) return null;
  // Decrement lock count on blocked cells adjacent to crushed cells
  const dirs=[[-1,0],[1,0],[0,-1],[0,1]];
  for(let r=0;r<DC_ROWS;r++) for(let c=0;c<DC_COLS;c++){
    if(!crush[r][c]) continue;
    for(const[dr,dc2] of dirs){
      const nr=r+dr,nc=c+dc2;
      if(nr>=0&&nr<DC_ROWS&&nc>=0&&nc<DC_COLS&&dc.blocked[nr][nc]>0){
        dc.blocked[nr][nc]--;
      }
    }
  }
  return crush;
}

/* ── Java: dropCandies() — respeta celdas bloqueadas ── */
function dcDropCandies(){
  const newKeys=new Set();
  for(let c=0;c<DC_COLS;c++){
    let w=DC_ROWS-1;
    for(let r=DC_ROWS-1;r>=0;r--){
      if(dc.blocked[r][c]>0){ w=r-1; continue; } // no mover bloqueadas
      if(dc.board[r][c]!==-1){
        if(w!==r&&(!dc.blocked[w]?.[c])){ dc.board[w][c]=dc.board[r][c]; dc.board[r][c]=-1; }
        w--;
      }
    }
    while(w>=0){
      if(!dc.blocked[w]?.[c]){ dc.board[w][c]=Math.floor(Math.random()*DC_TYPES.length); newKeys.add(w+','+c); }
      w--;
    }
  }
  return newKeys;
}


/* ── Input ── */
function dcClick(e){ dcHandleInput(e.offsetX,e.offsetY); }
function dcTouch(e){
  e.preventDefault();
  const r=dc.canvas.getBoundingClientRect(),t=e.changedTouches[0];
  dcHandleInput(t.clientX-r.left, t.clientY-r.top);
}
function dcHandleInput(px,py){
  if(dc.state!=='idle'||dc.moves<=0) return;
  const cs=dc.cs;
  const c=Math.floor(px/cs), r=Math.floor(py/cs);
  if(r<0||r>=DC_ROWS||c<0||c>=DC_COLS) return;

  // Modo consolidación: el tap elige la fila
  if(dc.consolMode){
    dcFireConsolidacion(r);
    return;
  }

  // Celdas bloqueadas no son seleccionables
  if(dc.blocked[r][c]>0) return;

  if(!dc.sel){ dc.sel=[r,c]; dcSound('select'); dcDraw(); return; }
  const[sr,sc]=dc.sel;
  if(sr===r&&sc===c){ dc.sel=null; dcDraw(); return; }
  if(Math.abs(sr-r)+Math.abs(sc-c)!==1){ dc.sel=[r,c]; dcSound('select'); dcDraw(); return; }
  // No intercambiar con bloqueada
  if(dc.blocked[r][c]>0){ dc.sel=null; dcDraw(); return; }

  dc.sel=null;
  dcSwapCells(sr,sc,r,c);
  dcSound('swap');
  dc.state='swap';
  dc.lastSwapCells=[[sr,sc],[r,c]];
  dc.anim={phase:'swap',r1:sr,c1:sc,r2:r,c2:c,start:performance.now(),dur:160};
  dc.rafId=requestAnimationFrame(dcLoop);
}

/* ── RAF loop ── */
function dcLoop(ts){
  if(!dc.anim){ dcDraw(); return; }
  const a=dc.anim;
  a.t=Math.min(1,(ts-a.start)/a.dur);
  dcDraw();
  if(a.t<1){ dc.rafId=requestAnimationFrame(dcLoop); return; }
  dcAnimDone();
}

function dcAnimDone(){
  const phase=dc.anim?.phase;
  dc.anim=null;

  if(phase==='swap'){
    // Java: crushMatches() after swap
    const crush=dcCrushMatches();
    if(!crush){
      // Invalid — revert
      dcSwapCells(dc.lastSwapCells[0][0],dc.lastSwapCells[0][1],dc.lastSwapCells[1][0],dc.lastSwapCells[1][1]);
      dcSound('bad');
      dc.state='shake';
      dc.anim={phase:'shake',start:performance.now(),dur:380};
      dc.rafId=requestAnimationFrame(dcLoop);
      return;
    }
    // Valid move
    dc.combo=1; dc.chain=0; dc.moves--;
    dcUpdateHUD();
    dcStartCrush(crush);

  } else if(phase==='shake'){
    dc.canvas.style.transform='';
    dc.state='idle'; dcDraw();

  } else if(phase==='crush'){
    for(let r=0;r<DC_ROWS;r++) for(let c=0;c<DC_COLS;c++) if(dc.crushMask[r][c]) dc.board[r][c]=-1;
    dc.crushMask=null;
    // Java: dropCandies()
    const newKeys=dcDropCandies();
    dc.dropMap=dcBuildDropMap(newKeys);
    dc.state='drop';
    dc.anim={phase:'drop',start:performance.now(),dur:340};
    dc.rafId=requestAnimationFrame(dcLoop);

  } else if(phase==='drop'){
    dc.dropMap=null;
    // Java: while(crushMatches()) — chain check
    dcChainStep();
  }
}

/* ── Score + track crushed count + start crush animation ── */
function dcStartCrush(crush){
  dc.crushMask=crush;
  let pts=0;
  for(let r=0;r<DC_ROWS;r++) for(let c=0;c<DC_COLS;c++){
    if(!crush[r][c]) continue;
    const t=dc.board[r][c];
    if(t>=0){
      pts+=DC_TYPES[t]?.base||100000;
      dc.crushedCount[t]++; // Bug 2 fix: track by type
    }
  }
  dc.score+=Math.round(pts*dc.combo*(1+dc.chain*.3));
  dcUpdateHUD();
  spawnScorePop(document.getElementById('go-deudas'),'💥 +$'+(pts/1000).toFixed(0)+'K',window.innerWidth/2,200);
  if(dc.combo>=3) dcFlashCombo();
  dc.state='crush';
  dc.anim={phase:'crush',start:performance.now(),dur:300};
  dcSound('match');
  dc.rafId=requestAnimationFrame(dcLoop);
}

/* ── Build drop animation map ── */
function dcBuildDropMap(newKeys){
  const map=new Map(); // 'r,c' → fromRow (visual start row)
  // Existing cells that moved: check shifted rows
  for(let c=0;c<DC_COLS;c++){
    // Count empty slots from bottom up
    let empties=0;
    for(let r=DC_ROWS-1;r>=0;r--){
      const k=r+','+c;
      if(newKeys.has(k)){ map.set(k,{from:r-(empties||1)}); }  // new cell from above
      else if(dc.board[r][c]!==-1&&empties>0){ map.set(k,{from:r-empties}); } // shifted down
      else if(dc.board[r][c]===-1) empties++;
    }
  }
  // New cells start from off-screen top
  newKeys.forEach(k=>{ if(!map.has(k)){ const[r]=k.split(',').map(Number); map.set(k,{from:r-DC_ROWS}); }});
  return map;
}

/* ── Chain: Java while(crushMatches()), decrementa consolCd ── */
function dcChainStep(){
  if(dc.consolCd>0){ dc.consolCd--; dcUpdateConsolBtn(); }
  const crush=dcCrushMatches();
  if(!crush){ dc.state='idle'; dcCheck(); dcDraw(); return; }
  dc.chain++;
  dc.combo=Math.min(8,dc.combo+1);
  dcSound('cascade');
  if(dc.chain>=2) dcFlashCascade();
  setTimeout(()=>dcStartCrush(crush),60);
}

/* ── Canvas draw ── */
function dcDraw(){
  const{ctx,canvas,cs,board,anim,crushMask,dropMap,sel,state}=dc;
  if(!ctx) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Background grid
  ctx.fillStyle='rgba(255,255,255,.04)';
  dcRR(ctx,0,0,canvas.width,canvas.height,14,true);

  const at=anim?.t??1;

  for(let r=0;r<DC_ROWS;r++){
    for(let c=0;c<DC_COLS;c++){
      const t=board[r][c];
      if(t===-1) continue;

      let dx=c*cs, dy=r*cs, sc2=1, alpha=1;

      // Swap animation
      if(anim?.phase==='swap'){
        const{r1,c1,r2,c2}=anim, e=dcEase(at);
        if(r===r1&&c===c1){ dx+=(c2-c1)*cs*e; dy+=(r2-r1)*cs*e; }
        else if(r===r2&&c===c2){ dx+=(c1-c2)*cs*e; dy+=(r1-r2)*cs*e; }
      }

      // Crush animation — scale/fade matched cells
      if(anim?.phase==='crush'&&crushMask?.[r]?.[c]){
        sc2=1-at; alpha=1-at;
        if(sc2<=0) continue;
      }

      // Drop animation
      if(anim?.phase==='drop'){
        const info=dropMap?.get(r+','+c);
        if(info){ dy=(info.from+(r-info.from)*dcEaseBounce(at))*cs; }
      }

      // Shake animation — translate canvas-wide via transform, don't touch dy
      // (handled in dcDraw via canvas.style.transform)
      if(state==='shake'&&anim?.phase==='shake'){
        const wobble=Math.sin(at*Math.PI*4)*10*(1-at);
        dc.canvas.style.transform=`translateX(${wobble}px)`;
      }

      ctx.save();
      ctx.globalAlpha=alpha;
      const pad=cs*.055, inW=cs-2*pad, inH=cs-2*pad;
      const cx=dx+cs/2, cy=dy+cs/2;

      if(sc2!==1){
        ctx.translate(cx,cy);
        ctx.scale(sc2,sc2);
        ctx.translate(-cx,-cy);
      }

      const dt=DC_TYPES[t];
      // Cell body
      ctx.fillStyle=dt.bg;
      dcRR(ctx,dx+pad,dy+pad,inW,inH,9,true);
      // Shine
      ctx.fillStyle=dt.hi;
      dcRR(ctx,dx+pad,dy+pad,inW*.7,inH*.36,7,true);
      // Border glow for selection
      if(sel&&sel[0]===r&&sel[1]===c&&state==='idle'){
        ctx.strokeStyle='#fff';
        ctx.lineWidth=2.5;
        ctx.shadowColor='#fff';
        ctx.shadowBlur=8;
        dcRR(ctx,dx+pad,dy+pad,inW,inH,9,false);
        ctx.shadowBlur=0;
      }
      // Emoji normal
      ctx.font=`${cs*.44}px serif`;
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(dt.icon,cx,cy+cs*.02);

      // Celdas bloqueadas: overlay encima
      const bk=dc.blocked?.[r]?.[c]||0;
      if(bk>0){
        ctx.fillStyle=bk===2?'rgba(0,0,0,.62)':'rgba(0,0,0,.38)';
        dcRR(ctx,dx+pad,dy+pad,inW,inH,9,true);
        ctx.font=`${cs*.38}px serif`;
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText(bk===2?'🔒':'🔓',cx,cy);
      }

      ctx.restore();
    }
  }

  // Modo consolidación: highlight de fila bajo el cursor
  if(dc.consolMode){
    ctx.save();
    ctx.fillStyle='rgba(245,184,0,.18)';
    for(let rr=0;rr<DC_ROWS;rr++){
      ctx.fillRect(0,rr*cs,W,cs);
    }
    // Indicador "elige una fila"
    ctx.font='bold 13px "Bricolage Grotesque",sans-serif';
    ctx.fillStyle='rgba(245,184,0,.9)'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('🔱 Toca una fila para consolidar',W/2,H/2);
    ctx.restore();
  }
}

function dcUpdateHUD(){
  const s=dc.score;
  const fmt=v=>'$'+(v>=1000000?(v/1000000).toFixed(1)+'M':v.toLocaleString('es-CL'));
  const str=fmt(s);
  document.getElementById('dc-paid').textContent=str;
  document.getElementById('dc-moves').textContent=dc.moves;
  document.getElementById('dc-combo').textContent=dc.combo;
  const pct=Math.min(100,s/dc.goal*100);
  document.getElementById('dc-prog').style.width=pct+'%';
  document.getElementById('dc-goal-fill').style.width=pct+'%';
  document.getElementById('dc-goal-text').textContent=str+' / '+fmt(dc.goal);
  const lvlEl=document.getElementById('dc-level-txt');
  if(lvlEl) lvlEl.textContent='Nivel '+dc.level;
}

/* ── Consolidación: limpiar fila entera (niveles 6+) ── */
function dcConsolidacion(){
  if(dc.state!=='idle'||dc.moves<3||dc.consolCd>0) return;
  if(dc.consolMode){ dc.consolMode=false; dcUpdateConsolBtn(); dcDraw(); return; }
  dc.consolMode=true;
  dcUpdateConsolBtn();
  dcDraw();
}
function dcUpdateConsolBtn(){
  const btn=document.getElementById('dc-consol-btn');
  const cd=document.getElementById('dc-consol-cd');
  if(!btn) return;
  const canUse=dc.state==='idle'&&dc.moves>=3&&dc.consolCd<=0;
  btn.disabled=!canUse;
  btn.classList.toggle('selecting',!!dc.consolMode);
  if(cd) cd.textContent=dc.consolCd>0?`(en ${dc.consolCd} mov)`:'(cuesta 3 mov)';
}
function dcFireConsolidacion(row){
  dc.consolMode=false;
  dc.consolCd=5; // cooldown: 5 movimientos
  dc.moves-=3; dc.combo=1; dc.chain=0;
  // Construir crush mask para toda la fila (solo celdas no bloqueadas)
  const crush=Array.from({length:DC_ROWS},()=>new Uint8Array(DC_COLS));
  for(let c=0;c<DC_COLS;c++) if(!dc.blocked[row][c]&&dc.board[row][c]>=0) crush[row][c]=1;
  dcUpdateHUD();
  dcUpdateConsolBtn();
  dcStartCrush(crush);
}

function dcFlashCombo(){
  const msgs=['','','','🔥 COMBO!','⚡ SÚPER!','🌟 ULTRA!','💎 MEGA!','🚀 GOD!'];
  const el=document.createElement('div');
  el.className='dc-combo-flash';
  el.textContent=(msgs[Math.min(dc.combo,7)]||'🔥')+' x'+dc.combo;
  document.getElementById('go-deudas').appendChild(el);
  setTimeout(()=>el.remove(),750);
}
function dcFlashCascade(){
  const el=document.createElement('div');
  el.className='dc-cascade-flash';
  el.textContent='⛓️ CADENA x'+dc.chain+'!';
  document.getElementById('go-deudas').appendChild(el);
  setTimeout(()=>el.remove(),650);
}

/* ── Bug 1 fix: check win/lose, pause game, show correct screen ── */
function dcCheck(){
  if(dc.state==='won'||dc.state==='lost') return;
  if(dc.score>=dc.goal){
    dc.state='won';
    if(dc.timerInt){ clearInterval(dc.timerInt); dc.timerInt=null; }
    dc.level=(dc.level||1)+1; // incrementar para el próximo nivel
    dcShowWinFlow();
  } else if(dc.moves<=0){
    dc.state='lost';
    dcShowLoseScreen('😰','¡Sin movimientos!');
  }
}

function dcShowLoseScreen(icon,title){
  if(dc.timerInt){ clearInterval(dc.timerInt); dc.timerInt=null; }
  const fmt=v=>'$'+(v>=1e6?(v/1e6).toFixed(1)+'M':v.toLocaleString('es-CL'));
  document.getElementById('dc-res-icon').textContent=icon;
  document.getElementById('dc-res-title').textContent=title;
  document.getElementById('dc-res-sub').textContent=
    'Pagaste '+fmt(dc.score)+' de '+fmt(dc.goal)+' · ¡Inténtalo de nuevo!';
  document.getElementById('dc-lesson').style.display='none';
  document.getElementById('dc-res-fact').style.display='none';
  const btn=document.getElementById('dc-main-btn');
  btn.textContent='🔄 Reintentar nivel'; btn.onclick=()=>{ dc.level=Math.max(1,(dc.level||1)-1); initDC(); };
  showRiveEmoji('dc-rive','Mindblown');
  document.getElementById('dc-result').classList.add('show');
}

/* ── Flujo de victoria: resultado + lección post-nivel ── */
const DC_LESSONS=[
  { type:'VISA 18%', // 0
    q:'¿Cuánto pagas de interés al año con $500.000 en tu VISA al 18%?',
    opts:['$45.000','$90.000','$180.000'],ans:1,
    ok:'✅ ¡Correcto! 18% × $500.000 = $90.000 en intereses al año. ¡Paga siempre más del mínimo!',
    fail:'❌ Son $90.000 (18% × $500.000). Por eso la VISA es de las deudas más caras que existen.' },
  { type:'CAE UF+2%', // 1
    q:'¿Qué conviene más para liquidar el CAE antes de lo previsto?',
    opts:['Pago mínimo mensual','Abono a capital cuando puedas','Da igual, el plazo es fijo'],ans:1,
    ok:'✅ ¡Exacto! El abono a capital reduce el saldo base → menos intereses futuros → terminas antes.',
    fail:'❌ El abono a capital baja la base sobre la que se calcula el interés mensual. Siempre conviene.' },
  { type:'Consumo 35%', // 2
    q:'Tienes 3 deudas de consumo. ¿Cuál atacas primero para pagar menos intereses?',
    opts:['La más pequeña','La más grande','La de mayor tasa de interés'],ans:2,
    ok:'✅ ¡Bien! Método "avalancha": paga primero la de mayor tasa → ahorras más intereses totales.',
    fail:'❌ Atacar la de mayor tasa (método avalancha) minimiza el total de intereses pagados.' },
  { type:'Auto 12%', // 3
    q:'Crédito auto de $5.000.000 al 12% anual. ¿Cuánto es el interés del primer mes?',
    opts:['$10.000','$50.000','$120.000'],ans:1,
    ok:'✅ ¡Correcto! 12% ÷ 12 meses = 1% mensual. 1% × $5.000.000 = $50.000 solo de interés.',
    fail:'❌ 12% anual ÷ 12 = 1% mensual → $50.000 que no van a capital en el primer mes.' },
  { type:'Casa 4%', // 4
    q:'¿Por qué conviene hacer abonos extraordinarios al dividendo hipotecario?',
    opts:['Mejora tu score bancario','Reduce años y total de intereses','El banco baja la tasa'],ans:1,
    ok:'✅ Un abono extra de $500.000 puede ahorrarte años de plazo y millones en intereses totales.',
    fail:'❌ Al abonar a capital, cada cuota futura tiene menos interés → pagas menos total y terminas antes.' },
  { type:'Tienda 52%!', // 5
    q:'Deuda de $200.000 en Ripley pagando solo el mínimo (10%), ¿cuánto tarda en pagarse?',
    opts:['6 meses','1 año','Más de 3 años'],ans:2,
    ok:'✅ ¡Correcto! Al 52% anual y mínimos, la deuda nunca baja de verdad. ¡Siempre más del mínimo!',
    fail:'❌ Al 52% anual con mínimos puede durar 3-5+ años. La deuda más cara de Chile.' },
];

function dcTopCrushedType(){
  let best=0;
  for(let i=1;i<dc.crushedCount.length;i++) if(dc.crushedCount[i]>dc.crushedCount[best]) best=i;
  return best;
}

function dcShowWinFlow(){
  const fmt=v=>'$'+(v>=1e6?(v/1e6).toFixed(1)+'M':v.toLocaleString('es-CL'));
  document.getElementById('dc-res-icon').textContent='💰';
  document.getElementById('dc-res-title').textContent=`¡Nivel ${dc.level-1} superado!`;
  document.getElementById('dc-res-sub').textContent=
    'Aplastaste '+fmt(dc.score)+' con '+dc.moves+' mov. restantes';

  // Lección relacionada al tipo más aplastado
  const topType=dcTopCrushedType();
  const lesson=DC_LESSONS[topType];
  dcRenderLesson(lesson);

  // Botón principal: se activa solo tras responder correctamente
  const btn=document.getElementById('dc-main-btn');
  btn.textContent='Siguiente nivel →';
  btn.onclick=dcNextLevel;
  btn.style.display='none'; // se muestra al responder bien

  document.getElementById('dc-res-fact').style.display='none';
  showRiveEmoji('dc-rive','Tada'); dcSound('win');
  if(typeof coins==='function') coins({clientX:window.innerWidth/2,clientY:window.innerHeight/3});
  document.getElementById('dc-result').classList.add('show');
}

function dcRenderLesson(lesson){
  const wrap=document.getElementById('dc-lesson');
  wrap.style.display='block';
  document.getElementById('dc-lesson-q').textContent=lesson.q;
  document.getElementById('dc-lesson-fb').style.display='none';
  document.getElementById('dc-lesson-fb').className='dc-lesson-fb';
  const optsEl=document.getElementById('dc-lesson-opts');
  optsEl.innerHTML='';
  lesson.opts.forEach((opt,i)=>{
    const btn=document.createElement('button');
    btn.className='dc-lesson-opt';
    btn.innerHTML=`<span class="opt-letter">${String.fromCharCode(65+i)}</span>${opt}`;
    btn.onclick=()=>dcAnswerLesson(i,lesson);
    optsEl.appendChild(btn);
  });
}

function dcAnswerLesson(i, lesson){
  // Deshabilitar todos los botones
  document.querySelectorAll('.dc-lesson-opt').forEach(b=>b.disabled=true);
  const btns=document.querySelectorAll('.dc-lesson-opt');
  const fb=document.getElementById('dc-lesson-fb');
  const mainBtn=document.getElementById('dc-main-btn');
  if(i===lesson.ans){
    btns[i].classList.add('correct');
    fb.textContent=lesson.ok;
    fb.className='dc-lesson-fb ok'; fb.style.display='block';
    mainBtn.style.display='block'; // desbloquea "Siguiente nivel"
    dcSound('win');
  } else {
    btns[i].classList.add('wrong');
    btns[lesson.ans].classList.add('correct');
    fb.innerHTML=lesson.fail+'<br><button class="dc-lesson-opt" style="margin-top:8px;width:100%;justify-content:center;" onclick="dcRetryLesson()">🔄 Reintentar</button>';
    fb.className='dc-lesson-fb bad'; fb.style.display='block';
  }
}

function dcRetryLesson(){
  const topType=dcTopCrushedType();
  dcRenderLesson(DC_LESSONS[topType]);
}

function dcNextLevel(){ initDC(); }

function dcMainAction(){
  // fallback — no debería usarse directamente
  if(dc.state==='won') dcNextLevel();
  else { dc.level=Math.max(1,(dc.level||1)-1); initDC(); }
}
/* ── DebtCrusher: redimensiona canvas al cambiar tamaño de ventana ── */
let _dcResizeTimer=null;
window.addEventListener('resize',()=>{
  clearTimeout(_dcResizeTimer);
  _dcResizeTimer=setTimeout(()=>{
    // Solo actuar si el overlay está abierto y el juego está en curso
    const overlay=document.getElementById('go-deudas');
    if(!overlay||!overlay.classList.contains('open')) return;
    if(!dc.ctx||dc.state==='idle'||dc.state==='swap') dcApplySize();
  },120);
});
