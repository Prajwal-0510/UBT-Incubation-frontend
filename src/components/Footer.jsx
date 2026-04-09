// src/components/Footer.jsx — FINAL
// Loads footer data from backend (public API).
// Admin can edit contact/address/hours via the admin panel.

import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

const DEFAULT_FOOTER = {
  email:        'info@ubtorg.com',
  phone:        '+91 9370272741',
  address:      'Office No. 709, Seventh Floor, Landmark Center, Pune-Satara Road, Parvati, Pune',
  workingHours: 'Mon–Sat: 9:00 AM – 7:00 PM',
  whatsapp:     '+919370272741',
};

const links = {
  Services: [
    { label:'PhD Assistance',         id:'phd-assistance' },
    { label:'Research Paper Writing',  id:'paper-writing' },
    { label:'Thesis & Dissertation',   id:'thesis' },
    { label:'Industrial Internships',  id:'internships' },
    { label:'Web & App Development',   id:'web-dev' },
  ],
  Publications: [
    { label:'Scopus / Web of Science', id:'scopus' },
    { label:'UGC Care Journals',       id:'ugc-care' },
    { label:'IEEE & Conference',        id:'ieee' },
    { label:'Plagiarism Policy',        id:'plagiarism-policy' },
  ],
  'IPR & AI': [
    { label:'Patent Filing',        id:'patent' },
    { label:'Trademark Registration',id:'trademark' },
    { label:'Copyright',            id:'copyright' },
    { label:'AI Research Writer',   id:'ai-writer' },
    { label:'Journal Finder',       id:'journal-finder' },
  ],
};

const Footer = ({ onNavigate }) => {
  const { isAdmin } = useAdmin();
  const [info,        setInfo]        = useState(DEFAULT_FOOTER);
  const [editMode,    setEditMode]    = useState(false);
  const [editForm,    setEditForm]    = useState(DEFAULT_FOOTER);
  const [saving,      setSaving]      = useState(false);
  const [saveMsg,     setSaveMsg]     = useState('');

  // Load footer from public API on mount
  useEffect(() => {
    // Just use default static data
    setInfo(DEFAULT_FOOTER);
    setEditForm(DEFAULT_FOOTER);
  }, []);

  const handleSave = async () => {
    setInfo(editForm);
    setEditMode(false);
    setSaveMsg('✅ Footer updated (local)');
    setTimeout(() => setSaveMsg(''), 2500);
  };

  const inputStyle = {
    width:'100%', padding:'7px 12px',
    border:'1px solid rgba(255,255,255,0.2)', borderRadius:8,
    fontFamily:'Outfit, sans-serif', fontSize:13,
    background:'rgba(255,255,255,0.08)', color:'#fff', outline:'none',
    marginTop:4, boxSizing:'border-box',
  };

  return (
    <footer style={{ background:'#030810', color:'rgba(255,255,255,0.65)', fontFamily:'Outfit, sans-serif' }}>

      {/* Admin edit banner */}
      {isAdmin && (
        <div style={{ background:'rgba(232,184,75,0.1)', borderBottom:'1px solid rgba(232,184,75,0.2)', padding:'12px 80px', display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:13, color:'#e8b84b', fontWeight:600 }}>⚙ Admin — Footer Editor</span>
          {!editMode
            ? <button onClick={() => setEditMode(true)} style={{ padding:'6px 16px', borderRadius:8, background:'#e8b84b', color:'#050d1a', border:'none', cursor:'pointer', fontWeight:600, fontSize:12, fontFamily:'Outfit, sans-serif' }}>Edit Footer Info</button>
            : <>
                <button onClick={handleSave} disabled={saving} style={{ padding:'6px 16px', borderRadius:8, background:'#059669', color:'#fff', border:'none', cursor:'pointer', fontWeight:600, fontSize:12, fontFamily:'Outfit, sans-serif' }}>{saving ? 'Saving...' : '💾 Save'}</button>
                <button onClick={() => setEditMode(false)} style={{ padding:'6px 14px', borderRadius:8, background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.7)', border:'none', cursor:'pointer', fontSize:12, fontFamily:'Outfit, sans-serif' }}>Cancel</button>
              </>
          }
          {saveMsg && <span style={{ fontSize:12, color:'#4ade80' }}>{saveMsg}</span>}
        </div>
      )}

      <div style={{ padding:'70px 80px 40px', display:'grid', gridTemplateColumns:'1.6fr repeat(3,1fr)', gap:48, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        {/* Brand + contact */}
        <div>
          <div onClick={() => onNavigate('home')} style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ width:40, height:40, background:'linear-gradient(135deg,#e8b84b,#fcd34d)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Cormorant Garamond, serif', fontWeight:900, fontSize:20, color:'#050d1a' }}>U</div>
            <div>
              <div style={{ fontFamily:'Cormorant Garamond, serif', fontWeight:700, fontSize:22, color:'#fff' }}>UBT TECHNOLOGY</div>
              <div style={{ fontSize:9, color:'#e8b84b', letterSpacing:'0.14em', textTransform:'uppercase' }}>INCUBATION</div>
            </div>
          </div>
          <p style={{ fontSize:13.5, lineHeight:1.8, marginBottom:20, maxWidth:300 }}>
            India's premier academic research support platform. Empowering PhD scholars, researchers, and students since 2017.
          </p>

          {/* Contact info — editable by admin */}
          {editMode ? (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                { k:'email',        label:'Email',         placeholder:'info@ubtorg.com' },
                { k:'phone',        label:'Phone',         placeholder:'+91 9370272741' },
                { k:'whatsapp',     label:'WhatsApp',      placeholder:'+919370272741' },
                { k:'workingHours', label:'Working Hours', placeholder:'Mon–Sat: 9AM–7PM' },
                { k:'address',      label:'Address',       placeholder:'Office address...' },
              ].map(f => (
                <div key={f.k}>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{f.label}</div>
                  <input style={inputStyle} placeholder={f.placeholder}
                    value={editForm[f.k] || ''}
                    onChange={e => setEditForm(p => ({ ...p, [f.k]:e.target.value }))} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize:13 }}>
              <div style={{ marginBottom:8 }}>📧 {info.email}</div>
              <div style={{ marginBottom:8 }}>📞 {info.phone}</div>
              <div style={{ marginBottom:8 }}>🕐 {info.workingHours}</div>
              <div>📍 {info.address}</div>
            </div>
          )}
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([col, items]) => (
          <div key={col}>
            <h4 style={{ color:'#fff', fontWeight:600, fontSize:14, marginBottom:18, letterSpacing:'0.05em' }}>{col}</h4>
            <ul style={{ listStyle:'none' }}>
              {items.map(it => (
                <li key={it.id} style={{ marginBottom:10 }}>
                  <button onClick={() => onNavigate(it.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.55)', fontSize:13.5, fontFamily:'Outfit, sans-serif', padding:0, transition:'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color='#e8b84b'}
                    onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
                    {it.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ padding:'22px 80px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <div style={{ fontSize:13 }}>
          © {new Date().getFullYear()} UBT TECHNOLOGY Incubation. All rights reserved.
          <span style={{ color:'#e8b84b', margin:'0 8px' }}>·</span>
          Founded by Manisha &amp; Tejas Shingvi
        </div>
        <button onClick={() => onNavigate('admin')} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.25)', fontSize:12, fontFamily:'Outfit, sans-serif', transition:'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color='#e8b84b'}
          onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.25)'}>
          🔐 Admin
        </button>
      </div>

      <style>{`
        @media (max-width:900px) {
          footer > div { grid-template-columns: 1fr !important; padding: 40px 24px !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
