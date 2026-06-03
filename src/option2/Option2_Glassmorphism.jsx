import React, { useState, useRef, useEffect } from 'react';

/* ─── STYLES ─────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400&family=Sora:wght@300;400;500;600;700;800&display=swap');

    .gm-root { font-family: 'Nunito', system-ui, sans-serif; }
    .gm-title { font-family: 'Sora', system-ui, sans-serif; }

    .gm-glass {
      background: rgba(255,255,255,0.55);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.7);
    }
    .gm-glass-dark {
      background: rgba(255,255,255,0.35);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.5);
    }
    [data-dark="true"] .gm-glass {
      background: rgba(22,16,48,0.78);
      border: 1px solid rgba(255,255,255,0.09);
    }
    [data-dark="true"] .gm-glass-dark {
      background: rgba(14,10,32,0.72);
      border: 1px solid rgba(255,255,255,0.07);
    }

    .gm-root *::-webkit-scrollbar { width: 4px; }
    .gm-root *::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 4px; }
    .gm-root *::-webkit-scrollbar-thumb { background: rgba(109,68,255,0.25); border-radius: 4px; }
    [data-dark="true"] *::-webkit-scrollbar-thumb { background: rgba(109,68,255,0.45) !important; }

    .gm-task { transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; }
    .gm-task:hover { transform: translateY(-2px) scale(1.005); box-shadow: 0 8px 32px rgba(109,68,255,0.12) !important; }

    .gm-course-btn { transition: all 0.18s ease; cursor: pointer; border-radius: 12px !important; }
    .gm-course-btn:hover { background: rgba(255,255,255,0.6) !important; transform: translateX(3px); }
    .gm-course-btn.gm-active { background: rgba(255,255,255,0.75) !important; box-shadow: 0 4px 16px rgba(109,68,255,0.15); }
    [data-dark="true"] .gm-course-btn:hover { background: rgba(80,55,130,0.55) !important; }
    [data-dark="true"] .gm-course-btn.gm-active { background: rgba(75,52,135,0.8) !important; box-shadow: 0 4px 16px rgba(109,68,255,0.22); }

    .gm-nav-btn { transition: all 0.15s; cursor: pointer; }
    .gm-nav-btn:hover { background: rgba(255,255,255,0.4) !important; }
    .gm-nav-btn.gm-active-nav { background: rgba(109,68,255,0.12) !important; color: #6D44FF !important; }
    [data-dark="true"] .gm-nav-btn:hover { background: rgba(109,68,255,0.18) !important; }
    [data-dark="true"] .gm-nav-btn.gm-active-nav { background: rgba(109,68,255,0.28) !important; color: #9B6BFF !important; }

    .gm-chat-msg { animation: gm-pop 0.28s cubic-bezier(0.34,1.56,0.64,1); }
    @keyframes gm-pop {
      from { opacity: 0; transform: scale(0.92) translateY(6px); }
      to   { opacity: 1; transform: scale(1)    translateY(0); }
    }

    .gm-input:focus { outline: none; border-color: rgba(109,68,255,0.5) !important; box-shadow: 0 0 0 3px rgba(109,68,255,0.1); }
    .gm-input::placeholder { color: rgba(100,100,140,0.5); font-family: 'Nunito', sans-serif; }
    [data-dark="true"] .gm-input::placeholder { color: rgba(200,185,255,0.35); }

    .gm-send-btn { transition: all 0.18s; }
    .gm-send-btn:hover { transform: scale(1.06); filter: brightness(1.1); }

    .gm-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }

    .gm-pill { transition: all 0.15s; }
    .gm-pill:hover { transform: scale(1.05); }

    @keyframes gm-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33%       { transform: translateY(-8px) rotate(0.5deg); }
      66%       { transform: translateY(-4px) rotate(-0.5deg); }
    }
    .gm-float-card { animation: gm-float 8s ease-in-out infinite; }

    .gm-tag { display: inline-flex; align-items: center; padding: 2px 9px; border-radius: 999px; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }

    .gm-inbox-item { transition: all 0.18s ease; cursor: pointer; }
    .gm-inbox-item:hover { transform: translateX(3px); box-shadow: 0 4px 16px rgba(109,68,255,0.1) !important; }

    .gm-cal-day { transition: background 0.12s; cursor: default; }
    .gm-cal-day:hover { background: rgba(109,68,255,0.06) !important; }
    [data-dark="true"] .gm-cal-day:hover { background: rgba(109,68,255,0.12) !important; }

    @keyframes gm-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
    .gm-dot { animation: gm-blink 1.2s ease-in-out infinite; }
    .gm-dot:nth-child(2) { animation-delay: 0.2s; }
    .gm-dot:nth-child(3) { animation-delay: 0.4s; }

    .gm-dark-toggle { transition: all 0.2s ease; cursor: pointer; }
    .gm-dark-toggle:hover { transform: scale(1.08); }

    @keyframes gm-fab-pulse {
      0%, 100% { box-shadow: 0 8px 32px rgba(109,68,255,0.45), 0 0 0 0 rgba(109,68,255,0.35); }
      60%       { box-shadow: 0 8px 32px rgba(109,68,255,0.45), 0 0 0 14px rgba(109,68,255,0); }
    }
    .gm-fab { animation: gm-fab-pulse 2.2s ease-in-out infinite; transition: transform 0.2s ease; }
    .gm-fab-open { animation: none; box-shadow: 0 8px 32px rgba(109,68,255,0.45) !important; }
    .gm-fab:hover { transform: scale(1.1); }

    .gm-chat-popup { transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
    .gm-chat-popup-closed { opacity: 0; transform: translateY(20px) scale(0.97); pointer-events: none; }
    .gm-chat-popup-open  { opacity: 1; transform: translateY(0)    scale(1);    pointer-events: all; }
  `}</style>
);

/* ─── DATA ───────────────────────────────────────────────── */
const COURSES = [
  { id: 1, name: 'Redes Neuronales Profundas',      prof: 'Dr. Ramírez',  color: '#6D44FF', bg: 'rgba(109,68,255,0.12)', abbr: 'RNP', progress: 72, credits: 4, tasks: 2 },
  { id: 2, name: 'Proc. de Lenguaje Natural',        prof: 'Dra. Torres',  color: '#FF6B9D', bg: 'rgba(255,107,157,0.12)', abbr: 'PLN', progress: 58, credits: 4, tasks: 1 },
  { id: 3, name: 'Ética en IA',                      prof: 'Lic. Mendoza', color: '#00C9A7', bg: 'rgba(0,201,167,0.12)',   abbr: 'ÉIA', progress: 81, credits: 3, tasks: 1 },
  { id: 4, name: 'Álgebra Lineal Computacional',     prof: 'Dr. Vega',     color: '#FF9500', bg: 'rgba(255,149,0,0.12)',   abbr: 'ALC', progress: 64, credits: 5, tasks: 1 },
  { id: 5, name: 'Proyecto Terminal',                prof: 'Dr. Flores',   color: '#30B0C7', bg: 'rgba(48,176,199,0.12)',  abbr: 'PT',  progress: 35, credits: 8, tasks: 0 },
];

const TASKS = [
  { id: 1, title: 'Implementar red neuronal convolucional', course: 'Redes Neuronales Profundas',     courseAbbr: 'RNP', courseColor: '#6D44FF', due: 'Jue 5 Jun · 11:59 PM', daysLeft: 3,  priority: 'URGENTE', type: 'Programación', status: 'pending', icon: '🧠' },
  { id: 2, title: 'Ensayo: Sesgos en modelos de lenguaje',  course: 'Proc. de Lenguaje Natural',      courseAbbr: 'PLN', courseColor: '#FF6B9D', due: 'Vie 6 Jun · 11:59 PM', daysLeft: 4,  priority: 'MEDIA',   type: 'Ensayo',       status: 'pending', icon: '✍️' },
  { id: 3, title: 'Leer capítulos 4–6 Russell & Norvig',    course: 'Ética en IA',                    courseAbbr: 'ÉIA', courseColor: '#00C9A7', due: 'Mié 4 Jun',            daysLeft: 2,  priority: 'BAJA',    type: 'Lectura',      status: 'pending', icon: '📖' },
  { id: 4, title: 'Ejercicios 3.1 a 3.8',                   course: 'Álgebra Lineal Computacional',   courseAbbr: 'ALC', courseColor: '#FF9500', due: 'Lun 2 Jun',            daysLeft: -1, priority: 'VENCIDA', type: 'Ejercicios',   status: 'overdue', icon: '⚠️' },
];

const GRADES = [
  { abbr: 'RNP', name: 'Redes Neuronales Profundas', prof: 'Dr. Ramírez',  color: '#6D44FF', items: [{ name: 'Parcial 1', score: 85 }, { name: 'Parcial 2', score: 89 }, { name: 'Lab CNN',   score: 91 }], avg: 88 },
  { abbr: 'PLN', name: 'Proc. de Lenguaje Natural',  prof: 'Dra. Torres',  color: '#FF6B9D', items: [{ name: 'Parcial 1', score: 94 }, { name: 'Parcial 2', score: 90 }, { name: 'Proyecto', score: 92 }], avg: 92 },
  { abbr: 'ÉIA', name: 'Ética en IA',                prof: 'Lic. Mendoza', color: '#00C9A7', items: [{ name: 'Parcial 1', score: 76 }, { name: 'Parcial 2', score: 80 }, { name: 'Ensayo',   score: 78 }], avg: 78 },
  { abbr: 'ALC', name: 'Álgebra Lineal Comput.',     prof: 'Dr. Vega',     color: '#FF9500', items: [{ name: 'Parcial 1', score: 62 }, { name: 'Parcial 2', score: 67 }, { name: 'Ejercicios', score: 65 }], avg: 65 },
  { abbr: 'PT',  name: 'Proyecto Terminal',          prof: 'Dr. Flores',   color: '#30B0C7', items: [{ name: 'Avance 1', score: null }], avg: null },
];

const INBOX = [
  { id: 1, from: 'Dr. Ramírez',  course: 'RNP', color: '#6D44FF', subject: 'CNN: entrega en parejas permitida',     body: 'La implementación de la CNN puede entregarse en parejas. El plazo sigue siendo el jueves 5 de junio a las 23:59. Asegúrense de incluir el reporte técnico.', time: 'Hace 2h',     read: false },
  { id: 2, from: 'Dra. Torres',  course: 'PLN', color: '#FF6B9D', subject: 'Material capítulo 7 ya disponible',      body: 'Ya está disponible el material del capítulo 7 en la plataforma. Incluye slides sobre BERT y ejemplos con Hugging Face Transformers.',                  time: 'Hace 5h',     read: false },
  { id: 3, from: 'Lic. Mendoza', course: 'ÉIA', color: '#00C9A7', subject: 'Recordatorio: lectura para el miércoles', body: 'Los capítulos 4–6 de Russell & Norvig son obligatorios para el miércoles. Habrá un quiz de 10 minutos al inicio de la sesión.',                   time: 'Ayer',        read: true },
  { id: 4, from: 'Dr. Flores',   course: 'PT',  color: '#30B0C7', subject: 'Sesión de asesoría — viernes 14:00',     body: 'El viernes tendremos sesión de asesoría para el Proyecto Terminal a las 14:00 hrs en el Laboratorio 3. Traigan avance del segundo sprint.',     time: 'Hace 2 días', read: true },
];

const CAL_EVENTS = {
  2: { task: 'Ej. 3.1–3.8',  course: 'ALC', color: '#FF9500', overdue: true },
  4: { task: 'Leer cap. 4–6', course: 'ÉIA', color: '#00C9A7' },
  5: { task: 'CNN (23:59)',   course: 'RNP', color: '#6D44FF', urgent: true },
  6: { task: 'Ensayo PLN',    course: 'PLN', color: '#FF6B9D' },
};

const INIT_MSGS = [
  { role: 'user', text: '¿Qué tengo pendiente esta semana?' },
  { role: 'ai',   text: 'Tienes 4 entregas esta semana. La más urgente es la red neuronal convolucional para Redes Neuronales (jueves 11:59 PM). También tienes un ensayo de PLN el viernes. ¡Ojo! Los ejercicios de Álgebra ya están vencidos desde ayer. ¿Quieres que te ayude a organizarte?' },
];

const PRIORITY_COLORS = {
  URGENTE: { bg: 'rgba(109,68,255,0.15)', text: '#6D44FF', border: 'rgba(109,68,255,0.3)' },
  MEDIA:   { bg: 'rgba(255,107,157,0.1)', text: '#FF6B9D', border: 'rgba(255,107,157,0.25)' },
  BAJA:    { bg: 'rgba(0,201,167,0.1)',   text: '#00C9A7', border: 'rgba(0,201,167,0.25)' },
  VENCIDA: { bg: 'rgba(255,80,80,0.1)',   text: '#FF5050', border: 'rgba(255,80,80,0.3)' },
};

const getAIResponse = (txt) => {
  const s = txt.toLowerCase();
  if (s.includes('tarea') || s.includes('pendiente') || s.includes('debo'))
    return 'Tienes 3 tareas pendientes: CNN para RNP (jue 5 jun 🟣 urgente), Ensayo PLN (vie 6 jun 🩷) y Lectura Ética (mié 4 jun 🟢). También 1 entrega vencida en ALC ⚠️. ¿Quieres que te ayude a priorizar?';
  if (s.includes('ayuda') || s.includes('explica') || s.includes('tutor') || s.includes('enseña'))
    return 'Modo tutor activado ✦ Puedo explicarte cualquier tema: redes neuronales, NLP, ética en IA, álgebra lineal o tu proyecto terminal. ¿Por dónde empezamos?';
  if (s.includes('cnn') || s.includes('convolucional') || s.includes('neuronal'))
    return 'Una CNN usa capas Conv2d para extraer características espaciales. Arquitectura en PyTorch: Conv2d → ReLU → MaxPool2d → Flatten → Linear. El Dr. Ramírez pide 3 capas conv. ¿Genero el esqueleto del código?';
  if (s.includes('organiz') || s.includes('semana') || s.includes('plan') || s.includes('horario'))
    return '📅 Plan sugerido: Hoy (lun) — CNN 3h. Mar — CNN 2h + inicio ensayo. Mié — Lectura Ética AM, CNN PM. Jue — entregar CNN antes de las 22:00. Vie — entregar ensayo PLN. ¿Ajusto algo?';
  if (s.includes('calificac') || s.includes('nota') || s.includes('promedio'))
    return 'Tu promedio actual: RNP 88 · PLN 92 · ÉIA 78 · ALC 65 · PT en progreso. Promedio general: 80.75/100. Materia crítica: ALC. ¿Quieres una estrategia para subirla?';
  if (s.includes('pln') || s.includes('lenguaje') || s.includes('ensayo') || s.includes('sesgo'))
    return 'Para el ensayo de PLN sobre sesgos: 1) Definición de sesgos en LLMs, 2) Causas (datos de entrenamiento), 3) Consecuencias sociales, 4) Mitigaciones. La Dra. Torres valora las referencias empíricas. ¿Te ayudo con la bibliografía?';
  return 'Entendido ✦ Tengo acceso a tu calendario, tareas y materiales de tus 5 materias. ¿Sobre qué necesitas ayuda específicamente?';
};

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function Option2Glassmorphism() {
  const [messages, setMessages]         = useState(INIT_MSGS);
  const [inputText, setInputText]       = useState('');
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeNav, setActiveNav]       = useState('Tablero');
  const [isTyping, setIsTyping]         = useState(false);
  const [openMsg, setOpenMsg]           = useState(null);
  const [darkMode, setDarkMode]         = useState(false);
  const [chatOpen, setChatOpen]         = useState(false);
  const msgContainerRef                 = useRef(null);

  const t = darkMode ? {
    bg:               '#0f0c1e',
    text:             '#e8e0ff',
    textMuted:        'rgba(200,185,255,0.55)',
    textFaint:        'rgba(200,185,255,0.38)',
    textVeryFaint:    'rgba(200,185,255,0.22)',
    divider:          'rgba(109,68,255,0.18)',
    navActive:        'rgba(109,68,255,0.28)',
    sidebarActive:    'rgba(75,52,135,0.8)',
    sidebarInactive:  'rgba(200,185,255,0.55)',
    inputBg:          'rgba(20,15,45,0.85)',
    chatAiBubble:     'rgba(28,20,62,0.9)',
    chatAiBorder:     'rgba(255,255,255,0.1)',
    notifBorder:      '#0f0c1e',
    tableOddRow:      'rgba(109,68,255,0.05)',
    calHeaderBg:      'rgba(109,68,255,0.08)',
    calCellBorder:    'rgba(109,68,255,0.1)',
    calTodayBg:       'rgba(109,68,255,0.1)',
    calEmptyBg:       'rgba(255,255,255,0.01)',
    taskEmptyBg:      'rgba(25,18,50,0.5)',
    taskEmptyBorder:  'rgba(255,255,255,0.08)',
    progressBg:       'rgba(109,68,255,0.15)',
    pillBg:           'rgba(109,68,255,0.15)',
    pillBorder:       'rgba(109,68,255,0.3)',
    inputBorder:      'rgba(109,68,255,0.25)',
    bodyText:         'rgba(200,185,255,0.7)',
    toggleBg:         'rgba(200,185,255,0.1)',
    toggleBorder:     'rgba(200,185,255,0.2)',
    toggleFg:         '#e8e0ff',
  } : {
    bg:               '#EEF0FF',
    text:             '#1a0a4a',
    textMuted:        'rgba(60,40,120,0.5)',
    textFaint:        'rgba(60,40,120,0.4)',
    textVeryFaint:    'rgba(60,40,120,0.3)',
    divider:          'rgba(109,68,255,0.1)',
    navActive:        'rgba(109,68,255,0.1)',
    sidebarActive:    'rgba(255,255,255,0.75)',
    sidebarInactive:  'rgba(60,40,120,0.6)',
    inputBg:          'rgba(255,255,255,0.7)',
    chatAiBubble:     'rgba(255,255,255,0.75)',
    chatAiBorder:     'rgba(255,255,255,0.8)',
    notifBorder:      'white',
    tableOddRow:      'rgba(109,68,255,0.02)',
    calHeaderBg:      'rgba(109,68,255,0.05)',
    calCellBorder:    'rgba(109,68,255,0.06)',
    calTodayBg:       'rgba(109,68,255,0.05)',
    calEmptyBg:       'rgba(0,0,0,0.02)',
    taskEmptyBg:      'rgba(255,255,255,0.4)',
    taskEmptyBorder:  'rgba(255,255,255,0.6)',
    progressBg:       'rgba(109,68,255,0.08)',
    pillBg:           'rgba(109,68,255,0.08)',
    pillBorder:       'rgba(109,68,255,0.18)',
    inputBorder:      'rgba(109,68,255,0.15)',
    bodyText:         'rgba(60,40,120,0.7)',
    toggleBg:         'rgba(109,68,255,0.08)',
    toggleBorder:     'rgba(109,68,255,0.2)',
    toggleFg:         '#6D44FF',
  };

  useEffect(() => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = () => {
    const txt = inputText.trim();
    if (!txt) return;
    setMessages(p => [...p, { role: 'user', text: txt }]);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(p => [...p, { role: 'ai', text: getAIResponse(txt) }]);
    }, 900);
  };

  const handleSuggestion = (s) => {
    setInputText('');
    setIsTyping(true);
    setMessages(p => [...p, { role: 'user', text: s }]);
    setTimeout(() => { setIsTyping(false); setMessages(p => [...p, { role: 'ai', text: getAIResponse(s) }]); }, 900);
  };

  const filtered = activeCourse ? TASKS.filter(task => task.course === activeCourse) : TASKS;
  const pending  = TASKS.filter(task => task.status === 'pending').length;
  const overdue  = TASKS.filter(task => task.status === 'overdue').length;
  const unread   = INBOX.filter(m => !m.read).length;

  /* ── TASK LIST shared ── */
  const TaskList = ({ tasks }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {tasks.length === 0 && (
        <div style={{ padding: '32px', textAlign: 'center', background: t.taskEmptyBg, borderRadius: '16px', border: `1px solid ${t.taskEmptyBorder}`, color: t.textFaint, fontWeight: 600, fontSize: '14px' }}>
          ¡Sin entregas pendientes para este curso! ✓
        </div>
      )}
      {tasks.map(task => {
        const pc = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.BAJA;
        return (
          <div key={task.id} className="gm-task gm-glass" style={{ borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 12px rgba(109,68,255,0.06)' }}>
            <div style={{ fontSize: '22px', flexShrink: 0 }}>{task.icon}</div>
            <div style={{ width: '3px', height: '40px', background: task.courseColor, borderRadius: '999px', flexShrink: 0, boxShadow: `0 0 8px ${task.courseColor}50` }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="gm-title" style={{ fontSize: '14px', fontWeight: 700, color: task.status === 'overdue' ? '#FF5050' : t.text, marginBottom: '5px', lineHeight: 1.3 }}>{task.title}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="gm-tag" style={{ background: task.status === 'overdue' ? 'rgba(255,80,80,0.1)' : `${task.courseColor}15`, color: task.status === 'overdue' ? '#FF5050' : task.courseColor, border: `1px solid ${task.status === 'overdue' ? 'rgba(255,80,80,0.2)' : task.courseColor + '30'}` }}>{task.courseAbbr}</span>
                <span style={{ fontSize: '11px', color: t.textFaint, fontWeight: 500 }}>{task.type}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '12px', color: task.status === 'overdue' ? '#FF5050' : t.textMuted, fontWeight: 600, marginBottom: '6px', whiteSpace: 'nowrap' }}>{task.due}</div>
              <span className="gm-tag gm-pill" style={{ background: pc.bg, color: pc.text, border: `1px solid ${pc.border}` }}>{task.priority}</span>
            </div>
            <div style={{ width: '32px', height: '32px', border: `2px solid ${task.courseColor}40`, borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <span style={{ fontSize: '10px', color: task.courseColor }}>✓</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ── VIEW: TABLERO ── */
  const TableroView = (
    <div>
      {!activeCourse && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
          <div className="gm-glass gm-float-card" style={{ borderRadius: '20px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: '80px', height: '80px', background: 'rgba(109,68,255,0.08)', borderRadius: '50%' }} />
            <div style={{ fontSize: '11px', fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Esta semana</div>
            <div className="gm-title" style={{ fontSize: '44px', fontWeight: 800, color: '#6D44FF', lineHeight: 1 }}>{pending}</div>
            <div style={{ fontSize: '13px', color: t.textMuted, marginTop: '4px', fontWeight: 500 }}>tareas pendientes</div>
            <div style={{ marginTop: '12px', background: t.progressBg, borderRadius: '999px', height: '5px', overflow: 'hidden' }}>
              <div style={{ width: '25%', height: '100%', background: 'linear-gradient(90deg, #6D44FF, #FF6B9D)', borderRadius: '999px' }} />
            </div>
            <div style={{ fontSize: '10px', color: t.textFaint, marginTop: '4px', fontWeight: 500 }}>1 de 4 completada</div>
          </div>
          <div className="gm-glass" style={{ borderRadius: '20px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: '80px', height: '80px', background: 'rgba(255,80,80,0.06)', borderRadius: '50%' }} />
            <div style={{ fontSize: '11px', fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Vencidas</div>
            <div className="gm-title" style={{ fontSize: '44px', fontWeight: 800, color: '#FF5050', lineHeight: 1 }}>{overdue}</div>
            <div style={{ fontSize: '13px', color: t.textMuted, marginTop: '4px', fontWeight: 500 }}>requieren atención</div>
            <div style={{ marginTop: '12px', padding: '6px 10px', background: 'rgba(255,80,80,0.08)', borderRadius: '10px', border: '1px solid rgba(255,80,80,0.15)' }}>
              <div style={{ fontSize: '11px', color: '#FF5050', fontWeight: 600 }}>⚠️ Álgebra Lineal · Ej. 3.1–3.8</div>
            </div>
          </div>
          <div className="gm-glass" style={{ borderRadius: '20px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: '80px', height: '80px', background: 'rgba(0,201,167,0.06)', borderRadius: '50%' }} />
            <div style={{ fontSize: '11px', fontWeight: 700, color: t.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Próxima entrega</div>
            <div className="gm-title" style={{ fontSize: '28px', fontWeight: 800, color: t.text, lineHeight: 1, marginBottom: '6px' }}>Jueves</div>
            <div style={{ fontSize: '12px', color: t.textMuted, fontWeight: 500, marginBottom: '10px' }}>5 Jun · 11:59 PM</div>
            <div style={{ padding: '6px 10px', background: t.progressBg, borderRadius: '10px', border: `1px solid ${t.divider}` }}>
              <div style={{ fontSize: '11px', color: '#6D44FF', fontWeight: 600 }}>🧠 Red neuronal convolucional</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h2 className="gm-title" style={{ fontSize: '18px', fontWeight: 700, color: t.text, margin: 0 }}>{activeCourse ? 'Entregas del Curso' : 'Entregas Pendientes'}</h2>
        <span style={{ fontSize: '12px', color: t.textFaint, fontWeight: 600 }}>{filtered.length} items</span>
      </div>
      <TaskList tasks={filtered} />

      {!activeCourse && (
        <div style={{ marginTop: '28px' }}>
          <h2 className="gm-title" style={{ fontSize: '18px', fontWeight: 700, color: t.text, margin: '0 0 14px' }}>Progreso del Semestre</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {COURSES.map(c => (
              <div key={c.id} onClick={() => setActiveCourse(c.name)} className="gm-glass gm-task" style={{ borderRadius: '16px', padding: '18px', cursor: 'pointer', boxShadow: '0 2px 12px rgba(109,68,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span className="gm-title" style={{ fontSize: '16px', fontWeight: 800, color: c.color }}>{c.abbr}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: c.color }}>{c.progress}%</span>
                </div>
                <div style={{ fontSize: '11px', color: t.text, fontWeight: 600, lineHeight: '1.35', marginBottom: '6px' }}>{c.name}</div>
                <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 500, marginBottom: '12px' }}>{c.prof}</div>
                <div style={{ background: t.progressBg, borderRadius: '999px', height: '5px', overflow: 'hidden' }}>
                  <div style={{ width: `${c.progress}%`, height: '100%', background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`, borderRadius: '999px', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /* ── VIEW: CURSOS ── */
  const CursosView = (
    <div>
      {!activeCourse ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {COURSES.map(c => {
            const courseTasks = TASKS.filter(task => task.course === c.name);
            const pendingCount = courseTasks.filter(task => task.status === 'pending').length;
            const overdueCount = courseTasks.filter(task => task.status === 'overdue').length;
            return (
              <div key={c.id} onClick={() => setActiveCourse(c.name)} className="gm-glass gm-task" style={{ borderRadius: '20px', padding: '20px 24px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 2px 12px rgba(109,68,255,0.06)', cursor: 'pointer' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${c.color}18`, border: `2px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="gm-title" style={{ fontSize: '16px', fontWeight: 800, color: c.color }}>{c.abbr}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="gm-title" style={{ fontSize: '15px', fontWeight: 700, color: t.text, marginBottom: '2px' }}>{c.name}</div>
                  <div style={{ fontSize: '12px', color: t.textMuted, fontWeight: 500, marginBottom: '10px' }}>{c.prof} · {c.credits} créditos</div>
                  <div style={{ background: `${c.color}18`, borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${c.progress}%`, height: '100%', background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`, borderRadius: '999px', transition: 'width 0.6s ease' }} />
                  </div>
                  <div style={{ fontSize: '10px', color: t.textFaint, marginTop: '4px', fontWeight: 600 }}>{c.progress}% del semestre</div>
                </div>
                <div style={{ display: 'flex', gap: '14px', flexShrink: 0 }}>
                  {pendingCount > 0 && (
                    <div style={{ textAlign: 'center' }}>
                      <div className="gm-title" style={{ fontSize: '28px', fontWeight: 800, color: c.color, lineHeight: 1 }}>{pendingCount}</div>
                      <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 600 }}>pendiente{pendingCount !== 1 ? 's' : ''}</div>
                    </div>
                  )}
                  {overdueCount > 0 && (
                    <div style={{ textAlign: 'center' }}>
                      <div className="gm-title" style={{ fontSize: '28px', fontWeight: 800, color: '#FF5050', lineHeight: 1 }}>{overdueCount}</div>
                      <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 600 }}>vencida{overdueCount !== 1 ? 's' : ''}</div>
                    </div>
                  )}
                  {pendingCount === 0 && overdueCount === 0 && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px' }}>✅</div>
                      <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 600 }}>al día</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {(() => {
            const c = COURSES.find(x => x.name === activeCourse);
            const courseTasks = TASKS.filter(task => task.course === activeCourse);
            return (
              <div>
                <div className="gm-glass" style={{ borderRadius: '20px', padding: '24px', marginBottom: '24px', borderTop: `3px solid ${c.color}` }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${c.color}18`, border: `2px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="gm-title" style={{ fontSize: '18px', fontWeight: 800, color: c.color }}>{c.abbr}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="gm-title" style={{ fontSize: '18px', fontWeight: 800, color: t.text, marginBottom: '4px' }}>{c.name}</div>
                      <div style={{ fontSize: '13px', color: t.textMuted, fontWeight: 500, marginBottom: '14px' }}>{c.prof} · {c.credits} créditos</div>
                      <div style={{ background: `${c.color}18`, borderRadius: '999px', height: '8px', overflow: 'hidden', marginBottom: '5px' }}>
                        <div style={{ width: `${c.progress}%`, height: '100%', background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`, borderRadius: '999px' }} />
                      </div>
                      <div style={{ fontSize: '11px', color: t.textFaint, fontWeight: 600 }}>{c.progress}% de avance en el semestre</div>
                    </div>
                  </div>
                </div>
                <h2 className="gm-title" style={{ fontSize: '18px', fontWeight: 700, color: t.text, margin: '0 0 14px' }}>Entregas del Curso</h2>
                <TaskList tasks={courseTasks} />
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );

  /* ── VIEW: CALENDARIO ── */
  const CalendarioView = (() => {
    const DAYS_HEADER = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 className="gm-title" style={{ fontSize: '24px', fontWeight: 800, color: t.text, margin: 0 }}>Junio 2026</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {Object.entries(CAL_EVENTS).map(([day, ev]) => (
              <span key={day} className="gm-tag" style={{ background: `${ev.color}15`, color: ev.color, border: `1px solid ${ev.color}30` }}>Jun {day}</span>
            ))}
          </div>
        </div>

        <div className="gm-glass" style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: `1px solid ${t.divider}`, background: t.calHeaderBg }}>
            {DAYS_HEADER.map(d => (
              <div key={d} style={{ padding: '14px 0', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: t.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{d}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {days.map(day => {
              const ev = CAL_EVENTS[day];
              const isToday = day === 2;
              return (
                <div key={day} className="gm-cal-day" style={{ minHeight: '88px', padding: '10px', borderRight: `1px solid ${t.calCellBorder}`, borderBottom: `1px solid ${t.calCellBorder}`, background: isToday ? t.calTodayBg : 'transparent', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: isToday ? 800 : 500, color: isToday ? '#6D44FF' : ev ? t.text : t.textVeryFaint, width: '24px', height: '24px', borderRadius: '50%', background: isToday ? 'rgba(109,68,255,0.12)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{day}</span>
                  </div>
                  {ev && (
                    <div style={{ background: ev.overdue ? 'rgba(255,80,80,0.12)' : `${ev.color}14`, border: `1px solid ${ev.overdue ? 'rgba(255,80,80,0.25)' : ev.color + '30'}`, borderRadius: '8px', padding: '4px 7px' }}>
                      <div style={{ fontSize: '10px', color: ev.overdue ? '#FF5050' : ev.color, fontWeight: 700, lineHeight: 1.3 }}>{ev.task}</div>
                      <div style={{ fontSize: '9px', color: t.textFaint, marginTop: '2px', fontWeight: 600 }}>{ev.course}</div>
                    </div>
                  )}
                </div>
              );
            })}
            {Array.from({ length: 35 - 30 }).map((_, i) => (
              <div key={`e${i}`} style={{ minHeight: '88px', background: t.calEmptyBg }} />
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
          {Object.entries(CAL_EVENTS).map(([day, ev]) => (
            <div key={day} className="gm-glass" style={{ borderRadius: '14px', padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'center', borderLeft: `4px solid ${ev.overdue ? '#FF5050' : ev.color}` }}>
              <div>
                <div className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: ev.overdue ? '#FF5050' : ev.color }}>Jun {day}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>{ev.task}</div>
                <div style={{ fontSize: '11px', color: t.textMuted, fontWeight: 600 }}>{ev.course}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  })();

  /* ── VIEW: CALIFICACIONES ── */
  const CalificacionesView = (
    <div>
      <div className="gm-glass" style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 70px', background: t.calHeaderBg, borderBottom: `1px solid ${t.divider}` }}>
          {['Materia', 'Parcial 1', 'Parcial 2', 'Proyecto', 'Promedio', 'Letra'].map(h => (
            <div key={h} style={{ padding: '14px 16px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: t.textFaint, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
            </div>
          ))}
        </div>
        {GRADES.map((g, idx) => {
          const avgColor = g.avg === null ? t.textVeryFaint : g.avg >= 90 ? '#00C9A7' : g.avg >= 80 ? '#6D44FF' : g.avg >= 70 ? '#FF9500' : '#FF5050';
          const letter = g.avg === null ? '—' : g.avg >= 90 ? 'A' : g.avg >= 80 ? 'B' : g.avg >= 70 ? 'C' : 'D';
          return (
            <div key={g.abbr} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 70px', borderBottom: `1px solid ${t.calCellBorder}`, background: idx % 2 === 0 ? 'transparent' : t.tableOddRow }}>
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${g.color}15`, border: `1px solid ${g.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="gm-title" style={{ fontSize: '11px', fontWeight: 800, color: g.color }}>{g.abbr}</span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>{g.name}</div>
                  <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 500 }}>{g.prof}</div>
                </div>
              </div>
              {g.items.slice(0, 3).map((item, i) => (
                <div key={i} style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: item.score !== null ? t.text : t.textVeryFaint, fontStyle: item.score === null ? 'italic' : 'normal' }}>
                    {item.score !== null ? item.score : 'En progreso'}
                  </span>
                </div>
              ))}
              {g.items.length < 3 && Array.from({ length: 3 - g.items.length }).map((_, i) => (
                <div key={`e${i}`} style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: t.textVeryFaint }}>—</span>
                </div>
              ))}
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                <span className="gm-title" style={{ fontSize: '22px', fontWeight: 800, color: avgColor }}>{g.avg ?? '—'}</span>
              </div>
              <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                <span className="gm-tag" style={{ background: `${avgColor}15`, color: avgColor, border: `1px solid ${avgColor}30` }}>{letter}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="gm-glass" style={{ borderRadius: '20px', padding: '24px', display: 'flex', gap: '32px', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: t.textFaint, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Promedio General</div>
          <div className="gm-title" style={{ fontSize: '48px', fontWeight: 800, color: '#6D44FF', lineHeight: 1 }}>80.75</div>
          <div style={{ fontSize: '12px', color: t.textMuted, fontWeight: 500, marginTop: '4px' }}>de 100 puntos</div>
        </div>
        <div style={{ flex: 1 }}>
          {GRADES.filter(g => g.avg !== null).map(g => (
            <div key={g.abbr} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: g.color, width: '32px' }}>{g.abbr}</span>
              <div style={{ flex: 1, background: `${g.color}18`, borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${g.avg}%`, height: '100%', background: `linear-gradient(90deg, ${g.color}, ${g.color}88)`, borderRadius: '999px', transition: 'width 0.6s ease' }} />
              </div>
              <span className="gm-title" style={{ fontSize: '13px', fontWeight: 700, color: t.text, width: '28px', textAlign: 'right' }}>{g.avg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── VIEW: BANDEJA ── */
  const BandejaView = (
    <div>
      {openMsg ? (
        <div>
          <button onClick={() => setOpenMsg(null)} style={{ background: 'rgba(109,68,255,0.1)', border: '1px solid rgba(109,68,255,0.2)', borderRadius: '999px', color: '#6D44FF', padding: '6px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: 'Nunito, sans-serif', marginBottom: '20px' }}>← Volver</button>
          <div className="gm-glass" style={{ borderRadius: '20px', padding: '28px', borderTop: `3px solid ${openMsg.color}` }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${openMsg.color}18`, border: `2px solid ${openMsg.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="gm-title" style={{ fontSize: '14px', fontWeight: 800, color: openMsg.color }}>{openMsg.from.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
              </div>
              <div>
                <div className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: t.text, marginBottom: '4px' }}>{openMsg.subject}</div>
                <div style={{ fontSize: '12px', color: t.textMuted, fontWeight: 500 }}>{openMsg.from} · <span style={{ color: openMsg.color, fontWeight: 700 }}>{openMsg.course}</span> · {openMsg.time}</div>
              </div>
            </div>
            <div style={{ height: '1px', background: t.divider, marginBottom: '20px' }} />
            <p style={{ fontSize: '15px', color: t.bodyText, lineHeight: '1.65', margin: 0, fontWeight: 500 }}>{openMsg.body}</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <h2 className="gm-title" style={{ fontSize: '18px', fontWeight: 700, color: t.text, margin: 0 }}>Bandeja de Entrada</h2>
            {unread > 0 && <span className="gm-tag" style={{ background: 'rgba(109,68,255,0.12)', color: '#6D44FF', border: '1px solid rgba(109,68,255,0.2)' }}>{unread} sin leer</span>}
          </div>
          {INBOX.map(msg => (
            <div key={msg.id} onClick={() => setOpenMsg(msg)} className="gm-glass gm-inbox-item" style={{ borderRadius: '16px', padding: '16px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start', boxShadow: msg.read ? 'none' : '0 2px 12px rgba(109,68,255,0.08)', borderLeft: `4px solid ${msg.read ? t.divider : msg.color}` }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${msg.color}18`, border: `1px solid ${msg.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="gm-title" style={{ fontSize: '12px', fontWeight: 800, color: msg.color }}>{msg.from.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: msg.read ? 600 : 800, color: msg.read ? t.textMuted : t.text }}>{msg.from} · <span style={{ color: msg.color }}>{msg.course}</span></span>
                  <span style={{ fontSize: '11px', color: t.textFaint, fontWeight: 600, flexShrink: 0 }}>{msg.time}</span>
                </div>
                <div className="gm-title" style={{ fontSize: '14px', fontWeight: msg.read ? 600 : 700, color: msg.read ? t.textMuted : t.text, marginBottom: '4px' }}>{msg.subject}</div>
                <div style={{ fontSize: '12px', color: t.textFaint, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.body}</div>
              </div>
              {!msg.read && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: msg.color, flexShrink: 0, marginTop: '8px', boxShadow: `0 0 6px ${msg.color}60` }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const pageTitle = () => {
    if (activeNav === 'Tablero') return activeCourse ? activeCourse : 'Buenos días, Mikey 👋';
    if (activeNav === 'Cursos') return activeCourse ? activeCourse : 'Mis Cursos';
    if (activeNav === 'Calendario') return 'Calendario';
    if (activeNav === 'Calificaciones') return 'Calificaciones';
    if (activeNav === 'Bandeja') return 'Bandeja de Entrada';
    return activeNav;
  };

  const showBack = (activeNav === 'Tablero' || activeNav === 'Cursos') && activeCourse && !openMsg;

  return (
    <div className="gm-root" data-dark={darkMode} style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: t.bg, transition: 'background 0.3s ease' }}>
      <Styles />

      <div className="gm-orb" style={{ width: 700, height: 700, background: darkMode ? 'radial-gradient(circle, rgba(109,68,255,0.42) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(109,68,255,0.28) 0%, transparent 70%)', top: -200, left: -150 }} />
      <div className="gm-orb" style={{ width: 600, height: 600, background: darkMode ? 'radial-gradient(circle, rgba(0,201,167,0.35) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0,201,167,0.22) 0%, transparent 70%)', bottom: -150, right: -100 }} />
      <div className="gm-orb" style={{ width: 500, height: 500, background: darkMode ? 'radial-gradient(circle, rgba(255,107,157,0.28) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,107,157,0.18) 0%, transparent 70%)', top: '40%', right: '30%' }} />
      <div className="gm-orb" style={{ width: 400, height: 400, background: darkMode ? 'radial-gradient(circle, rgba(255,149,0,0.24) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,149,0,0.15) 0%, transparent 70%)', top: '20%', right: '5%' }} />

      {/* ── TOP NAV ── */}
      <nav className="gm-glass" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #6D44FF 0%, #FF6B9D 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(109,68,255,0.35)', flexShrink: 0 }}>
            <span className="gm-title" style={{ color: '#fff', fontWeight: 800, fontSize: '16px' }}>P</span>
          </div>
          <div>
            <div className="gm-title" style={{ fontSize: '17px', fontWeight: 700, color: t.text, lineHeight: 1 }}>PoliPlataforma</div>
            <div style={{ fontSize: '10px', color: t.textMuted, fontWeight: 500, marginTop: '1px' }}>Plataforma Académica · IA</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          {['Tablero', 'Cursos', 'Calendario', 'Calificaciones', 'Bandeja'].map(n => (
            <button key={n} onClick={() => { setActiveNav(n); setActiveCourse(null); setOpenMsg(null); }} className={`gm-nav-btn${activeNav === n ? ' gm-active-nav' : ''}`} style={{ background: activeNav === n ? t.navActive : 'transparent', border: 'none', borderRadius: '10px', color: activeNav === n ? '#6D44FF' : t.textMuted, padding: '6px 14px', fontSize: '13px', fontWeight: 600, fontFamily: 'Nunito, sans-serif', position: 'relative' }}>
              {n}
              {n === 'Bandeja' && unread > 0 && <span style={{ position: 'absolute', top: '2px', right: '6px', width: '6px', height: '6px', background: '#FF5050', borderRadius: '50%' }} />}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            {unread > 0 && <div style={{ width: '10px', height: '10px', background: '#FF5050', borderRadius: '50%', position: 'absolute', top: '-2px', right: '-2px', border: `2px solid ${t.notifBorder}` }} />}
            <div style={{ width: '36px', height: '36px', background: 'rgba(109,68,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '1px solid rgba(109,68,255,0.2)' }}>🔔</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="gm-title" style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>Mikey García</div>
            <div style={{ fontSize: '10px', color: t.textMuted, fontWeight: 500 }}>6° Sem · Ing. IA</div>
          </div>
          <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #6D44FF, #FF6B9D)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(109,68,255,0.3)', cursor: 'pointer' }}>
            <span className="gm-title" style={{ color: '#fff', fontWeight: 800, fontSize: '13px' }}>MG</span>
          </div>
          <button
            onClick={() => setDarkMode(d => !d)}
            className="gm-dark-toggle"
            style={{ background: t.toggleBg, border: `1px solid ${t.toggleBorder}`, borderRadius: '10px', color: t.toggleFg, padding: '6px 12px', fontSize: '15px', fontFamily: 'Nunito, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', height: 'calc(100vh - 112px)', position: 'relative' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width: '240px', padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0, overflowY: 'auto' }}>
          <div style={{ padding: '4px 8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: t.textFaint, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Navegación</span>
          </div>
          {[{ icon: '🏠', label: 'Tablero' }, { icon: '📚', label: 'Cursos' }, { icon: '📅', label: 'Calendario' }, { icon: '📊', label: 'Calificaciones' }, { icon: '✉️', label: 'Bandeja' }].map(({ icon, label }) => (
            <button key={label} onClick={() => { setActiveNav(label); setActiveCourse(null); setOpenMsg(null); }} className={`gm-course-btn${activeNav === label ? ' gm-active' : ''}`} style={{ width: '100%', padding: '10px 14px', background: activeNav === label ? t.sidebarActive : 'transparent', border: '1px solid transparent', borderRadius: '12px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', fontSize: '13px', fontWeight: activeNav === label ? 700 : 500, color: activeNav === label ? '#6D44FF' : t.sidebarInactive }}>
              <span>{icon}</span>{label}
              {label === 'Bandeja' && unread > 0 && <span style={{ marginLeft: 'auto', background: 'rgba(109,68,255,0.15)', color: '#6D44FF', borderRadius: '999px', fontSize: '10px', fontWeight: 800, padding: '1px 6px' }}>{unread}</span>}
            </button>
          ))}

          <div style={{ height: '1px', background: t.divider, margin: '12px 8px' }} />
          <div style={{ padding: '0 8px 8px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: t.textFaint, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Mis Cursos</span>
          </div>
          {COURSES.map(c => (
            <button key={c.id} onClick={() => { setActiveCourse(activeCourse === c.name ? null : c.name); if (activeNav !== 'Cursos') setActiveNav('Tablero'); }} className={`gm-course-btn${activeCourse === c.name ? ' gm-active' : ''}`} style={{ width: '100%', padding: '10px 14px', background: activeCourse === c.name ? t.sidebarActive : `linear-gradient(to top, ${c.color}25,transparent)`, border: `1px solid ${activeCourse === c.name ? 'rgba(255,255,255,0.8)' : c.color + '40'}`, borderRadius: '12px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'Nunito, sans-serif', fontSize: '12px', fontWeight: activeCourse === c.name ? 700 : 500, color: activeCourse === c.name ? t.text : t.sidebarInactive }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color, flexShrink: 0, boxShadow: `0 0 6px ${c.color}60` }} />
              <span style={{ flex: 1, lineHeight: '1.3' }}>{c.name}</span>
              {c.tasks > 0 && <span style={{ background: c.bg, color: c.color, borderRadius: '999px', fontSize: '10px', fontWeight: 700, padding: '1px 6px' }}>{c.tasks}</span>}
            </button>
          ))}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '76px 20px 48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 className="gm-title" style={{ fontSize: '32px', fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.03em' }}>{pageTitle()}</h1>
            <p style={{ fontSize: '14px', color: t.textMuted, marginTop: '4px', fontWeight: 500 }}>Lunes, 2 de junio de 2026 · Semana 22 de 32</p>
            {showBack && (
              <button onClick={() => setActiveCourse(null)} style={{ marginTop: '8px', background: 'rgba(109,68,255,0.1)', border: '1px solid rgba(109,68,255,0.2)', borderRadius: '999px', color: '#6D44FF', padding: '4px 14px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}>← Volver</button>
            )}
          </div>

          {activeNav === 'Tablero'        && TableroView}
          {activeNav === 'Cursos'         && CursosView}
          {activeNav === 'Calendario'     && CalendarioView}
          {activeNav === 'Calificaciones' && CalificacionesView}
          {activeNav === 'Bandeja'        && BandejaView}
        </main>

      </div>

      {/* ── CHAT POPUP ── */}
      <div
        className={`gm-chat-popup ${chatOpen ? 'gm-chat-popup-open' : 'gm-chat-popup-closed'}`}
        style={{ position: 'fixed', bottom: '104px', right: '28px', width: '360px', height: '480px', background: darkMode ? 'rgba(22,16,48,0.92)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: darkMode ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(255,255,255,0.7)', borderRadius: '24px', boxShadow: '0 24px 64px rgba(109,68,255,0.2)', zIndex: 100, display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${t.divider}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6D44FF, #FF6B9D)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(109,68,255,0.35)', flexShrink: 0 }}>
              <span style={{ fontSize: '16px', color: '#fff' }}>✦</span>
            </div>
            <div>
              <div className="gm-title" style={{ fontSize: '14px', fontWeight: 700, color: t.text }}>Asistente IA</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '6px', height: '6px', background: '#00C9A7', borderRadius: '50%', boxShadow: '0 0 6px #00C9A780' }} />
                <span style={{ fontSize: '10px', color: t.textMuted, fontWeight: 600 }}>En línea</span>
              </div>
            </div>
          </div>
          <button onClick={() => setChatOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: t.textMuted, fontSize: '20px', lineHeight: 1, padding: '4px 8px', fontFamily: 'Nunito, sans-serif' }}>✕</button>
        </div>

        <div ref={msgContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', minHeight: 0 }}>
          {messages.map((m, i) => (
            <div key={i} className="gm-chat-msg" style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.role === 'ai' && <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 700, marginBottom: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Asistente IA</div>}
              <div style={{ maxWidth: '88%', padding: '11px 15px', background: m.role === 'user' ? 'linear-gradient(135deg, #6D44FF, #9B6BFF)' : t.chatAiBubble, border: m.role === 'user' ? 'none' : `1px solid ${t.chatAiBorder}`, borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', boxShadow: m.role === 'user' ? '0 4px 12px rgba(109,68,255,0.3)' : '0 2px 8px rgba(109,68,255,0.08)', fontSize: '13px', color: m.role === 'user' ? '#fff' : t.text, lineHeight: '1.55', fontWeight: 500 }}>{m.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="gm-chat-msg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 700, marginBottom: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Asistente IA</div>
              <div style={{ padding: '14px 18px', background: t.chatAiBubble, border: `1px solid ${t.chatAiBorder}`, borderRadius: '18px 18px 18px 4px', boxShadow: '0 2px 8px rgba(109,68,255,0.08)', display: 'flex', gap: '5px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => <span key={i} className="gm-dot" style={{ width: '7px', height: '7px', background: '#6D44FF', borderRadius: '50%', display: 'inline-block', opacity: 0.6, animationDelay: `${i * 0.2}s` }} />)}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '10px 14px 6px', display: 'flex', gap: '6px', flexWrap: 'wrap', flexShrink: 0 }}>
          {['Priorizar tareas', 'Explícame CNN', 'Mi promedio'].map(s => (
            <button key={s} onClick={() => handleSuggestion(s)} className="gm-pill" style={{ background: t.pillBg, border: `1px solid ${t.pillBorder}`, borderRadius: '999px', color: '#6D44FF', padding: '4px 10px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}>{s}</button>
          ))}
        </div>

        <div style={{ padding: '12px 14px 18px', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px', background: t.inputBg, borderRadius: '14px', padding: '6px 6px 6px 14px', border: `1px solid ${t.inputBorder}`, boxShadow: '0 2px 12px rgba(109,68,255,0.06)' }}>
            <input className="gm-input" value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Escribe tu consulta..." style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: '13px', fontWeight: 500, fontFamily: 'Nunito, sans-serif', padding: '4px 0' }} />
            <button onClick={sendMessage} className="gm-send-btn" style={{ background: 'linear-gradient(135deg, #6D44FF, #9B6BFF)', border: 'none', borderRadius: '10px', color: '#fff', padding: '8px 14px', cursor: 'pointer', fontSize: '14px', fontWeight: 700, boxShadow: '0 4px 10px rgba(109,68,255,0.35)', flexShrink: 0 }}>✦</button>
          </div>
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => setChatOpen(c => !c)}
        className={`gm-fab${chatOpen ? ' gm-fab-open' : ''}`}
        style={{ position: 'fixed', bottom: '28px', right: '28px', width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #6D44FF, #FF6B9D)', border: 'none', cursor: 'pointer', zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(109,68,255,0.45)' }}
      >
        <span style={{ color: '#fff', fontSize: '24px', fontWeight: 700, transition: 'transform 0.25s ease', transform: chatOpen ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block', lineHeight: 1 }}>{chatOpen ? '✕' : '✦'}</span>
      </button>
    </div>
  );
}
