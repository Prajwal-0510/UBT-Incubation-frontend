// =============================================================================
// src/context/AdminContext.jsx
// FIXED — connects to Spring Boot backend
// Falls back to seed data automatically if backend is offline
// =============================================================================

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi, galleryApi, projectsApi, updatesApi } from "../services/api";

const AdminContext = createContext(null);
export const useAdmin = () => useContext(AdminContext);

// ─── Seed fallback data (used if backend is offline) ──────────────────────────
const SEED_GALLERY = [
  { id: 1, category: "college-visit",  title: "IIT Nagpur Campus Visit",      img: "https://images.unsplash.com/photo-1562774053-701939374585?w=600", date: "2024-03-15" },
  { id: 2, category: "college-visit",  title: "VNIT Lab Tour",                img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600", date: "2024-02-20" },
  { id: 3, category: "college-visit",  title: "Symbiosis University Workshop", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600", date: "2024-01-10" },
  { id: 4, category: "student-project", title: "AI Attendance System",         img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600", date: "2024-03-01" },
  { id: 5, category: "student-project", title: "Smart Traffic Controller",     img: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600", date: "2024-02-15" },
  { id: 6, category: "student-project", title: "NLP Research Dashboard",       img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600", date: "2024-01-22" },
];

const SEED_PROJECTS = [
  { id: 1, title: "Smart Parking System using IoT",          domain: "IoT / Embedded", level: "BE/BTech",    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600", desc: "An IoT-based automated parking management system using RFID and ultrasonic sensors.", tech: ["Arduino","RFID","NodeMCU","Firebase"], duration: "4 months",  date: "2024-03" },
  { id: 2, title: "Deep Learning for Medical Image Analysis", domain: "AI & ML",        level: "PhD R&D",     img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600", desc: "A CNN-based deep learning model achieving 97.3% accuracy in detecting tumor regions.", tech: ["Python","TensorFlow","OpenCV","DICOM"], duration: "18 months", date: "2024-02" },
  { id: 3, title: "Blockchain-based Supply Chain Tracker",   domain: "Blockchain",     level: "ME/MTech",    img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600", desc: "Decentralized supply chain transparency platform built on Ethereum smart contracts.", tech: ["Solidity","React","Web3.js","IPFS"],    duration: "8 months",  date: "2024-01" },
  { id: 4, title: "NLP-based Resume Screening Tool",         domain: "NLP / AI",       level: "MBA Projects", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600", desc: "An intelligent HR tool using BERT and transformer models to automate resume screening.", tech: ["Python","BERT","FastAPI","PostgreSQL"], duration: "6 months",  date: "2023-12" },
];

const SEED_UPDATES = [
  { id: 1, type: "announcement", title: "New Batch for PhD Assistance Program — April 2025", content: "Enroll now for our upcoming PhD guidance batch starting April 15. Limited seats available.",  date: "2025-03-28", pinned: true  },
  { id: 2, type: "achievement",  title: "50 Scopus Publications Milestone Reached!",          content: "UBT TECHNOLOGY is proud to announce 50 successful Scopus-indexed publications in Q1 2025.",  date: "2025-03-20", pinned: false },
  { id: 3, type: "event",        title: "Free Webinar: How to Write a Scopus Paper",          content: "Join our free webinar on April 5th, 2025 covering structure, methodology, and submission.",   date: "2025-03-15", pinned: false },
  { id: 4, type: "news",         title: "UBT TECHNOLOGY Opens Ahilyanagar Branch Office",    content: "We are excited to announce our new branch in Ahilyanagar, Maharashtra from April 1, 2025.",  date: "2025-03-10", pinned: false },
];

// ─── Provider ──────────────────────────────────────────────────────────────────
export const AdminProvider = ({ children }) => {
  const [isAdmin,  setIsAdmin]  = useState(authApi.isLoggedIn());
  const [gallery,  setGallery]  = useState(SEED_GALLERY);
  const [projects, setProjects] = useState(SEED_PROJECTS);
  const [updates,  setUpdates]  = useState(SEED_UPDATES);
  const [loading,  setLoading]  = useState(false);
  const [alumni, setAlumni] = useState([]);
  const [backendOnline, setBackendOnline] = useState(false);

  // ── Fetch all data from backend ──────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [gRes, pRes, uRes, aRes] = await Promise.all([
        galleryApi.getAll(),
        projectsApi.getAll(),
        updatesApi.getAll(),
        fetch("http://localhost:8080/api/alumni").then(res => res.json())
      ]);

      // Only replace seed data if backend returned actual data
      if (gRes?.data)  setGallery(gRes.data);
      if (pRes?.data)  setProjects(pRes.data);
      if (uRes?.data)  setUpdates(uRes.data);
      if (aRes?.data) setAlumni(aRes.data);

      setBackendOnline(true);
      console.log("✅ Backend connected — data loaded from database.");
    } catch (err) {
      console.warn("⚠️ Backend offline — using seed data. Error:", err.message);
      setBackendOnline(false);
      // Keep seed data already in state — don't clear it
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── AUTH ──────────────────────────────────────────────────────────────────────
  const login = async (password) => {
    try {
      await authApi.login(password);    // POST /api/auth/login { password }
      setIsAdmin(true);
      await fetchAll();                 // Reload fresh data after login
      return true;
    } catch (err) {
      console.error("Login failed:", err.message);
      return false;
    }
  };

  const logout = () => {
    authApi.logout();
    setIsAdmin(false);
  };

  // ── GALLERY ───────────────────────────────────────────────────────────────────
  const addGalleryItem = async (item) => {
    try {
      if (!backendOnline) {
        // fallback (same as projects)
        setGallery(prev => [
          { ...item, id: Date.now(), date: new Date().toISOString().slice(0, 10) },
          ...prev
        ]);
        return;
      }

      const token = localStorage.getItem("ubt_admin_token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      const res = await fetch("http://localhost:8080/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(item),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add gallery item");
      }

      setGallery(prev => [data.data, ...prev]);

    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  const removeGalleryItem = async (id) => {
    if (backendOnline) {
      await galleryApi.remove(id);
    }
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // ── PROJECTS ──────────────────────────────────────────────────────────────────
  const addProject = async (proj) => {
    if (backendOnline) {
      const res = await projectsApi.add({
        ...proj,
        tech: proj.tech || [],
        date: proj.date || new Date().toISOString().slice(0, 7),
      });
      setProjects((prev) => [res.data, ...prev]);
    } else {
      setProjects((prev) => [{ ...proj, id: Date.now(), tech: proj.tech || [], date: proj.date || new Date().toISOString().slice(0, 7) }, ...prev]);
    }
  };

  const removeProject = async (id) => {
    if (backendOnline) {
      await projectsApi.remove(id);
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };
//-------Alumni--------------------------------------------------------------
const addAlumni = async (item) => {
  try {
    const token = localStorage.getItem("ubt_admin_token");

    const res = await fetch("http://localhost:8080/api/alumni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(item),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }

    setAlumni(prev => [data.data, ...prev]);

  } catch (err) {
    alert("Error: " + err.message);
  }
};

const removeAlumni = async (id) => {
  try {
    const token = localStorage.getItem("ubt_admin_token");

    await fetch(`http://localhost:8080/api/alumni/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    setAlumni(prev => prev.filter(a => a.id !== id));

  } catch (err) {
    alert("Delete failed");
  }
};
  // ── UPDATES ───────────────────────────────────────────────────────────────────
  const addUpdate = async (upd) => {
    if (backendOnline) {
      const res = await updatesApi.add({
        ...upd,
        date: upd.date || new Date().toISOString().slice(0, 10),
        pinned: upd.pinned || false,
      });
      setUpdates((prev) => [res.data, ...prev]);
    } else {
      setUpdates((prev) => [{ ...upd, id: Date.now(), date: new Date().toISOString().slice(0, 10), pinned: false }, ...prev]);
    }
  };

  const removeUpdate = async (id) => {
    if (backendOnline) {
      await updatesApi.remove(id);
    }
    setUpdates((prev) => prev.filter((u) => u.id !== id));
  };

  const togglePin = async (id) => {
    if (backendOnline) {
      const res = await updatesApi.togglePin(id);
      setUpdates((prev) => prev.map((u) => (u.id === id ? res.data : u)));
    } else {
      setUpdates((prev) => prev.map((u) => (u.id === id ? { ...u, pinned: !u.pinned } : u)));
    }
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,  login, logout,
      loading,  backendOnline,
      gallery,  addGalleryItem, removeGalleryItem,
      projects, addProject,     removeProject,
      updates,  addUpdate,      removeUpdate,      togglePin,
      alumni, addAlumni, removeAlumni
    }}>
      {children}
    </AdminContext.Provider>
  );
};
