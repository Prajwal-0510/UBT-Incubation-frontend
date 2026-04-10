// AdminContext.jsx — FIXED: images upload to backend first, persist after logout
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, galleryApi, projectsApi, updatesApi, alumniApi, uploadImage } from '../services/api';

const AdminContext = createContext(null);
export const useAdmin = () => useContext(AdminContext);

// Seed data shown when backend is offline
const SEED_GALLERY  = [
  { id:1, category:'college-visit',   title:'IIT Nagpur Campus Visit',  img:'https://images.unsplash.com/photo-1562774053-701939374585?w=600', date:'2024-03-15' },
  { id:2, category:'student-project', title:'AI Attendance System',     img:'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600', date:'2024-03-01' },
];
const SEED_PROJECTS = [
  { id:1, title:'Smart Parking System', domain:'IoT', level:'BE/BTech', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', desc:'IoT-based parking system.', tech:['Arduino','Firebase'], duration:'4 months', date:'2024-03' },
];
const SEED_UPDATES  = [
  { id:1, type:'announcement', title:'New PhD Batch — April 2025', content:'Enroll now for our upcoming PhD guidance batch starting April 15.', date:'2025-03-28', pinned:true },
  { id:2, type:'achievement',  title:'50 Scopus Publications!',    content:'UBT TECHNOLOGY announces 50 Scopus-indexed publications in Q1 2025.', date:'2025-03-20', pinned:false },
];
const SEED_ALUMNI   = [
  { id:1, name:'Dr. Priya Sharma', batch:'2022', degree:'PhD — Computer Science', institution:'IIT Bombay', currentRole:'Assistant Professor, VNIT Nagpur', achievement:'Published 5 Scopus Q1 papers.', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500', category:'faculty', linkedIn:'#' },
  { id:2, name:'Rahul Mishra',     batch:'2023', degree:'MTech — AI & Data Science', institution:'IIT Bombay', currentRole:'Senior Data Scientist, TCS Research', achievement:'IEEE Best Paper Award ICML 2023.', img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500', category:'industry', linkedIn:'#' },
];

const today = () => new Date().toISOString().slice(0,10);
const month = () => new Date().toISOString().slice(0,7);

export const AdminProvider = ({ children }) => {
  const [isAdmin,       setIsAdmin]       = useState(false);
  const [gallery,       setGallery]       = useState([]);
  const [projects,      setProjects]      = useState([]);
  const [updates,       setUpdates]       = useState([]);
  const [alumni,        setAlumni]        = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [backendOnline, setBackendOnline] = useState(false);

  // Verify token on mount
  useEffect(() => {
    if (authApi.isLoggedIn()) {
      authApi.verify().then(() => setIsAdmin(true)).catch(() => { authApi.logout(); setIsAdmin(false); });
    }
  }, []);

  // Load ALL data publicly on mount (no login needed)
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [gRes, pRes, uRes, aRes] = await Promise.all([
        galleryApi.getAll(), projectsApi.getAll(), updatesApi.getAll(), alumniApi.getAll(),
      ]);
      if (gRes?.data)  setGallery(gRes.data);
      if (pRes?.data)  setProjects(pRes.data);
      if (uRes?.data)  setUpdates(uRes.data);
      if (aRes?.data)  setAlumni(aRes.data);
      setBackendOnline(true);
      console.log('✅ Backend connected — data loaded from database.');
    } catch (err) {
      console.warn('⚠️ Backend offline — using seed data. Error:', err.message);
      setBackendOnline(false);
      setGallery(SEED_GALLERY);
      setProjects(SEED_PROJECTS);
      setUpdates(SEED_UPDATES);
      setAlumni(SEED_ALUMNI);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Auth
  const login = async (password) => {
    try { await authApi.login(password); setIsAdmin(true); return true; }
    catch { return false; }
  };
  const logout = () => { authApi.logout(); setIsAdmin(false); fetchAll(); };

  // ── Image Upload Helper ────────────────────────────────────────────
  // Uploads file to backend (Cloudinary) → returns permanent URL
  // Falls back to base64 if backend upload fails
  const uploadToCloud = async (fileOrBase64) => {
    if (!fileOrBase64) return '';
    // If it's already a URL (not base64), use as-is
    if (typeof fileOrBase64 === 'string' && !fileOrBase64.startsWith('data:')) {
      return fileOrBase64;
    }
    // If it's a File object, upload to backend
    if (fileOrBase64 instanceof File) {
      try {
        const url = await uploadImage(fileOrBase64);
        return url;
      } catch (e) {
        console.warn('Cloud upload failed, using base64:', e.message);
        // Convert file to base64 as fallback
        return new Promise((res) => {
          const r = new FileReader();
          r.onload = e => res(e.target.result);
          r.readAsDataURL(fileOrBase64);
        });
      }
    }
    // Already base64
    return fileOrBase64;
  };

  // ── Gallery ────────────────────────────────────────────────────────
  const addGalleryItem = async (item, imageFile) => {
    let imgUrl = item.img;
    // If a File was passed, upload it first to get a permanent URL
    if (imageFile instanceof File) {
      imgUrl = await uploadToCloud(imageFile);
    }
    const payload = { ...item, img: imgUrl, date: item.date || today() };
    if (backendOnline) {
      try {
        const res = await galleryApi.add(payload);
        setGallery(prev => [res.data, ...prev]);
      } catch (e) {
        console.error('Gallery add failed:', e.message);
        throw e;
      }
    } else {
      setGallery(prev => [{ ...payload, id: Date.now() }, ...prev]);
    }
  };
  const removeGalleryItem = async (id) => {
    if (backendOnline) await galleryApi.remove(id);
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // ── Projects ───────────────────────────────────────────────────────
  const addProject = async (proj, imageFile) => {
    let imgUrl = proj.img;
    if (imageFile instanceof File) imgUrl = await uploadToCloud(imageFile);
    const payload = { ...proj, img: imgUrl, tech: proj.tech || [], date: proj.date || month() };
    if (backendOnline) {
      try {
        const res = await projectsApi.add(payload);
        setProjects(prev => [res.data, ...prev]);
      } catch (e) { console.error('Project add failed:', e.message); throw e; }
    } else {
      setProjects(prev => [{ ...payload, id: Date.now() }, ...prev]);
    }
  };
  const removeProject = async (id) => {
    if (backendOnline) await projectsApi.remove(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // ── Updates ────────────────────────────────────────────────────────
  const addUpdate = async (upd) => {
    const payload = { ...upd, date: upd.date || today(), pinned: upd.pinned || false };
    if (backendOnline) {
      try {
        const res = await updatesApi.add(payload);
        setUpdates(prev => [res.data, ...prev]);
      } catch (e) { console.error('Update add failed:', e.message); throw e; }
    } else {
      setUpdates(prev => [{ ...payload, id: Date.now() }, ...prev]);
    }
  };
  const removeUpdate = async (id) => {
    if (backendOnline) await updatesApi.remove(id);
    setUpdates(prev => prev.filter(u => u.id !== id));
  };
  const togglePin = async (id) => {
    if (backendOnline) {
      try { const res = await updatesApi.togglePin(id); setUpdates(prev => prev.map(u => u.id===id ? res.data : u)); }
      catch { setUpdates(prev => prev.map(u => u.id===id ? { ...u, pinned: !u.pinned } : u)); }
    } else {
      setUpdates(prev => prev.map(u => u.id===id ? { ...u, pinned: !u.pinned } : u));
    }
  };

  // ── Alumni ─────────────────────────────────────────────────────────
  const addAlumni = async (data, imageFile) => {
    let imgUrl = data.img;
    if (imageFile instanceof File) imgUrl = await uploadToCloud(imageFile);
    const payload = { ...data, img: imgUrl };
    if (backendOnline) {
      try { const res = await alumniApi.add(payload); setAlumni(prev => [res.data, ...prev]); }
      catch (e) { console.error('Alumni add failed:', e.message); throw e; }
    } else {
      setAlumni(prev => [{ ...payload, id: Date.now() }, ...prev]);
    }
  };
  const updateAlumni = async (id, data, imageFile) => {
    let imgUrl = data.img;
    if (imageFile instanceof File) imgUrl = await uploadToCloud(imageFile);
    const payload = { ...data, img: imgUrl };
    if (backendOnline) {
      try { const res = await alumniApi.update(id, payload); setAlumni(prev => prev.map(a => a.id===id ? res.data : a)); }
      catch (e) { console.error('Alumni update failed:', e.message); throw e; }
    } else {
      setAlumni(prev => prev.map(a => a.id===id ? { ...a, ...payload } : a));
    }
  };
  const removeAlumni = async (id) => {
    if (backendOnline) await alumniApi.remove(id);
    setAlumni(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      isAdmin, login, logout, loading, backendOnline,
      gallery,  addGalleryItem, removeGalleryItem,
      projects, addProject,     removeProject,
      updates,  addUpdate,      removeUpdate,  togglePin,
      alumni,   addAlumni,      updateAlumni,  removeAlumni,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
