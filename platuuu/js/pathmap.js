/* ════════════════════════════════
   PATH MAP — Mapa de caminos
════════════════════════════════ */

const CMF_API_KEY = '5db8ce1dbbb31c6886d26ccc2d5665d122a77141';

const PATH_DATA = {
  ahorro: {
    name: '💰 Guardar tu plata',
    color: '#FFC700',
    sections: [
      { firstNodeId:'a1',  stageNum:'1.1', stageId:1, stageName:'Primeros pasos del ahorro', stageIcon:'🌱', stageBg:'linear-gradient(135deg,#F0FFF4,#DCFCE7)', icon:'💡', label:'¿Qué es ahorrar?',           desc:'Aprende los fundamentos del ahorro y pon en práctica la regla 50/30/20' },
      { firstNodeId:'a6',  stageNum:'1.2', stageId:1, icon:'🛠️', label:'Herramientas de ahorro',      desc:'Descubre el APV y el fondo de emergencia para proteger tu futuro' },
      { firstNodeId:'a11', stageNum:'2.1', stageId:2, stageName:'Ahorro avanzado',             stageIcon:'🚀', stageBg:'linear-gradient(135deg,#FFFDF0,#FEF9C3)', icon:'📈', label:'Instrumentos financieros',    desc:'Cuenta Vista vs Corriente y fondos mutuos para hacer crecer tu dinero' },
      { firstNodeId:'a16', stageNum:'2.2', stageId:2, icon:'🤖', label:'Hábitos que cambian tu vida', desc:'Ahorro automático e inversión para construir tu libertad financiera' },
      /* ── Etapa 3 ── */
      { firstNodeId:'a21', stageNum:'3.1', stageId:3, stageName:'Hábitos que duran', stageIcon:'💪', stageBg:'linear-gradient(135deg,#EFF6FF,#DBEAFE)', icon:'🤖', label:'Págate a ti primero', desc:'Ahorro automático y transferencias programadas — el sistema que funciona solo' },
      { firstNodeId:'a24', stageNum:'3.2', stageId:3, icon:'🐜', label:'Gastos hormiga', desc:'Identifica y elimina los gastos pequeños que destruyen tu presupuesto' },
      { firstNodeId:'a27', stageNum:'3.3', stageId:3, icon:'✨', label:'El interés compuesto', desc:'El octavo milagro del mundo — cómo el tiempo multiplica tu dinero' },
      { firstNodeId:'a29', stageNum:'3.4', stageId:3, icon:'🎯', label:'Metas de ahorro', desc:'Corto y largo plazo — define metas concretas con fecha y monto' },
      { firstNodeId:'a32', stageNum:'3.5', stageId:3, icon:'🏅', label:'Cierre Etapa 3', desc:'Repaso de hábitos, desafío real y cofre grande — ¡hábito formado!' },
    ],
    nodes: [
      /* ── Etapa 1 · Sección 1.1 ── */
      { id:'a1',  type:'lesson', icon:'📚', label:'¿Qué es ahorrar?',           desc:'Aprende por qué ahorrar es el primer paso hacia la libertad financiera.', cost:0 },
      { id:'a2',  type:'game',   icon:'🎰', label:'CoinSpín',                    desc:'Gira la ruleta y acumula fichas de ahorro.', cost:0, game:'ahorro', level:1 },
      { id:'a3',  type:'lesson', icon:'📚', label:'Regla 50/30/20',              desc:'El método más simple para ordenar tu sueldo desde hoy.', cost:0 },
      { id:'a4',  type:'game',   icon:'🎰', label:'CoinSpín nivel 2',            desc:'Pon a prueba tus hábitos de ahorro.', cost:3, game:'ahorro', level:2 },
      { id:'a5',  type:'chest',  icon:'🎁', label:'Cofre',                       desc:'¡Recompensa desbloqueada! +50 XP +10 fichas', cost:0, coins:10 },
      /* ── Etapa 1 · Sección 1.2 ── */
      { id:'a6',  type:'lesson', icon:'📚', label:'¿Qué es el APV?',             desc:'El APV te da beneficios tributarios para ahorrar más.', cost:0 },
      { id:'a7',  type:'game',   icon:'🎰', label:'CoinSpín nivel 3',            desc:'Sube de nivel en tu alcancía.', cost:3, game:'ahorro', level:3 },
      { id:'a8',  type:'lesson', icon:'📚', label:'Fondo de emergencia',         desc:'¿Cuánto debes tener guardado para imprevistos?', cost:0 },
      { id:'a9',  type:'game',   icon:'🎰', label:'CoinSpín nivel 4',            desc:'Domina el ahorro disciplinado.', cost:3, game:'ahorro', level:4 },
      { id:'a10', type:'chest',  icon:'🎁', label:'Cofre',                       desc:'¡Recompensa desbloqueada! +75 XP +15 fichas', cost:0, coins:15 },
      /* ── Etapa 2 · Sección 2.1 ── */
      { id:'a11', type:'lesson', icon:'📚', label:'Cuenta Vista vs Corriente',   desc:'Una mala elección puede costarte miles al año en comisiones.', cost:0 },
      { id:'a12', type:'game',   icon:'🎰', label:'CoinSpín nivel 5',            desc:'Sube al siguiente nivel de ahorro.', cost:3, game:'ahorro', level:5 },
      { id:'a13', type:'lesson', icon:'📚', label:'¿Qué son los fondos mutuos?', desc:'Invierte junto a miles de personas desde $1.000 CLP.', cost:0 },
      { id:'a14', type:'game',   icon:'🎰', label:'CoinSpín nivel 6',            desc:'Pon a prueba tus conocimientos de inversión.', cost:3, game:'ahorro', level:6 },
      { id:'a15', type:'chest',  icon:'🎁', label:'Cofre',                       desc:'¡Recompensa desbloqueada! +100 XP +20 fichas', cost:0, coins:20 },
      /* ── Etapa 2 · Sección 2.2 ── */
      { id:'a16', type:'lesson', icon:'📚', label:'Ahorro automático',           desc:'El secreto de los mejores ahorradores.', cost:0 },
      { id:'a17', type:'game',   icon:'🎰', label:'CoinSpín nivel 7',            desc:'Automatiza tu ahorro con práctica.', cost:3, game:'ahorro', level:7 },
      { id:'a18', type:'lesson', icon:'📚', label:'Inversión vs Ahorro',         desc:'¿Sabes la diferencia? Confundirlos puede costarte años.', cost:0 },
      { id:'a19', type:'game',   icon:'🎰', label:'CoinSpín nivel 8',            desc:'Ronda final del camino avanzado.', cost:3, game:'ahorro', level:8 },
      { id:'a20', type:'cert',   icon:'🏆', label:'Certificado Final',           desc:'¡Completaste el camino! Eres experto/a en ahorro.', cost:0 },
      /* ── Etapa 3 · Sección 3.1 — Págate a ti primero ── */
      { id:'a21', type:'lesson', icon:'📚', label:'Págate a ti primero',         desc:'El mejor truco de los grandes ahorradores: guardar ANTES de gastar.', cost:0 },
      { id:'a22', type:'lesson', icon:'📚', label:'Transferencias programadas',  desc:'Todos los bancos chilenos permiten programar transferencias automáticas gratis.', cost:0 },
      { id:'a23', type:'game',   icon:'🎰', label:'CoinSpín nivel 9',            desc:'¡Igual que el ahorro automático — constancia da resultados!', cost:3, game:'ahorro', level:9 },
      /* ── Etapa 3 · Sección 3.2 — Gastos hormiga ── */
      { id:'a24', type:'lesson', icon:'📚', label:'¿Qué son los gastos hormiga?',desc:'¿Sabes cuánto gastas en café, delivery y suscripciones al mes?', cost:0 },
      { id:'a25', type:'lesson', icon:'📚', label:'Cómo eliminar gastos hormiga',desc:'Identificar el problema es el primer paso — atacarlo sin sufrir.', cost:0 },
      { id:'a26', type:'chest',  icon:'🎁', label:'Cofre Hábitos',               desc:'¡Recompensa desbloqueada! +50 fichas', cost:0, coins:50 },
      /* ── Etapa 3 · Sección 3.3 — El interés compuesto ── */
      { id:'a27', type:'lesson', icon:'📚', label:'El 8vo milagro del mundo',    desc:'Einstein llamó al interés compuesto el octavo milagro del mundo.', cost:0 },
      { id:'a28', type:'game',   icon:'🎰', label:'CoinSpín nivel 10',           desc:'El interés compuesto en acción — cada ficha te acerca más.', cost:3, game:'ahorro', level:10 },
      /* ── Etapa 3 · Sección 3.4 — Metas de ahorro ── */
      { id:'a29', type:'lesson', icon:'📚', label:'Ahorro a corto plazo',        desc:'Las metas cortas te mantienen motivado con resultados visibles.', cost:0 },
      { id:'a30', type:'lesson', icon:'📚', label:'Ahorro a largo plazo',        desc:'Casa, educación, jubilación — el tiempo es tu mayor ventaja.', cost:0 },
      { id:'a31', type:'chest',  icon:'🎁', label:'Cofre Metas',                 desc:'¡Recompensa desbloqueada! +60 fichas · UF actual CMF', cost:0, coins:60 },
      /* ── Etapa 3 · Sección 3.5 — Cierre ── */
      { id:'a32', type:'lesson', icon:'📚', label:'Repaso: hábitos clave',       desc:'Los 5 hábitos más importantes del ahorro en Chile.', cost:0 },
      { id:'a33', type:'game',   icon:'🎰', label:'CoinSpín nivel 11',           desc:'Constancia y hábito — sigue girando.', cost:3, game:'ahorro', level:11 },
      { id:'a34', type:'lesson', icon:'📚', label:'Desafío de la semana',        desc:'Platín te propone un reto real: anota todos tus gastos esta semana.', cost:0 },
      { id:'a35', type:'chest',  icon:'🎁', label:'Cofre Grande Etapa 3',        desc:'¡Completaste Etapa 3! +200 fichas + badge 💪 Hábito Formado', cost:0, coins:200, badge:'habito_formado' }
    ]
  },
  deudas: {
    name: '💳 Aplasta tus deudas',
    color: '#EF4444',
    sections: [
      { firstNodeId:'d1',  stageNum:'1.1', stageId:1, stageName:'Entiende tus deudas', stageIcon:'🔴', stageBg:'linear-gradient(135deg,#FFF5F5,#FFE4E4)', icon:'📋', label:'Las reglas del juego',       desc:'TMC, método avalancha y las bases para tomar el control de tus deudas' },
      { firstNodeId:'d6',  stageNum:'1.2', stageId:1, icon:'📊', label:'Registros e historial',        desc:'DICOM, consolidación y cómo limpiar tu historial crediticio en Chile' },
      { firstNodeId:'d11', stageNum:'2.1', stageId:2, stageName:'Liquida tus deudas',   stageIcon:'🏆', stageBg:'linear-gradient(135deg,#FFF0EE,#FFE8E6)', icon:'⚡', label:'Estrategias avanzadas',      desc:'Interés compuesto, tarjetas de crédito y cómo negociar con bancos' },
      { firstNodeId:'d16', stageNum:'2.2', stageId:2, icon:'🎯', label:'El camino a la libertad',      desc:'Plan de salida de deudas y pasos concretos para ser libre financieramente' },
    ],
    nodes: [
      /* ── Etapa 1 · Sección 1.1 ── */
      { id:'d1',  type:'lesson', icon:'📚', label:'¿Qué es la TMC?',           desc:'La Tasa Máxima Convencional es el límite legal de interés en Chile.', cost:0 },
      { id:'d2',  type:'game',   icon:'💥', label:'DebtCrusher',                desc:'Aplasta grupos de deuda y gana fichas.', cost:0, game:'deudas', level:1 },
      { id:'d3',  type:'lesson', icon:'📚', label:'Método avalancha',           desc:'Paga primero la deuda con mayor tasa — ahorra más dinero.', cost:0 },
      { id:'d4',  type:'game',   icon:'💥', label:'DebtCrusher nivel 2',        desc:'Nuevos tipos de deuda, más combos.', cost:3, game:'deudas', level:2 },
      { id:'d5',  type:'chest',  icon:'🎁', label:'Cofre',                      desc:'¡Recompensa desbloqueada! +50 XP +10 fichas', cost:0, coins:10 },
      /* ── Etapa 1 · Sección 1.2 ── */
      { id:'d6',  type:'lesson', icon:'📚', label:'¿Qué es el DICOM?',          desc:'Cómo funciona el registro de deudas en Chile y cómo salir.', cost:0 },
      { id:'d7',  type:'game',   icon:'💥', label:'DebtCrusher nivel 3',        desc:'Modo con celdas bloqueadas.', cost:3, game:'deudas', level:3 },
      { id:'d8',  type:'lesson', icon:'📚', label:'Consolidar deudas',          desc:'¿Cuándo conviene juntar todas las deudas en una sola?', cost:0 },
      { id:'d9',  type:'game',   icon:'💥', label:'DebtCrusher nivel 4',        desc:'Ronda final con timer.', cost:3, game:'deudas', level:4 },
      { id:'d10', type:'chest',  icon:'🎁', label:'Cofre',                      desc:'¡Recompensa desbloqueada! +75 XP +15 fichas', cost:0, coins:15 },
      /* ── Etapa 2 · Sección 2.1 ── */
      { id:'d11', type:'lesson', icon:'📚', label:'Interés compuesto',          desc:'La bola de nieve que hace crecer tus deudas sin control.', cost:0 },
      { id:'d12', type:'game',   icon:'💥', label:'DebtCrusher nivel 5',        desc:'Deudas con interés compuesto — más difícil.', cost:3, game:'deudas', level:5 },
      { id:'d13', type:'lesson', icon:'📚', label:'Tarjetas de crédito',        desc:'Cómo evitar que tu tarjeta se convierta en una trampa.', cost:0 },
      { id:'d14', type:'game',   icon:'💥', label:'DebtCrusher nivel 6',        desc:'Nuevos combos y estrategias de consolidación.', cost:3, game:'deudas', level:6 },
      { id:'d15', type:'chest',  icon:'🎁', label:'Cofre',                      desc:'¡Recompensa desbloqueada! +100 XP +20 fichas', cost:0, coins:20 },
      /* ── Etapa 2 · Sección 2.2 ── */
      { id:'d16', type:'lesson', icon:'📚', label:'Negociar con bancos',        desc:'Los bancos prefieren que pagues — eso te da poder para negociar.', cost:0 },
      { id:'d17', type:'game',   icon:'💥', label:'DebtCrusher nivel 7',        desc:'Tablero avanzado con timer y bloqueadas.', cost:3, game:'deudas', level:7 },
      { id:'d18', type:'lesson', icon:'📚', label:'Plan de salida de deudas',   desc:'Un plan concreto para ser libre de deudas en 18 meses.', cost:0 },
      { id:'d19', type:'game',   icon:'💥', label:'DebtCrusher nivel 8',        desc:'Ronda final — demuestra que aplastas cualquier deuda.', cost:3, game:'deudas', level:8 },
      { id:'d20', type:'cert',   icon:'🏆', label:'Certificado Final',          desc:'¡Aplastaste todas las deudas! Eres experto/a en finanzas personales.', cost:0 }
    ]
  },
  inversion: {
    name: '📈 Haz crecer tu dinero',
    color: '#22C55E',
    sections: [
      { firstNodeId:'i1',  stageNum:'1.1', stageId:1, stageName:'Bases de la inversión', stageIcon:'🌱', stageBg:'linear-gradient(135deg,#F0FFF8,#DCFCE7)', icon:'📊', label:'Qué es y cómo funciona',      desc:'Inversión, IPSA y los conceptos clave para empezar a hacer crecer tu dinero' },
      { firstNodeId:'i6',  stageNum:'1.2', stageId:1, icon:'🏦', label:'AFP y ahorro previsional',       desc:'Fondos AFP, APV y cómo maximizar tu pensión desde hoy' },
      { firstNodeId:'i11', stageNum:'2.1', stageId:2, stageName:'Inversión avanzada',    stageIcon:'🚀', stageBg:'linear-gradient(135deg,#F0FFF4,#BBF7D0)', icon:'💹', label:'Instrumentos del mercado',    desc:'ETFs, renta fija y cómo construir una cartera diversificada' },
      { firstNodeId:'i16', stageNum:'2.2', stageId:2, icon:'🎯', label:'Estrategia a largo plazo',       desc:'Horizonte de inversión, riesgo vs retorno y tu plan de independencia financiera' },
    ],
    nodes: [
      /* ── Etapa 1 · Sección 1.1 ── */
      { id:'i1',  type:'lesson', icon:'📚', label:'¿Qué es invertir?',          desc:'La diferencia entre ahorrar e invertir, explicada simple.', cost:0 },
      { id:'i2',  type:'game',   icon:'📈', label:'TradeChile',                  desc:'Compra y vende acciones del IPSA en tiempo real.', cost:0, game:'inversion', level:1 },
      { id:'i3',  type:'lesson', icon:'📚', label:'¿Qué es el IPSA?',            desc:'El índice bursátil más importante de Chile.', cost:0 },
      { id:'i4',  type:'game',   icon:'📈', label:'TradeChile ronda 2',          desc:'Más empresas, más noticias, más decisiones.', cost:3, game:'inversion', level:2 },
      { id:'i5',  type:'chest',  icon:'🎁', label:'Cofre',                       desc:'¡Recompensa desbloqueada! +50 XP +10 fichas', cost:0, coins:10 },
      /* ── Etapa 1 · Sección 1.2 ── */
      { id:'i6',  type:'lesson', icon:'📚', label:'AFP y fondos',                desc:'Cómo funciona tu AFP y qué fondo conviene según tu edad.', cost:0 },
      { id:'i7',  type:'game',   icon:'📈', label:'TradeChile ronda 3',          desc:'Invierte con noticias económicas reales.', cost:3, game:'inversion', level:3 },
      { id:'i8',  type:'lesson', icon:'📚', label:'Fondos mutuos',               desc:'Invierte en fondos colectivos desde $1.000 CLP.', cost:0 },
      { id:'i9',  type:'game',   icon:'📈', label:'TradeChile ronda 4',          desc:'Ronda final — demuestra tu talento inversor.', cost:3, game:'inversion', level:4 },
      { id:'i10', type:'chest',  icon:'🎁', label:'Cofre',                       desc:'¡Recompensa desbloqueada! +75 XP +15 fichas', cost:0, coins:15 },
      /* ── Etapa 2 · Sección 2.1 ── */
      { id:'i11', type:'lesson', icon:'📚', label:'ETFs en Chile',               desc:'Fondos indexados de bajo costo accesibles desde $5.000 CLP.', cost:0 },
      { id:'i12', type:'game',   icon:'📈', label:'TradeChile ronda 5',          desc:'ETFs y renta fija — nuevos instrumentos.', cost:3, game:'inversion', level:5 },
      { id:'i13', type:'lesson', icon:'📚', label:'Renta fija vs variable',      desc:'Bonos del Banco Central vs acciones — cuándo elegir cada uno.', cost:0 },
      { id:'i14', type:'game',   icon:'📈', label:'TradeChile ronda 6',          desc:'Cartera diversificada — múltiples activos.', cost:3, game:'inversion', level:6 },
      { id:'i15', type:'chest',  icon:'🎁', label:'Cofre',                       desc:'¡Recompensa desbloqueada! +100 XP +20 fichas', cost:0, coins:20 },
      /* ── Etapa 2 · Sección 2.2 ── */
      { id:'i16', type:'lesson', icon:'📚', label:'Riesgo vs retorno',           desc:'La relación fundamental que todo inversor debe entender.', cost:0 },
      { id:'i17', type:'game',   icon:'📈', label:'TradeChile ronda 7',          desc:'Gestión de riesgo — stop loss y diversificación.', cost:3, game:'inversion', level:7 },
      { id:'i18', type:'lesson', icon:'📚', label:'Tu plan de inversión',        desc:'Cómo construir un portafolio según tu edad y objetivos.', cost:0 },
      { id:'i19', type:'game',   icon:'📈', label:'TradeChile ronda 8',          desc:'Simulación final de portafolio.', cost:3, game:'inversion', level:8 },
      { id:'i20', type:'cert',   icon:'🏆', label:'Certificado Final',           desc:'¡Completaste el camino! Eres un/a inversor/a hábil.', cost:0 }
    ]
  },
  presupuesto: {
    name: '📊 Ordena tus gastos',
    color: '#7C3AED',
    sections: [
      { firstNodeId:'p1',  stageNum:'1.1', stageId:1, stageName:'Fundamentos del presupuesto', stageIcon:'📋', stageBg:'linear-gradient(135deg,#FAF5FF,#EDE9FE)', icon:'💡', label:'Qué es y por qué importa',     desc:'Presupuesto, gastos hormiga y las bases para controlar tu plata' },
      { firstNodeId:'p6',  stageNum:'1.2', stageId:1, icon:'⚖️', label:'Métodos de control',             desc:'Presupuesto base cero y ahorro automático para ordenar cada peso' },
      { firstNodeId:'p11', stageNum:'2.1', stageId:2, stageName:'Presupuesto avanzado',         stageIcon:'🚀', stageBg:'linear-gradient(135deg,#F5F3FF,#DDD6FE)', icon:'📱', label:'Categorías y herramientas',      desc:'Categorías de gastos, apps de presupuesto y datos reales de la CMF' },
      { firstNodeId:'p16', stageNum:'2.2', stageId:2, icon:'🏆', label:'Libertad financiera',             desc:'Independencia financiera, objetivos a largo plazo y tu plan de vida' },
    ],
    nodes: [
      /* ── Etapa 1 · Sección 1.1 ── */
      { id:'p1',  type:'lesson', icon:'📚', label:'¿Qué es presupuestar?',      desc:'Controlar tus gastos es el primer paso para no llegar pelado a fin de mes.', cost:0 },
      { id:'p2',  type:'game',   icon:'🃏', label:'BudgetSwipe',                desc:'Arrastra tus gastos a la categoría correcta.', cost:0, game:'presupuesto', level:1 },
      { id:'p3',  type:'lesson', icon:'📚', label:'Gastos hormiga',             desc:'Los gastos pequeños y frecuentes que destruyen tu presupuesto.', cost:0 },
      { id:'p4',  type:'game',   icon:'🃏', label:'BudgetSwipe ronda 2',        desc:'Gastos más difíciles de categorizar.', cost:3, game:'presupuesto', level:2 },
      { id:'p5',  type:'chest',  icon:'🎁', label:'Cofre',                      desc:'¡Recompensa desbloqueada! +50 XP +10 fichas', cost:0, coins:10 },
      /* ── Etapa 1 · Sección 1.2 ── */
      { id:'p6',  type:'lesson', icon:'📚', label:'Presupuesto base cero',      desc:'Asigna cada peso a una categoría — nada queda sin destino.', cost:0 },
      { id:'p7',  type:'game',   icon:'🃏', label:'BudgetSwipe ronda 3',        desc:'Modo contrarreloj.', cost:3, game:'presupuesto', level:3 },
      { id:'p8',  type:'lesson', icon:'📚', label:'Ahorro automático',          desc:'Configura transferencias automáticas para ahorrar sin pensar.', cost:0 },
      { id:'p9',  type:'game',   icon:'🃏', label:'BudgetSwipe ronda 4',        desc:'Ronda final del presupuesto.', cost:3, game:'presupuesto', level:4 },
      { id:'p10', type:'chest',  icon:'🎁', label:'Cofre',                      desc:'¡Recompensa desbloqueada! +75 XP +15 fichas', cost:0, coins:15 },
      /* ── Etapa 2 · Sección 2.1 ── */
      { id:'p11', type:'lesson', icon:'📚', label:'Categorías de gastos',       desc:'Necesidades, gustos y ahorro — la trinidad del presupuesto.', cost:0 },
      { id:'p12', type:'game',   icon:'🃏', label:'BudgetSwipe ronda 5',        desc:'Categorías avanzadas — gastos mixtos.', cost:3, game:'presupuesto', level:5 },
      { id:'p13', type:'lesson', icon:'📚', label:'El 60% de los chilenos',     desc:'Por qué la mayoría llega justo a fin de mes — y cómo evitarlo.', cost:0 },
      { id:'p14', type:'game',   icon:'🃏', label:'BudgetSwipe ronda 6',        desc:'Presupuesto con ingresos variables.', cost:3, game:'presupuesto', level:6 },
      { id:'p15', type:'chest',  icon:'🎁', label:'Cofre',                      desc:'¡Recompensa desbloqueada! +100 XP +20 fichas', cost:0, coins:20 },
      /* ── Etapa 2 · Sección 2.2 ── */
      { id:'p16', type:'lesson', icon:'📚', label:'Regla del 1%',               desc:'Cómo pequeños cambios diarios generan grandes resultados anuales.', cost:0 },
      { id:'p17', type:'game',   icon:'🃏', label:'BudgetSwipe ronda 7',        desc:'Modo experto — presupuesto anual.', cost:3, game:'presupuesto', level:7 },
      { id:'p18', type:'lesson', icon:'📚', label:'Tu plan de independencia',   desc:'Los pasos concretos hacia la libertad financiera en Chile.', cost:0 },
      { id:'p19', type:'game',   icon:'🃏', label:'BudgetSwipe ronda 8',        desc:'Ronda final del maestro del presupuesto.', cost:3, game:'presupuesto', level:8 },
      { id:'p20', type:'cert',   icon:'🏆', label:'Certificado Final',          desc:'¡Completaste el camino! Eres maestro/a del presupuesto.', cost:0 }
    ]
  }
};

const PM_MAX_LIVES = 5;
const PM_LIVES_ENABLED = false; // cambiar a true para activar el sistema de vidas
const PM_LIFE_REGEN_MS = 5 * 60 * 60 * 1000; // 5 horas

function pmLoadLives() {
  const stored = localStorage.getItem('pm_lives_data');
  if (!stored) return PM_MAX_LIVES;
  const { lives, lastLostAt } = JSON.parse(stored);
  const elapsed = Date.now() - (lastLostAt || Date.now());
  const regen = Math.floor(elapsed / PM_LIFE_REGEN_MS);
  return Math.min(PM_MAX_LIVES, lives + regen);
}

let pmState = {
  activePath: null,
  activeNode: null,
  coins: parseInt(localStorage.getItem('pm_coins') || '10'),
  streak: parseInt(localStorage.getItem('pm_streak') || '0'),
  lives: pmLoadLives(),
};

function pmSaveLives() {
  localStorage.setItem('pm_lives_data', JSON.stringify({
    lives: pmState.lives,
    lastLostAt: Date.now()
  }));
}

function pmLoseLife(pathId) {
  if (!PM_LIVES_ENABLED) return;
  if (pmState.lives > 0) pmState.lives--;
  pmSaveLives();
  pmUpdateLivesUI(pathId);
}

function pmGainLife(pathId) {
  pmState.lives = Math.min(PM_MAX_LIVES, pmState.lives + 1);
  pmSaveLives();
  if (pathId) pmUpdateLivesUI(pathId);
}

function pmUpdateLivesUI(pathId) {
  const ids = {
    ahorro: 'pm-lives-ahorro',
    deudas: 'pm-lives-deudas',
    inversion: 'pm-lives-inversion',
    presupuesto: 'pm-lives-presupuesto'
  };
  const id = ids[pathId];
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = '';
  for (let i = 0; i < PM_MAX_LIVES; i++) {
    const heart = document.createElement('span');
    heart.className = 'pm-life' + (i >= pmState.lives ? ' lost' : '');
    heart.textContent = '❤️';
    el.appendChild(heart);
  }
  // banner sin vidas
  const banner = document.getElementById('pm-nolives-' + pathId);
  if (banner) banner.classList.toggle('show', pmState.lives === 0);
  // sidebar chip
  const overlay = document.getElementById('pm-' + pathId);
  if (overlay) {
    overlay.querySelectorAll('.pm-sb-lives').forEach(c => c.textContent = pmState.lives);
  }
}

function openPath(pathId) {
  pmState.activePath = pathId;
  const overlay = document.getElementById('pm-' + pathId);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  pmUpdateStats(pathId);
  pmUpdateLivesUI(pathId);

  const afterWelcome = () => {
    if (!localStorage.getItem('pm_onboarded_' + pathId)) {
      pmShowOnboarding(pathId);
    } else {
      pmRenderNodes(pathId);
    }
  };

  pmMaybeShowWelcome(pathId, afterWelcome);
}

function closePath() {
  if (pmState.activePath) {
    document.getElementById('pm-' + pmState.activePath).classList.remove('open');
  }
  document.body.style.overflow = '';
  pmState.activePath = null;
}

function pmRenderNodes(pathId) {
  const path = PATH_DATA[pathId];
  const container = document.getElementById('pm-scroll-' + pathId);
  const progress = JSON.parse(localStorage.getItem('pm_progress_' + pathId) || '{}');
  container.innerHTML = '';

  const firstAvailable = path.nodes.findIndex(n => progress[n.id] !== 'done');
  const hasZigzag = !!path.sections;

  if (hasZigzag) container.classList.add('pm-scroll-zigzag');
  else            container.classList.remove('pm-scroll-zigzag');

  /* Mapa nodeId → sección (solo paths con sections) */
  const sectionMap = {};
  if (path.sections) {
    let lastStageId = -1;
    path.sections.forEach(sec => {
      sectionMap[sec.firstNodeId] = { ...sec, isNewStage: sec.stageId !== lastStageId };
      lastStageId = sec.stageId;
    });
  }

  /* Zigzag: R L R L C por sección */
  const ZIGZAG = ['right', 'left', 'right', 'left', 'center'];
  let sectionNodeIdx = 0;
  let prevPos = null;
  let firstLockedDone = false;

  path.nodes.forEach((node, idx) => {
    let state = 'locked';
    if (idx === 0) state = 'available';
    if (progress[node.id] === 'done') state = 'done';
    if (idx > 0 && progress[path.nodes[idx - 1].id] === 'done' && state !== 'done') state = 'available';
    if (idx === firstAvailable) state = 'current';

    const sec = sectionMap[node.id];

    /* Banners de etapa + sección */
    if (sec) {
      sectionNodeIdx = 0;
      prevPos = null;

      if (sec.isNewStage && sec.stageName) {
        const stageBan = document.createElement('div');
        stageBan.className = 'pm-stage-banner';
        stageBan.style.background = sec.stageBg || 'rgba(0,0,0,.04)';
        stageBan.innerHTML =
          '<span class="pm-stage-icon">' + (sec.stageIcon || '📘') + '</span>' +
          '<div><div class="pm-stage-num">ETAPA ' + sec.stageId + '</div>' +
          '<div class="pm-stage-name">' + sec.stageName + '</div></div>';
        container.appendChild(stageBan);
      }

      const secBan = document.createElement('div');
      secBan.className = 'pm-section-banner';
      secBan.innerHTML =
        '<div class="pm-section-hdr">' +
          '<span class="pm-section-num">Sección ' + sec.stageNum + '</span>' +
          '<span class="pm-section-icon">' + (sec.icon || '') + '</span>' +
        '</div>' +
        '<div class="pm-section-label">' + sec.label + '</div>' +
        '<div class="pm-section-desc">' + sec.desc + '</div>';
      container.appendChild(secBan);
    }

    const pos = hasZigzag ? ZIGZAG[Math.min(sectionNodeIdx, ZIGZAG.length - 1)] : null;

    /* Connector */
    if (hasZigzag && prevPos !== null) {
      const prevDone = progress[path.nodes[idx - 1].id] === 'done';
      const dc = prevDone ? ' done' : '';
      const conn = document.createElement('div');
      if (prevPos === 'right' && (pos === 'left' || pos === 'center')) {
        conn.className = 'pm-curve pm-curve-rl' + dc;
      } else if (prevPos === 'left' && (pos === 'right' || pos === 'center')) {
        conn.className = 'pm-curve pm-curve-lr' + dc;
      } else {
        conn.className = 'pm-connector' + dc;
      }
      container.appendChild(conn);
    }

    /* Wrap */
    const wrap = document.createElement('div');
    wrap.className = 'pm-node-wrap' + (pos ? ' pm-pos-' + pos : '');

    /* Conector recto para paths sin zigzag (deudas, inversion, presupuesto) */
    if (!hasZigzag && idx > 0) {
      const conn = document.createElement('div');
      conn.className = 'pm-connector' + (progress[path.nodes[idx - 1].id] === 'done' ? ' done' : '');
      wrap.appendChild(conn);
    }

    /* Platín en nodo actual */
    if (state === 'current') {
      const pip = document.createElement('div');
      pip.className = 'pm-platín-here';
      pip.innerHTML = '<div class="pm-platín-coin">🪙</div><div class="pm-platín-lbl">TÚ</div>';
      wrap.appendChild(pip);
    }

    /* Nodo */
    if (node.type === 'chest') {
      const el = document.createElement('div');
      el.className = 'pm-chest' + (state === 'locked' ? ' locked' : '');
      el.textContent = state === 'done' ? '✅' : '🎁';
      el.onclick = () => pmClickNode(node, state, pathId);
      wrap.appendChild(el);
    } else if (node.type === 'cert') {
      const el = document.createElement('div');
      el.className = 'pm-cert' + (state === 'locked' ? ' locked' : '');
      el.textContent = state === 'done' ? '🏆' : '🔒';
      el.onclick = () => pmClickNode(node, state, pathId);
      wrap.appendChild(el);
    } else {
      const el = document.createElement('div');
      el.className = 'pm-node ' + state;
      el.textContent = state === 'done' ? '✅' : node.icon;
      el.onclick = () => pmClickNode(node, state, pathId);
      wrap.appendChild(el);
    }

    const label = document.createElement('div');
    label.className = 'pm-node-label';
    label.textContent = node.label;
    wrap.appendChild(label);

    if (node.cost > 0 && state !== 'done') {
      const sub = document.createElement('div');
      sub.className = 'pm-node-sub';
      sub.textContent = '🪙 ' + node.cost + ' fichas';
      wrap.appendChild(sub);
    }

    /* Botón "Saltar aquí" en el primer nodo bloqueado tras el actual */
    if (hasZigzag && state === 'locked' && !firstLockedDone && firstAvailable >= 0 && idx > firstAvailable) {
      firstLockedDone = true;
      const skip = document.createElement('button');
      skip.className = 'pm-skip-btn';
      skip.textContent = '⏩ ¿Saltar aquí? 20 🪙';
      skip.onclick = () => pmSkipToNode(node, pathId);
      wrap.appendChild(skip);
    }

    container.appendChild(wrap);

    if (hasZigzag) { prevPos = pos; sectionNodeIdx++; }
  });
}

function pmSkipToNode(node, pathId) {
  const SKIP_COST = 20;
  if (pmState.coins < SKIP_COST) {
    _shopToast('Necesitas 20 🪙 para saltar aquí', '#E74C3C', '#fff');
    return;
  }
  pmState.coins -= SKIP_COST;
  pmSaveCoins();
  const path = PATH_DATA[pathId];
  const nodeIdx = path.nodes.findIndex(n => n.id === node.id);
  const key = 'pm_progress_' + pathId;
  const progress = JSON.parse(localStorage.getItem(key) || '{}');
  path.nodes.slice(0, nodeIdx).forEach(n => { progress[n.id] = 'done'; });
  localStorage.setItem(key, JSON.stringify(progress));
  pmUpdateStats(pathId);
  pmRenderNodes(pathId);
  _shopToast('⏩ ¡Saltaste! -20 🪙', '#FFC700', '#0F1321');
}

let pmPendingNode = null;

function pmClickNode(node, state, pathId) {
  if (state === 'locked') return;
  pmPendingNode = { node, state, pathId };
  document.getElementById('pmModalIcon').textContent = node.icon;
  document.getElementById('pmModalTitle').textContent = node.label;
  document.getElementById('pmModalDesc').textContent = node.desc;
  const costEl = document.getElementById('pmModalCost');
  const btnEl  = document.getElementById('pmModalBtn');
  if (node.cost > 0 && state !== 'done') {
    costEl.textContent = '🪙 ' + node.cost + ' fichas';
    costEl.style.display = 'inline-flex';
    if (pmState.coins >= node.cost) {
      btnEl.className = 'pm-modal-btn';
      btnEl.textContent = 'Empezar →';
    } else {
      btnEl.className = 'pm-modal-btn locked';
      btnEl.textContent = '🪙 Fichas insuficientes';
    }
  } else {
    costEl.style.display = 'none';
    btnEl.className = 'pm-modal-btn';
    btnEl.textContent = state === 'done' ? 'Repasar →' : 'Empezar →';
  }
  document.getElementById('pmModal').classList.add('open');
}

function closePMModal(e) {
  if (e.target.id === 'pmModal') {
    document.getElementById('pmModal').classList.remove('open');
  }
}

function pmStartNode() {
  if (!pmPendingNode) return;
  const { node, state, pathId } = pmPendingNode;
  document.getElementById('pmModal').classList.remove('open');
  if (node.cost > 0 && state !== 'done') {
    pmState.coins -= node.cost;
    pmSaveCoins();
    pmUpdateStats(pathId);
  }
  if (node.type === 'lesson') {
    if (PM_LIVES_ENABLED && pmState.lives === 0) {
      document.getElementById('pmModal').classList.remove('open');
      const banner = document.getElementById('pm-nolives-' + pathId);
      if (banner) { banner.classList.add('show'); banner.scrollIntoView({ behavior: 'smooth' }); }
      return;
    }
    pmShowLesson(node, pathId);
  } else if (node.type === 'game') {
    pmLaunchGame(node.game, node.id, pathId, node.level);
  } else if (node.type === 'chest') {
    pmCompleteNode(node.id, pathId);
    pmRenderNodes(pathId);
    pmAwardCoins(node.coins || 10, pathId);
    if (node.badge) pmGrantBadge(node.badge, pathId);
  } else if (node.type === 'cert') {
    pmCompleteNode(node.id, pathId);
    pmRenderNodes(pathId);
    localStorage.setItem('pm_cert_' + pathId, 'true');
    pmShowCertificate(pathId);
  }
}

const LESSON_CONTENT = {
  a1: {
    paragraphs: [
      'Ahorrar es guardar parte de tu ingreso hoy para usarlo en el futuro. No se trata de guardar lo que sobra — se trata de gastarte lo que sobra después de ahorrar.',
      'La CMF recomienda ahorrar ANTES de gastar, no después. Este simple cambio de orden transforma el hábito: en vez de "ahorro lo que me queda", pasa a "gasto lo que me queda después de ahorrar".',
      'El objetivo no es sacrificarte hoy — es darte opciones mañana. Un fondo de ahorro te da libertad para enfrentar imprevistos sin endeudarte.'
    ],
    fact: '💡 El chileno promedio ahorra solo el 3% de su ingreso. La meta recomendada es 20%.',
    q: '¿Cuál es el primer paso para ahorrar?',
    opts: ['Abrir una cuenta de inversión', 'Registrar todos tus gastos', 'Pedir un crédito de consumo'],
    correct: 1,
    explain: 'No puedes controlar lo que no conoces. Registrar gastos es el paso 1 para saber de dónde recortar.'
  },
  a3: {
    paragraphs: [
      'Divide tu sueldo en 3 partes: 50% para necesidades (arriendo, comida, transporte), 30% para gustos (salidas, streaming, ropa) y 20% para ahorro e inversión.',
      'Es la regla más simple y efectiva que existe. No requiere apps ni planillas — solo tres categorías mentales que cambian cómo ves tu dinero.',
      'Si tu sueldo no alcanza para el 50% en necesidades, esa es tu primera señal: es hora de revisar tus gastos fijos o buscar ingresos adicionales.'
    ],
    fact: '💡 Con sueldo mínimo ($500.000) deberías ahorrar $100.000 al mes según esta regla.',
    q: 'Si ganas $800.000, ¿cuánto va al ahorro?',
    opts: ['$80.000', '$160.000', '$240.000'],
    correct: 1,
    explain: '20% de $800.000 = $160.000 mensuales. Con eso en un año acumulas $1.920.000.'
  },
  a6: {
    paragraphs: [
      'El Ahorro Previsional Voluntario (APV) te permite ahorrar para la jubilación con beneficios tributarios directos del Estado chileno.',
      'Puedes elegir entre dos modalidades: Régimen A (el Estado aporta el 15% de lo que ahorras, hasta ~$550.000/año) o Régimen B (descuentas lo ahorrado de tu base imponible, bajando el impuesto que pagas).',
      'Es el instrumento de ahorro más conveniente de Chile. La CMF lo regula y cualquier banco o AFP lo ofrece. Puedes partir con montos pequeños.'
    ],
    fact: '💡 Con APV puedes recuperar hasta $300.000 al año en impuestos si ganas sobre $800.000/mes.',
    q: '¿Qué beneficio tiene el APV?',
    opts: ['Te presta dinero el Estado', 'Reduce tus impuestos anuales', 'Es un seguro de cesantía'],
    correct: 1,
    explain: 'El APV reduce tu base imponible — pagas menos impuestos cada año y construyes tu jubilación al mismo tiempo.'
  },
  a8: {
    paragraphs: [
      'Un fondo de emergencia es dinero líquido reservado para imprevistos: quedarte sin trabajo, una enfermedad, el auto averiado. Debe estar en un lugar de fácil acceso — no invertido en acciones.',
      'La mayoría de las emergencias financieras ocurren porque la gente no tiene este colchón. Sin él, cualquier imprevisto se convierte en deuda.',
      'La CMF recomienda construirlo antes de invertir. No tiene sentido invertir en renta variable si un imprevisto te obligaría a vender en pérdida.'
    ],
    fact: '💡 La CMF recomienda tener entre 3 y 6 meses de tus gastos guardados antes de invertir.',
    q: '¿Cuánto debe tener tu fondo de emergencia?',
    opts: ['1 mes de gastos', '3 a 6 meses de gastos', '12 meses de gastos'],
    correct: 1,
    explain: '3-6 meses cubre la mayoría de emergencias sin sobreinvertir en liquidez de bajo rendimiento.'
  },
  d1: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'¿Sabías que existe un límite legal de cuánto te pueden cobrar de interés en Chile? Se llama TMC y te protege. 🛡️',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'52%',
        desc:'Es la tasa máxima que pueden cobrarte las tiendas por departamento en Chile (CMF 2026)',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'sad',
        texto:'Carlos compró ropa en París por $200.000 con la tarjeta de la tienda.\n\nPagando el mínimo cada mes, tardó 3 años en pagar y gastó $412.000 en total.\n\nPagó $212.000 extra solo en intereses.',
        btn:'¡Qué locura! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Qué es la TMC?',
        opts:['Un impuesto al consumo','El límite máximo de interés legal','Una cuenta de ahorro especial'],
        correct:1,
        explain:'La TMC protege a los consumidores de tasas abusivas. Se publica mensualmente en cmfchile.cl.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'La TMC te protege. Cualquier tasa mayor es ilegal. Siempre pregunta la tasa antes de comprar en cuotas.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  d3: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'Tienes 3 deudas distintas. ¿Por cuál empiezas? La respuesta importa más de lo que crees. 💡',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'40%',
        desc:'Puedes pagar hasta un 40% menos en intereses totales eligiendo el orden correcto para atacar tus deudas',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'sad',
        texto:'Ana tiene:\n💳 VISA: $500.000 al 18%\n🛍️ Ripley: $200.000 al 52%\n🏦 Consumo: $800.000 al 35%\n\n¿Por cuál empezar?\n\nPor Ripley — tiene la tasa más alta aunque sea la deuda menor. Eso ahorra más en total.',
        btn:'¡Tiene sentido! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuál conviene atacar primero?',
        opts:['La deuda más pequeña','La deuda con mayor tasa','Todas por igual'],
        correct:1,
        explain:'Método avalancha: ataca la tasa más alta primero. Ahorras más dinero en intereses totales.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Método avalancha = mayor tasa primero. Puede ahorrarte hasta un 40% en intereses comparado con pagar al azar.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  d6: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'¿Alguna vez te han rechazado un crédito sin saber por qué? Puede ser el DICOM. 😰',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'4M',
        desc:'4 millones de chilenos están en algún registro de morosidad según datos CMF 2024',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'sad',
        texto:'Pedro dejó de pagar una cuenta de $45.000.\n\nTres meses después apareció en DICOM.\n\nLe rechazaron el arriendo, le negaron un crédito y estuvo a punto de perder una oferta de trabajo.\n\nTodo por $45.000.',
        btn:'¡Increíble! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cómo salir del DICOM?',
        opts:['Pagando la deuda morosa','Cambiando de banco','No se puede salir'],
        correct:0,
        explain:'Al pagar la deuda, el acreedor debe eliminar el registro en máximo 3 días hábiles.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Al pagar, el acreedor debe eliminar el registro en máximo 3 días hábiles. Si no lo hace, reclama ante la CMF.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  d8: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'¿Y si pudieras juntar todas tus deudas en una sola con menos interés? Eso es consolidar. 🔀',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'-40%',
        desc:'Consolidar deudas de 52% a 18% puede reducir tu cuota mensual hasta un 40%',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'happy',
        texto:'Sofía tenía 4 deudas con cuotas por $380.000 al mes en total.\n\nConsolidó todo en un crédito al 18%.\n\nAhora paga $220.000 al mes.\n\nAhorra $160.000 mensuales — más de $1.900.000 al año.',
        btn:'¡Qué ahorro! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuándo conviene consolidar?',
        opts:['Siempre que sea posible','Cuando tienes varias deudas de alta tasa','Solo si estás en DICOM'],
        correct:1,
        explain:'Consolida solo si la nueva tasa es significativamente menor. Sin eso, solo cambias el problema.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Consolida solo si la nueva tasa es menor. El riesgo: volver a endeudarse. ¡Disciplina! 💪',
        fichas:2, btn:'Continuar →' }
    ]
  },
  i1: {
    paragraphs: [
      'Invertir es poner tu dinero a trabajar para generar más dinero. A diferencia del ahorro simple, la inversión implica riesgo — pero también mayor retorno potencial.',
      'La inflación hace que el dinero guardado en una cuenta corriente pierda valor cada año. Si la inflación es 4% y tu cuenta da 0%, en términos reales estás perdiendo.',
      'No necesitas ser experto ni tener mucho dinero para empezar. En Chile existen instrumentos accesibles desde $1.000 CLP regulados por la CMF.'
    ],
    fact: '💡 La inflación en Chile es ~4% anual. Si no inviertes, tu dinero pierde poder adquisitivo.',
    q: '¿Por qué invertir en vez de solo ahorrar?',
    opts: ['Para ganar más rápido', 'Para que el dinero no pierda valor con la inflación', 'Porque el ahorro es ilegal'],
    correct: 1,
    explain: 'La inflación erosiona el ahorro. Invertir protege el valor real de tu dinero y lo hace crecer.'
  },
  i3: {
    paragraphs: [
      'El IPSA (Índice de Precio Selectivo de Acciones) mide el rendimiento de las 30 empresas más grandes de la Bolsa de Santiago: Falabella, BCI, Copec, Engie, SQM y más.',
      'Cuando el IPSA sube, refleja que la economía chilena va bien y que los inversionistas tienen confianza. Cuando baja, puede ser señal de crisis o incertidumbre.',
      'Puedes invertir en el IPSA sin comprar acciones directamente: existen fondos mutuos y ETFs que replican su desempeño, con comisiones bajas y entrada desde montos pequeños.'
    ],
    fact: '💡 El IPSA rentó ~18% en 2025, superando a la mayoría de instrumentos de ahorro tradicionales.',
    q: '¿Qué representa el IPSA?',
    opts: ['Las 30 empresas más grandes de Chile en bolsa', 'El precio del dólar', 'La tasa del Banco Central'],
    correct: 0,
    explain: 'El IPSA mide el desempeño de las 30 principales empresas chilenas en la Bolsa de Santiago.'
  },
  i6: {
    paragraphs: [
      'Tu AFP administra tu pensión en 5 fondos: A (más riesgo, más retorno), B, C, D y E (menos riesgo, menos retorno). La diferencia en pensión final puede ser enorme.',
      'La lógica es simple: cuando eres joven, tienes décadas para recuperarte de caídas del mercado, por eso conviene el Fondo A. Al acercarte a jubilar, cambias al E para proteger lo acumulado.',
      'La CMF recomienda revisar tu fondo al menos una vez al año y ajustarlo según tu edad y tolerancia al riesgo. Puedes cambiar de fondo sin costo.'
    ],
    fact: '💡 Un trabajador joven en Fondo E puede jubilarse con hasta 40% menos pensión que en Fondo A.',
    q: '¿Qué fondo AFP conviene si tienes 25 años?',
    opts: ['Fondo E (más seguro)', 'Fondo A (más rentable a largo plazo)', 'Da igual el fondo'],
    correct: 1,
    explain: 'A mayor plazo, más conviene el riesgo. Con 40 años por delante, el Fondo A maximiza la pensión esperada.'
  },
  i8: {
    paragraphs: [
      'Los fondos mutuos reúnen el dinero de miles de inversores para comprar una cartera diversificada de activos: acciones, bonos, depósitos. Tú compras "cuotas" del fondo.',
      'En Chile están regulados por la CMF, lo que significa que hay transparencia y protección legal. Son más seguros que comprar acciones individuales porque diversifican el riesgo.',
      'Existen fondos de distintos perfiles: conservador (más bonos), moderado y agresivo (más acciones). Elige según tu horizonte de inversión y tolerancia al riesgo.'
    ],
    fact: '💡 Los fondos mutuos de renta variable rentaron 14.2% promedio en 2025 según datos CMF.',
    q: '¿Desde cuánto puedes invertir en fondos mutuos en Chile?',
    opts: ['Desde $100.000', 'Desde $1.000', 'Desde $1.000.000'],
    correct: 1,
    explain: 'Los fondos mutuos son accesibles para todos — desde $1.000 CLP. CMF los regula y supervisa.'
  },
  p1: {
    paragraphs: [
      'Un presupuesto es un plan de cómo vas a usar tu dinero antes de gastarlo. No es una restricción — es libertad. Saber adónde va tu plata te permite tomar decisiones conscientes.',
      'Sin presupuesto, el dinero simplemente "desaparece". Con presupuesto, tú decides: en qué gastas, cuánto ahorras, cuándo te das un gusto y cuándo dices que no.',
      'No necesita ser complejo. Un presupuesto en papel, en una app o en tu cabeza funciona — lo importante es tener una intención clara antes de gastar.'
    ],
    fact: '💡 El 60% de los chilenos llega a fin de mes con dificultades según Encuesta CMF 2024.',
    q: '¿Para qué sirve un presupuesto?',
    opts: ['Para gastar menos siempre', 'Para planificar conscientemente tus gastos', 'Solo para personas con deudas'],
    correct: 1,
    explain: 'Un presupuesto no te prohíbe gastar — te ayuda a gastar en lo que realmente importa para ti.'
  },
  p3: {
    paragraphs: [
      'Los gastos hormiga son pequeños y frecuentes: el café de la mañana, el delivery del almuerzo, las suscripciones olvidadas, el cigarro de vez en cuando.',
      'Individualmente parecen insignificantes. El problema es que se acumulan silenciosamente y pueden representar el 20-30% de tu sueldo sin que lo notes.',
      'El primer paso es identificarlos: revisa tu extracto bancario del último mes y suma todos los gastos bajo $5.000. El resultado suele sorprender.'
    ],
    fact: '💡 Un café de $2.500 al día son $75.000 al mes y $900.000 al año — casi 2 sueldos mínimos.',
    q: '¿Qué son los gastos hormiga?',
    opts: ['Gastos de supermercado', 'Gastos pequeños y frecuentes que se acumulan', 'Deudas pequeñas'],
    correct: 1,
    explain: 'Identificar y reducir gastos hormiga puede liberar hasta $200.000 mensuales sin grandes sacrificios.'
  },
  p6: {
    paragraphs: [
      'En el presupuesto base cero, cada peso tiene un destino asignado. Tus ingresos menos todos los gastos planificados (incluyendo ahorro) deben sumar cero.',
      'No significa quedarse sin dinero — significa que el ahorro también es un "gasto" planificado. Cada peso tiene nombre antes de salir de tu cuenta.',
      'Es el método más riguroso de presupuesto. Requiere más disciplina inicial, pero da control total. Empresas como Amazon lo usan para gestionar presupuestos multimillonarios.'
    ],
    fact: '💡 Empresas como Amazon usan presupuesto base cero. El mismo principio aplica a tu sueldo personal.',
    q: '¿Qué significa presupuesto base cero?',
    opts: ['No tener dinero al final del mes', 'Asignar destino a cada peso del ingreso', 'Gastar solo lo necesario'],
    correct: 1,
    explain: 'Base cero = cada peso tiene destino. Incluye ahorro, inversión y gastos. Todo planificado de antemano.'
  },
  p8: {
    paragraphs: [
      'El ahorro automático programa una transferencia fija apenas recibes tu sueldo — antes de que puedas gastarlo. No requiere fuerza de voluntad: simplemente ocurre.',
      'Es el hábito más efectivo que existe para ahorrar consistentemente. La sicología conductual lo llama "compromiso previo": te comprometes con tu yo futuro antes de que tu yo presente tenga la tentación.',
      'Puedes configurarlo en tu banco online: una transferencia automática el día de pago hacia una cuenta de ahorro o APV. Empieza con el 5% y auméntalo gradualmente.'
    ],
    fact: '💡 Las personas que ahorran automáticamente logran 3x más ahorro anual que quienes ahorran lo que sobra.',
    q: '¿Cuándo configurar el ahorro automático?',
    opts: ['Al final del mes con lo que sobre', 'El mismo día que recibes el sueldo', 'Solo cuando tienes objetivo específico'],
    correct: 1,
    explain: 'Págate a ti primero. El ahorro automático el día de pago elimina la tentación de gastar antes.'
  },

  /* ── Nuevas lecciones camino Ahorro — Etapa 2 ── */
  a11: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'¿Cuál es la diferencia entre una cuenta vista y una cuenta corriente? Una mala elección puede costarte miles al año en comisiones 💡',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'$0',
        desc:'La Cuenta Vista RUT del BancoEstado no tiene costo de mantención. La tiene el 80% de los chilenos.',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'surprised',
        texto:'Pedro tenía cuenta corriente con mantención de $4.990 al mes = $59.880 al año.\n\nLa cambió por Cuenta Vista RUT.\n\nAhorro $59.880 sin cambiar nada más.',
        btn:'¡Qué fácil! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Qué ventaja tiene la Cuenta Vista sobre la Cuenta Corriente?',
        opts:['Da más intereses','Sin costo de mantención','Permite girar cheques'],
        correct:1,
        explain:'La Cuenta Vista RUT es gratis y accesible para todos los chilenos desde los 18 años con RUT.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Cuenta Vista = gratis, acceso inmediato, sin requisitos.\nCuenta Corriente = más funciones pero con costo mensual. Elige según tus necesidades.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a13: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'¿Y si pudieras invertir junto a miles de personas y acceder a los mismos instrumentos que usan los millonarios? Eso son los fondos mutuos 📈',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'$1.000',
        desc:'Es el monto mínimo para invertir en fondos mutuos en Chile según CMF 2026',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'happy',
        texto:'Javiera invirtió $50.000 al mes en un fondo mutuo de renta variable.\n\nEn 12 meses su inversión creció a $618.000.\n\nRentabilidad: 3% real sobre la inflación.',
        btn:'¡Impresionante! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Quién supervisa los fondos mutuos en Chile?',
        opts:['El Banco Central','La CMF','El SII'],
        correct:1,
        explain:'La CMF (Comisión para el Mercado Financiero) supervisa y regula todos los fondos mutuos en Chile.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Fondos mutuos = inversión colectiva supervisada por CMF. Desde $1.000 CLP. Más seguro que comprar acciones directamente.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a16: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'El secreto de los mejores ahorradores no es la fuerza de voluntad. Es que el ahorro ocurre solo, antes de que puedan gastarlo 🤖',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'3x más',
        desc:'Las personas con ahorro automático logran 3 veces más ahorro anual que quienes ahorran lo que sobra',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'sad',
        texto:'Miguel intentó ahorrar $100.000 al mes por voluntad propia. Duró 2 meses.\n\nLuego configuró una transferencia automática el día 1 de cada mes.\n\nLleva 18 meses sin fallar.',
        btn:'¡Eso sí funciona! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuándo configurar el ahorro automático?',
        opts:['Al final del mes con lo que sobre','El mismo día que recibes el sueldo','Solo cuando tienes un objetivo'],
        correct:1,
        explain:'Págate a ti primero. Configura la transferencia el día de tu sueldo antes de cualquier otro gasto.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Automatiza tu ahorro = elimina la tentación. Empieza con $10.000 al mes si es necesario. Lo importante es el hábito.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a18: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'Ahorrar e invertir no es lo mismo. Confundirlos puede costarte años de libertad financiera. ¿Sabes la diferencia? 🤔',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'4.2%',
        desc:'Es la inflación anual en Chile (2026). Tu dinero ahorrado pierde ese valor cada año si no lo inviertes.',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'sad',
        texto:'Paula guardó $1.000.000 bajo el colchón en 2020.\n\nEn 2026 ese millón compra lo mismo que $750.000 en 2020.\n\nPerdió $250.000 en poder adquisitivo sin gastar nada.',
        btn:'¡Qué locura! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuál es la diferencia clave entre ahorrar e invertir?',
        opts:['Invertir es solo para ricos','Invertir busca hacer crecer el dinero, ahorrar es guardarlo seguro','Son exactamente lo mismo'],
        correct:1,
        explain:'Ahorro = seguridad y liquidez. Inversión = crecimiento con riesgo. Necesitas ambos según tu objetivo.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Ahorro para emergencias e inversión para el futuro. No son opuestos — son complementarios. ¡Los dos son necesarios!',
        fichas:2, btn:'Continuar →' }
    ]
  },

  /* ── Etapa 3 — Hábitos que duran ── */
  a21: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'El mejor truco de los grandes ahorradores: guardar ANTES de gastar. No al revés 🤖',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'3x más',
        desc:'Las personas con ahorro automático logran 3 veces más ahorro anual que quienes ahorran lo que sobra',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'sad',
        texto:'Miguel intentó ahorrar $100.000 al mes por voluntad propia. Duró 2 meses.\n\nLuego configuró una transferencia automática el día 1 de cada mes.\n\nLleva 18 meses sin fallar.',
        btn:'¡Eso sí funciona! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuándo deberías transferir al ahorro?',
        opts:['Al final del mes con lo que sobre','El mismo día que recibes el sueldo','Solo cuando tienes un objetivo concreto'],
        correct:1,
        explain:'Págate a ti primero — el ahorro automático el día del sueldo elimina la tentación de gastar antes.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Automatiza tu ahorro = elimina la tentación. Empieza con $10.000 al mes si es necesario. Lo importante es el hábito, no el monto.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a22: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'Todos los bancos chilenos permiten programar transferencias automáticas. Es gratis y tarda 5 minutos 💡',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'5 min',
        desc:'Lo que tarda configurar ahorro automático en cualquier banco chileno — y luego funciona solo para siempre',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'happy',
        texto:'Sofía configuró en BancoEstado una transferencia de $80.000 cada día 5 del mes a su cuenta de ahorro.\n\nEn 1 año acumuló $960.000 sin esfuerzo.\n\nElla ni lo pensó — el banco lo hizo por ella.',
        btn:'¡Quiero hacer eso! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Qué banco ofrece Cuenta Vista RUT gratuita en Chile?',
        opts:['Banco Santander','BancoEstado','Banco de Chile'],
        correct:1,
        explain:'BancoEstado RUT es 100% gratuita para todos los chilenos. El 80% ya la tiene. Ideal para tu cuenta de destino de ahorro automático.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'BancoEstado RUT = gratis para todos. Configura tu transferencia automática hoy. 5 minutos que cambian tu vida financiera.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a24: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'¿Sabes cuánto gastas en café, delivery y suscripciones al mes? Probablemente más de lo que crees 🐜',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'$900.000',
        desc:'Lo que gasta al año una persona que toma café a $2.500 todos los días — un gasto "hormiga" típico',
        btn:'¡Qué cantidad! →' },
      { type:'ejemplo',  platin:'sad',
        texto:'Tomás gastaba:\n☕ Café diario: $2.500 × 365 = $912.500\n🍕 Delivery 3x/sem: $8.000 × 156 = $1.248.000\n📱 Suscripciones olvidadas: $25.000 × 12 = $300.000\n\nTotal gastos hormiga: $2.460.500 al año',
        btn:'¡Increíble! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Qué son los gastos hormiga?',
        opts:['Deudas pequeñas del mes','Gastos pequeños y frecuentes que se acumulan sin notarse','Gastos del supermercado'],
        correct:1,
        explain:'Los gastos hormiga parecen insignificantes solos — el problema es que se suman silenciosamente hasta destruir tu presupuesto.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Identifica tus 3 gastos hormiga principales. Reducirlos puede liberar $200.000+ al mes sin sacrificar tu calidad de vida.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a25: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'Identificar los gastos hormiga fue el primer paso. Ahora veamos cómo atacarlos sin sufrir 💪',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'30 días',
        desc:'El tiempo que tarda en formarse un nuevo hábito financiero según estudios de psicología conductual',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'happy',
        texto:'Carolina eliminó:\n— 2 suscripciones olvidadas: -$15.000/mes\n— Delivery reducido a 1x/semana: -$24.000/mes\n— Llevó almuerzo al trabajo: -$60.000/mes\n\nTotal liberado: $99.000/mes = $1.188.000 al año.',
        btn:'¡Funciona! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuál es el primer paso para eliminar gastos hormiga?',
        opts:['Dejar de gastar en todo inmediatamente','Registrar y categorizar todos tus gastos','Cancelar todas las suscripciones ya'],
        correct:1,
        explain:'Registra una semana completa de gastos — pequeños y grandes. Sin ese mapa, no puedes saber qué cortar.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'No se trata de no gastar — se trata de gastar conscientemente. Registra 1 semana y descubre adónde va realmente tu plata.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a27: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'Einstein llamó al interés compuesto el octavo milagro del mundo. Es tu mejor aliado a largo plazo ✨',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'+$32M',
        desc:'La diferencia entre empezar a ahorrar a los 25 vs los 35 años — mismos aportes, misma rentabilidad 7% anual, misma fecha de retiro',
        btn:'¡Qué diferencia! →' },
      { type:'ejemplo',  platin:'thinking',
        texto:'Ana (25 años): ahorra $50.000/mes en fondo mutuo 7% anual.\nA los 55 años tiene $56.000.000.\n\nPedro (35 años): ahorra exactamente lo mismo.\nA los 55 años tiene solo $24.000.000.\n\n10 años de diferencia = $32.000.000 menos. Solo por esperar.',
        btn:'¡Empiezo hoy! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Qué es el interés compuesto?',
        opts:['El interés que cobran los bancos por créditos','Ganar interés sobre el interés acumulado','Un tipo de cuenta de ahorro especial'],
        correct:1,
        explain:'El interés compuesto hace que tus ganancias también generen ganancias — una bola de nieve que crece sola con el tiempo.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Tiempo + constancia = riqueza. Cada año que esperas para empezar puede costarte millones. El mejor momento fue ayer. El segundo mejor momento es hoy.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a29: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'No todo el ahorro es para la jubilación. Las metas a corto plazo te mantienen motivado con resultados rápidos 🎯',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'3-12 m',
        desc:'Horizonte del ahorro a corto plazo: vacaciones, auto, computador, fondo de emergencia — metas alcanzables y motivadoras',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'happy',
        texto:'Bastián quería un MacBook de $900.000.\n\nOpción A: 12 cuotas con tarjeta tienda → pagó $1.080.000.\nOpción B: Ahorró $75.000/mes por 12 meses → pagó $900.000.\n\nElegir el ahorro le ahorró $180.000 en intereses.',
        btn:'¡Buena decisión! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuál es una meta de ahorro a corto plazo?',
        opts:['Jubilación a los 65 años','Fondo de emergencia (3-6 meses de gastos)','Comprar una casa propia'],
        correct:1,
        explain:'El fondo de emergencia es la meta de corto plazo más importante — sin él, cualquier imprevisto se convierte en deuda.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Define una meta de ahorro hoy. Ponle nombre, monto y fecha. Ese simple acto multiplica las probabilidades de lograrlo.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a30: {
    get steps() {
      const uf = (window.CMF_DATA && window.CMF_DATA.uf) ? window.CMF_DATA.uf : '$38.408';
      return [
        { type:'intro',    platin:'happy',
          frase:'Las grandes metas — casa, educación de tus hijos, jubilación — requieren estrategia diferente. El tiempo es tu mayor ventaja 🏠',
          btn:'Cuéntame más →' },
        { type:'dato',     platin:'thinking',
          num:uf,
          desc:'Valor actual de la UF (Unidad de Fomento) — la unidad en que se miden las hipotecas en Chile. Se reajusta diariamente con la inflación.',
          btn:'Entendido →' },
        { type:'ejemplo',  platin:'thinking',
          texto:'Para un departamento de 2.000 UF en Santiago necesitas un pie del 20% = 400 UF (~$14.000.000).\n\nAhorrando $200.000/mes en fondo mutuo lo logras en 6 años sin endeudarte de más.',
          btn:'¡Tiene sentido! →' },
        { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
          q:'¿En qué unidad se expresan las hipotecas en Chile?',
          opts:['Dólares americanos','UF (Unidad de Fomento)','Euros'],
          correct:1,
          explain:'La UF se reajusta diariamente con la inflación — protege el valor real de tus créditos a largo plazo. La publica la CMF cada día.' },
        { type:'resumen',  platin:'love',
          titulo:'¡Lo lograste! 🎉',
          texto:'UF hoy: ' + uf + '. Las hipotecas en UF te protegen de la inflación. Empieza tu pie lo antes posible — el tiempo y el interés compuesto trabajan para ti.',
          fichas:2, btn:'Continuar →' }
      ];
    }
  },
  a32: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'Recapitulemos los 5 hábitos más importantes que aprendiste en esta etapa. ¡Son los que cambian vidas! 🔑',
        btn:'¡Repasemos! →' },
      { type:'dato',     platin:'thinking',
        num:'5 🔑',
        desc:'Los hábitos clave: 1) Págate primero · 2) Automatiza la transferencia · 3) Registra gastos hormiga · 4) Piensa en interés compuesto · 5) Define metas con fecha',
        btn:'¡Los tengo! →' },
      { type:'ejemplo',  platin:'happy',
        texto:'En la práctica:\n\n🤖 Día 1 del sueldo → transferencia automática\n📝 1 semana → registra todos tus gastos\n🐜 Identifica 3 gastos hormiga a eliminar\n✨ Invierte hoy, no mañana\n🎯 Escribe una meta: monto + fecha',
        btn:'¡Listo para el desafío! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuál es el hábito más importante para ahorrar consistentemente?',
        opts:['Revisar el precio de todo antes de comprar','Automatizar el ahorro el mismo día que recibes el sueldo','Ahorrar solo cuando sobra dinero'],
        correct:1,
        explain:'La automatización elimina la fricción y la tentación. Sin ella, la fuerza de voluntad siempre pierde a largo plazo.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Repaso completado! 🎉',
        texto:'5 hábitos, implementados uno a uno, pueden transformar completamente tu situación financiera en 12 meses. ¡Ya los conoces todos!',
        fichas:2, btn:'Continuar →' }
    ]
  },
  a34: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'Es momento de pasar a la acción. Platín te propone un reto real para esta semana 🚀',
        btn:'¡Cuéntame! →' },
      { type:'dato',     platin:'thinking',
        num:'7 días',
        desc:'El desafío: esta semana anota CADA gasto que haces — pequeños y grandes. Al final suma cuánto son gastos hormiga.',
        btn:'¡Acepto el desafío! →' },
      { type:'ejemplo',  platin:'happy',
        texto:'Así se hace:\n\n📝 Anota en papel, app o notas del celular\nEjemplo: "Café $2.500" · "Almuerzo $4.800" · "Uber $3.200"\n\nAl final de la semana suma todos los gastos bajo $5.000.\n\nEl resultado siempre sorprende.',
        btn:'¡Lo haré! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuál es el objetivo del desafío de esta semana?',
        opts:['Gastar menos en todo','Conocer tus gastos hormiga reales para poder actuar sobre ellos','Abrir una cuenta de ahorro nueva'],
        correct:1,
        explain:'Conocer es poder. Sin saber exactamente cuánto gastas en qué, no puedes tomar decisiones financieras reales.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Desafío aceptado! 🎉',
        texto:'Esta semana: anota TODOS tus gastos. El conocimiento que ganas esta semana vale más que cualquier lección. ¡Tú puedes!',
        fichas:3, btn:'¡Al desafío! →' }
    ]
  },

  /* ── Nuevas lecciones camino Deudas — Etapa 2 ── */
  d11: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'¿Sabes que las deudas pueden duplicarse solas sin que gastes un peso más? El interés compuesto en tu contra puede ser tu peor enemigo 📈',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'2x',
        desc:'Una deuda de $1.000.000 al 18% anual se duplica en menos de 4 años si solo pagas el mínimo',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'sad',
        texto:'Jorge tenía $500.000 en su tarjeta al 35% anual.\n\nPagando solo el mínimo cada mes, después de 3 años todavía debía $480.000.\n\nCasi no había bajado nada. Había pagado $300.000 solo en intereses.',
        btn:'¡Es una trampa! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Por qué el interés compuesto es peligroso en deudas?',
        opts:['Porque aumenta la cuota mensual','Porque cobran interés sobre el interés acumulado','Porque el banco cambia la tasa'],
        correct:1,
        explain:'El interés compuesto hace que cada mes te cobren interés sobre el total que ya incluye intereses anteriores. Es un ciclo que crece solo.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Interés compuesto en deudas = efecto bola de nieve. Siempre paga MÁS que el mínimo para cortar el ciclo.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  d13: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'La tarjeta de crédito no es dinero gratis. Es una deuda con uno de los intereses más altos que existen 💳',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'52%',
        desc:'Tasa máxima que pueden cobrar las tarjetas de tiendas en Chile según CMF 2026',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'sad',
        texto:'Valentina compró un televisor de $400.000 con su tarjeta Ripley en 12 cuotas.\n\nAl final pagó $624.000.\n\nLa "cómoda cuota" le costó $224.000 extra — más de la mitad del precio original.',
        btn:'¡Qué caro! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuándo conviene usar la tarjeta de crédito?',
        opts:['Cuando necesito algo que no tengo','Solo si puedo pagar el total al vencimiento','Para aprovechar las cuotas sin interés'],
        correct:1,
        explain:'La única forma de usar la tarjeta sin perder dinero es pagar el 100% al vencimiento. El crédito rotativo es siempre caro.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Tarjeta = herramienta, no ingreso extra. Úsala solo si puedes pagar el total. El crédito rotativo es una trampa de interés compuesto.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  d16: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'Los bancos prefieren que pagues a que no pagues nada. Eso te da más poder del que crees para negociar 💪',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'60%',
        desc:'De las deudas renegociadas se saldan con quita de intereses según estudios SBIF Chile',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'happy',
        texto:'Diego debía $2.000.000 con $600.000 de intereses vencidos.\n\nLlamó al banco, explicó su situación y propuso un plan.\n\nAcordaron $1.800.000 en 24 cuotas. Le perdonaron $800.000 en intereses.',
        btn:'¡Funciona! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Qué necesitas saber antes de negociar una deuda?',
        opts:['Solo el nombre del ejecutivo','El monto exacto de capital más intereses y multas','Cuántos años lleva la deuda'],
        correct:1,
        explain:'Nunca negocies sin saber exactamente cuánto debes (capital + intereses + multas). Eso te da poder para proponer una quita real.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Negocia siempre por escrito. Pide el saldo total con detalle. Propón una cuota que puedas cumplir. El banco prefiere cobrar algo que nada.',
        fichas:2, btn:'Continuar →' }
    ]
  },
  d18: {
    steps: [
      { type:'intro',    platin:'happy',
        frase:'Salir de las deudas no es suerte — es un plan. Y los planes funcionan cuando son concretos y realistas 📋',
        btn:'Cuéntame más →' },
      { type:'dato',     platin:'thinking',
        num:'18 m',
        desc:'El tiempo promedio para liquidar deudas con método avalancha en Chile según datos CMF',
        btn:'Entendido →' },
      { type:'ejemplo',  platin:'happy',
        texto:'Carla tenía 4 deudas por $3.200.000 en total.\n\nHizo un plan: pagó la de mayor tasa primero, liberó esa cuota para atacar la siguiente.\n\nEn 20 meses quedó completamente libre de deudas.',
        btn:'¡Eso sí es libertad! →' },
      { type:'pregunta', platin:'thinking', platin_correct:'victory', platin_wrong:'sad',
        q:'¿Cuál es el primer paso para un plan de salida de deudas?',
        opts:['Pedir un préstamo nuevo','Listar todas las deudas con montos y tasas exactas','Hablar con un abogado'],
        correct:1,
        explain:'Sin un inventario completo no puedes priorizar. Lista capital, tasa e institución de cada deuda. Eso es el mapa para salir.' },
      { type:'resumen',  platin:'love',
        titulo:'¡Lo lograste! 🎉',
        texto:'Lista → ordena por tasa → ataca la más cara. Cada deuda pagada es una victoria. ¡La libertad financiera tiene fecha!',
        fichas:2, btn:'Continuar →' }
    ]
  }
};

/* ── LESSON ENGINE — 5 pasos con Platín ── */

/* Mapeo de nombres de expresión de lección → pesoFaces */
const LS_EXPR_MAP = {
  happy:'happy', thinking:'thinking', sad:'sad',
  victory:'victory', love:'love', surprised:'surprised'
};

/* Texto de la burbuja de Platín por tipo de paso */
const LS_BUBBLE_TEXT = {
  intro:    null,         /* se rellena con el frase del paso (truncada) */
  dato:     '📊 ¡Dato clave!',
  ejemplo:  '📖 Caso real...',
  pregunta: '🤔 ¿Sabes la respuesta?',
  resumen:  '🎉 ¡Lo lograste!'
};

/* Adoptar el mascot + bubble del hero hacia el panel de la lección */
function lsAdoptMascot() {
  const wrap = document.getElementById('mascotWrap');
  const bbl  = document.getElementById('bubble');
  const col  = document.getElementById('lsPlatinCol');
  if (!wrap || !col) return;

  /* Guardar posición original del mascot */
  window._lsMascotParent  = wrap.parentElement;
  window._lsMascotNextSib = wrap.nextElementSibling;

  /* Mover bubble dentro del mascotWrap (para que se posicione relativo a él) */
  if (bbl && bbl.parentElement !== wrap) {
    window._lsBubbleParent  = bbl.parentElement;
    window._lsBubbleNextSib = bbl.nextElementSibling;
    wrap.appendChild(bbl);
  }

  col.innerHTML = '';
  col.appendChild(wrap);
  wrap.classList.add('ls-mascot-adopted');
  window.lsLessonActive = true;
}

/* Devolver mascot y bubble al hero cuando la lección termina */
function lsReturnMascot() {
  const wrap = document.getElementById('mascotWrap');
  const bbl  = document.getElementById('bubble');
  if (!wrap) return;

  /* Devolver bubble a su posición original en .mascot-container */
  if (bbl && window._lsBubbleParent) {
    if (window._lsBubbleNextSib && window._lsBubbleNextSib.parentElement === window._lsBubbleParent) {
      window._lsBubbleParent.insertBefore(bbl, window._lsBubbleNextSib);
    } else {
      window._lsBubbleParent.appendChild(bbl);
    }
    window._lsBubbleParent  = null;
    window._lsBubbleNextSib = null;
  }

  wrap.classList.remove('ls-mascot-adopted');
  window.lsLessonActive = false;

  if (window._lsMascotParent) {
    if (window._lsMascotNextSib && window._lsMascotNextSib.parentElement === window._lsMascotParent) {
      window._lsMascotParent.insertBefore(wrap, window._lsMascotNextSib);
    } else {
      window._lsMascotParent.appendChild(wrap);
    }
    window._lsMascotParent  = null;
    window._lsMascotNextSib = null;
  }

  if (typeof setPesoExpression === 'function') setPesoExpression('idle');
  if (bbl) bbl.classList.remove('show');
}

/* Aplica expresión y burbuja según el paso actual */
function lsSetStepFace(step) {
  const expr = LS_EXPR_MAP[step.platin] || 'happy';
  if (typeof setPesoExpression === 'function') setPesoExpression(expr);
  const bbl = document.getElementById('bubble');
  if (!bbl) return;
  let txt = LS_BUBBLE_TEXT[step.type];
  if (step.type === 'intro' && step.frase) {
    txt = step.frase.length > 55 ? step.frase.slice(0, 54) + '…' : step.frase;
  }
  if (txt) { bbl.innerHTML = txt; bbl.classList.add('show'); }
  else      { bbl.classList.remove('show'); }
}

function getLessonSteps(data) {
  if (data && data.steps) return data.steps;
  if (!data) return null;
  const factClean = (data.fact || '').replace(/^💡\s*/, '');
  return [
    { type:'intro',    platin:'happy',   btn:'Cuéntame más →',  frase: data.paragraphs[0] },
    { type:'dato',     platin:'thinking',btn:'Entendido →',     num:'💡', desc: factClean },
    { type:'ejemplo',  platin:'thinking',btn:'Continuar →',     texto: data.paragraphs.slice(1).join('\n\n') },
    { type:'pregunta', platin:'thinking',platin_correct:'victory', platin_wrong:'sad',
      q: data.q, opts: data.opts, correct: data.correct, explain: data.explain },
    { type:'resumen',  platin:'love',    btn:'Continuar →',
      titulo:'¡Lo lograste! 🎉', texto: data.explain, fichas: 2 }
  ];
}

let pmLessonCtx = null;

function pmShowLesson(node, pathId) {
  const data  = LESSON_CONTENT[node.id];
  const steps = getLessonSteps(data);
  if (!steps) {
    pmCompleteNode(node.id, pathId);
    pmRenderNodes(pathId);
    pmAwardCoins(2, pathId);
    return;
  }
  pmLessonCtx = { node, pathId, steps, step:0, answered:false, correct:false, lifeLost:false };
  document.getElementById('lsCoinsBadge').textContent = pmState.coins;
  lsAdoptMascot();
  document.getElementById('pmLesson').classList.add('open');
  lsGoStep(0);
}

function lsGoStep(n) {
  const ctx = pmLessonCtx;
  if (!ctx) return;
  ctx.step     = n;
  ctx.answered = false;

  const dotsEl = document.getElementById('lsDots');
  if (dotsEl) {
    dotsEl.innerHTML = '';
    ctx.steps.forEach((_, i) => {
      const d = document.createElement('span');
      d.className = 'ls-dot' + (i < n ? ' done' : i === n ? ' active' : '');
      dotsEl.appendChild(d);
    });
  }

  lsSetStepFace(ctx.steps[n]);

  const col = document.getElementById('lsContentCol');
  if (!col) return;
  if (n === 0 || !col.innerHTML.trim()) {
    col.innerHTML = lsBuildStep(ctx.steps[n]);
    void col.offsetWidth;
    col.classList.add('ls-enter');
    setTimeout(() => col.classList.remove('ls-enter'), 350);
  } else {
    col.classList.add('ls-exit');
    setTimeout(() => {
      col.innerHTML = lsBuildStep(ctx.steps[n]);
      col.classList.remove('ls-exit');
      void col.offsetWidth;
      col.classList.add('ls-enter');
      setTimeout(() => col.classList.remove('ls-enter'), 350);
    }, 185);
  }
}

function lsBuildStep(step) {
  switch (step.type) {
    case 'intro':
      return '<div class="ls-step-inner">'
        + '<div class="ls-bubble">' + step.frase + '</div>'
        + '<button class="ls-btn ls-btn-gold" onclick="pmLessonNext()">' + step.btn + '</button>'
        + '</div>';

    case 'dato': {
      const isIcon = !step.num || step.num === '💡' || step.num.length > 5;
      return '<div class="ls-step-inner">'
        + '<div class="ls-dato-card">'
        + '<div class="ls-dato-num' + (isIcon ? ' ls-dato-icon' : '') + '">' + step.num + '</div>'
        + '<div class="ls-dato-desc">' + step.desc + '</div>'
        + '</div>'
        + '<button class="ls-btn ls-btn-gold" onclick="pmLessonNext()">' + step.btn + '</button>'
        + '</div>';
    }

    case 'ejemplo':
      return '<div class="ls-step-inner">'
        + '<div class="ls-ejemplo-card">'
        + '<span class="ls-ejemplo-eyebrow">📖 Caso real</span>'
        + step.texto.replace(/\n/g, '<br>')
        + '</div>'
        + '<button class="ls-btn ls-btn-gold" onclick="pmLessonNext()">' + step.btn + '</button>'
        + '</div>';

    case 'pregunta': {
      const optsHTML = step.opts.map((o, i) =>
        '<button class="ls-opt" onclick="pmLessonAnswer(' + i + ')">' + o + '</button>'
      ).join('');
      return '<div class="ls-step-inner">'
        + '<div class="ls-q-title">' + step.q + '</div>'
        + '<div class="ls-opts">' + optsHTML + '</div>'
        + '<div class="ls-feedback" id="lsFb"></div>'
        + '<button class="ls-btn ls-btn-green ls-btn-hidden" id="lsQNext" onclick="pmLessonNext()">Continuar →</button>'
        + '<button class="ls-btn ls-btn-red ls-btn-hidden" id="lsQRetry" onclick="lsRetryQuestion()">Reintentar →</button>'
        + '</div>';
    }

    case 'resumen':
      return '<div class="ls-step-inner ls-resumen-inner">'
        + '<span class="ls-win-icon">🎉</span>'
        + '<div class="ls-win-title">' + (step.titulo || '¡Lo lograste!') + '</div>'
        + '<div class="ls-resumen-card">' + step.texto + '</div>'
        + '<div class="ls-earned-badge">🪙 +' + (step.fichas || 2) + ' fichas ganadas</div>'
        + '<button class="ls-btn ls-btn-gold" onclick="pmLessonFinish()">' + (step.btn || 'Continuar →') + '</button>'
        + '</div>';

    default:
      return '<div class="ls-step-inner"><p>—</p></div>';
  }
}

function pmLessonNext() {
  if (!pmLessonCtx) return;
  const next = pmLessonCtx.step + 1;
  if (next < pmLessonCtx.steps.length) lsGoStep(next);
}

function pmLessonAnswer(idx) {
  const ctx = pmLessonCtx;
  if (!ctx || ctx.answered) return;
  ctx.answered = true;

  const step = ctx.steps[ctx.step];
  const opts = document.querySelectorAll('.ls-opt');
  opts.forEach(b => b.disabled = true);
  const fb = document.getElementById('lsFb');

  if (idx === step.correct) {
    ctx.correct = true;
    opts[idx].classList.add('correct');
    fb.className = 'ls-feedback correct show';
    fb.innerHTML = '✅ ' + step.explain;
    if (typeof setPesoExpression === 'function') setPesoExpression(LS_EXPR_MAP[step.platin_correct] || 'victory');
    const bbl = document.getElementById('bubble'); if (bbl) { bbl.innerHTML = '✅ ¡Correcto!'; bbl.classList.add('show'); }
    const btn = document.getElementById('lsQNext');
    if (btn) btn.classList.remove('ls-btn-hidden');
  } else {
    opts[idx].classList.add('wrong');
    fb.className = 'ls-feedback wrong show';
    fb.innerHTML = '❌ ' + step.explain;
    if (typeof setPesoExpression === 'function') setPesoExpression(LS_EXPR_MAP[step.platin_wrong] || 'sad');
    const bbl = document.getElementById('bubble'); if (bbl) { bbl.innerHTML = '❌ ¡Inténtalo!'; bbl.classList.add('show'); }
    if (!ctx.lifeLost) { ctx.lifeLost = true; pmLoseLife(ctx.pathId); }
    if (PM_LIVES_ENABLED && pmState.lives === 0) {
      const pathId = ctx.pathId;
      setTimeout(() => {
        document.getElementById('pmLesson').classList.remove('open');
        pmLessonCtx = null;
        pmRenderNodes(pathId);
        const banner = document.getElementById('pm-nolives-' + pathId);
        if (banner) { banner.classList.add('show'); banner.scrollIntoView({ behavior:'smooth', block:'center' }); }
      }, 1200);
      return;
    }
    const rBtn = document.getElementById('lsQRetry');
    if (rBtn) rBtn.classList.remove('ls-btn-hidden');
  }
}

function lsRetryQuestion() {
  const ctx = pmLessonCtx;
  if (!ctx) return;
  const step = ctx.steps[ctx.step];
  ctx.answered = false;
  ctx.correct  = false;
  if (typeof setPesoExpression === 'function') setPesoExpression(LS_EXPR_MAP[step.platin] || 'thinking');
  const bblR = document.getElementById('bubble'); if (bblR) { bblR.innerHTML = '🤔 ¿Sabes la respuesta?'; bblR.classList.add('show'); }
  document.querySelectorAll('.ls-opt').forEach(b => { b.disabled = false; b.className = 'ls-opt'; });
  const fb = document.getElementById('lsFb');
  if (fb) { fb.className = 'ls-feedback'; fb.textContent = ''; }
  const rBtn = document.getElementById('lsQRetry');
  if (rBtn) rBtn.classList.add('ls-btn-hidden');
}

function pmLessonFinish() {
  if (!pmLessonCtx) return;
  const { node, pathId, correct } = pmLessonCtx;
  document.getElementById('pmLesson').classList.remove('open');
  lsReturnMascot();
  pmLessonCtx = null;
  if (correct) {
    pmCompleteNode(node.id, pathId);
    pmAwardCoins(2, pathId);
    pmCheckBadges(pathId);
    showAchievement('🎉', '¡Bien hecho!', 'Completaste la lección', 100);
    if (typeof setPesoExpression === 'function') setPesoExpression('happy');
  }
  pmRenderNodes(pathId);
}

function closePMLesson() {
  document.getElementById('pmLesson').classList.remove('open');
  lsReturnMascot();
  pmLessonCtx = null;
}

function pmLaunchGame(gameId, nodeId, pathId, targetLevel) {
  localStorage.setItem('pm_pending', JSON.stringify({ nodeId, pathId, targetLevel: targetLevel || null }));
  closePath();
  openPathGame(gameId);
}

function pmCompleteNode(nodeId, pathId) {
  const key = 'pm_progress_' + pathId;
  const progress = JSON.parse(localStorage.getItem(key) || '{}');
  progress[nodeId] = 'done';
  localStorage.setItem(key, JSON.stringify(progress));
  if (pathId) pmMaybeShowTip(pathId);
}

function pmAwardCoins(amount, pathId) {
  pmState.coins += amount;
  pmSaveCoins();
  pmUpdateStats(pathId);
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);' +
    'background:#FFC700;color:#0F1321;padding:10px 20px;border-radius:999px;' +
    'font-family:"Bricolage Grotesque",sans-serif;font-weight:800;font-size:14px;' +
    'z-index:9999;pointer-events:none;animation:fadeUp .3s ease;';
  toast.textContent = '🪙 +' + amount + ' fichas';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function pmSaveCoins() {
  localStorage.setItem('pm_coins', pmState.coins);
}

function pmUpdateStats(pathId) {
  const ids = {
    ahorro: 'pm-coins-ahorro',
    deudas: 'pm-coins-deudas',
    inversion: 'pm-coins-inv',
    presupuesto: 'pm-coins-pre'
  };
  const el = document.getElementById(ids[pathId]);
  if (el) el.textContent = pmState.coins;

  // Actualizar chips de la sidebar en el overlay activo
  const overlay = document.getElementById('pm-' + pathId);
  if (overlay) {
    overlay.querySelectorAll('.pm-sb-coins').forEach(c => c.textContent = pmState.coins);
    overlay.querySelectorAll('.pm-sb-streak').forEach(c => c.textContent = pmState.streak);
    overlay.querySelectorAll('.pm-sb-lives').forEach(c => c.textContent = pmState.lives + '/' + PM_MAX_LIVES);
  }
  pmUpdateLivesUI(pathId);
}

/* ════════════════════════════════════════════════════
   🛍️ TIENDA DE FICHAS
════════════════════════════════════════════════════ */
let _shopActivePowerupFn = null;

function openShop(gameCtx) {
  document.getElementById('shop-fichas-count').textContent = pmState.coins;

  /* botones generales */
  document.getElementById('shop-btn-vida').disabled  = pmState.coins < 5;
  const shielded = !!localStorage.getItem('pm_streak_shield');
  document.getElementById('shop-btn-racha').disabled = pmState.coins < 10 || shielded;
  document.getElementById('shop-racha-desc').textContent = shielded
    ? '✅ Racha ya protegida' : 'Tu próxima racha no se rompe';

  /* power-up contextual */
  const powerups = {
    deudas:      { icon:'💥', name:'DebtCrusher: +5 Movimientos', desc:'Suma 5 movimientos extra al tablero', fn: shopBuyDCMoves },
    ahorro:      { icon:'🎰', name:'CoinSpín: +3 Giros',          desc:'Suma 3 giros extra a tu alcancía',   fn: shopBuyCMSpins },
    inversion:   { icon:'💡', name:'TradeChile: Pista analista',  desc:'Revela el consejo oculto de la noticia', fn: shopBuyTCHint },
    presupuesto: { icon:'❄️', name:'BudgetSwipe: Congelar timer', desc:'Pausa el timer 5 segundos',          fn: shopBuyBSFreeze },
  };
  const puSection = document.getElementById('shop-powerup-section');
  _shopActivePowerupFn = null;
  if (gameCtx && powerups[gameCtx]) {
    const pu = powerups[gameCtx];
    document.getElementById('shop-pu-icon').textContent = pu.icon;
    document.getElementById('shop-pu-name').textContent = pu.name;
    document.getElementById('shop-pu-desc').textContent = pu.desc;
    document.getElementById('shop-pu-btn').disabled = pmState.coins < 3;
    _shopActivePowerupFn = pu.fn;
    puSection.style.display = 'block';
  } else {
    puSection.style.display = 'none';
  }

  document.getElementById('shopOverlay').classList.add('open');
}

function closeShop(e) {
  if (e && e.target !== document.getElementById('shopOverlay')) return;
  document.getElementById('shopOverlay').classList.remove('open');
  if (pmState.activePath) pmUpdateStats(pmState.activePath);
}

function pmSpendCoins(amount) {
  if (pmState.coins < amount) {
    _shopToast('Sin fichas suficientes (' + amount + ' 🪙 necesarias)', '#E74C3C', '#fff');
    return false;
  }
  pmState.coins -= amount;
  pmSaveCoins();
  document.getElementById('shop-fichas-count').textContent = pmState.coins;
  document.getElementById('shop-btn-vida').disabled  = pmState.coins < 5;
  const shielded = !!localStorage.getItem('pm_streak_shield');
  document.getElementById('shop-btn-racha').disabled = pmState.coins < 10 || shielded;
  const puBtn = document.getElementById('shop-pu-btn');
  if (puBtn && !puBtn.disabled) puBtn.disabled = pmState.coins < 3;
  return true;
}

function shopBuyExtraLife() {
  if (!pmSpendCoins(5)) return;
  pmGainLife(pmState.activePath || 'ahorro');
  _shopToast('❤️ Vida extra ganada');
}

function shopBuyProtectStreak() {
  if (!pmSpendCoins(10)) return;
  localStorage.setItem('pm_streak_shield', '1');
  document.getElementById('shop-racha-desc').textContent = '✅ Racha ya protegida';
  document.getElementById('shop-btn-racha').disabled = true;
  _shopToast('🛡️ Racha protegida — se activará en tu próxima sesión');
}

function shopActivePowerup() { if (_shopActivePowerupFn) _shopActivePowerupFn(); }

function shopBuyDCMoves() {
  if (!pmSpendCoins(3)) return;
  const prev = parseInt(localStorage.getItem('pm_pu_dc_moves') || '0');
  localStorage.setItem('pm_pu_dc_moves', prev + 5);
  document.getElementById('shop-pu-btn').disabled = pmState.coins < 3;
  _shopToast('💥 +5 movimientos listos para DebtCrusher');
}

function shopBuyCMSpins() {
  if (!pmSpendCoins(3)) return;
  const prev = parseInt(localStorage.getItem('pm_pu_cm_spins') || '0');
  localStorage.setItem('pm_pu_cm_spins', prev + 3);
  document.getElementById('shop-pu-btn').disabled = pmState.coins < 3;
  _shopToast('🎰 +3 giros listos para CoinSpín');
}

function shopBuyTCHint() {
  if (!pmSpendCoins(3)) return;
  localStorage.setItem('pm_pu_tc_hint', '1');
  document.getElementById('shop-pu-btn').disabled = true;
  _shopToast('💡 Pista del analista lista para TradeChile');
}

function shopBuyBSFreeze() {
  if (!pmSpendCoins(3)) return;
  const prev = parseInt(localStorage.getItem('pm_pu_bs_freeze') || '0');
  localStorage.setItem('pm_pu_bs_freeze', prev + 5);
  document.getElementById('shop-pu-btn').disabled = pmState.coins < 3;
  _shopToast('❄️ +5s de timer listos para BudgetSwipe');
}

function _shopToast(msg, bg, color) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:'+(bg||'#FFC700')+';color:'+(color||'#0F1321')+';padding:10px 22px;border-radius:999px;font-family:"Poppins",sans-serif;font-weight:800;font-size:13px;z-index:9999;pointer-events:none;white-space:nowrap;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

let _achieveTimer = null;
function showAchievement(icon, title, desc, coins) {
  document.getElementById('achieveIcon').textContent = icon;
  document.getElementById('achieveTitle').textContent = title;
  document.getElementById('achieveDesc').textContent = desc;
  document.getElementById('achieveCoins').textContent = '🪙 +' + coins + ' monedas';
  const toast = document.getElementById('achieveToast');
  toast.style.display = 'block';
  clearTimeout(_achieveTimer);
  _achieveTimer = setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

const PM_CERT_META = {
  ahorro:      { badge:'💰', name:'Aprende a guardar tu plata',   student:'Sebastián', shareMsg:'¡Completé el camino Ahorro en Platuuu! Aprendí a guardar mi plata con datos reales de la CMF 🪙 #Platuuu #FinanzasChile' },
  deudas:      { badge:'💳', name:'Aplasta tus deudas',            student:'Sebastián', shareMsg:'¡Completé el camino Deudas en Platuuu! Aprendí a gestionar mis deudas con datos reales de la CMF 🪙 #Platuuu #FinanzasChile' },
  inversion:   { badge:'📈', name:'Haz crecer tu dinero',          student:'Sebastián', shareMsg:'¡Completé el camino Inversión en Platuuu! Aprendí a invertir con datos reales de la CMF 🪙 #Platuuu #FinanzasChile' },
  presupuesto: { badge:'📊', name:'Ordena tus gastos',             student:'Sebastián', shareMsg:'¡Completé el camino Presupuesto en Platuuu! Aprendí a ordenar mis gastos con datos reales de la CMF 🪙 #Platuuu #FinanzasChile' }
};

let pmCertPathId = null;

function pmShowCertificate(pathId) {
  pmCertPathId = pathId;
  const meta = PM_CERT_META[pathId] || {};

  document.getElementById('pmCertBadge').textContent    = meta.badge   || '🏆';
  document.getElementById('pmCertName').textContent     = meta.name    || pathId;
  document.getElementById('pmCertStudent').textContent  = meta.student || 'Usuario';
  document.getElementById('pmCertDate').textContent     =
    new Date().toLocaleDateString('es-CL', { year:'numeric', month:'long', day:'numeric' });

  document.getElementById('pmCertScreen').classList.add('open');
  pmMarkLandingBadge(pathId);
}

function pmCertShare() {
  const meta = PM_CERT_META[pmCertPathId] || {};
  const text = meta.shareMsg || '¡Completé un camino en Platuuu! 🪙 #Platuuu #FinanzasChile';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('.pm-cert-share');
      const orig = btn.textContent;
      btn.textContent = '✅ ¡Copiado al portapapeles!';
      setTimeout(() => { btn.textContent = orig; }, 2200);
    });
  }
}

function pmCertClose() {
  document.getElementById('pmCertScreen').classList.remove('open');
  const pathId = pmCertPathId;
  pmCertPathId = null;
  closePath();
}

function pmMarkLandingBadge(pathId) {
  const cardMap = {
    ahorro: 0, inversion: 1, deudas: 2, presupuesto: 3
  };
  const cards = document.querySelectorAll('.pcard');
  const card = cards[cardMap[pathId]];
  if (!card) return;
  if (!card.querySelector('.pcard-done-badge')) {
    const badge = document.createElement('div');
    badge.className = 'pcard-done-badge';
    badge.textContent = '✅ Completado';
    badge.style.cssText = 'position:absolute;top:14px;right:14px;' +
      'background:#22C55E;color:white;font-family:"Bricolage Grotesque",sans-serif;' +
      'font-weight:700;font-size:11px;padding:4px 10px;border-radius:999px;';
    card.style.position = 'relative';
    card.appendChild(badge);
  }
}

// Restaurar badges al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  ['ahorro','deudas','inversion','presupuesto'].forEach(p => {
    if (localStorage.getItem('pm_cert_' + p) === 'true') pmMarkLandingBadge(p);
  });
  initSplash();
});

function initSplash() {
  const visits = parseInt(localStorage.getItem('pl_visit_count') || '0');
  const splash  = document.getElementById('splashScreen');
  const bar     = document.getElementById('splashBar');
  const bubble  = document.getElementById('splashBubble');
  const spWink  = document.getElementById('spWink');
  const spEyeR  = document.getElementById('spEyeR');

  // Primera visita: 4s total (barra 3s + pausa). Repetida: 2s. 5+: 1s.
  const barDuration = visits === 0 ? 3000 : visits < 5 ? 1800 : 900;
  const holdAfter   = visits === 0 ? 600  : 200;
  const fadeMs      = 800;

  // Guardar visita
  localStorage.setItem('pl_visit_count', visits + 1);
  localStorage.setItem('pl_visited', 'true');

  // En visitas repetidas: ocultar burbuja
  if (visits >= 1) bubble.style.display = 'none';

  // CSS de fade actualizado a 0.8s
  splash.style.transition = `opacity ${fadeMs}ms ease, visibility ${fadeMs}ms ease`;

  // Arrancar barra de carga
  requestAnimationFrame(() => {
    setTimeout(() => {
      bar.style.transition = `width ${barDuration}ms cubic-bezier(.4,0,.2,1)`;
      bar.style.width = '100%';
    }, 80);
  });

  // Guiño al 45% de la barra (solo primera visita)
  if (visits === 0) {
    setTimeout(() => {
      if (!spWink || !spEyeR) return;
      spEyeR.setAttribute('opacity', '0');
      spWink.setAttribute('opacity', '1');
      setTimeout(() => {
        spEyeR.setAttribute('opacity', '1');
        spWink.setAttribute('opacity', '0');
      }, 320);
    }, barDuration * 0.45);
  }

  // Fade out después de que termina la barra + holdAfter
  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => splash.remove(), fadeMs + 50);
  }, barDuration + holdAfter);
}

/* ── PLATÍN MODAL — bienvenida y consejos ── */

const PLATIN_WELCOME = {
  ahorro:      '¡Hola! Soy Platín 🪙 Te acompañaré en este camino. Juntos vamos a construir el hábito de ahorro más importante de tu vida. ¡Empecemos!',
  deudas:      '¡Hola! Soy Platín 🪙 Sé que las deudas agobian, pero con el conocimiento correcto puedes salir de cualquier deuda. ¡Vamos a aplastarlas juntos!',
  inversion:   '¡Hola! Soy Platín 🪙 Invertir no es solo para ricos. En Chile puedes empezar desde $1.000. ¡Te enseño cómo hacer crecer tu plata!',
  presupuesto: '¡Hola! Soy Platín 🪙 Ordenar tus gastos es el primer paso para tener control total de tu dinero. ¡Hagámoslo juntos!'
};

const PLATIN_TIPS = {
  ahorro: [
    '💡 ¿Sabías que ahorrar $2.000 diarios son $730.000 al año? ¡Pequeños hábitos, grandes resultados!',
    '💡 Tus ahorros en UF se protegen de la inflación — el valor de la UF lo publica la CMF cada día.',
    '💡 La regla de oro: paga primero a ti mismo. Automatiza tu ahorro el mismo día que recibes tu sueldo.'
  ],
  deudas: [
    '💡 La TMC actual la publica la CMF mensualmente. Cualquier tasa mayor es ilegal en Chile.',
    '💡 Pagar $10.000 extra al mes en tu deuda puede ahorrarte meses de intereses. ¡El tiempo importa!',
    '💡 Más de 4 millones de chilenos están en registros de morosidad. Conocer tus derechos es el primer paso.'
  ],
  inversion: [
    '💡 Tu AFP en Fondo A ha rentado históricamente un 7% real anual. ¡El tiempo es tu mejor aliado!',
    '💡 El IPC mide la inflación mensual en Chile. Invertir te protege de perder poder adquisitivo.',
    '💡 Los fondos mutuos en Chile están regulados por la CMF — son seguros y accesibles desde $1.000.'
  ],
  presupuesto: [
    '💡 Los gastos hormiga promedio en Chile suman $180.000 al mes. ¿Cuánto son los tuyos?',
    '💡 Con la regla 50/30/20 y sueldo mínimo puedes ahorrar $100.000 mensuales desde hoy.',
    '💡 Revisar tu presupuesto 10 minutos a la semana puede ahorrarte $200.000 al mes sin sacrificio.'
  ]
};

let platinModalCallback = null;

function showPlatinModal({ label = 'Platín dice', text, btnText = '¡Vamos! →', cardBg = 'white', onClose } = {}) {
  document.getElementById('platinModalLabel').textContent = label;
  document.getElementById('platinModalText').textContent  = text;
  document.getElementById('platinModalBtn').textContent   = btnText;
  document.getElementById('platinModalCard').style.background = cardBg;
  platinModalCallback = onClose || null;
  document.getElementById('platinModal').classList.add('open');
}

function closePlatinModal() {
  document.getElementById('platinModal').classList.remove('open');
  if (platinModalCallback) {
    const cb = platinModalCallback;
    platinModalCallback = null;
    cb();
  }
}

function pmMaybeShowWelcome(pathId, afterCb) {
  const key = 'pl_welcome_' + pathId;
  if (localStorage.getItem(key)) { afterCb(); return; }
  localStorage.setItem(key, '1');
  showPlatinModal({
    label: '¡Bienvenido/a!',
    text:  PLATIN_WELCOME[pathId] || '¡Hola! Soy Platín 🪙 ¡Empecemos!',
    btnText: '¡Vamos! →',
    onClose: afterCb
  });
}

function pmMaybeShowTip(pathId) {
  const key = 'pm_progress_' + pathId;
  const progress = JSON.parse(localStorage.getItem(key) || '{}');
  const done = Object.values(progress).filter(v => v === 'done').length;
  // Mostrar tip en nodo 3, 6, 9
  if (done % 3 !== 0 || done === 0) return;
  const tips = PLATIN_TIPS[pathId] || [];
  const tip  = tips[Math.floor(done / 3 - 1) % tips.length];
  if (!tip) return;
  // Solo mostrar una vez por hito
  const tipKey = 'pl_tip_' + pathId + '_' + done;
  if (localStorage.getItem(tipKey)) return;
  localStorage.setItem(tipKey, '1');
  setTimeout(() => {
    showPlatinModal({
      label: '💡 Consejo de Platín',
      text:  tip,
      btnText: '¡Gracias Platín!'
    });
  }, 600);
}

const PM_ONBOARD_META = {
  ahorro:      { icon:'💰', title:'¿Cuánto sabes de ahorro?',      sub:'Personalizamos el camino según tu nivel' },
  deudas:      { icon:'💳', title:'¿Cuánto sabes de deudas?',       sub:'Personalizamos el camino según tu nivel' },
  inversion:   { icon:'📈', title:'¿Cuánto sabes de inversión?',    sub:'Personalizamos el camino según tu nivel' },
  presupuesto: { icon:'📊', title:'¿Cuánto sabes de presupuesto?',  sub:'Personalizamos el camino según tu nivel' }
};

let pmOnboardPathId = null;

function pmShowOnboarding(pathId) {
  pmOnboardPathId = pathId;
  const meta = PM_ONBOARD_META[pathId] || {};
  document.getElementById('pmOnboardIcon').textContent = meta.icon || '🎯';
  document.getElementById('pmOnboardTitle').textContent = meta.title || '¿Cuánto sabes?';
  document.getElementById('pmOnboardSub').textContent = meta.sub || '';
  document.getElementById('pmOnboard').classList.add('open');
}

function pmOnboardSelect(unlockUntil) {
  document.getElementById('pmOnboard').classList.remove('open');
  const pathId = pmOnboardPathId;
  localStorage.setItem('pm_onboarded_' + pathId, '1');

  if (unlockUntil > 0) {
    const path = PATH_DATA[pathId];
    const key = 'pm_progress_' + pathId;
    const progress = JSON.parse(localStorage.getItem(key) || '{}');
    path.nodes.slice(0, unlockUntil).forEach(n => { progress[n.id] = 'done'; });
    localStorage.setItem(key, JSON.stringify(progress));
  }

  pmOnboardPathId = null;
  pmRenderNodes(pathId);
}

/* ── BADGES ── */
const PM_BADGES_DEF = [
  { id:'primer_paso', icon:'🥇', name:'Primer paso',  desc:'Completaste tu primer nodo' },
  { id:'ahorra_10k',  icon:'🐷', name:'Ahorra 10k',   desc:'Acumulaste 10.000 monedas' },
  { id:'racha_7',     icon:'🔥', name:'Racha 7 días', desc:'7 días consecutivos usando Platuuu' },
  { id:'experto',     icon:'🎓', name:'Experto',      desc:'Completaste un camino completo' },
  { id:'maestro',     icon:'💎', name:'Maestro',      desc:'Completaste los 4 caminos' },
  { id:'habito_formado', icon:'💪', name:'Hábito Formado', desc:'Completaste Etapa 3 — Hábitos que duran' },
];

function pmGetBadges() {
  return JSON.parse(localStorage.getItem('pl_badges') || '[]');
}

function pmGrantBadge(badgeId, pathId) {
  const badges = pmGetBadges();
  if (badges.includes(badgeId)) return;
  badges.push(badgeId);
  localStorage.setItem('pl_badges', JSON.stringify(badges));
  const def = PM_BADGES_DEF.find(b => b.id === badgeId);
  if (def) showAchievement(def.icon, '¡Badge desbloqueado!', def.name + ' — ' + def.desc, 0);
}

function pmCheckBadges(pathId) {
  // Primer paso
  const allProgress = ['ahorro','deudas','inversion','presupuesto'].map(p =>
    JSON.parse(localStorage.getItem('pm_progress_' + p) || '{}')
  );
  const totalDone = allProgress.reduce((s, p) => s + Object.keys(p).length, 0);
  if (totalDone >= 1) pmGrantBadge('primer_paso', pathId);

  // Ahorra 10k
  if (pmState.coins >= 10000) pmGrantBadge('ahorra_10k', pathId);

  // Experto (un camino completo)
  const paths = ['ahorro','deudas','inversion','presupuesto'];
  const certCount = paths.filter(p => localStorage.getItem('pm_cert_' + p) === 'true').length;
  if (certCount >= 1) pmGrantBadge('experto', pathId);

  // Maestro (4 caminos)
  if (certCount >= 4) pmGrantBadge('maestro', pathId);
}

function pmSidebarPlaceholder(section) {
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);' +
    'background:#374151;color:white;padding:10px 20px;border-radius:999px;' +
    'font-family:"Bricolage Grotesque",sans-serif;font-weight:700;font-size:13px;' +
    'z-index:9999;pointer-events:none;animation:fadeUp .3s ease;white-space:nowrap;';
  toast.textContent = section + ' — próximamente 🚧';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

/* ── CMF API — datos en tiempo real ── */
window.CMF_DATA = { uf: null, ipc: null, utm: null };

(async () => {
  try {
    const res = await fetch(
      'https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=' + CMF_API_KEY + '&formato=json'
    );
    const json = await res.json();
    const val = json?.UFs?.[0]?.Valor;
    if (val) {
      window.CMF_DATA.uf = '$' + val.replace('.', '.').replace(',', '.');
    }
  } catch (e) {
    window.CMF_DATA.uf = '$38.408'; // fallback
  }
})();
