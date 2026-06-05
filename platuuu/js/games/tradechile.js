/* ═══════════════════════════
   📈 TRADECHILE
═══════════════════════════ */
const TC_COS = [
  {name:'Banco de Chile',ticker:'BCH',icon:'🏦',bg:'#1A3A6B',base:9840,fact:'Tasa máxima crédito consumo en Chile: ~35% anual (CMF 2026).'},
  {name:'Falabella',ticker:'FAL',icon:'🛍️',bg:'#2E7D32',base:850,fact:'Tiendas por departamento cobran hasta 52% anual según CMF 2026.'},
  {name:'SQM (Litio)',ticker:'SQM',icon:'⚗️',bg:'#6B3A1A',base:28400,fact:'Chile tiene el 44% de las reservas mundiales de litio.'},
  {name:'Entel',ticker:'ETL',icon:'📡',bg:'#1A3A6B',base:3200,fact:'Los fondos mutuos de renta variable rentaron ~14.2% en 2025 (CMF).'},
  {name:'Copec',ticker:'COP',icon:'⛽',bg:'#7A1A1A',base:7100,fact:'El IPSA subió ~18% en 2025, superando al S&P500 de USA.'},
  {name:'BCI',ticker:'BCI',icon:'🏛️',bg:'#1A2E7D',base:32000,fact:'El APV te da descuento de hasta 50% en el impuesto anual en Chile.'},
  {name:'Cencosud',ticker:'CEN',icon:'🏪',bg:'#2E1A7D',base:1450,fact:'La inflación en Chile es 4.2% anual (2026), meta BC es 3%.'},
  {name:'LATAM',ticker:'LTM',icon:'✈️',bg:'#7D1A1A',base:5600,fact:'El Banco Central de Chile tiene la tasa de política monetaria en 4.75%.'},
];
const TC_NEWS = [
  {txt:'Banco Central baja tasa 25 pb a 4.75%',hint:'📈 Positivo para acciones',s:1},
  {txt:'Inflación sube a 4.2%, sobre meta del 3%',hint:'📉 Presión sobre activos',s:-1},
  {txt:'CMF aprueba nueva normativa de fondos mutuos',hint:'📈 Buenas noticias sector',s:0.8},
  {txt:'Cobre baja 3% en mercados internacionales',hint:'📉 Presión sobre mineras',s:-0.8},
  {txt:'Chile firma TLC con nuevos mercados asiáticos',hint:'📈 Positivo exportadoras',s:1},
  {txt:'Desempleo sube a 8.5% según INE',hint:'📉 Señal de desaceleración',s:-0.5},
  {txt:'SQM anuncia récord de ventas de litio',hint:'📈 Muy positivo mineras',s:1.2},
  {txt:'IPSA cierra en baja arrastrado por bancos',hint:'📉 Sector financiero bajo',s:-0.8},
];

let tcState={}, tcTimerInt=null;

function initTC() {
  document.getElementById('tc-result').classList.remove('show');
  // Escalar dificultad según targetLevel del mapa (más rondas y menos tiempo)
  let maxR=8, timerSec=15, startCash=1000000;
  try {
    const _pend = localStorage.getItem('pm_pending');
    if (_pend) {
      const { targetLevel } = JSON.parse(_pend);
      if (targetLevel === 2) { maxR=10; timerSec=13; }
      else if (targetLevel === 3) { maxR=12; timerSec=11; startCash=800000; }
      else if (targetLevel === 4) { maxR=14; timerSec=10; startCash=600000; }
    }
  } catch(e) {}
  tcState={round:1,maxR,cash:startCash,shares:0,price:0,co:null,hist:[],timer:timerSec,_won:false};
  tcNextRound();
}
function tcNextRound(){
  clearInterval(tcTimerInt);
  if(tcState.round>tcState.maxR){tcEndGame();return;}
  const co=TC_COS[(tcState.round-1)%TC_COS.length];
  tcState.co=co;
  tcState.price=Math.round(co.base*(0.85+Math.random()*.3));
  tcState.hist=[];
  let p=tcState.price*(0.85+Math.random()*.1);
  for(let i=0;i<20;i++){p=p*(0.97+Math.random()*.06);tcState.hist.push(Math.round(p));}
  tcState.hist.push(tcState.price);
  const news=TC_NEWS[Math.floor(Math.random()*TC_NEWS.length)];
  document.getElementById('tc-logo').textContent=co.icon;
  document.getElementById('tc-logo').style.background=co.bg;
  document.getElementById('tc-name').textContent=co.name;
  document.getElementById('tc-ticker').textContent=co.ticker+' · IPSA';
  document.getElementById('tc-price').textContent='$'+tcState.price.toLocaleString('es-CL');
  document.getElementById('tc-ntxt').textContent=news.txt;
  const nh=document.getElementById('tc-nhint');
  nh.textContent=news.hint; nh.style.color=news.s>0?'#2ECC71':'#E74C3C';
  // Power-up pending: mostrar pista si fue comprada en la tienda
  if (localStorage.getItem('pm_pu_tc_hint')) { nh.style.display='block'; localStorage.removeItem('pm_pu_tc_hint'); }
  else { nh.style.display='none'; }
  document.getElementById('tc-fact').textContent='📚 '+co.fact;
  document.getElementById('tc-rnd').textContent=tcState.round;
  document.getElementById('tc-prog').style.width=((tcState.round-1)/tcState.maxR*100)+'%';
  const pct=((tcState.hist[tcState.hist.length-1]/tcState.hist[0]-1)*100).toFixed(1);
  const chgEl=document.getElementById('tc-chg');
  chgEl.className='tc-chg '+(pct>=0?'up':'down');
  chgEl.textContent=(pct>=0?'▲ +':'▼ ')+pct+'%';
  tcUpdatePort();
  tcDrawChart();
  // Timer
  tcState.timer=15;
  const tfill=document.getElementById('tc-tfill');
  tcTimerInt=setInterval(()=>{
    tcState.timer--;
    tfill.style.width=(tcState.timer/15*100)+'%';
    if(tcState.timer<=0){clearInterval(tcTimerInt);tcSimulate();}
  },1000);
}
function tcUpdatePort(){
  const val=tcState.cash+tcState.shares*tcState.price;
  document.getElementById('tc-port').textContent='$'+val.toLocaleString('es-CL');
  document.getElementById('tc-cash').textContent='$'+tcState.cash.toLocaleString('es-CL');
  document.getElementById('tc-shares').textContent=tcState.shares+(tcState.shares>0?' acc':'');
  const ret=((val/1000000-1)*100).toFixed(1);
  const retEl=document.getElementById('tc-ret');
  retEl.textContent=(ret>=0?'+':'')+ret+'%';
  retEl.style.color=ret>=0?'#2ECC71':'#E74C3C';
}
function tcTrade(action){
  clearInterval(tcTimerInt);
  if(action==='buy'&&tcState.cash>=tcState.price){
    const qty=Math.floor(tcState.cash*0.8/tcState.price);
    tcState.shares+=qty; tcState.cash-=qty*tcState.price;
    spawnScorePop(document.getElementById('go-inversion'),'📈 +'+qty+' acc',window.innerWidth/2,200);
  } else if(action==='sell'&&tcState.shares>0){
    tcState.cash+=tcState.shares*tcState.price;
    spawnScorePop(document.getElementById('go-inversion'),'💵 +$'+(tcState.shares*tcState.price).toLocaleString('es-CL'),window.innerWidth/2,200);
    tcState.shares=0;
  }
  tcUpdatePort(); tcSimulate();
}
function tcSimulate(){
  const news=TC_NEWS[Math.floor(Math.random()*TC_NEWS.length)];
  tcState.price=Math.round(tcState.price*(0.93+Math.random()*.14+(news.s*.02)));
  tcState.hist.push(tcState.price);
  if(tcState.hist.length>25)tcState.hist.shift();
  tcDrawChart(); tcState.round++;
  setTimeout(tcNextRound,700);
}
function tcDrawChart(){
  const canvas=document.getElementById('tcChart');
  const ctx=canvas.getContext('2d');
  const dpr=window.devicePixelRatio||1;
  const w=canvas.offsetWidth||320,h=140;
  canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';
  ctx.scale(dpr,dpr);
  const prices=tcState.hist;
  const min=Math.min(...prices)*.99,max=Math.max(...prices)*1.01,range=max-min;
  ctx.clearRect(0,0,w,h);
  const isUp=prices[prices.length-1]>=prices[0];
  const grad=ctx.createLinearGradient(0,0,0,h);
  grad.addColorStop(0,isUp?'rgba(46,204,113,.25)':'rgba(231,76,60,.25)');
  grad.addColorStop(1,'rgba(0,0,0,0)');
  ctx.beginPath();
  prices.forEach((p,i)=>{const x=i/(prices.length-1)*w,y=h-((p-min)/range*(h-16))-8;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);});
  ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
  ctx.beginPath();
  prices.forEach((p,i)=>{const x=i/(prices.length-1)*w,y=h-((p-min)/range*(h-16))-8;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);});
  ctx.strokeStyle=isUp?'#2ECC71':'#E74C3C';ctx.lineWidth=2.5;ctx.stroke();
}
function tcEndGame(){
  clearInterval(tcTimerInt);
  const final=tcState.cash+tcState.shares*tcState.price;
  const ret=((final/1000000-1)*100).toFixed(1);
  const won=final>1000000;
  if(won) tcState._won=true;
  document.getElementById('tc-res-icon').textContent=won?'🏆':'😅';
  document.getElementById('tc-res-title').textContent=won?'¡Buen inversor!':'¡Sigue aprendiendo!';
  document.getElementById('tc-res-sub').textContent='Cartera final: $'+final.toLocaleString('es-CL')+' · Retorno: '+(ret>=0?'+':'')+ret+'%';
  document.getElementById('tc-result').classList.add('show');
}
