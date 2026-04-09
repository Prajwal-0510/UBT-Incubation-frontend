// src/components/Updates/UpdatesSection.jsx — FIXED
// Data loads for everyone. Admin controls only visible when logged in.

import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

const typeConfig = {
  announcement: { color:'#2563eb', bg:'#eff6ff', icon:'📢', label:'Announcement' },
  achievement:  { color:'#059669', bg:'#ecfdf5', icon:'🏆', label:'Achievement' },
  event:        { color:'#7c3aed', bg:'#f5f3ff', icon:'📅', label:'Event' },
  news:         { color:'#e8b84b', bg:'#fffbeb', icon:'📰', label:'News' },
};

const UpdatesSection = () => {
  const { updates, isAdmin, addUpdate, removeUpdate, togglePin, loading } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({ type:'announcement', title:'', content:'' });
  const [expanded, setExpanded] = useState(null);

  // Pinned first, then by date
  const sorted = [...updates].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const handleAdd = () => {
    if (!form.title || !form.content) return;
    addUpdate({ ...form, date: new Date().toISOString().slice(0, 10), pinned: false });
    setForm({ type:'announcement', title:'', content:'' });
    setShowForm(false);
  };

  if (loading && updates.length === 0) {
    return (
      <section style={{ padding:'90px 80px', background:'#fff', textAlign:'center' }}>
        <div style={{ color:'#9ca3af', fontFamily:'Outfit, sans-serif' }}>Loading updates...</div>
      </section>
    );
  }

  return (
    <section style={{ padding:'90px 80px', background:'#fff' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:44, flexWrap:'wrap', gap:16 }}>
        <div>
          <div className="section-label">Live Updates</div>
          <h2 className="section-title">Daily Announcements &amp; News</h2>
        </div>
        {isAdmin && (
          <button onClick={() => setShowForm(!showForm)} style={{ background:'#050d1a', color:'#e8b84b', border:'none', padding:'10px 22px', borderRadius:8, fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'Outfit, sans-serif' }}>
            {showForm ? '✕ Close' : '+ Add Update'}
          </button>
        )}
      </div>

      {/* Admin form */}
      {isAdmin && showForm && (
        <div className="animate-fade-up" style={{ background:'#f8f7f4', border:'1.5px solid #e5e4e0', borderRadius:16, padding:'28px 32px', marginBottom:32 }}>
          <h4 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.3rem', marginBottom:20 }}>Post New Update</h4>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:14, marginBottom:14 }}>
            <div>
              <label style={{ fontSize:11, fontWeight:600, color:'#374151', textTransform:'uppercase', letterSpacing:'0.08em', display:'block', marginBottom:5 }}>Type</label>
              <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type:e.target.value })}>
                {Object.entries(typeConfig).map(([k,v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:11, fontWeight:600, color:'#374151', textTransform:'uppercase', letterSpacing:'0.08em', display:'block', marginBottom:5 }}>Title</label>
              <input className="form-input" placeholder="Update title..." value={form.title} onChange={e => setForm({ ...form, title:e.target.value })} />
            </div>
          </div>
          <textarea className="form-input" rows={3} placeholder="Full content / description..." value={form.content} onChange={e => setForm({ ...form, content:e.target.value })} style={{ marginBottom:14 }} />
          <button onClick={handleAdd} className="btn-primary">Post Update</button>
        </div>
      )}

      {/* No updates yet */}
      {sorted.length === 0 && (
        <div style={{ textAlign:'center', padding:'40px 0', color:'#9ca3af', fontFamily:'Outfit, sans-serif' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📢</div>
          <p>No updates yet. {isAdmin ? 'Add one above!' : 'Check back soon.'}</p>
        </div>
      )}

      {/* Cards grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:20 }}>
        {sorted.map((upd, i) => {
          const cfg = typeConfig[upd.type] || typeConfig.news;
          const isOpen = expanded === upd.id;
          return (
            <div key={upd.id} className="card animate-fade-up" style={{
              padding:'22px 24px', cursor:'pointer',
              border: upd.pinned ? `2px solid ${cfg.color}` : '1px solid #e5e4e0',
              animationDelay:`${(i%6)*0.07}s`, transition:'all 0.3s',
            }} onClick={() => setExpanded(isOpen ? null : upd.id)}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <span style={{ background:cfg.bg, color:cfg.color, padding:'4px 11px', borderRadius:999, fontSize:11, fontWeight:700, display:'flex', alignItems:'center', gap:4 }}>
                    {cfg.icon} {cfg.label}
                  </span>
                  {upd.pinned && <span style={{ fontSize:14 }} title="Pinned">📌</span>}
                </div>
                <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                  <span style={{ fontSize:11, color:'#9ca3af' }}>{upd.date}</span>
                  {isAdmin && (
                    <>
                      <button onClick={e => { e.stopPropagation(); togglePin(upd.id); }} title={upd.pinned ? 'Unpin' : 'Pin'} style={{ background:'none', border:'none', cursor:'pointer', fontSize:14, padding:'2px' }}>
                        {upd.pinned ? '📌' : '📍'}
                      </button>
                      <button onClick={e => { e.stopPropagation(); removeUpdate(upd.id); }} style={{ background:'none', border:'none', cursor:'pointer', color:'#dc2626', fontSize:14, padding:'2px' }}>🗑</button>
                    </>
                  )}
                </div>
              </div>
              <h4 style={{ fontWeight:600, color:'#0a1628', fontSize:'1rem', lineHeight:1.4, marginBottom: isOpen ? 10 : 0 }}>{upd.title}</h4>
              {isOpen && <p style={{ color:'#6b7280', fontSize:13.5, lineHeight:1.75, marginTop:8 }}>{upd.content}</p>}
              <div style={{ marginTop:10, fontSize:11.5, color:cfg.color, fontWeight:500 }}>{isOpen ? '▴ Less' : '▾ Read more'}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UpdatesSection;
