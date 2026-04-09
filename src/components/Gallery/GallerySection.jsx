// =============================================================================
// src/components/Gallery/GallerySection.jsx
// UPDATED — admin can browse local files + drag-and-drop + paste URL
// =============================================================================

import { useState, useRef, useCallback } from 'react';
import { useAdmin } from '../../context/AdminContext';

const CATS = [
  { id: 'all',           label: 'All' },
  { id: 'college-visit', label: '🎓 College Visits' },
  { id: 'student-project', label: '🔬 Student Projects' },
];

// ─── Cloudinary URL File ────────────────────────────────────────────────────────────
const uploadToCloud = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const BASE_URL = import.meta.env.VITE_API_URL;

    const res = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Upload failed");
    }

    return data.data; // Cloudinary URL

  } catch (err) {
    console.error(err);
    alert("Upload failed: " + err.message);
  }
};

const GallerySection = () => {
  const { gallery, isAdmin, addGalleryItem, removeGalleryItem } = useAdmin();
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm]     = useState({ category: 'college-visit', title: '', img: '' });
  const [previewImg, setPreviewImg] = useState('');
  const [dragOver, setDragOver]     = useState(false);
  const [uploading, setUploading]   = useState(false);
  const fileRef = useRef();

  const filtered = active === 'all' ? gallery : gallery.filter(g => g.category === active);

  // ── Image file handler ──────────────────────────────────────────────────────
  const handleImageFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    try {
      setUploading(true);

      const imageUrl = await uploadToCloud(file);

      setPreviewImg(imageUrl);
      setForm(f => ({ ...f, img: imageUrl }));

    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleImageFile(e.dataTransfer.files[0]);
  }, [handleImageFile]);

  // ── Add item ────────────────────────────────────────────────────────────────
  const handleAdd = () => {
    if (!form.title || !form.img) return;
    addGalleryItem({ ...form, date: new Date().toISOString().slice(0, 10) });
    setForm({ category: 'college-visit', title: '', img: '' });
    setPreviewImg('');
    setShowUpload(false);
  };

  const resetForm = () => {
    setForm({ category: 'college-visit', title: '', img: '' });
    setPreviewImg('');
    setShowUpload(false);
  };

  // Lightbox nav
  const prev = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightbox(i => (i + 1) % filtered.length);

  return (
    <section style={{ padding: '90px 80px', background: '#f8f7f4' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="section-label">Gallery</div>
          <h2 className="section-title">Campus Visits &amp; Student Achievements</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {CATS.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              padding: '8px 18px', borderRadius: 999,
              border: active === c.id ? 'none' : '1.5px solid #e5e4e0',
              background: active === c.id ? 'linear-gradient(135deg, #e8b84b, #fcd34d)' : '#fff',
              color: active === c.id ? '#050d1a' : '#6b7280',
              fontWeight: active === c.id ? 700 : 500,
              fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
            }}>{c.label}</button>
          ))}
          {isAdmin && (
            <button onClick={() => setShowUpload(!showUpload)} style={{
              padding: '8px 20px', borderRadius: 999,
              background: showUpload ? '#dc2626' : '#050d1a', color: '#e8b84b',
              border: 'none', fontWeight: 600, fontSize: 13,
              cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
            }}>
              {showUpload ? '✕ Close' : '+ Upload Photo'}
            </button>
          )}
        </div>
      </div>

      {/* ── Admin upload panel ── */}
      {isAdmin && showUpload && (
        <div style={{
          background: '#fff', border: '1px solid #e5e4e0',
          borderRadius: 20, padding: '32px', marginBottom: 36,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', marginBottom: 24, color: '#050d1a' }}>
            Upload Gallery Photo
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 28, alignItems: 'start' }}>

            {/* Left: drag/drop zone */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                Photo *
              </label>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? '#e8b84b' : '#d1d5db'}`,
                  borderRadius: 14, padding: '28px 20px', textAlign: 'center',
                  background: dragOver ? '#fffbeb' : '#f8f7f4',
                  cursor: 'pointer', transition: 'all 0.2s',
                  minHeight: 180, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                {uploading ? (
                  <div style={{ fontSize: 13, color: '#6b7280' }}>Processing image...</div>
                ) : previewImg ? (
                  <img src={previewImg} alt="preview" style={{ width: '100%', maxHeight: 140, objectFit: 'cover', borderRadius: 10 }} />
                ) : (
                  <>
                    <div style={{ fontSize: 40 }}>🖼️</div>
                    <div style={{ fontSize: 13, color: '#6b7280', fontFamily: 'Outfit, sans-serif' }}>
                      Drag & drop or click to browse
                    </div>
                    <div style={{ fontSize: 11.5, color: '#9ca3af' }}>JPG, PNG, WEBP, GIF · Max 10MB</div>
                  </>
                )}
              </div>

              {/* Browse button */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                style={{
                  width: '100%', marginTop: 10,
                  padding: '10px', borderRadius: 10,
                  background: '#050d1a', color: '#e8b84b',
                  border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: 13.5, fontFamily: 'Outfit, sans-serif',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                📁 Browse from Computer
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={e => handleImageFile(e.target.files[0])}
              />

              {/* OR URL */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0 8px' }}>
                <div style={{ flex: 1, height: 1, background: '#e5e4e0' }} />
                <span style={{ fontSize: 11.5, color: '#9ca3af', fontFamily: 'Outfit, sans-serif' }}>OR paste URL</span>
                <div style={{ flex: 1, height: 1, background: '#e5e4e0' }} />
              </div>
              <input
                className="form-input"
                placeholder="https://images.unsplash.com/..."
                value={form.img?.startsWith('data:') ? '' : (form.img || '')}
                onChange={e => {
                  setForm(f => ({ ...f, img: e.target.value }));
                  setPreviewImg(e.target.value);
                }}
              />
            </div>

            {/* Right: metadata fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Category</label>
                <select
                  className="form-input"
                  style={{ cursor: 'pointer' }}
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  <option value="college-visit">College Visit</option>
                  <option value="student-project">Student Project</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>
                  Title / Caption *
                </label>
                <input
                  className="form-input"
                  placeholder="e.g. VNIT Lab Tour — March 2025"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
              </div>

              {/* Preview */}
              {previewImg && (
                <div style={{
                  border: '1px solid #e5e4e0', borderRadius: 12, overflow: 'hidden',
                }}>
                  <img src={previewImg} alt="preview" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                  <div style={{ padding: '10px 14px', background: '#f8f7f4' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{form.title || 'Untitled'}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>Preview</div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                <button
                  onClick={handleAdd}
                  disabled={!form.title || !form.img}
                  style={{
                    flex: 1, padding: '12px', borderRadius: 10,
                    background: form.title && form.img ? 'linear-gradient(135deg, #050d1a, #0a1628)' : '#e5e4e0',
                    color: form.title && form.img ? '#e8b84b' : '#9ca3af',
                    border: 'none', cursor: form.title && form.img ? 'pointer' : 'not-allowed',
                    fontWeight: 700, fontSize: 14, fontFamily: 'Outfit, sans-serif',
                  }}>
                  ✅ Add to Gallery
                </button>
                <button onClick={resetForm} style={{
                  padding: '12px 20px', borderRadius: 10,
                  background: '#f1f0ed', color: '#6b7280',
                  border: 'none', cursor: 'pointer',
                  fontWeight: 500, fontSize: 14, fontFamily: 'Outfit, sans-serif',
                }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Gallery grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
        {filtered.map((item, idx) => (
          <div key={item.id} className="card animate-scale-in" style={{
            position: 'relative', cursor: 'pointer', overflow: 'hidden',
            animationDelay: `${(idx % 8) * 0.06}s`,
          }}
            onClick={() => setLightbox(idx)}
          >
            <div style={{ position: 'relative', paddingBottom: '65%', overflow: 'hidden' }}>
              <img src={item.img} alt={item.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,13,26,0.75) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', top: 12, left: 12 }}>
                <span style={{
                  background: item.category === 'college-visit' ? '#2563eb' : '#059669',
                  color: '#fff', fontSize: 10, fontWeight: 700,
                  padding: '3px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>{item.category === 'college-visit' ? 'College Visit' : 'Student Project'}</span>
              </div>
            </div>
            <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#0a1628' }}>{item.title}</div>
                <div style={{ fontSize: 11.5, color: '#9ca3af', marginTop: 2 }}>{item.date}</div>
              </div>
              {isAdmin && (
                <button onClick={e => { e.stopPropagation(); removeGalleryItem(item.id); }} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#dc2626', fontSize: 16, padding: '4px', borderRadius: 6,
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >🗑</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
          <p style={{ fontFamily: 'Outfit, sans-serif' }}>No images yet. {isAdmin ? 'Upload some above!' : 'Check back soon.'}</p>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(5,13,26,0.96)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease',
        }} onClick={() => setLightbox(null)}>
          <button onClick={e => { e.stopPropagation(); prev(); }} style={{
            position: 'absolute', left: 24, background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', width: 48, height: 48, borderRadius: '50%', fontSize: 22, cursor: 'pointer',
          }}>‹</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 860, width: '90%' }}>
            <img src={filtered[lightbox]?.img} alt={filtered[lightbox]?.title}
              style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 12 }} />
            <div style={{ textAlign: 'center', marginTop: 16, color: '#fff', fontSize: 15, fontWeight: 500, fontFamily: 'Outfit, sans-serif' }}>
              {filtered[lightbox]?.title}
              <span style={{ color: '#e8b84b', marginLeft: 12, fontSize: 12 }}>{lightbox + 1} / {filtered.length}</span>
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); next(); }} style={{
            position: 'absolute', right: 24, background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', width: 48, height: 48, borderRadius: '50%', fontSize: 22, cursor: 'pointer',
          }}>›</button>
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none',
            color: '#fff', width: 40, height: 40, borderRadius: '50%', fontSize: 18, cursor: 'pointer',
          }}>✕</button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
