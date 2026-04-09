import { useState, useEffect, useRef } from 'react';
import './index.css';
import { AdminProvider } from './context/AdminContext';

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";
import LeadershipSection from './components/Leadership/LeadershipSection.jsx';
import GallerySection from './components/Gallery/GallerySection.jsx';
import OnlineProjectsSection from './components/Projects/OnlineProjectsSection.jsx';
import UpdatesSection from './components/Updates/UpdatesSection.jsx';
import ReviewsSection from './components/Reviews/ReviewsSection';
import AlumniSection  from './components/Alumni/AlumniSection';
import AdminPage from './components/Auth/AdminPage.jsx';
import InquiriesPage from './components/Admin/InquiriesPage.jsx';
import PhDAssistance from './components/Services/PhDAssistance.jsx';
import ResearchPage from './components/Research/ResearchPage.jsx';
import ResearchImpact from './components/AuthorServices/ResearchImpact.jsx';
import PublicationsPage from './components/Publications/PublicationsPage.jsx';
import IPRPage from './components/IPR/IPRPage.jsx';
import AIToolsPage from './components/AITools/AIToolsPage.jsx';
import ContactPage from './components/Contact/ContactPage.jsx';

const quickServices = [
  { id:'phd-assistance', icon:'🎓', title:'PhD Assistance',  color:'#2563eb', desc:'End-to-end doctoral support from topic to viva.' },
  { id:'paper-writing',  icon:'📝', title:'Paper Writing',   color:'#7c3aed', desc:'Expert research paper drafting for top journals.' },
  { id:'publications',   icon:'📖', title:'Publications',    color:'#059669', desc:'Scopus, WoS, IEEE & UGC publication support.' },
  { id:'ipr',            icon:'⚗️', title:'IPR / Patents',   color:'#dc2626', desc:'Patent filing, trademark & copyright services.' },
  { id:'internships',    icon:'🏭', title:'Internships',     color:'#ea580c', desc:'3-6 month industrial internship programs.' },
  { id:'ai-tools',       icon:'🤖', title:'AI Tools',        color:'#0891b2', desc:'AI writer, checker, grammar & journal finder.' },
];

const testimonials = [
  { name:'Dr. Priya Sharma',  role:'Assistant Professor, VNIT Nagpur', text:'UBT TECHNOLOGY helped me publish 3 Scopus papers during my PhD. Their guidance was exceptional throughout the entire process.', rating:5, avatar:'https://i.pravatar.cc/60?img=5' },
  { name:'Rahul Mishra',      role:'MTech Student, IIT Bombay',        text:'Got my final project published in an IEEE conference. The support team was responsive and extremely professional.', rating:5, avatar:'https://i.pravatar.cc/60?img=3' },
  { name:'Dr. Anjali Patel',  role:'Research Scholar, Pune University', text:'From patent filing to journal publication — UBT TECHNOLOGY handled everything seamlessly. Highly recommended!', rating:5, avatar:'https://i.pravatar.cc/60?img=9' },
  { name:'Saurabh Desai',     role:'BE Final Year, COEP Pune',          text:'My final year project got selected at an international conference. The team guided me at every step — amazing experience!', rating:5, avatar:'https://i.pravatar.cc/60?img=12' },
];

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
const HomePage = ({ onNavigate }) => {
  const [activeTest, setActiveTest] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveTest(i => (i+1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Hero onNavigate={onNavigate} />

      {/* Live ticker */}
      <div style={{ background:'#050d1a', padding:'12px 80px', display:'flex', gap:24, alignItems:'center', borderBottom:'1px solid rgba(232,184,75,0.1)', overflow:'hidden' }}>
        <span style={{ background:'#e8b84b', color:'#050d1a', fontWeight:700, fontSize:10, padding:'3px 10px', borderRadius:4, letterSpacing:'0.1em', flexShrink:0 }}>LIVE</span>
        <div style={{ overflow:'hidden', flex:1 }}>
          <div className="marquee-track" style={{ gap:80, animationDuration:'20s' }}>
            {['📢 New PhD batch starting April 2025 — Limited seats!','🏆 50 Scopus publications in Q1 2025!','📅 Free webinar: Write a Scopus paper — April 5th','🌟 New Ahilyanagar branch now open!'].map((t,i) => (
              <span key={i} style={{ fontSize:13, color:'rgba(255,255,255,0.75)', whiteSpace:'nowrap', fontFamily:'Outfit, sans-serif' }}>{t}</span>
            ))}
            {['📢 New PhD batch starting April 2025 — Limited seats!','🏆 50 Scopus publications in Q1 2025!','📅 Free webinar: Write a Scopus paper — April 5th','🌟 New Ahilyanagar branch now open!'].map((t,i) => (
              <span key={`d-${i}`} style={{ fontSize:13, color:'rgba(255,255,255,0.75)', whiteSpace:'nowrap', fontFamily:'Outfit, sans-serif' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <section style={{ padding:'90px 80px', background:'#fff' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div className="section-label">Our Services</div>
          <h2 className="section-title">Everything You Need for Academic Success</h2>
          <p style={{ color:'#6b7280', maxWidth:520, margin:'14px auto 0', lineHeight:1.7, fontSize:14.5 }}>Comprehensive research and academic support — from PhD guidance to global publication.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20 }}>
          {quickServices.map((s,i) => (
            <div key={s.id} className="card animate-fade-up" style={{ padding:'28px 24px', cursor:'pointer', animationDelay:`${i*0.07}s` }}
              onClick={() => onNavigate(s.id)}
              onMouseEnter={e => { e.currentTarget.style.borderColor=s.color; e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=`0 16px 40px ${s.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#e5e4e0'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=''; }}>
              <div style={{ width:52, height:52, borderRadius:14, background:`${s.color}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, marginBottom:16 }}>{s.icon}</div>
              <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.2rem', fontWeight:700, color:'#0a1628', marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontSize:13.5, color:'#6b7280', lineHeight:1.7, marginBottom:18 }}>{s.desc}</p>
              <span style={{ color:s.color, fontWeight:600, fontSize:13, display:'flex', alignItems:'center', gap:4 }}>Learn more →</span>
            </div>
          ))}
        </div>
      </section>

      <LeadershipSection onNavigate={onNavigate} />
      <UpdatesSection />
      <GallerySection />
      <OnlineProjectsSection />
      <AlumniSection />

      {/* Testimonials */}
      <section style={{ padding:'90px 80px', background:'#050d1a', overflow:'hidden' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div className="section-label" style={{ color:'#e8b84b' }}>Testimonials</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(1.8rem,3vw,2.5rem)', color:'#fff', fontWeight:700 }}>What Our Researchers Say</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:22 }}>
          {testimonials.map((t,i) => (
            <div key={i} className="animate-fade-up" style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${activeTest===i?'rgba(232,184,75,0.4)':'rgba(255,255,255,0.08)'}`, borderRadius:16, padding:'28px', transition:'border-color 0.4s, transform 0.3s', transform:activeTest===i?'translateY(-4px)':'none', animationDelay:`${i*0.08}s` }}>
              <div style={{ color:'#e8b84b', fontSize:18, marginBottom:12 }}>{'★'.repeat(t.rating)}</div>
              <p style={{ color:'rgba(255,255,255,0.72)', lineHeight:1.8, fontSize:14, marginBottom:20 }}>"{t.text}"</p>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <img src={t.avatar} alt={t.name} style={{ width:40, height:40, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(232,184,75,0.3)' }} />
                <div>
                  <div style={{ fontWeight:600, color:'#fff', fontSize:13.5 }}>{t.name}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.4)', marginTop:2 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ReviewsSection />

      {/* CTA */}
      <section style={{ padding:'90px 80px', textAlign:'center', background:'linear-gradient(135deg,#e8b84b 0%,#fcd34d 50%,#e8b84b 100%)', backgroundSize:'200% 200%', animation:'shimmer 4s linear infinite' }}>
        <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2rem,4vw,3rem)', color:'#050d1a', fontWeight:700, marginBottom:16 }}>Ready to Transform Your Academic Career?</h2>
        <p style={{ color:'rgba(5,13,26,0.65)', fontSize:'1.1rem', marginBottom:36, maxWidth:500, margin:'0 auto 36px' }}>Join 2,500+ researchers who have achieved their goals with UBT TECHNOLOGY Incubation.</p>
        <button onClick={() => onNavigate('contact')} style={{ background:'#050d1a', color:'#e8b84b', fontWeight:700, padding:'16px 36px', borderRadius:10, border:'none', cursor:'pointer', fontSize:15, fontFamily:'Outfit, sans-serif', transition:'all 0.3s', boxShadow:'0 8px 24px rgba(5,13,26,0.2)' }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(5,13,26,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 24px rgba(5,13,26,0.2)'; }}>
          🚀 Start Free Consultation Today →
        </button>
      </section>
    </>
  );
};

// ─── GENERIC FALLBACK ──────────────────────────────────────────────────────────
const pageMeta = {
  'paper-writing': { title:'Research Paper Writing', desc:'Expert research paper drafting for Scopus, SCI, WoS, and UGC Care journals.', img:'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800' },
  'manuscript':    { title:'Manuscript Formatting',  desc:'Professional formatting per journal-specific templates — APA, MLA, IEEE.', img:'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800' },
  'thesis':        { title:'Thesis & Dissertation Support', desc:'Complete writing support from literature review to final submission.', img:'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800' },
  'internships':   { title:'Industrial Internships', desc:'3-6 month internship programs for engineering students.', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' },
  'web-dev':       { title:'Web & App Development',  desc:'Modern web and mobile development for academic and enterprise solutions.', img:'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800' },
};
const GenericPage = ({ pageId, onNavigate }) => {
  const info = pageMeta[pageId] || { title:pageId.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()), desc:'Professional academic and research support by UBT TECHNOLOGY Incubation.', img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800' };
  return (
    <div style={{ paddingTop:68 }}>
      <div className="page-hero">
        <div className="badge animate-fade-up">UBT TECHNOLOGY Services</div>
        <h1 className="animate-fade-up delay-100">{info.title}</h1>
        <div className="gold-line" />
        <p className="animate-fade-up delay-200">{info.desc}</p>
        <div style={{ marginTop:28 }} className="animate-fade-up delay-300">
          <button className="btn-primary" onClick={() => onNavigate('contact')}>Get Started →</button>
        </div>
      </div>
      <section style={{ padding:'80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
          <div>
            <div className="section-label">About This Service</div>
            <h2 className="section-title" style={{ marginBottom:20 }}>{info.title}</h2>
            <p style={{ color:'#6b7280', lineHeight:1.85, marginBottom:22 }}>{info.desc}</p>
            <p style={{ color:'#6b7280', lineHeight:1.85, marginBottom:32 }}>Our team of domain experts delivers quality guidance at every milestone.</p>
            <button className="btn-primary" onClick={() => onNavigate('contact')}>Request Free Consultation →</button>
          </div>
          <img src={info.img} alt={info.title} style={{ width:'100%', height:380, objectFit:'cover', borderRadius:20 }} />
        </div>
      </section>
    </div>
  );
};

// ─── ROUTES ────────────────────────────────────────────────────────────────────
const ROUTES = {
  'phd-assistance': PhDAssistance,
  'research':ResearchPage,'phd-rd':ResearchPage,'me-mtech':ResearchPage,'be-btech':ResearchPage,'mba':ResearchPage,
  'research-impact': ResearchImpact,
  'publications':PublicationsPage,'ugc-care':PublicationsPage,'scopus':PublicationsPage,'ieee':PublicationsPage,'plagiarism-policy':PublicationsPage,
  'ipr':IPRPage,'patent':IPRPage,'trademark':IPRPage,'copyright':IPRPage,'industrial-design':IPRPage,
  'ai-tools':AIToolsPage,'ai-writer':AIToolsPage,'plagiarism-checker':AIToolsPage,'grammar-checker':AIToolsPage,'journal-finder':AIToolsPage,
  'contact': ContactPage,
  'admin':   AdminPage,
  'alumni':  AlumniSection,
  'inquiries': InquiriesPage,
  'manage-updates': UpdatesSection,
  'gallery': null,
  'online-projects': null,
};
const GENERIC = ['paper-writing','manuscript','thesis','internships','web-dev'];

// ─── APP ───────────────────────────────────────────────────────────────────────
function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const cursorRef = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (cursorRef.current) { cursorRef.current.style.left=e.clientX+'px'; cursorRef.current.style.top=e.clientY+'px'; } };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  const handleNavigate = (page) => { setActivePage(page); window.scrollTo({ top:0, behavior:'smooth' }); };

  const renderPage = () => {
    if (activePage==='home') return <HomePage onNavigate={handleNavigate} />;
    if (activePage==='gallery') return (
      <div style={{ paddingTop:68 }}>
        <div className="page-hero"><div className="badge animate-fade-up">Gallery</div><h1 className="animate-fade-up delay-100">Campus Visits &<br/>Student Projects</h1><div className="gold-line" /></div>
        <GallerySection />
      </div>
    );
    if (activePage==='online-projects') return (
      <div style={{ paddingTop:68 }}>
        <div className="page-hero"><div className="badge animate-fade-up">Projects</div><h1 className="animate-fade-up delay-100">Online Project<br/>Showcase</h1><div className="gold-line" /></div>
        <OnlineProjectsSection />
      </div>
    );
    if (GENERIC.includes(activePage)) return <GenericPage pageId={activePage} onNavigate={handleNavigate} />;
    const Page = ROUTES[activePage];
    if (Page) return <Page onNavigate={handleNavigate} />;
    return <GenericPage pageId={activePage} onNavigate={handleNavigate} />;
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <div ref={cursorRef} className="cursor-glow" style={{ width:24, height:24 }} />
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <main style={{ flex:1 }}>{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
