// =============================================================================
// src/components/Alumni/AlumniSection.jsx  — FINAL VERSION
// • Data comes from AdminContext (backend public API)
// • All users see cards; only admin sees edit/delete/add
// • Clicking any image opens fullscreen lightbox
// =============================================================================

import { useState, useRef, useCallback } from 'react';
import { useAdmin } from '../../context/AdminContext';

const CATEGORIES = [
  { id:'all',      label:'All Alumni' },
  { id:'faculty',  label:'🎓 Faculty' },
  { id:'industry', label:'🏢 Industry' },
  { id:'research', label:'🔬 Research' },
];
const CAT_COLORS = {
  faculty:  { bg:'#dbeafe', color:'#1e40af' },
  industry: { bg:'#dcfce7', color:'#166534' },
  research: { bg:'#ede9fe', color:'#5b21b6' },
};

const AlumniSection = () => {
  const admin = useAdmin();
  if (!admin) return null;

  const { isAdmin, alumni, addAlumni, updateAlumni, removeAlumni } = admin;
  const [filter,    setFilter]    = useState('all');
  const [selected,  setSelected]  = useState(null);
  const [lightImg,  setLightImg]  = useState(null);  // fullscreen image
  const [showForm,  setShowForm]  = useState(false);
  const [editItem,  setEditItem]  = useState(null);
  const [dragOver,  setDragOver]  = useState(false);
  const [saving,    setSaving]    = useState(false);
  const fileRef = useRef();

  const emptyForm = { name:'', batch:String(new Date().getFullYear()), degree:'', institution:'', currentRole:'', achievement:'', img:'', category:'industry', linkedIn:'' };
  const [form,       setForm]       = useState(emptyForm);
  const [previewImg, setPreviewImg] = useState('');

  const filtered = filter === 'all' ? alumni : alumni.filter(a => a.category === filter);

  const handleImageFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const BASE_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      const imageUrl = data.data;

      console.log("Cloudinary URL:", imageUrl);

      setPreviewImg(imageUrl);
      setForm(f => ({ ...f, img: imageUrl }));

    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  const openAdd = () => {
    setEditItem(null); setForm(emptyForm); setPreviewImg(''); setShowForm(true);
  };
  const openEdit = (item, e) => {
    e.stopPropagation();
    setEditItem(item); setForm({ ...item }); setPreviewImg(item.img || ''); setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editItem) await updateAlumni(editItem.id, form);
      else          await addAlumni(form);
      setShowForm(false); setEditItem(null); setForm(emptyForm); setPreviewImg('');
    } catch (e) { alert('Save failed: ' + e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Remove this alumni?')) return;
    await removeAlumni(id);
    if (selected?.id === id) setSelected(null);
  };

  const inputStyle = {
    width:'100%', padding:'9px 14px', border:'1px solid #e5e4e0', borderRadius:10,
    fontFamily:'Outfit, sans-serif', fontSize:13.5, background:'#fff', color:'#050d1a',
    outline:'none', boxSizing:'border-box',
  };

  return (
    <section style={{ padding:'90px 80px', background:'#0a1628' }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:52, flexWrap:'wrap', gap:16 }}>
        <div>
          <div className="section-label" style={{ color:'#e8b84b' }}>Alumni Showcase</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:700, color:'#fff' }}>
            Our Achievers &amp; Their Stories
          </h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, marginTop:10, maxWidth:500, fontFamily:'Outfit, sans-serif', lineHeight:1.7 }}>
            Scholars, researchers, and professionals who built their careers with UBT Technology.
          </p>
        </div>
        {isAdmin && (
          <button onClick={openAdd} style={{ padding:'11px 24px', borderRadius:10, background:'linear-gradient(135deg,#e8b84b,#fcd34d)', color:'#050d1a', border:'none', cursor:'pointer', fontWeight:700, fontSize:13.5, fontFamily:'Outfit, sans-serif' }}>
            + Add Alumni
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div style={{ display:'flex', gap:8, marginBottom:36, flexWrap:'wrap' }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setFilter(c.id)} style={{
            padding:'8px 18px', borderRadius:999, cursor:'pointer',
            border: filter===c.id ? 'none' : '1px solid rgba(255,255,255,0.15)',
            background: filter===c.id ? 'linear-gradient(135deg,#e8b84b,#fcd34d)' : 'rgba(255,255,255,0.06)',
            color: filter===c.id ? '#050d1a' : 'rgba(255,255,255,0.7)',
            fontWeight: filter===c.id ? 700 : 500, fontSize:13, fontFamily:'Outfit, sans-serif',
          }}>{c.label}</button>
        ))}
        <span style={{ marginLeft:'auto', color:'rgba(255,255,255,0.3)', fontSize:13, fontFamily:'Outfit, sans-serif', alignSelf:'center' }}>{filtered.length} alumni</span>
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:22 }}>
        {filtered.map(a => {
          const cs = CAT_COLORS[a.category] || CAT_COLORS.industry;
          return (
            <div key={a.id} onClick={() => setSelected(a)} style={{
              background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:18, overflow:'hidden', cursor:'pointer', transition:'all 0.3s', position:'relative',
            }}
              onMouseEnter={e => { e.currentTarget.style.border='1px solid rgba(232,184,75,0.3)'; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.border='1px solid rgba(255,255,255,0.08)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
            >
              {/* Image */}
              <div style={{ position:'relative', height:220, overflow:'hidden' }}
                onClick={e => { e.stopPropagation(); setLightImg(a.img); }}>
                <img src={a.img || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500'}
                  alt={a.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform='none'}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(5,13,26,0.85) 0%,transparent 60%)' }} />
                <div style={{ position:'absolute', top:14, left:14 }}>
                  <span style={{ background:cs.bg, color:cs.color, fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:999, textTransform:'uppercase', letterSpacing:'0.06em' }}>{a.category}</span>
                </div>
                {/* 🔍 View full image hint */}
                <div style={{ position:'absolute', top:14, right:isAdmin?88:14, background:'rgba(0,0,0,0.5)', color:'#fff', fontSize:10, padding:'3px 8px', borderRadius:6 }}>🔍 Full view</div>
                {isAdmin && (
                  <div style={{ position:'absolute', top:12, right:12, display:'flex', gap:6 }} onClick={e => e.stopPropagation()}>
                    <button onClick={e => openEdit(a, e)} style={{ background:'rgba(232,184,75,0.9)', border:'none', color:'#050d1a', width:30, height:30, borderRadius:'50%', fontSize:13, cursor:'pointer', fontWeight:700 }}>✏</button>
                    <button onClick={e => handleDelete(a.id, e)} style={{ background:'rgba(220,38,38,0.85)', border:'none', color:'#fff', width:30, height:30, borderRadius:'50%', fontSize:13, cursor:'pointer' }}>🗑</button>
                  </div>
                )}
                <div style={{ position:'absolute', bottom:14, left:18, right:18 }}>
                  <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.2rem', fontWeight:700, color:'#fff' }}>{a.name}</div>
                  <div style={{ fontSize:11.5, color:'rgba(255,255,255,0.65)', marginTop:2, fontFamily:'Outfit, sans-serif' }}>{a.degree}</div>
                </div>
              </div>
              {/* Card body */}
              <div style={{ padding:'18px 20px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:'#e8b84b', flexShrink:0 }} />
                  <span style={{ fontSize:13, color:'rgba(255,255,255,0.8)', fontFamily:'Outfit, sans-serif', fontWeight:500 }}>{a.currentRole}</span>
                </div>
                <p style={{ fontSize:12.5, color:'rgba(255,255,255,0.45)', lineHeight:1.65, fontFamily:'Outfit, sans-serif', margin:0, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {a.achievement}
                </p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14 }}>
                  <span style={{ fontSize:11, color:'#e8b84b', fontFamily:'Outfit, sans-serif', fontWeight:600 }}>Batch {a.batch} · {a.institution}</span>
                  <span style={{ fontSize:11.5, color:'rgba(255,255,255,0.3)', fontFamily:'Outfit, sans-serif' }}>View profile →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'60px 0', color:'rgba(255,255,255,0.3)' }}>
          <div style={{ fontSize:48, marginBottom:14 }}>🎓</div>
          <p style={{ fontFamily:'Outfit, sans-serif' }}>No alumni in this category yet.{isAdmin ? ' Click + Add Alumni above.' : ''}</p>
        </div>
      )}

      {/* ── Fullscreen image lightbox ── */}
      {lightImg && (
        <div style={{ position:'fixed', inset:0, zIndex:4000, background:'rgba(0,0,0,0.97)', display:'flex', alignItems:'center', justifyContent:'center' }}
          onClick={() => setLightImg(null)}>
          <img src={lightImg} alt="Full view" style={{ maxWidth:'90vw', maxHeight:'90vh', objectFit:'contain', borderRadius:12 }} />
          <button onClick={() => setLightImg(null)} style={{ position:'absolute', top:20, right:20, background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', width:44, height:44, borderRadius:'50%', fontSize:20, cursor:'pointer' }}>✕</button>
        </div>
      )}

      {/* ── Alumni detail modal ── */}
      {selected && (
        <div style={{ position:'fixed', inset:0, zIndex:3000, background:'rgba(5,13,26,0.95)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
          onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:20, maxWidth:680, width:'100%', maxHeight:'90vh', overflowY:'auto' }}>
            <div style={{ position:'relative', height:280, overflow:'hidden', borderRadius:'20px 20px 0 0', cursor:'pointer' }}
              onClick={() => setLightImg(selected.img)}>
              <img src={selected.img || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700'}
                alt={selected.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(5,13,26,0.9) 0%,transparent 50%)' }} />
              <div style={{ position:'absolute', top:12, right:60, background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:11, padding:'4px 10px', borderRadius:6 }}>🔍 Click for full view</div>
              <button onClick={e => { e.stopPropagation(); setSelected(null); }} style={{ position:'absolute', top:16, right:16, background:'rgba(5,13,26,0.6)', border:'none', color:'#fff', width:38, height:38, borderRadius:'50%', fontSize:16, cursor:'pointer' }}>✕</button>
              <div style={{ position:'absolute', bottom:20, left:24 }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.8rem', fontWeight:700, color:'#fff' }}>{selected.name}</div>
                <div style={{ color:'#e8b84b', fontSize:13, fontFamily:'Outfit, sans-serif', marginTop:4 }}>Batch {selected.batch} · {selected.institution}</div>
              </div>
            </div>
            <div style={{ padding:'28px 32px' }}>
              {[{ label:'Degree', val:selected.degree }, { label:'Current Role', val:selected.currentRole }, { label:'Key Achievement', val:selected.achievement }].map((row,i) => (
                <div key={i} style={{ marginBottom:18 }}>
                  <div style={{ fontSize:11, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:5 }}>{row.label}</div>
                  <div style={{ fontSize:14.5, color:'#050d1a', lineHeight:1.7, fontFamily:'Outfit, sans-serif' }}>{row.val}</div>
                </div>
              ))}
              {selected.linkedIn && selected.linkedIn !== '#' && (
                <a href={selected.linkedIn} target="_blank" rel="noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:8, background:'#0a66c2', color:'#fff', textDecoration:'none', fontWeight:600, fontSize:13, fontFamily:'Outfit, sans-serif' }}>
                  🔗 View LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Admin add/edit modal ── */}
      {isAdmin && showForm && (
        <div style={{ position:'fixed', inset:0, zIndex:3000, background:'rgba(5,13,26,0.96)', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
          onClick={() => setShowForm(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:20, maxWidth:680, width:'100%', maxHeight:'92vh', overflowY:'auto', padding:'36px 40px' }}>
            <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.6rem', color:'#050d1a', marginBottom:24 }}>
              {editItem ? '✏ Edit Alumni' : '+ Add New Alumni'}
            </h3>
            {/* Image upload */}
            <div style={{ marginBottom:22 }}>
              <label style={{ fontSize:11, fontWeight:600, color:'#374151', textTransform:'uppercase', letterSpacing:'0.08em', display:'block', marginBottom:8 }}>Photo</label>
              <div onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); handleImageFile(e.dataTransfer.files[0]); }}
                onClick={() => fileRef.current?.click()}
                style={{ border:`2px dashed ${dragOver?'#e8b84b':'#e5e4e0'}`, borderRadius:12, padding:20, textAlign:'center', background:dragOver?'#fffbeb':'#f8f7f4', cursor:'pointer', transition:'all 0.2s' }}>
                {previewImg
                  ? <img src={previewImg} alt="preview" style={{ width:120, height:120, objectFit:'cover', borderRadius:12, marginBottom:10 }} />
                  : <div style={{ fontSize:36, marginBottom:8 }}>📷</div>}
                <div style={{ fontSize:13, color:'#6b7280', fontFamily:'Outfit, sans-serif' }}>{previewImg ? 'Click to change' : 'Click to browse or drag & drop'}</div>
                <button type="button" onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}
                  style={{ marginTop:12, padding:'8px 20px', borderRadius:8, background:'#050d1a', color:'#e8b84b', border:'none', cursor:'pointer', fontWeight:600, fontSize:13, fontFamily:'Outfit, sans-serif' }}>
                  📁 Browse Photo
                </button>
                <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={e => handleImageFile(e.target.files[0])} />
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:10 }}>
                <div style={{ flex:1, height:1, background:'#e5e4e0' }} />
                <span style={{ fontSize:11.5, color:'#9ca3af' }}>OR paste URL</span>
                <div style={{ flex:1, height:1, background:'#e5e4e0' }} />
              </div>
              <input style={{ ...inputStyle, marginTop:8 }} placeholder="https://example.com/photo.jpg"
                value={form.img?.startsWith('data:') ? '' : (form.img||'')}
                onChange={e => { setForm(f => ({ ...f, img:e.target.value })); setPreviewImg(e.target.value); }} />
            </div>
            {/* Fields */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
              {[
                { k:'name',        label:'Full Name *',   ph:'Dr. / Mr. / Ms.' },
                { k:'batch',       label:'Batch Year',    ph:'2024' },
                { k:'degree',      label:'Degree *',      ph:'PhD — Computer Science' },
                { k:'institution', label:'Institution',   ph:'IIT Bombay' },
                { k:'currentRole', label:'Current Role',  ph:'Data Scientist, Google' },
                { k:'linkedIn',    label:'LinkedIn URL',  ph:'https://linkedin.com/in/...' },
              ].map(f => (
                <div key={f.k}>
                  <label style={{ fontSize:11, fontWeight:600, color:'#374151', textTransform:'uppercase', letterSpacing:'0.08em', display:'block', marginBottom:5 }}>{f.label}</label>
                  <input style={inputStyle} placeholder={f.ph} value={form[f.k]||''} onChange={e => setForm(p => ({ ...p, [f.k]:e.target.value }))} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ fontSize:11, fontWeight:600, color:'#374151', textTransform:'uppercase', letterSpacing:'0.08em', display:'block', marginBottom:5 }}>Category</label>
              <select style={{ ...inputStyle, cursor:'pointer' }} value={form.category} onChange={e => setForm(p => ({ ...p, category:e.target.value }))}>
                <option value="faculty">Faculty / Academia</option>
                <option value="industry">Industry / Corporate</option>
                <option value="research">Research / Government</option>
              </select>
            </div>
            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:11, fontWeight:600, color:'#374151', textTransform:'uppercase', letterSpacing:'0.08em', display:'block', marginBottom:5 }}>Achievement / Description *</label>
              <textarea rows={4} style={{ ...inputStyle, resize:'vertical', lineHeight:1.65 }}
                placeholder="Key achievements, awards, publications..."
                value={form.achievement||''} onChange={e => setForm(p => ({ ...p, achievement:e.target.value }))} />
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={handleSave} disabled={saving} style={{ flex:1, padding:'13px', borderRadius:10, background:'linear-gradient(135deg,#050d1a,#0a1628)', color:'#e8b84b', border:'none', cursor:'pointer', fontWeight:700, fontSize:14, fontFamily:'Outfit, sans-serif', opacity:saving?0.7:1 }}>
                {saving ? '⏳ Saving...' : (editItem ? '💾 Save Changes' : '✅ Add Alumni')}
              </button>
              <button onClick={() => setShowForm(false)} style={{ padding:'13px 24px', borderRadius:10, background:'#f1f0ed', color:'#6b7280', border:'none', cursor:'pointer', fontWeight:500, fontSize:14, fontFamily:'Outfit, sans-serif' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AlumniSection;
