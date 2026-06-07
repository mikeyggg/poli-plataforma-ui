import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen } from 'lucide-react';
import knoduxLogo from '../assets/knodux-logo.png';

/* ─── STYLES ─────────────────────────────────────────────── */
const LoginStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap');

    .kn-root {
      font-family: 'Nunito', system-ui, sans-serif;
      min-height: 100vh;
      background: #0D1117;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .kn-title { font-family: 'Sora', system-ui, sans-serif; }

    .kn-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
    }

    /* Card container */
    .kn-card {
      background: rgba(255,255,255,0.04);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 28px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
      width: 100%;
      max-width: 440px;
      padding: 44px 40px 36px;
      position: relative;
      z-index: 10;
    }

    /* Role cards */
    .kn-role-card {
      flex: 1;
      padding: 22px 14px;
      border-radius: 18px;
      border: 1.5px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
      position: relative;
      overflow: hidden;
    }
    .kn-role-card:hover {
      background: rgba(124,106,247,0.08);
      border-color: rgba(124,106,247,0.3);
      transform: translateY(-3px);
      box-shadow: 0 8px 32px rgba(124,106,247,0.15);
    }
    .kn-role-card.kn-active {
      background: rgba(124,106,247,0.12);
      border-color: rgba(124,106,247,0.7);
      box-shadow: 0 0 0 1px rgba(124,106,247,0.4), 0 8px 32px rgba(124,106,247,0.25);
      transform: translateY(-2px);
    }
    .kn-role-card.kn-active::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(124,106,247,0.18) 0%, transparent 70%);
      pointer-events: none;
    }

    /* Inputs */
    .kn-input {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1.5px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      color: #e8e8f0;
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      font-weight: 500;
      padding: 13px 16px;
      transition: all 0.18s ease;
      outline: none;
      box-sizing: border-box;
    }
    .kn-input::placeholder { color: rgba(200,195,230,0.3); }
    .kn-input:focus {
      border-color: rgba(124,106,247,0.6);
      background: rgba(124,106,247,0.06);
      box-shadow: 0 0 0 3px rgba(124,106,247,0.1);
    }

    /* Submit button */
    .kn-btn {
      width: 100%;
      background: linear-gradient(135deg, #6D44FF 0%, #7C6AF7 60%, #9B6BFF 100%);
      border: none;
      border-radius: 14px;
      color: #fff;
      font-family: 'Sora', sans-serif;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.01em;
      padding: 15px 24px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 6px 24px rgba(109,68,255,0.45);
      position: relative;
      overflow: hidden;
    }
    .kn-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%);
      pointer-events: none;
    }
    .kn-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 36px rgba(109,68,255,0.55);
      filter: brightness(1.08);
    }
    .kn-btn:active { transform: translateY(0); }

    /* Logo animation */
    @keyframes kn-logo-in {
      from { opacity: 0; transform: translateY(-16px) scale(0.94); }
      to   { opacity: 1; transform: translateY(0)     scale(1); }
    }
    @keyframes kn-card-in {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .kn-logo-wrap { animation: kn-logo-in 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
    .kn-card      { animation: kn-card-in 0.55s 0.12s cubic-bezier(0.22,1,0.36,1) both; }

    /* Error shake */
    @keyframes kn-shake {
      0%,100% { transform: translateX(0); }
      20%     { transform: translateX(-6px); }
      40%     { transform: translateX(6px); }
      60%     { transform: translateX(-4px); }
      80%     { transform: translateX(4px); }
    }
    .kn-shake { animation: kn-shake 0.4s ease; }

    /* Forgot link */
    .kn-forgot {
      background: none;
      border: none;
      color: rgba(200,195,230,0.38);
      font-family: 'Nunito', sans-serif;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      transition: color 0.15s;
      text-decoration: none;
    }
    .kn-forgot:hover { color: rgba(124,106,247,0.8); }
  `}</style>
);

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function LoginPage() {
  const [role, setRole]       = useState(null);
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const [shake, setShake]     = useState(false);
  const navigate              = useNavigate();

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) {
      triggerError('Selecciona si eres estudiante o profesor');
      return;
    }
    setError('');
    console.log({ role, email, password });
    if (role === 'estudiante') navigate('/dashboard');
    else navigate('/teacher');
  };

  return (
    <div className="kn-root">
      <LoginStyles />

      {/* Background orbs */}
      <div className="kn-orb" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(109,68,255,0.35) 0%, transparent 70%)', top: -180, left: -160 }} />
      <div className="kn-orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(124,106,247,0.22) 0%, transparent 70%)', bottom: -120, right: -100 }} />
      <div className="kn-orb" style={{ width: 350, height: 350, background: 'radial-gradient(circle, rgba(48,176,199,0.15) 0%, transparent 70%)', top: '55%', left: '60%' }} />

      {/* Logo */}
      <div className="kn-logo-wrap" style={{ marginBottom: '32px', textAlign: 'center' }}>
        <img
          src={knoduxLogo}
          alt="Knodux"
          style={{ height: '64px', width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />
      </div>

      {/* Main card */}
      <div className={`kn-card${shake ? ' kn-shake' : ''}`}>

        {/* Greeting */}
        <div style={{ marginBottom: '28px' }}>
          <h1 className="kn-title" style={{ fontSize: '24px', fontWeight: 800, color: '#e8e8f0', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Bienvenido de nuevo
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(200,195,230,0.45)', margin: 0, fontWeight: 500 }}>
            Inicia sesión para continuar
          </p>
        </div>

        {/* Role selector */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(200,195,230,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Soy...
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Estudiante */}
            <div
              className={`kn-role-card${role === 'estudiante' ? ' kn-active' : ''}`}
              onClick={() => { setRole('estudiante'); setError(''); }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: role === 'estudiante' ? 'rgba(124,106,247,0.2)' : 'rgba(255,255,255,0.06)',
                border: `1.5px solid ${role === 'estudiante' ? 'rgba(124,106,247,0.5)' : 'rgba(255,255,255,0.08)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.22s ease',
              }}>
                <GraduationCap size={22} color={role === 'estudiante' ? '#9B6BFF' : 'rgba(200,195,230,0.4)'} strokeWidth={2} />
              </div>
              <span className="kn-title" style={{ fontSize: '13px', fontWeight: 700, color: role === 'estudiante' ? '#c4b5fd' : 'rgba(200,195,230,0.5)', transition: 'color 0.2s' }}>
                Estudiante
              </span>
              {role === 'estudiante' && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '7px', height: '7px', borderRadius: '50%', background: '#7C6AF7', boxShadow: '0 0 8px #7C6AF7' }} />
              )}
            </div>

            {/* Profesor */}
            <div
              className={`kn-role-card${role === 'profesor' ? ' kn-active' : ''}`}
              onClick={() => { setRole('profesor'); setError(''); }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: role === 'profesor' ? 'rgba(124,106,247,0.2)' : 'rgba(255,255,255,0.06)',
                border: `1.5px solid ${role === 'profesor' ? 'rgba(124,106,247,0.5)' : 'rgba(255,255,255,0.08)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.22s ease',
              }}>
                <BookOpen size={22} color={role === 'profesor' ? '#9B6BFF' : 'rgba(200,195,230,0.4)'} strokeWidth={2} />
              </div>
              <span className="kn-title" style={{ fontSize: '13px', fontWeight: 700, color: role === 'profesor' ? '#c4b5fd' : 'rgba(200,195,230,0.5)', transition: 'color 0.2s' }}>
                Profesor
              </span>
              {role === 'profesor' && (
                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '7px', height: '7px', borderRadius: '50%', background: '#7C6AF7', boxShadow: '0 0 8px #7C6AF7' }} />
              )}
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div style={{ marginBottom: '16px', padding: '10px 14px', background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)', borderRadius: '12px', fontSize: '13px', color: '#FF8080', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px' }}>⚠</span>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(200,195,230,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Correo institucional
            </label>
            <input
              className="kn-input"
              type="email"
              placeholder="usuario@ipn.mx"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(200,195,230,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Contraseña
            </label>
            <input
              className="kn-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-4px' }}>
            <button type="button" className="kn-forgot">¿Olvidaste tu contraseña?</button>
          </div>

          <button type="submit" className="kn-btn" style={{ marginTop: '4px' }}>
            Iniciar sesión
          </button>
        </form>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '28px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: 'rgba(200,195,230,0.22)', fontWeight: 500, margin: 0, letterSpacing: '0.02em' }}>
          Knodux © 2026 — IPN Ingeniería en Inteligencia Artificial
        </p>
      </div>
    </div>
  );
}
