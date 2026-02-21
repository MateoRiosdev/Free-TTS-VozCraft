import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Data ───────────────────────────────────────────────────────────────────
const VOCES = [
  { label: 'Español (México)', lang: 'es-MX', flag: '🇲🇽' },
  { label: 'Español (España)', lang: 'es-ES', flag: '🇪🇸' },
  { label: 'Español (Argentina)', lang: 'es-AR', flag: '🇦🇷' },
  { label: 'Español (Colombia)', lang: 'es-CO', flag: '🇨🇴' },
  { label: 'Español (Chile)', lang: 'es-CL', flag: '🇨🇱' },
  { label: 'Español (Venezuela)', lang: 'es-VE', flag: '🇻🇪' },
  { label: 'English (US)', lang: 'en-US', flag: '🇺🇸' },
  { label: 'English (UK)', lang: 'en-GB', flag: '🇬🇧' },
  { label: 'Português (Brasil)', lang: 'pt-BR', flag: '🇧🇷' },
  { label: 'Français', lang: 'fr-FR', flag: '🇫🇷' },
  { label: 'Deutsch', lang: 'de-DE', flag: '🇩🇪' },
  { label: 'Italiano', lang: 'it-IT', flag: '🇮🇹' },
];

const PERSONALIDADES = [
  { label: 'Narrador Calmo', pitch: 1.0, desc: 'Voz suave y tranquila' },
  { label: 'Presentador Dinámico', pitch: 1.2, desc: 'Enérgico y entusiasta' },
  { label: 'Asistente Formal', pitch: 0.9, desc: 'Profesional y preciso' },
  { label: 'Conversacional', pitch: 1.1, desc: 'Natural y cercano' },
  { label: 'Narrador Dramático', pitch: 0.8, desc: 'Profundo e impactante' },
  { label: 'Instructor Educativo', pitch: 1.05, desc: 'Claro y didáctico' },
];

const VELOCIDADES = [
  { label: 'Muy Lento', rate: 0.5 },
  { label: 'Lento', rate: 0.75 },
  { label: 'Normal', rate: 1.0 },
  { label: 'Rápido', rate: 1.25 },
  { label: 'Muy Rápido', rate: 1.5 },
];

const ANIMOS = [
  { label: 'Neutral', mod: 1.0 },
  { label: 'Alegre', mod: 1.15 },
  { label: 'Serio', mod: 0.9 },
  { label: 'Entusiasta', mod: 1.2 },
  { label: 'Melancólico', mod: 0.85 },
  { label: 'Enérgico', mod: 1.1 },
];

const TEXTS = {
  es: {
    subtitle: 'Texto a Voz con Inteligencia Artificial',
    voice: '🌍 Voz / Acento / Región',
    personality: '🎭 Personalidad / Tipo de Voz',
    speed: '⚡ Velocidad',
    mood: '💫 Estado de Ánimo',
    placeholder: 'Escribe o pega aquí el texto que deseas escuchar...',
    generate: 'Generar Audio',
    generating: 'Generando...',
    stop: 'Detener Audio',
    history: '📋 Historial',
    clearAll: 'Limpiar todo',
    emptyHistory: 'Aún no has generado audios',
    save: '💾 Guardar',
    load: '📂 Cargar',
    footer: 'Todos los derechos reservados',
  },
  en: {
    subtitle: 'AI Text to Speech',
    voice: '🌍 Voice / Accent / Region',
    personality: '🎭 Personality / Voice Type',
    speed: '⚡ Speed',
    mood: '💫 Mood',
    placeholder: 'Write or paste the text you want to hear...',
    generate: 'Generate Audio',
    generating: 'Generating...',
    stop: 'Stop Audio',
    history: '📋 History',
    clearAll: 'Clear all',
    emptyHistory: 'You have not generated audios yet',
    save: '💾 Save',
    load: '📂 Load',
    footer: 'All rights reserved',
  },
};

// ─── Custom Select ───────────────────────────────────────────────────────────
function Select({ value, onChange, options, dark }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const sel = options.find((o) => o.label === value) || options[0];

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderRadius: 10,
          border: dark
            ? '1px solid rgba(255,255,255,0.12)'
            : '1.5px solid #e2e8f0',
          background: dark ? 'rgba(255,255,255,0.06)' : '#fff',
          color: dark ? '#e2e8f0' : '#1e293b',
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: open
            ? dark
              ? '0 0 0 2px #4a90d9'
              : '0 0 0 2px #1d4ed8'
            : 'none',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {sel.flag && <span>{sel.flag}</span>}
          {sel.label}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 999,
            borderRadius: 10,
            border: dark
              ? '1px solid rgba(255,255,255,0.15)'
              : '1.5px solid #e2e8f0',
            background: dark ? '#1e2a3a' : '#fff',
            boxShadow: dark
              ? '0 20px 40px rgba(0,0,0,0.5)'
              : '0 10px 30px rgba(0,0,0,0.12)',
            maxHeight: 240,
            overflowY: 'auto',
          }}
        >
          {options.map((o) => (
            <button
              key={o.label}
              onClick={() => {
                onChange(o.label);
                setOpen(false);
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 14px',
                border: 'none',
                background:
                  o.label === value
                    ? dark
                      ? 'rgba(74,144,217,0.2)'
                      : '#eff6ff'
                    : 'transparent',
                color:
                  o.label === value
                    ? dark
                      ? '#7dc4f5'
                      : '#1d4ed8'
                    : dark
                    ? '#e2e8f0'
                    : '#374151',
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => {
                if (o.label !== value)
                  e.target.style.background = dark
                    ? 'rgba(255,255,255,0.06)'
                    : '#f8fafc';
              }}
              onMouseLeave={(e) => {
                if (o.label !== value)
                  e.target.style.background = 'transparent';
              }}
            >
              {o.flag && <span>{o.flag}</span>}
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── History Item ─────────────────────────────────────────────────────────────
function HistoryItem({ item, dark, onPlay, onDelete, onDownload, playing }) {
  return (
    <div
      style={{
        padding: '12px 14px',
        borderRadius: 10,
        marginBottom: 8,
        background: dark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
        border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e9eef5',
        transition: 'all 0.2s',
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: dark ? '#94a3b8' : '#64748b',
          marginBottom: 4,
        }}
      >
        {new Date(item.timestamp).toLocaleString('es-MX', {
          dateStyle: 'short',
          timeStyle: 'short',
        })}
        {' · '}
        {item.voz} · {item.velocidad}
      </div>
      <div
        style={{
          fontSize: 13,
          color: dark ? '#cbd5e1' : '#334155',
          marginBottom: 8,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
        }}
      >
        {item.texto}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button
          onClick={() => onPlay(item)}
          style={{
            flex: 1,
            padding: '5px 0',
            borderRadius: 7,
            border: 'none',
            background: playing ? '#7c3aed' : dark ? '#1d4ed8' : '#2563eb',
            color: '#fff',
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
            cursor: 'pointer',
            fontWeight: 600,
            letterSpacing: 0.3,
          }}
        >
          {playing ? '⏹ Detener' : '▶ Reproducir'}
        </button>
        <button
          onClick={() => onDownload(item)}
          style={{
            padding: '5px 10px',
            borderRadius: 7,
            border: 'none',
            background: dark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
            color: dark ? '#94a3b8' : '#475569',
            fontSize: 11,
            cursor: 'pointer',
          }}
          title="Descargar"
        >
          ⬇
        </button>
        <button
          onClick={() => onDelete(item.id)}
          style={{
            padding: '5px 10px',
            borderRadius: 7,
            border: 'none',
            background: dark ? 'rgba(239,68,68,0.15)' : '#fee2e2',
            color: '#ef4444',
            fontSize: 11,
            cursor: 'pointer',
          }}
          title="Eliminar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ─── Waveform Visualizer ──────────────────────────────────────────────────────
function WaveViz({ active, dark }) {
  const bars = 28;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        height: 40,
      }}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 99,
            background: dark ? '#4a90d9' : '#2563eb',
            height: active ? undefined : 4,
            animation: active
              ? `wave-bar ${
                  0.8 + (i % 5) * 0.15
                }s ease-in-out infinite alternate`
              : 'none',
            animationDelay: active ? `${i * 0.04}s` : '0s',
            minHeight: 4,
            ...(active && { height: `${8 + Math.sin(i * 0.7) * 16 + 8}px` }),
            opacity: active ? 0.85 + (i % 3) * 0.05 : 0.3,
            transition: 'height 0.3s, opacity 0.3s',
          }}
        />
      ))}
      <style>{`
        @keyframes wave-bar {
          from { transform: scaleY(0.4); }
          to { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function VozCraft() {
  const [dark, setDark] = useState(true);
  const [language, setLanguage] = useState('es');
  const t = TEXTS[language];
  const [voz, setVoz] = useState('Español (México)');
  const [personalidad, setPersonalidad] = useState('Narrador Calmo');
  const [velocidad, setVelocidad] = useState('Normal');
  const [animo, setAnimo] = useState('Neutral');
  const [texto, setTexto] = useState('');
  const [generando, setGenerando] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [history, setHistory] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [toast, setToast] = useState(null);
  const uttRef = useRef(null);

  // Load history from storage
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get('vozcraft-history');
        if (r) setHistory(JSON.parse(r.value));
      } catch {}
    })();
  }, []);

  const saveHistory = async (h) => {
    try {
      await window.storage.set('vozcraft-history', JSON.stringify(h));
    } catch {}
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const speak = useCallback(
    (txt, vozLabel, personalidadLabel, velocidadLabel, animoLabel, onEnd) => {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(txt);
      const vozData = VOCES.find((v) => v.label === vozLabel) || VOCES[0];
      const persData =
        PERSONALIDADES.find((p) => p.label === personalidadLabel) ||
        PERSONALIDADES[0];
      const velData =
        VELOCIDADES.find((v) => v.label === velocidadLabel) || VELOCIDADES[2];
      const animData = ANIMOS.find((a) => a.label === animoLabel) || ANIMOS[0];

      u.lang = vozData.lang;
      u.pitch = persData.pitch * animData.mod;
      u.rate = velData.rate;
      u.volume = 1;

      // Try to pick a matching voice
      const voices = window.speechSynthesis.getVoices();
      const match =
        voices.find(
          (v) =>
            v.lang.startsWith(vozData.lang.split('-')[0]) &&
            v.lang === vozData.lang
        ) || voices.find((v) => v.lang.startsWith(vozData.lang.split('-')[0]));
      if (match) u.voice = match;

      u.onstart = () => setReproduciendo(true);
      u.onend = () => {
        setReproduciendo(false);
        setPlayingId(null);
        if (onEnd) onEnd();
      };
      u.onerror = () => {
        setReproduciendo(false);
        setPlayingId(null);
      };

      uttRef.current = u;
      window.speechSynthesis.speak(u);
    },
    []
  );

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setReproduciendo(false);
    setPlayingId(null);
    setGenerando(false);
  };

  const handleGenerar = async () => {
    if (!texto.trim()) {
      showToast('Por favor escribe algún texto', 'error');
      return;
    }
    if (generando) {
      stopSpeech();
      return;
    }

    setGenerando(true);
    const item = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      texto: texto.trim(),
      voz,
      personalidad,
      velocidad,
      animo,
    };

    // Simulated generation delay
    await new Promise((r) => setTimeout(r, 600));

    speak(texto, voz, personalidad, velocidad, animo, () =>
      setGenerando(false)
    );

    const newHistory = [item, ...history].slice(0, 20);
    setHistory(newHistory);
    saveHistory(newHistory);
    showToast('✓ Audio generado correctamente');
  };

  const handlePlayHistory = (item) => {
    if (playingId === item.id) {
      stopSpeech();
    } else {
      stopSpeech();
      setPlayingId(item.id);
      speak(
        item.texto,
        item.voz,
        item.personalidad,
        item.velocidad,
        item.animo,
        () => setPlayingId(null)
      );
    }
  };

  const handleDelete = (id) => {
    const n = history.filter((h) => h.id !== id);
    setHistory(n);
    saveHistory(n);
    showToast('Eliminado del historial');
  };

  const handleDownload = (item) => {
    // Create a text file with all metadata and text
    const blob = new Blob(
      [
        `VozCraft - Audio Export\n${'─'.repeat(40)}\n`,
        `Fecha: ${new Date(item.timestamp).toLocaleString('es-MX')}\n`,
        `Voz: ${item.voz}\nPersonalidad: ${item.personalidad}\n`,
        `Velocidad: ${item.velocidad}\nÁnimo: ${item.animo}\n\n`,
        `Texto:\n${item.texto}\n\n`,
        `Nota: Para generar el MP3 real, conecta la API de Google Gemini TTS en el backend.\n`,
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vozcraft-${item.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📥 Archivo descargado');
  };

  const handleGuardarHistorial = () => {
    const data = JSON.stringify(history, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vozcraft-historial.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('📁 Historial exportado');
  };

  const handleCargarHistorial = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          if (Array.isArray(parsed)) {
            setHistory(parsed);
            saveHistory(parsed);
            showToast(`✓ ${parsed.length} entradas cargadas`);
          }
        } catch {
          showToast('Error al leer el archivo', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const limpiarHistorial = () => {
    setHistory([]);
    saveHistory([]);
    showToast('Historial limpiado');
  };

  // ─── Styles ────────────────────────────────────────────────────────────────
  const bg = dark ? '#0f172a' : '#f0f4fa';
  const cardBg = dark ? 'rgba(255,255,255,0.04)' : '#ffffff';
  const cardBorder = dark
    ? '1px solid rgba(255,255,255,0.08)'
    : '1.5px solid #e2e8f0';
  const textPrimary = dark ? '#f1f5f9' : '#0f172a';
  const textSecondary = dark ? '#94a3b8' : '#64748b';
  const navBg = dark ? 'rgba(15,23,42,0.95)' : 'rgba(29,78,216,0.97)';
  const accentBlue = '#2563eb';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        fontFamily: "'DM Sans', sans-serif",
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@700;800&display=swap"
        rel="stylesheet"
      />

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 9999,
            padding: '12px 20px',
            borderRadius: 10,
            background: toast.type === 'error' ? '#7f1d1d' : '#0f3d2e',
            color: toast.type === 'error' ? '#fca5a5' : '#6ee7b7',
            border: `1px solid ${
              toast.type === 'error' ? '#b91c1c' : '#059669'
            }`,
            fontSize: 13,
            fontWeight: 500,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            animation: 'slideIn 0.3s ease',
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <nav
        style={{
          background: navBg,
          backdropFilter: 'blur(12px)',
          borderBottom: dark
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(255,255,255,0.2)',
          padding: '0 24px',
          height: 62,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
              boxShadow: '0 4px 12px rgba(124,58,237,0.4)',
              overflow: 'hidden',
            }}
          >
            <img
              src="/logo.png"
              alt="VozCraft Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: -0.5,
            }}
          >
            VozCraft
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Dark/Light toggle */}
          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'background 0.2s',
            }}
          >
            {dark ? '☀ Claro' : '🌙 Oscuro'}
          </button>

          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'background 0.2s',
            }}
          >
            {language === 'es' ? '🇪🇸 Español' : '🇺🇸 English'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '40px 24px 24px' }}>
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            color: dark ? '#e0f2fe' : '#0f172a',
            margin: 0,
            letterSpacing: -1,
            textShadow: dark
              ? '0 2px 12px rgba(124,58,237,0.5)'
              : '0 2px 10px rgba(37,99,235,0.4)',
          }}
        >
          VozCraft
        </h1>
        <p
          style={{
            color: textSecondary,
            fontSize: 15,
            marginTop: 8,
            fontWeight: 400,
          }}
        >
          {t.subtitle}
        </p>
        {/* Waveform when playing */}
        {reproduciendo && (
          <div style={{ marginTop: 12 }}>
            <WaveViz active={reproduciendo} dark={dark} />
          </div>
        )}
      </div>

      {/* Main layout */}
      <div
        style={{
          maxWidth: 1140,
          margin: '0 auto',
          padding: '0 20px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 20,
        }}
      >
        {/* Left: Controls */}
        <div
          style={{
            background: cardBg,
            border: cardBorder,
            borderRadius: 16,
            padding: 28,
            boxShadow: dark
              ? '0 20px 60px rgba(0,0,0,0.3)'
              : '0 4px 30px rgba(0,0,0,0.06)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
              marginBottom: 20,
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {t.voice}
              </label>
              <Select
                value={voz}
                onChange={setVoz}
                options={VOCES}
                dark={dark}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {t.personality}
              </label>
              <Select
                value={personalidad}
                onChange={setPersonalidad}
                options={PERSONALIDADES}
                dark={dark}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {t.speed}
              </label>
              <Select
                value={velocidad}
                onChange={setVelocidad}
                options={VELOCIDADES}
                dark={dark}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {t.mood}
              </label>
              <Select
                value={animo}
                onChange={setAnimo}
                options={ANIMOS}
                dark={dark}
              />
            </div>
          </div>

          {/* Textarea */}
          <div style={{ position: 'relative' }}>
            <textarea
              value={texto}
              onChange={(e) => {
                setTexto(e.target.value);
                setCharCount(e.target.value.length);
              }}
              placeholder={t.placeholder}
              maxLength={5000}
              style={{
                width: '100%',
                minHeight: 200,
                padding: '14px 16px',
                border: dark
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1.5px solid #e2e8f0',
                borderRadius: 12,
                resize: 'vertical',
                boxSizing: 'border-box',
                background: dark ? 'rgba(255,255,255,0.04)' : '#fafbfd',
                color: textPrimary,
                fontSize: 15,
                lineHeight: 1.65,
                fontFamily: "'DM Sans', sans-serif",
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
                e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = dark
                  ? 'rgba(255,255,255,0.1)'
                  : '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 14,
                fontSize: 11,
                color: charCount > 4500 ? '#ef4444' : textSecondary,
              }}
            >
              {charCount}/5000
            </div>
          </div>

          {/* Generate Button */}
          <div
            style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}
          >
            <button
              onClick={handleGenerar}
              style={{
                padding: '13px 40px',
                borderRadius: 12,
                border: 'none',
                background: generando
                  ? 'linear-gradient(135deg, #7c3aed, #5b21b6)'
                  : 'linear-gradient(135deg, #991b1b, #b91c1c)',
                color: '#fff',
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                letterSpacing: 0.3,
                boxShadow: generando
                  ? '0 8px 24px rgba(124,58,237,0.4)'
                  : '0 8px 24px rgba(153,27,27,0.35)',
                transition: 'all 0.25s',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                minWidth: 200,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = generando
                  ? '0 12px 28px rgba(124,58,237,0.5)'
                  : '0 12px 28px rgba(153,27,27,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
              }}
            >
              {generando ? (
                <>
                  <span style={{ animation: 'spin 1s linear infinite' }}>
                    ⏳
                  </span>
                  {reproduciendo ? t.stop : t.generating}
                </>
              ) : (
                <>
                  <span>🎧</span> {t.generate}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: History */}
        <div
          style={{
            background: cardBg,
            border: cardBorder,
            borderRadius: 16,
            padding: 22,
            boxShadow: dark
              ? '0 20px 60px rgba(0,0,0,0.3)'
              : '0 4px 30px rgba(0,0,0,0.06)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: textPrimary,
                fontFamily: "'Sora', sans-serif",
              }}
            >
              {t.history}
            </h3>
            {history.length > 0 && (
              <button
                onClick={limpiarHistorial}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: 'none',
                  background: dark ? 'rgba(239,68,68,0.15)' : '#fee2e2',
                  color: '#ef4444',
                  fontSize: 11,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {t.clearAll}
              </button>
            )}
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              minHeight: 280,
              maxHeight: 480,
            }}
          >
            {history.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200,
                  color: textSecondary,
                  fontSize: 13,
                  gap: 8,
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: 32, opacity: 0.3 }}>🎙</span>
                <span>{t.emptyHistory}</span>
              </div>
            ) : (
              history.map((item) => (
                <HistoryItem
                  key={item.id}
                  item={item}
                  dark={dark}
                  onPlay={handlePlayHistory}
                  onDelete={handleDelete}
                  onDownload={handleDownload}
                  playing={playingId === item.id}
                />
              ))
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <button
              onClick={handleGuardarHistorial}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 10,
                border: 'none',
                background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: 0.3,
              }}
            >
              {t.save}
            </button>
            <button
              onClick={handleCargarHistorial}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 10,
                border: 'none',
                background: dark ? 'rgba(255,255,255,0.1)' : '#1e293b',
                color: dark ? '#e2e8f0' : '#fff',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: 0.3,
              }}
            >
              {t.load}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: dark
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid #e2e8f0',
          background: dark ? 'rgba(15,23,42,0.8)' : '#1e3a6e',
          padding: '18px 24px',
          textAlign: 'center',
          color: dark ? '#475569' : 'rgba(255,255,255,0.6)',
          fontSize: 13,
        }}
      >
        © 2026 - Mateo Julio Gomero Rios{' '}
        <a
          href="https://github.com/MateoRiosdev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: dark ? '#64748b' : 'rgba(255,255,255,0.8)',
            fontWeight: 'bold',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline';
            e.currentTarget.style.color = dark ? '#94a3b8' : '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'none';
            e.currentTarget.style.color = dark
              ? '#64748b'
              : 'rgba(255,255,255,0.8)';
          }}
        >
          (MateoRiosdev.)
        </a>{' '}
        · {t.footer}
      </footer>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: none; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${
          dark ? 'rgba(255,255,255,0.12)' : '#cbd5e1'
        }; border-radius: 99px; }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 320px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          textarea {
            min-height: 160px !important;
          }
          nav {
            flex-direction: column;
            height: auto !important;
            padding: 24px 16px;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}
