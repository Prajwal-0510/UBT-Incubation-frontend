// src/components/Hero.jsx — UPDATED: Added AI & ML logo to tech icons slider
import { useState, useEffect } from 'react';

const techIcons = [
  { name: 'Python',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'React',       src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TensorFlow',  src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Angular',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'JavaScript',  src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Android',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
  { name: 'AWS',         src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'Java',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'NodeJS',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: '.NET',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
  { name: 'MongoDB',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Docker',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'PyTorch',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'Kubernetes',  src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'MySQL',       src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  // AI & ML special entry (custom SVG icon inline)
  { name: 'AI & ML',     src: null, isAI: true },
];

const words = ['PhD Scholars', 'Researchers', 'Innovators', 'Academicians', 'Engineers'];

const stats = [
  { val: '2500+', label: 'Researchers Served' },
  { val: '500+',  label: 'PhD Completions' },
  { val: '400+',  label: 'Papers Published' },
  { val: '98%',   label: 'Success Rate' },
];

// AI & ML SVG icon component
const AIMLIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="url(#aiGrad)"/>
    <defs>
      <linearGradient id="aiGrad" x1="0" y1="0" x2="40" y2="40">
        <stop offset="0%" stopColor="#667eea"/>
        <stop offset="100%" stopColor="#764ba2"/>
      </linearGradient>
    </defs>
    {/* Brain/neural network icon */}
    <circle cx="20" cy="14" r="4" fill="white" fillOpacity="0.9"/>
    <circle cx="11" cy="22" r="3" fill="white" fillOpacity="0.75"/>
    <circle cx="29" cy="22" r="3" fill="white" fillOpacity="0.75"/>
    <circle cx="15" cy="30" r="2.5" fill="white" fillOpacity="0.6"/>
    <circle cx="25" cy="30" r="2.5" fill="white" fillOpacity="0.6"/>
    <line x1="20" y1="18" x2="11" y2="22" stroke="white" strokeWidth="1.2" strokeOpacity="0.7"/>
    <line x1="20" y1="18" x2="29" y2="22" stroke="white" strokeWidth="1.2" strokeOpacity="0.7"/>
    <line x1="11" y1="25" x2="15" y2="30" stroke="white" strokeWidth="1.2" strokeOpacity="0.7"/>
    <line x1="29" y1="25" x2="25" y2="30" stroke="white" strokeWidth="1.2" strokeOpacity="0.7"/>
    <line x1="11" y1="25" x2="25" y2="30" stroke="white" strokeWidth="0.8" strokeOpacity="0.4"/>
    <line x1="29" y1="25" x2="15" y2="30" stroke="white" strokeWidth="0.8" strokeOpacity="0.4"/>
  </svg>
);

const Hero = ({ onNavigate }) => {
  const [wordIdx,   setWordIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing,    setTyping]    = useState(true);

  useEffect(() => {
    const current = words[wordIdx];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
        return () => clearTimeout(t);
      } else {
        setWordIdx((wordIdx + 1) % words.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, wordIdx]);

  const particles = Array.from({ length: 28 }, (_, i) => ({
    x: Math.sin(i * 1.3) * 50 + 50,
    y: Math.cos(i * 0.9) * 50 + 50,
    size: i % 3 === 0 ? 4 : 2,
    delay: (i * 0.25) % 3,
    dur: 3 + (i % 3),
  }));

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #050d1a 0%, #0a1628 45%, #0f2044 80%, #050d1a 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 12s ease infinite',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        paddingTop: 68,
      }}>
        <div style={{ position:'absolute', top:'35%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, background:'radial-gradient(ellipse at center, rgba(232,184,75,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />
        {particles.map((p, i) => (
          <div key={i} style={{ position:'absolute', pointerEvents:'none', width:p.size, height:p.size, background:'#e8b84b', borderRadius:'50%', top:`${p.y}%`, left:`${p.x}%`, opacity:0.15 + (i % 5) * 0.07, animation:`float ${p.dur}s ease-in-out ${p.delay}s infinite` }} />
        ))}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'linear-gradient(rgba(232,184,75,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,184,75,0.03) 1px, transparent 1px)', backgroundSize:'60px 60px' }} />

        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 24px', maxWidth:860 }}>
          <div className="badge animate-fade-up" style={{ marginBottom:24 }}>
            🏆 India's Premier Academic Research Platform
          </div>
          <h1 className="animate-fade-up delay-100" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2.8rem, 6vw, 5.2rem)', fontWeight:700, color:'#fff', lineHeight:1.08, marginBottom:16 }}>
            Empowering
            <span style={{ display:'block', background:'linear-gradient(135deg, #e8b84b, #fcd34d, #e8b84b)', backgroundSize:'200%', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 3s linear infinite', minHeight:'1.1em' }}>
              {displayed}<span style={{ borderRight:'3px solid #e8b84b', marginLeft:2, animation:'blink 0.7s step-end infinite' }}></span>
            </span>
          </h1>
          <p className="animate-fade-up delay-200" style={{ color:'rgba(255,255,255,0.68)', fontSize:'clamp(1rem, 1.5vw, 1.15rem)', lineHeight:1.8, maxWidth:600, margin:'0 auto 36px' }}>
            From PhD topic selection to Scopus publication — UBT TECHNOLOGY Incubation provides complete academic research support across all disciplines.
          </p>
          <div className="animate-fade-up delay-300" style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:56 }}>
            <button className="btn-primary" onClick={() => onNavigate('contact')} style={{ fontSize:14, padding:'14px 30px', animation:'pulse-gold 2.5s infinite' }}>
              🚀 Start Free Consultation
            </button>
            <button className="btn-outline" onClick={() => onNavigate('research-impact')}>
              📈 View Research Impact
            </button>
          </div>
          <div className="animate-fade-up delay-400" style={{ display:'flex', gap:0, flexWrap:'wrap', justifyContent:'center', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(232,184,75,0.15)', borderRadius:16, overflow:'hidden', backdropFilter:'blur(12px)' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ flex:'1 1 120px', padding:'22px 24px', textAlign:'center', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'2rem', fontWeight:700, color:'#e8b84b' }}>{s.val}</div>
                <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.5)', marginTop:3, letterSpacing:'0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', animation:'float 2s ease-in-out infinite' }}>
          <div style={{ width:28, height:44, border:'2px solid rgba(232,184,75,0.4)', borderRadius:14, display:'flex', alignItems:'flex-start', justifyContent:'center', padding:5 }}>
            <div style={{ width:4, height:8, background:'#e8b84b', borderRadius:2, animation:'float 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ─── TECH ICON SLIDER (includes AI & ML) ─── */}
      <section style={{ padding:'36px 0', background:'#050d1a', borderTop:'1px solid rgba(232,184,75,0.1)', borderBottom:'1px solid rgba(232,184,75,0.1)', overflow:'hidden' }}>
        <div style={{ display:'flex', overflow:'hidden' }}>
          <div className="marquee-track">
            {[...techIcons, ...techIcons].map((t, i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, minWidth:80, opacity:0.75, transition:'opacity 0.2s, transform 0.2s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity='0.75'; e.currentTarget.style.transform='none'; }}>
                {t.isAI
                  ? <AIMLIcon />
                  : <img src={t.src} alt={t.name} style={{ width:40, height:40, objectFit:'contain' }} onError={e => { e.target.style.display='none'; }} />
                }
                <span style={{ fontSize:10.5, color:'rgba(255,255,255,0.55)', fontWeight:500, fontFamily:'Outfit, sans-serif', whiteSpace:'nowrap' }}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
