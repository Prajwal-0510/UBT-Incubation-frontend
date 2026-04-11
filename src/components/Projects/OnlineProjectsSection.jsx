// =============================================================================
// src/components/Projects/OnlineProjectsSection.jsx
// UPDATED — admin can browse local files for project images
// =============================================================================

import { useState, useRef, useCallback } from 'react';
import { useAdmin } from '../../context/AdminContext';

const levelColors = {
  'PhD R&D':     '#7c3aed',
  'ME/MTech':    '#2563eb',
  'BE/BTech':    '#059669',
  'MBA Projects':'#dc2626',
};

// ───Cloud Upload File ────────────────────────────────────────────────────────────
const uploadToCloud = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('ubt_admin_token');

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Upload failed");
  }
  return data.data;
};

// ─── Project card component ────────────────────────────────────────────────────
const ProjectCard = ({ proj, onClick }) => (
  <div className="card animate-fade-up" style={{
    cursor: 'pointer', overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
  }}
    onClick={onClick}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(5,13,26,0.14)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = ''; }}
  >
    <div style={{ position: 'relative', paddingBottom: '58%', overflow: 'hidden' }}>
      <img src={proj.img || 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600'}
        alt={proj.title}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'none'}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,13,26,0.7) 0%, transparent 55%)' }} />
      <div style={{ position: 'absolute', top: 14, left: 14 }}>
        <span style={{ background: levelColors[proj.level] || '#6b7280', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 11px', borderRadius: 999 }}>
          {proj.level}
        </span>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 18px' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>{proj.domain}</div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{proj.title}</div>
      </div>
    </div>
    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {proj.tech?.slice(0, 3).map((t, i) => (
          <span key={i} style={{ background: '#f1f0ed', color: '#374151', fontSize: 11, padding: '3px 10px', borderRadius: 999, fontWeight: 500 }}>{t}</span>
        ))}
      </div>
      <span style={{ fontSize: 12, color: '#9ca3af' }}>⏱ {proj.duration}</span>
    </div>
  </div>
);

// ─── Main section ──────────────────────────────────────────────────────────────
const OnlineProjectsSection = () => {
  const { projects, isAdmin, addProject, removeProject } = useAdmin();
  const [selected, setSelected]     = useState(null);
  const [filter, setFilter]         = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [previewImg, setPreviewImg] = useState('');
  const [dragOver, setDragOver]     = useState(false);
  const [uploading, setUploading]   = useState(false);
  const fileRef = useRef();

  const [form, setForm] = useState({
    title: '', domain: '', level: 'BE/BTech',
    img: '', desc: '', tech: '', duration: '',
  });

  const levels = ['all', ...Object.keys(levelColors)];
  const filtered = filter === 'all' ? projects : projects.filter(p => p.level === filter);

  // ── Image handler ──────────────────────────────────────────────────────────
  const handleImageFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Max 2MB allowed");
      return;
    }

    try {
      setUploading(true);

      const url = await uploadToCloud(file);

      setPreviewImg(url);
      setForm(f => ({ ...f, img: url }));

    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleImageFile(e.dataTransfer.files[0]);
  }, [handleImageFile]);

  // ── Add project ────────────────────────────────────────────────────────────
  const handleAdd = () => {
    if (!form.title) return;

    if (!form.img) {
      alert("Please upload an image first");
      return;
    }

    addProject({
      ...form,
      description: form.desc,
      tech: form.tech.split(',').map(t => t.trim()).filter(Boolean),
      date: new Date().toISOString().slice(0, 7),
    });

    setForm({ title: '', domain: '', level: 'BE/BTech', img: '', desc: '', tech: '', duration: '' });
    setPreviewImg('');
    setShowUpload(false);
  };

  const inputStyle = {
    width: '100%', padding: '9px 14px',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
    fontFamily: 'Outfit, sans-serif', fontSize: 13.5,
    background: 'rgba(255,255,255,0.07)', color: '#fff', outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <section style={{ padding: '90px 80px', background: '#050d1a' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="section-label" style={{ color: '#e8b84b' }}>Student Projects</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: '#fff' }}>
            Online Project Showcase
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {levels.map(lv => (
            <button key={lv} onClick={() => setFilter(lv)} style={{
              padding: '7px 16px', borderRadius: 999, cursor: 'pointer',
              background: filter === lv ? 'linear-gradient(135deg, #e8b84b, #fcd34d)' : 'rgba(255,255,255,0.07)',
              color: filter === lv ? '#050d1a' : 'rgba(255,255,255,0.7)',
              border: 'none', fontWeight: filter === lv ? 700 : 500,
              fontSize: 12.5, fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
            }}>{lv === 'all' ? 'All Levels' : lv}</button>
          ))}
          {isAdmin && (
            <button onClick={() => setShowUpload(!showUpload)} style={{
              padding: '7px 18px', borderRadius: 999,
              background: showUpload ? '#dc2626' : '#e8b84b', color: '#050d1a',
              border: 'none', fontWeight: 700, fontSize: 12.5,
              cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
            }}>
              {showUpload ? '✕ Close' : '+ Upload Project'}
            </button>
          )}
        </div>
      </div>

      {/* ── Admin upload form ── */}
      {isAdmin && showUpload && (
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,184,75,0.2)',
          borderRadius: 20, padding: '32px', marginBottom: 36,
        }}>
          <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', marginBottom: 24, color: '#fff' }}>Add New Project</h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28, alignItems: 'start' }}>

            {/* Left: image upload */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                Project Image
              </label>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? '#e8b84b' : 'rgba(255,255,255,0.2)'}`,
                  borderRadius: 14, padding: '24px 16px', textAlign: 'center',
                  background: dragOver ? 'rgba(232,184,75,0.08)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  minHeight: 160, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                {uploading ? (
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Processing...</div>
                ) : previewImg ? (
                  <img src={previewImg} alt="preview" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 10 }} />
                ) : (
                  <>
                    <div style={{ fontSize: 36 }}>🔬</div>
                    <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'Outfit, sans-serif' }}>
                      Drag & drop or click to browse
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>JPG, PNG, WEBP · Max 10MB</div>
                  </>
                )}
              </div>

              {/* Browse button */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                style={{
                  width: '100%', marginTop: 10, padding: '10px',
                  borderRadius: 10, background: 'rgba(232,184,75,0.15)',
                  color: '#e8b84b', border: '1px solid rgba(232,184,75,0.3)',
                  cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  fontFamily: 'Outfit, sans-serif',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                📁 Browse from Computer
              </button>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={e => handleImageFile(e.target.files[0])} />

              {/* OR URL */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '10px 0 8px' }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'Outfit, sans-serif' }}>OR URL</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
              </div>
              <input style={inputStyle} placeholder="https://..."
                value={form.img?.startsWith('data:') ? '' : (form.img || '')}
                onChange={e => { setForm(f => ({ ...f, img: e.target.value })); setPreviewImg(e.target.value); }}
              />
            </div>

            {/* Right: project details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { key: 'title',    label: 'Title *',        placeholder: 'Smart Parking System' },
                  { key: 'domain',   label: 'Domain',         placeholder: 'IoT / AI & ML' },
                  { key: 'duration', label: 'Duration',       placeholder: '6 months' },
                  { key: 'tech',     label: 'Technologies (comma separated)', placeholder: 'React, Python, Arduino' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>
                      {f.label}
                    </label>
                    <input style={inputStyle} placeholder={f.placeholder}
                      value={form[f.key]} onChange={e => setForm(f2 => ({ ...f2, [f.key]: e.target.value }))} />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>Level</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }}
                  value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))}>
                  {Object.keys(levelColors).map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>Description</label>
                <textarea rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
                  placeholder="Describe the project, methodology, and outcomes..."
                  value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={handleAdd} disabled={!form.title} style={{
                  flex: 1, padding: '12px', borderRadius: 10,
                  background: form.title ? 'linear-gradient(135deg, #e8b84b, #fcd34d)' : 'rgba(255,255,255,0.1)',
                  color: form.title ? '#050d1a' : 'rgba(255,255,255,0.3)',
                  border: 'none', cursor: form.title ? 'pointer' : 'not-allowed',
                  fontWeight: 700, fontSize: 14, fontFamily: 'Outfit, sans-serif',
                }}>✅ Add Project</button>
                <button onClick={() => { setShowUpload(false); setPreviewImg(''); setForm({ title: '', domain: '', level: 'BE/BTech', img: '', desc: '', tech: '', duration: '' }); }}
                  style={{ padding: '12px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Project grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
        {filtered.map((proj) => (
          <div key={proj.id} style={{ position: 'relative' }}>
            <ProjectCard proj={proj} onClick={() => setSelected(proj)} />
            {isAdmin && (
              <button onClick={() => removeProject(proj.id)} style={{
                position: 'absolute', top: 12, right: 12,
                background: 'rgba(220,38,38,0.85)', border: 'none',
                color: '#fff', width: 30, height: 30, borderRadius: '50%',
                fontSize: 13, cursor: 'pointer', zIndex: 10,
              }}>🗑</button>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔬</div>
          <p style={{ fontFamily: 'Outfit, sans-serif' }}>No projects found for this level.</p>
        </div>
      )}

      {/* ── Project detail modal ── */}
      {selected && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(5,13,26,0.94)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px', animation: 'fadeIn 0.2s ease',
        }} onClick={() => setSelected(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 20, maxWidth: 720, width: '100%',
            maxHeight: '90vh', overflowY: 'auto', animation: 'scaleIn 0.25s ease',
          }}>
            <div style={{ position: 'relative', height: 280, overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
              <img src={selected.img || 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=700'}
                alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,13,26,0.8), transparent 50%)' }} />
              <button onClick={() => setSelected(null)} style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(5,13,26,0.6)', border: 'none', color: '#fff',
                width: 38, height: 38, borderRadius: '50%', fontSize: 16, cursor: 'pointer',
              }}>✕</button>
              <div style={{ position: 'absolute', bottom: 20, left: 24 }}>
                <span style={{ background: levelColors[selected.level] || '#6b7280', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 999, marginBottom: 8, display: 'inline-block' }}>
                  {selected.level}
                </span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', color: '#fff', fontWeight: 700 }}>{selected.title}</h3>
              </div>
            </div>
            <div style={{ padding: '28px 32px' }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>🏷️ {selected.domain}</span>
                <span style={{ fontSize: 13, color: '#6b7280' }}>⏱ {selected.duration}</span>
                <span style={{ fontSize: 13, color: '#6b7280' }}>📅 {selected.date}</span>
              </div>
              <p style={{ color: '#374151', lineHeight: 1.8, marginBottom: 24, fontSize: 14.5 }}>{selected.desc}</p>
              {selected.tech?.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Technologies Used</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {selected.tech.map((t, i) => (
                      <span key={i} style={{ background: '#f1f0ed', color: '#374151', padding: '5px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 500 }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OnlineProjectsSection;
