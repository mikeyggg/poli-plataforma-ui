import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen, ClipboardList, FileText, Megaphone,
  Users, Settings, LogOut, Plus, Eye, Upload,
  ChevronRight, Check, Clock, AlertCircle, Star,
} from 'lucide-react';
import knoduxLogo from '../assets/knodux-logo.png';

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
    .gm-chat-popup-open  { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }

    .tc-action-btn { transition: all 0.18s ease; cursor: pointer; }
    .tc-action-btn:hover { transform: translateY(-1px); filter: brightness(1.08); }

    .tc-course-card { transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1); }
    .tc-course-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(109,68,255,0.16) !important; }

    .tc-stat-card { transition: all 0.2s ease; }
    .tc-stat-card:hover { transform: translateY(-2px); }

    .tc-sidebar-nav { transition: all 0.15s ease; cursor: pointer; width: 100%; border: none; text-align: left; font-family: 'Nunito', sans-serif; }
    .tc-sidebar-nav:hover { background: rgba(255,255,255,0.5) !important; transform: translateX(2px); }
    [data-dark="true"] .tc-sidebar-nav:hover { background: rgba(80,55,130,0.45) !important; }

    .tc-progress-bar { border-radius: 999px; height: 6px; overflow: hidden; }
  `}</style>
);

/* ─── MOCK DATA ──────────────────────────────────────────── */
const T_COURSES = [
  { id: 1, name: 'Cálculo Diferencial',    group: 'Grupo A', color: '#6D44FF', bg: 'rgba(109,68,255,0.12)', abbr: 'CAL', students: 24, activeTasks: 4, submitted: 18, schedule: 'Lun/Mié/Vie · 08:00', room: 'Aula 301' },
  { id: 2, name: 'Álgebra Lineal',          group: 'Grupo B', color: '#FF9500', bg: 'rgba(255,149,0,0.12)',   abbr: 'ALG', students: 18, activeTasks: 3, submitted: 12, schedule: 'Mar/Jue · 10:00',   room: 'Aula 215' },
  { id: 3, name: 'Física Computacional',    group: 'Grupo C', color: '#30B0C7', bg: 'rgba(48,176,199,0.12)',  abbr: 'FIS', students: 22, activeTasks: 3, submitted:  8, schedule: 'Lun/Mié · 12:00',   room: 'Lab 104'  },
  { id: 4, name: 'Estadística Avanzada',    group: 'Grupo A', color: '#FF6B9D', bg: 'rgba(255,107,157,0.12)', abbr: 'EST', students: 23, activeTasks: 2, submitted: 15, schedule: 'Mar/Jue/Vie · 14:00', room: 'Aula 408' },
];

const T_TASKS = [
  { id: 1, title: 'Proyecto Final — Derivadas e integrales',   course: 'Cálculo Diferencial', courseAbbr: 'CAL', color: '#6D44FF', due: 'Lun 15 Jun', total: 24, delivered: 18, status: 'active' },
  { id: 2, title: 'Práctica 3: Multiplicación de matrices',    course: 'Álgebra Lineal',      courseAbbr: 'ALG', color: '#FF9500', due: 'Jue 12 Jun', total: 18, delivered: 12, status: 'active' },
  { id: 3, title: 'Informe de laboratorio — Python Científico', course: 'Física Computacional', courseAbbr: 'FIS', color: '#30B0C7', due: 'Mar 10 Jun', total: 22, delivered:  8, status: 'urgent' },
  { id: 4, title: 'Ejercicios capítulo 5 — Distribuciones',   course: 'Estadística Avanzada', courseAbbr: 'EST', color: '#FF6B9D', due: 'Vie 13 Jun', total: 23, delivered: 15, status: 'active' },
  { id: 5, title: 'Tarea 1: Límites y continuidad',           course: 'Cálculo Diferencial', courseAbbr: 'CAL', color: '#6D44FF', due: 'Lun 2 Jun',  total: 24, delivered: 24, status: 'closed' },
];

const T_ACTIVITY = [
  { id: 1, student: 'Mikey García',    initials: 'MG', task: 'Proyecto Final',               course: 'CAL', color: '#6D44FF', time: 'Hace 2h',     grade: null },
  { id: 2, student: 'Sofía Martínez',  initials: 'SM', task: 'Práctica 3',                    course: 'ALG', color: '#FF9500', time: 'Hace 3h',     grade: null },
  { id: 3, student: 'Carlos Rueda',    initials: 'CR', task: 'Informe de laboratorio',         course: 'FIS', color: '#30B0C7', time: 'Hace 5h',     grade: null },
  { id: 4, student: 'Diana López',     initials: 'DL', task: 'Ejercicios cap. 5',              course: 'EST', color: '#FF6B9D', time: 'Hace 6h',     grade: null },
  { id: 5, student: 'Rodrigo Sánchez', initials: 'RS', task: 'Tarea 1: Límites',              course: 'CAL', color: '#6D44FF', time: 'Ayer',        grade: 91  },
  { id: 6, student: 'Valeria Ríos',    initials: 'VR', task: 'Práctica 3',                    course: 'ALG', color: '#FF9500', time: 'Ayer',        grade: 85  },
];

const T_MATERIALS = [
  { id: 1, name: 'Notas Cálculo — Capítulos 1 al 3',       course: 'CAL', color: '#6D44FF', type: 'PDF',   size: '2.4 MB', date: '1 Jun', downloads: 21 },
  { id: 2, name: 'Ejercicios de matrices resueltos',        course: 'ALG', color: '#FF9500', type: 'PDF',   size: '1.8 MB', date: '2 Jun', downloads: 15 },
  { id: 3, name: 'Video: Introducción a Python Científico', course: 'FIS', color: '#30B0C7', type: 'Video', size: '—',      date: '3 Jun', downloads: 18 },
  { id: 4, name: 'Tablas estadísticas de referencia',       course: 'EST', color: '#FF6B9D', type: 'PDF',   size: '0.9 MB', date: '5 Jun', downloads: 19 },
  { id: 5, name: 'Slides: Regla de la cadena',              course: 'CAL', color: '#6D44FF', type: 'Slides','size': '3.1 MB', date: '4 Jun', downloads: 22 },
];

const T_ANNOUNCEMENTS = [
  { id: 1, title: 'Examen final — todas las materias',           course: 'Todas', color: '#6D44FF', date: '20 Jun', body: 'El examen final se realizará el 20 de junio en los horarios regulares. Se evaluará todo el contenido del semestre. Se permite una hoja de fórmulas.', urgent: true },
  { id: 2, title: 'Material del capítulo 7 ya disponible',       course: 'ALG',   color: '#FF9500', date: '5 Jun',  body: 'Ya está disponible el material del capítulo 7 en la plataforma. Incluye ejercicios adicionales para repasar antes del examen.', urgent: false },
  { id: 3, title: 'Recuperación de sesión — Física',             course: 'FIS',   color: '#30B0C7', date: '8 Jun',  body: 'La sesión del miércoles 4 se recuperará el domingo 8 de junio a las 10:00 hrs en el Lab 104.', urgent: false },
  { id: 4, title: 'Recordatorio: entrega de informe de lab',     course: 'FIS',   color: '#30B0C7', date: '10 Jun', body: 'Recordatorio: el informe de laboratorio vence el martes 10 a las 23:59. El informe debe incluir análisis de resultados y gráficas.', urgent: true },
];

const T_STUDENTS = [
  { id: 1, name: 'Mikey García',    id_num: '2021630125', course: 'CAL', color: '#6D44FF', avg: 88, status: 'regular' },
  { id: 2, name: 'Sofía Martínez',  id_num: '2021630240', course: 'ALG', color: '#FF9500', avg: 93, status: 'regular' },
  { id: 3, name: 'Carlos Rueda',    id_num: '2021630318', course: 'FIS', color: '#30B0C7', avg: 74, status: 'riesgo'  },
  { id: 4, name: 'Diana López',     id_num: '2021630445', course: 'EST', color: '#FF6B9D', avg: 91, status: 'regular' },
  { id: 5, name: 'Rodrigo Sánchez', id_num: '2021630512', course: 'CAL', color: '#6D44FF', avg: 65, status: 'riesgo'  },
  { id: 6, name: 'Valeria Ríos',    id_num: '2021630621', course: 'ALG', color: '#FF9500', avg: 87, status: 'regular' },
  { id: 7, name: 'Jorge Medina',    id_num: '2021630734', course: 'FIS', color: '#30B0C7', avg: 79, status: 'regular' },
  { id: 8, name: 'Camila Torres',   id_num: '2021630842', course: 'EST', color: '#FF6B9D', avg: 96, status: 'honor'   },
];

const INIT_MSGS = [
  { role: 'user', text: '¿Cuántas entregas pendientes de revisar tengo?' },
  { role: 'ai',   text: 'Tienes 53 entregas pendientes de revisar en total: 18 de Cálculo, 12 de Álgebra, 8 de Física y 15 de Estadística. La más urgente: el informe de laboratorio de FIS vence mañana. ¿Quieres que te ayude a priorizar la revisión?' },
];

const getAIResponse = (txt) => {
  const s = txt.toLowerCase();
  if (s.includes('entrega') || s.includes('revisar') || s.includes('pendiente'))
    return '53 entregas pendientes en total. Más urgente: 8 informes de FIS (vence mañana 23:59). Después: 12 prácticas ALG (jue), 15 ejercicios EST (vie), 18 proyectos CAL (lun). ¿Genero un plan de revisión por días?';
  if (s.includes('calificac') || s.includes('nota') || s.includes('promedio'))
    return 'Promedios actuales por grupo: CAL-A 76.8 · ALG-B 83.2 · FIS-C 71.5 · EST-A 88.4. Alumnos en riesgo (< 70): Carlos Rueda (FIS 74), Rodrigo Sánchez (CAL 65). ¿Quieres que te prepare un reporte?';
  if (s.includes('alumno') || s.includes('estudiante') || s.includes('riesgo'))
    return '2 alumnos en riesgo académico: Rodrigo Sánchez (CAL, promedio 65) y Carlos Rueda (FIS, promedio 74). Ambos tienen participación baja y entregas tardías. ¿Deseas que redacte un mensaje de seguimiento para ellos?';
  if (s.includes('anuncio') || s.includes('comunicado') || s.includes('avisar'))
    return 'Puedo ayudarte a redactar anuncios para uno o todos tus grupos. ¿Es urgente? Tengo plantillas para: recordatorio de entrega, cambio de horario, material nuevo, examen próximo. ¿Cuál necesitas?';
  if (s.includes('material') || s.includes('recurso') || s.includes('subir'))
    return 'Tus materiales más descargados esta semana: Slides Regla de la cadena (22 veces, CAL) y Video Python Científico (18 veces, FIS). ¿Quieres subir nuevo material o ver estadísticas detalladas de descarga?';
  if (s.includes('examen') || s.includes('parcial') || s.includes('evaluac'))
    return 'Examen final programado: 20 Jun. Te quedan 13 días. Basado en el rendimiento actual, los temas con más dudas en tus grupos son: integrales (CAL), eigenvalores (ALG) y distribuciones continuas (EST). ¿Preparo una guía de estudio?';
  return 'Soy tu asistente Knodux ✦ Tengo acceso a tus 4 cursos, 87 alumnos, tareas y entregas. ¿En qué puedo ayudarte hoy como profesor?';
};

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function TeacherDashboard() {
  const [activeNav, setActiveNav] = useState('Mis Cursos');
  const [darkMode, setDarkMode]   = useState(false);
  const [chatOpen, setChatOpen]   = useState(false);
  const [messages, setMessages]   = useState(INIT_MSGS);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [openAnn, setOpenAnn]     = useState(null);
  const msgRef                    = useRef(null);

  /* ── theme tokens ── */
  const t = darkMode ? {
    bg:              'linear-gradient(135deg, #0f0a2e 0%, #1a0a4a 50%, #0a1628 100%)',
    text:            '#e8e0ff',
    textMuted:       'rgba(255,255,255,0.5)',
    textFaint:       'rgba(200,185,255,0.38)',
    textVeryFaint:   'rgba(200,185,255,0.22)',
    divider:         'rgba(109,68,255,0.18)',
    navActive:       'rgba(109,68,255,0.28)',
    sidebarActive:   'rgba(75,52,135,0.8)',
    sidebarInactive: 'rgba(200,185,255,1)',
    inputBg:         'rgba(20,15,45,0.85)',
    chatAiBubble:    'rgba(28,20,62,0.9)',
    chatAiBorder:    'rgba(255,255,255,0.1)',
    progressBg:      'rgba(109,68,255,0.15)',
    pillBg:          'rgba(109,68,255,0.15)',
    pillBorder:      'rgba(109,68,255,0.3)',
    inputBorder:     'rgba(109,68,255,0.25)',
    bodyText:        'rgba(200,185,255,0.7)',
    toggleBg:        'rgba(200,185,255,0.1)',
    toggleBorder:    'rgba(200,185,255,0.2)',
    toggleFg:        '#e8e0ff',
    tableOddRow:     'rgba(109,68,255,0.05)',
    calHeaderBg:     'rgba(109,68,255,0.08)',
    calCellBorder:   'rgba(109,68,255,0.1)',
    notifBorder:     '#0f0c1e',
  } : {
    bg:              '#EEF0FF',
    text:            '#1a0a4a',
    textMuted:       'rgba(60,40,120,0.5)',
    textFaint:       'rgba(60,40,120,0.4)',
    textVeryFaint:   'rgba(60,40,120,0.3)',
    divider:         'rgba(109,68,255,0.1)',
    navActive:       'rgba(109,68,255,0.1)',
    sidebarActive:   'rgba(255,255,255,0.75)',
    sidebarInactive: 'rgba(60,40,120,0.6)',
    inputBg:         'rgba(255,255,255,0.7)',
    chatAiBubble:    'rgba(255,255,255,0.75)',
    chatAiBorder:    'rgba(255,255,255,0.8)',
    progressBg:      'rgba(109,68,255,0.08)',
    pillBg:          'rgba(109,68,255,0.08)',
    pillBorder:      'rgba(109,68,255,0.18)',
    inputBorder:     'rgba(109,68,255,0.15)',
    bodyText:        'rgba(60,40,120,0.7)',
    toggleBg:        'rgba(109,68,255,0.08)',
    toggleBorder:    'rgba(109,68,255,0.2)',
    toggleFg:        '#6D44FF',
    tableOddRow:     'rgba(109,68,255,0.02)',
    calHeaderBg:     'rgba(109,68,255,0.05)',
    calCellBorder:   'rgba(109,68,255,0.06)',
    notifBorder:     'white',
  };

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
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

  /* ── SIDEBAR NAV ITEMS ── */
  const NAV_ITEMS = [
    { label: 'Mis Cursos',    icon: BookOpen      },
    { label: 'Tareas',        icon: ClipboardList },
    { label: 'Materiales',    icon: FileText      },
    { label: 'Anuncios',      icon: Megaphone     },
    { label: 'Alumnos',       icon: Users         },
    { label: 'Configuración', icon: Settings      },
  ];

  /* ── VIEW: MIS CURSOS ── */
  const MisCursosView = (
    <div>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Cursos activos',     value: 4,  color: '#6D44FF', icon: '📚', sub: 'este semestre'   },
          { label: 'Total de alumnos',   value: 87, color: '#30B0C7', icon: '👥', sub: 'en 4 grupos'     },
          { label: 'Tareas publicadas',  value: 12, color: '#FF6B9D', icon: '📝', sub: '53 por revisar'  },
        ].map(s => (
          <div key={s.label} className="gm-glass tc-stat-card gm-float-card" style={{ borderRadius: '20px', padding: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -18, right: -18, width: '72px', height: '72px', background: `${s.color}10`, borderRadius: '50%' }} />
            <div style={{ fontSize: '22px', marginBottom: '10px' }}>{s.icon}</div>
            <div className="gm-title" style={{ fontSize: '40px', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '13px', color: t.text, fontWeight: 700, marginTop: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '11px', color: t.textFaint, fontWeight: 500, marginTop: '2px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Courses grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {T_COURSES.map(c => {
          const pct = Math.round((c.submitted / c.students) * 100);
          return (
            <div key={c.id} className="gm-glass tc-course-card" style={{ borderRadius: '22px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(109,68,255,0.07)' }}>
              {/* Gradient header */}
              <div style={{ background: `linear-gradient(135deg, ${c.color}22 0%, ${c.color}08 100%)`, borderBottom: `2px solid ${c.color}30`, padding: '18px 20px 14px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: '100px', height: '100px', background: `radial-gradient(circle, ${c.color}20 0%, transparent 70%)` }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="gm-title" style={{ fontSize: '13px', fontWeight: 800, color: c.color }}>{c.abbr}</span>
                      <span className="gm-tag" style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}30` }}>{c.group}</span>
                    </div>
                    <div className="gm-title" style={{ fontSize: '16px', fontWeight: 800, color: t.text, lineHeight: 1.25 }}>{c.name}</div>
                  </div>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${c.color}18`, border: `2px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="gm-title" style={{ fontSize: '13px', fontWeight: 800, color: c.color }}>{c.abbr}</span>
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '11px', color: t.textFaint, fontWeight: 600 }}>
                  🕐 {c.schedule} · 🏛 {c.room}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '14px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div className="gm-title" style={{ fontSize: '26px', fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.students}</div>
                    <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 600, marginTop: '2px' }}>alumnos</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div className="gm-title" style={{ fontSize: '26px', fontWeight: 800, color: t.text, lineHeight: 1 }}>{c.activeTasks}</div>
                    <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 600, marginTop: '2px' }}>tareas activas</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: t.textFaint, fontWeight: 600, marginBottom: '5px' }}>Entregas: {c.submitted}/{c.students}</div>
                    <div className="tc-progress-bar" style={{ background: t.progressBg }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`, borderRadius: '999px', transition: 'width 0.5s ease' }} />
                    </div>
                    <div style={{ fontSize: '10px', color: c.color, fontWeight: 700, marginTop: '3px' }}>{pct}% entregado</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="tc-action-btn" style={{ flex: 1, padding: '9px 12px', background: `${c.color}12`, border: `1px solid ${c.color}30`, borderRadius: '11px', color: c.color, fontSize: '12px', fontWeight: 700, fontFamily: 'Nunito, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    <Eye size={13} /> Ver tareas
                  </button>
                  <button className="tc-action-btn" style={{ flex: 1, padding: '9px 12px', background: `${c.color}18`, border: `1px solid ${c.color}35`, borderRadius: '11px', color: c.color, fontSize: '12px', fontWeight: 700, fontFamily: 'Nunito, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    <Upload size={13} /> Subir material
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent activity */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2 className="gm-title" style={{ fontSize: '18px', fontWeight: 700, color: t.text, margin: 0 }}>Actividad Reciente</h2>
          <span style={{ fontSize: '12px', color: t.textFaint, fontWeight: 600 }}>Últimas entregas</span>
        </div>
        <div className="gm-glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          {T_ACTIVITY.map((a, idx) => (
            <div key={a.id} className="gm-inbox-item" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: idx < T_ACTIVITY.length - 1 ? `1px solid ${t.divider}` : 'none' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: `${a.color}18`, border: `1.5px solid ${a.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="gm-title" style={{ fontSize: '11px', fontWeight: 800, color: a.color }}>{a.initials}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>{a.student}</span>
                  <span className="gm-tag" style={{ background: `${a.color}12`, color: a.color, border: `1px solid ${a.color}28` }}>{a.course}</span>
                </div>
                <div style={{ fontSize: '12px', color: t.textMuted, fontWeight: 500 }}>Entregó: {a.task}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '11px', color: t.textFaint, fontWeight: 600 }}>{a.time}</div>
                {a.grade ? (
                  <span className="gm-tag" style={{ marginTop: '4px', background: 'rgba(0,201,167,0.1)', color: '#00C9A7', border: '1px solid rgba(0,201,167,0.25)' }}>✓ {a.grade}</span>
                ) : (
                  <span className="gm-tag" style={{ marginTop: '4px', background: 'rgba(255,149,0,0.1)', color: '#FF9500', border: '1px solid rgba(255,149,0,0.25)' }}>Pendiente</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── VIEW: TAREAS ── */
  const TareasView = (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <h2 className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: t.text, margin: 0 }}>Tareas publicadas</h2>
          <p style={{ fontSize: '13px', color: t.textFaint, margin: '3px 0 0', fontWeight: 500 }}>Gestiona y revisa las entregas de tus grupos</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg, #6D44FF, #9B6BFF)', border: 'none', borderRadius: '12px', color: '#fff', padding: '10px 18px', fontSize: '13px', fontWeight: 700, fontFamily: 'Nunito, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 16px rgba(109,68,255,0.35)' }}>
          <Plus size={15} /> Nueva tarea
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {T_TASKS.map(task => {
          const pct = Math.round((task.delivered / task.total) * 100);
          const statusColor = task.status === 'urgent' ? '#FF5050' : task.status === 'closed' ? '#00C9A7' : '#6D44FF';
          const statusLabel = task.status === 'urgent' ? 'URGENTE' : task.status === 'closed' ? 'CERRADA' : 'ACTIVA';
          return (
            <div key={task.id} className="gm-glass gm-task" style={{ borderRadius: '18px', padding: '18px 22px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 2px 12px rgba(109,68,255,0.06)' }}>
              <div style={{ width: '3px', height: '52px', background: task.color, borderRadius: '999px', flexShrink: 0, boxShadow: `0 0 8px ${task.color}50` }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                  <span className="gm-title" style={{ fontSize: '14px', fontWeight: 700, color: t.text }}>{task.title}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="gm-tag" style={{ background: `${task.color}15`, color: task.color, border: `1px solid ${task.color}30` }}>{task.courseAbbr}</span>
                  <span style={{ fontSize: '11px', color: t.textFaint, fontWeight: 500 }}>{task.course}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="tc-progress-bar" style={{ flex: 1, background: t.progressBg }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${task.color}, ${task.color}88)`, borderRadius: '999px' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: t.textMuted, fontWeight: 700, flexShrink: 0 }}>{task.delivered}/{task.total} entregadas</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '12px', color: t.textMuted, fontWeight: 600, marginBottom: '6px' }}>📅 {task.due}</div>
                <span className="gm-tag" style={{ background: `${statusColor}12`, color: statusColor, border: `1px solid ${statusColor}28` }}>{statusLabel}</span>
              </div>
              <button className="tc-action-btn" style={{ padding: '8px 14px', background: `${task.color}14`, border: `1px solid ${task.color}30`, borderRadius: '10px', color: task.color, fontSize: '12px', fontWeight: 700, fontFamily: 'Nunito, sans-serif', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                <Eye size={13} /> Revisar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ── VIEW: MATERIALES ── */
  const MaterialesView = (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <h2 className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: t.text, margin: 0 }}>Materiales del curso</h2>
          <p style={{ fontSize: '13px', color: t.textFaint, margin: '3px 0 0', fontWeight: 500 }}>Recursos compartidos con tus grupos</p>
        </div>
        <button style={{ background: 'linear-gradient(135deg, #6D44FF, #9B6BFF)', border: 'none', borderRadius: '12px', color: '#fff', padding: '10px 18px', fontSize: '13px', fontWeight: 700, fontFamily: 'Nunito, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 16px rgba(109,68,255,0.35)' }}>
          <Upload size={15} /> Subir archivo
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {T_MATERIALS.map(m => (
          <div key={m.id} className="gm-glass gm-inbox-item" style={{ borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${m.color}15`, border: `1.5px solid ${m.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '18px' }}>{m.type === 'PDF' ? '📄' : m.type === 'Video' ? '🎬' : '🖥️'}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: t.text, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="gm-tag" style={{ background: `${m.color}12`, color: m.color, border: `1px solid ${m.color}28` }}>{m.course}</span>
                <span style={{ fontSize: '11px', color: t.textFaint, fontWeight: 500 }}>{m.type}{m.size !== '—' ? ` · ${m.size}` : ''}</span>
                <span style={{ fontSize: '11px', color: t.textFaint, fontWeight: 500 }}>Subido: {m.date}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: m.color }}>{m.downloads}</div>
              <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 600 }}>descargas</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ── VIEW: ANUNCIOS ── */
  const AnunciosView = (
    <div>
      {openAnn ? (
        <div>
          <button onClick={() => setOpenAnn(null)} style={{ background: 'rgba(109,68,255,0.1)', border: '1px solid rgba(109,68,255,0.2)', borderRadius: '999px', color: '#6D44FF', padding: '6px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: 'Nunito, sans-serif', marginBottom: '20px' }}>← Volver</button>
          <div className="gm-glass" style={{ borderRadius: '20px', padding: '28px', borderTop: `3px solid ${openAnn.color}` }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${openAnn.color}18`, border: `2px solid ${openAnn.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '20px' }}>📢</span>
              </div>
              <div>
                <div className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: t.text, marginBottom: '4px' }}>{openAnn.title}</div>
                <div style={{ fontSize: '12px', color: t.textMuted, fontWeight: 500 }}>
                  Curso: <span style={{ color: openAnn.color, fontWeight: 700 }}>{openAnn.course}</span> · Publicado: {openAnn.date}
                  {openAnn.urgent && <span className="gm-tag" style={{ marginLeft: '8px', background: 'rgba(255,80,80,0.1)', color: '#FF5050', border: '1px solid rgba(255,80,80,0.25)' }}>URGENTE</span>}
                </div>
              </div>
            </div>
            <div style={{ height: '1px', background: t.divider, marginBottom: '20px' }} />
            <p style={{ fontSize: '15px', color: t.bodyText, lineHeight: '1.65', margin: 0, fontWeight: 500 }}>{openAnn.body}</p>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <h2 className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: t.text, margin: 0 }}>Anuncios</h2>
              <p style={{ fontSize: '13px', color: t.textFaint, margin: '3px 0 0', fontWeight: 500 }}>Comunicados enviados a tus grupos</p>
            </div>
            <button style={{ background: 'linear-gradient(135deg, #6D44FF, #9B6BFF)', border: 'none', borderRadius: '12px', color: '#fff', padding: '10px 18px', fontSize: '13px', fontWeight: 700, fontFamily: 'Nunito, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 16px rgba(109,68,255,0.35)' }}>
              <Plus size={15} /> Nuevo anuncio
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {T_ANNOUNCEMENTS.map(a => (
              <div key={a.id} onClick={() => setOpenAnn(a)} className="gm-glass gm-inbox-item" style={{ borderRadius: '16px', padding: '16px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start', borderLeft: `4px solid ${a.urgent ? '#FF5050' : a.color}` }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${a.color}15`, border: `1px solid ${a.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '18px' }}>📢</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '4px' }}>
                    <span className="gm-title" style={{ fontSize: '14px', fontWeight: 700, color: t.text }}>{a.title}</span>
                    <span style={{ fontSize: '11px', color: t.textFaint, fontWeight: 600, flexShrink: 0 }}>{a.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '5px' }}>
                    <span className="gm-tag" style={{ background: `${a.color}12`, color: a.color, border: `1px solid ${a.color}28` }}>{a.course}</span>
                    {a.urgent && <span className="gm-tag" style={{ background: 'rgba(255,80,80,0.1)', color: '#FF5050', border: '1px solid rgba(255,80,80,0.25)' }}>URGENTE</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: t.textFaint, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.body}</div>
                </div>
                <ChevronRight size={16} color={t.textVeryFaint} style={{ flexShrink: 0, marginTop: '4px' }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /* ── VIEW: ALUMNOS ── */
  const AlumnosView = (
    <div>
      <div style={{ marginBottom: '18px' }}>
        <h2 className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: t.text, margin: '0 0 4px' }}>Mis alumnos</h2>
        <p style={{ fontSize: '13px', color: t.textFaint, margin: 0, fontWeight: 500 }}>87 alumnos en 4 grupos · 2 en riesgo académico</p>
      </div>

      {/* At-risk banner */}
      <div style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: '16px', padding: '14px 18px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <AlertCircle size={20} color="#FF5050" />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#FF5050', marginBottom: '2px' }}>2 alumnos en riesgo académico</div>
          <div style={{ fontSize: '12px', color: t.textMuted, fontWeight: 500 }}>Rodrigo Sánchez (CAL, 65) · Carlos Rueda (FIS, 74). Considera programar asesorías.</div>
        </div>
      </div>

      {/* Students table */}
      <div className="gm-glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px 80px', background: t.calHeaderBg, borderBottom: `1px solid ${t.divider}` }}>
          {['Alumno', 'Matrícula', 'Curso', 'Promedio', 'Estado'].map(h => (
            <div key={h} style={{ padding: '13px 16px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: t.textFaint, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</span>
            </div>
          ))}
        </div>
        {T_STUDENTS.map((s, idx) => {
          const avgColor = s.avg >= 90 ? '#00C9A7' : s.avg >= 80 ? '#6D44FF' : s.avg >= 70 ? '#FF9500' : '#FF5050';
          const statusColors = { regular: { bg: 'rgba(0,201,167,0.1)', text: '#00C9A7', border: 'rgba(0,201,167,0.25)', label: 'Regular' }, riesgo: { bg: 'rgba(255,80,80,0.1)', text: '#FF5050', border: 'rgba(255,80,80,0.25)', label: 'En riesgo' }, honor: { bg: 'rgba(109,68,255,0.12)', text: '#6D44FF', border: 'rgba(109,68,255,0.28)', label: 'Honor' } };
          const sc = statusColors[s.status];
          return (
            <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px 80px', borderBottom: idx < T_STUDENTS.length - 1 ? `1px solid ${t.calCellBorder}` : 'none', background: idx % 2 === 0 ? 'transparent' : t.tableOddRow }}>
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${s.color}15`, border: `1px solid ${s.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="gm-title" style={{ fontSize: '10px', fontWeight: 800, color: s.color }}>{s.name.split(' ').map(w => w[0]).join('').slice(0,2)}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>{s.name}</span>
                {s.status === 'honor' && <Star size={13} color="#6D44FF" fill="#6D44FF" />}
              </div>
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: t.textMuted, fontWeight: 500 }}>{s.id_num}</span>
              </div>
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center' }}>
                <span className="gm-tag" style={{ background: `${s.color}12`, color: s.color, border: `1px solid ${s.color}28` }}>{s.course}</span>
              </div>
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center' }}>
                <span className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: avgColor }}>{s.avg}</span>
              </div>
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center' }}>
                <span className="gm-tag" style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>{sc.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ── VIEW: CONFIGURACIÓN ── */
  const ConfigView = (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="gm-title" style={{ fontSize: '20px', fontWeight: 800, color: t.text, margin: '0 0 4px' }}>Configuración</h2>
        <p style={{ fontSize: '13px', color: t.textFaint, margin: 0, fontWeight: 500 }}>Ajusta tu perfil y preferencias</p>
      </div>
      {[
        { section: 'Perfil', items: [
          { label: 'Nombre completo', value: 'Prof. Ana González', type: 'text' },
          { label: 'Correo institucional', value: 'a.gonzalez@ipn.mx', type: 'text' },
          { label: 'Departamento', value: 'Matemáticas — ESCOM', type: 'text' },
        ]},
        { section: 'Notificaciones', items: [
          { label: 'Nuevas entregas', value: 'Activado', type: 'toggle' },
          { label: 'Recordatorios de entrega', value: 'Activado', type: 'toggle' },
          { label: 'Mensajes de alumnos', value: 'Desactivado', type: 'toggle' },
        ]},
      ].map(group => (
        <div key={group.section} className="gm-glass" style={{ borderRadius: '20px', marginBottom: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${t.divider}`, background: t.calHeaderBg }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: t.textFaint, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{group.section}</span>
          </div>
          {group.items.map((item, idx) => (
            <div key={item.label} style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: idx < group.items.length - 1 ? `1px solid ${t.divider}` : 'none' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: t.text }}>{item.label}</span>
              {item.type === 'toggle' ? (
                <div style={{ width: '44px', height: '24px', background: item.value === 'Activado' ? '#6D44FF' : t.progressBg, borderRadius: '999px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: '3px', left: item.value === 'Activado' ? '23px' : '3px', width: '18px', height: '18px', background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }} />
                </div>
              ) : (
                <span style={{ fontSize: '13px', color: t.textMuted, fontWeight: 500 }}>{item.value}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const pageTitle = () => {
    if (activeNav === 'Mis Cursos') return 'Bienvenida, Prof. González 👋';
    return activeNav;
  };

  const pageSubtitle = () => {
    const map = {
      'Mis Cursos':    'Panel de gestión — Knodux',
      'Tareas':        'Lunes, 2 de junio de 2026 · Semana 22 de 32',
      'Materiales':    'Recursos compartidos con tus alumnos',
      'Anuncios':      'Comunicados enviados a tus grupos',
      'Alumnos':       '4 grupos · 87 alumnos inscritos',
      'Configuración': 'Perfil y preferencias de la cuenta',
    };
    return map[activeNav] || '';
  };

  return (
    <div className="gm-root" data-dark={darkMode} style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: t.bg, transition: 'background 0.3s ease', display: 'flex' }}>
      <Styles />

      {/* Background orbs */}
      <div className="gm-orb" style={{ width: 700, height: 700, background: darkMode ? 'radial-gradient(circle, rgba(109,68,255,0.42) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(109,68,255,0.28) 0%, transparent 70%)', top: -200, left: -150 }} />
      <div className="gm-orb" style={{ width: 600, height: 600, background: darkMode ? 'radial-gradient(circle, rgba(0,201,167,0.35) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(0,201,167,0.22) 0%, transparent 70%)', bottom: -150, right: -100 }} />
      <div className="gm-orb" style={{ width: 500, height: 500, background: darkMode ? 'radial-gradient(circle, rgba(255,107,157,0.28) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,107,157,0.18) 0%, transparent 70%)', top: '40%', right: '30%' }} />
      <div className="gm-orb" style={{ width: 400, height: 400, background: darkMode ? 'radial-gradient(circle, rgba(255,149,0,0.24) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,149,0,0.15) 0%, transparent 70%)', top: '20%', right: '5%' }} />

      {/* ── SIDEBAR ── */}
      <aside className="gm-glass" style={{ width: '260px', minHeight: '100vh', position: 'sticky', top: 0, flexShrink: 0, display: 'flex', flexDirection: 'column', borderRadius: 0, borderTop: 'none', borderBottom: 'none', borderLeft: 'none', zIndex: 40 }}>

        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: `1px solid ${t.divider}` }}>
          <img src={knoduxLogo} alt="Knodux" style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block' }} />
          <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 600, marginTop: '6px', letterSpacing: '0.05em' }}>Panel del Profesor</div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '3px', overflowY: 'auto' }}>
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => { setActiveNav(label); setOpenAnn(null); }}
              className="tc-sidebar-nav"
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                background: activeNav === label ? t.sidebarActive : 'transparent',
                border: `1px solid ${activeNav === label ? 'rgba(109,68,255,0.2)' : 'transparent'}`,
                display: 'flex', alignItems: 'center', gap: '10px',
                fontSize: '13px', fontWeight: activeNav === label ? 700 : 500,
                color: activeNav === label ? '#6D44FF' : t.sidebarInactive,
                boxShadow: activeNav === label ? '0 4px 16px rgba(109,68,255,0.12)' : 'none',
              }}
            >
              <Icon size={16} strokeWidth={2} color={activeNav === label ? '#6D44FF' : t.textMuted} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom: teacher avatar + logout */}
        <div style={{ padding: '16px 16px 20px', borderTop: `1px solid ${t.divider}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '14px', background: t.progressBg }}>
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #FF6B9D, #6D44FF)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(109,68,255,0.3)' }}>
              <span className="gm-title" style={{ color: '#fff', fontWeight: 800, fontSize: '13px' }}>AG</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="gm-title" style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>Prof. González</div>
              <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 500 }}>ESCOM · Matemáticas</div>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px', display: 'flex', alignItems: 'center', opacity: 0.5, transition: 'opacity 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}>
              <LogOut size={15} color={t.textMuted} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Top bar */}
        <header className="gm-glass" style={{ position: 'sticky', top: 0, zIndex: 30, padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
          <div className="gm-title" style={{ fontSize: '15px', fontWeight: 700, color: t.text }}>{activeNav}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {activeNav === 'Mis Cursos' && (
              <button style={{ background: 'linear-gradient(135deg, #6D44FF, #9B6BFF)', border: 'none', borderRadius: '10px', color: '#fff', padding: '8px 16px', fontSize: '12px', fontWeight: 700, fontFamily: 'Nunito, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 12px rgba(109,68,255,0.35)' }}>
                <Plus size={14} /> Nuevo Curso
              </button>
            )}
            <button onClick={() => setDarkMode(d => !d)} className="gm-dark-toggle" style={{ background: t.toggleBg, border: `1px solid ${t.toggleBorder}`, borderRadius: '10px', color: t.toggleFg, padding: '6px 12px', fontSize: '15px', fontFamily: 'Nunito, sans-serif', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '36px 32px 80px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h1 className="gm-title" style={{ fontSize: '32px', fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.03em' }}>{pageTitle()}</h1>
            <p style={{ fontSize: '14px', color: t.textMuted, marginTop: '4px', fontWeight: 500 }}>{pageSubtitle()}</p>
          </div>

          {activeNav === 'Mis Cursos'    && MisCursosView}
          {activeNav === 'Tareas'        && TareasView}
          {activeNav === 'Materiales'    && MaterialesView}
          {activeNav === 'Anuncios'      && AnunciosView}
          {activeNav === 'Alumnos'       && AlumnosView}
          {activeNav === 'Configuración' && ConfigView}
        </main>
      </div>

      {/* ── CHAT POPUP ── */}
      <div
        className={`gm-chat-popup ${chatOpen ? 'gm-chat-popup-open' : 'gm-chat-popup-closed'}`}
        style={{ position: 'fixed', bottom: '104px', right: '28px', width: '360px', height: '480px', background: darkMode ? 'rgba(22,16,48,0.92)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: darkMode ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(255,255,255,0.7)', borderRadius: '24px', boxShadow: '0 24px 64px rgba(109,68,255,0.2)', zIndex: 100, display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${t.divider}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #6D44FF, #FF6B9D)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(109,68,255,0.35)' }}>
              <span style={{ fontSize: '16px', color: '#fff' }}>✦</span>
            </div>
            <div>
              <div className="gm-title" style={{ fontSize: '14px', fontWeight: 700, color: t.text }}>Asistente Knodux</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '6px', height: '6px', background: '#00C9A7', borderRadius: '50%', boxShadow: '0 0 6px #00C9A780' }} />
                <span style={{ fontSize: '10px', color: t.textMuted, fontWeight: 600 }}>En línea</span>
              </div>
            </div>
          </div>
          <button onClick={() => setChatOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: t.textMuted, fontSize: '20px', lineHeight: 1, padding: '4px 8px', fontFamily: 'Nunito, sans-serif' }}>✕</button>
        </div>

        <div ref={msgRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', minHeight: 0 }}>
          {messages.map((m, i) => (
            <div key={i} className="gm-chat-msg" style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.role === 'ai' && <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 700, marginBottom: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Asistente IA</div>}
              <div style={{ maxWidth: '88%', padding: '11px 15px', background: m.role === 'user' ? 'linear-gradient(135deg, #6D44FF, #9B6BFF)' : t.chatAiBubble, border: m.role === 'user' ? 'none' : `1px solid ${t.chatAiBorder}`, borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', boxShadow: m.role === 'user' ? '0 4px 12px rgba(109,68,255,0.3)' : '0 2px 8px rgba(109,68,255,0.08)', fontSize: '13px', color: m.role === 'user' ? '#fff' : t.text, lineHeight: '1.55', fontWeight: 500 }}>{m.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="gm-chat-msg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '10px', color: t.textFaint, fontWeight: 700, marginBottom: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Asistente IA</div>
              <div style={{ padding: '14px 18px', background: t.chatAiBubble, border: `1px solid ${t.chatAiBorder}`, borderRadius: '18px 18px 18px 4px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                {[0,1,2].map(i => <span key={i} className="gm-dot" style={{ width: '7px', height: '7px', background: '#6D44FF', borderRadius: '50%', display: 'inline-block', opacity: 0.6, animationDelay: `${i * 0.2}s` }} />)}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '10px 14px 6px', display: 'flex', gap: '6px', flexWrap: 'wrap', flexShrink: 0 }}>
          {['Alumnos en riesgo', 'Revisar entregas', 'Redactar anuncio'].map(s => (
            <button key={s} onClick={() => handleSuggestion(s)} className="gm-pill" style={{ background: t.pillBg, border: `1px solid ${t.pillBorder}`, borderRadius: '999px', color: '#6D44FF', padding: '4px 10px', cursor: 'pointer', fontSize: '11px', fontWeight: 600, fontFamily: 'Nunito, sans-serif' }}>{s}</button>
          ))}
        </div>

        <div style={{ padding: '12px 14px 18px', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px', background: t.inputBg, borderRadius: '14px', padding: '6px 6px 6px 14px', border: `1px solid ${t.inputBorder}` }}>
            <input className="gm-input" value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Consulta al asistente..." style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: '13px', fontWeight: 500, fontFamily: 'Nunito, sans-serif', padding: '4px 0' }} />
            <button onClick={sendMessage} className="gm-send-btn" style={{ background: 'linear-gradient(135deg, #6D44FF, #9B6BFF)', border: 'none', borderRadius: '10px', color: '#fff', padding: '8px 14px', cursor: 'pointer', fontSize: '14px', fontWeight: 700, boxShadow: '0 4px 10px rgba(109,68,255,0.35)', flexShrink: 0 }}>✦</button>
          </div>
        </div>
      </div>

      {/* ── FAB ── */}
      <button
        onClick={() => setChatOpen(c => !c)}
        className={`gm-fab${chatOpen ? ' gm-fab-open' : ''}`}
        title="Asistente Knodux"
        style={{ position: 'fixed', bottom: '28px', right: '28px', width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #6D44FF, #FF6B9D)', border: 'none', cursor: 'pointer', zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(109,68,255,0.45)' }}
      >
        <span style={{ color: '#fff', fontSize: '24px', fontWeight: 700, transition: 'transform 0.25s ease', transform: chatOpen ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block', lineHeight: 1 }}>{chatOpen ? '✕' : '✦'}</span>
      </button>
    </div>
  );
}
