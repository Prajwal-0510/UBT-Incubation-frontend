// ============================================================
// src/components/Admin/InquiriesPage.jsx
// FIXED — no duplicate style props, entries always visible
// Works with backend OR shows demo data if backend is offline
// ============================================================

import { useState, useEffect, useMemo } from 'react';

// ─── Demo data shown when backend is not yet running ─────────────────────────
const DEMO_DATA = [
  { id: 1, name: 'Rahul Verma',     email: 'rahul.verma@gmail.com',   phone: '+91 98765 43210', service: 'PhD Assistance',        message: 'I need help with my PhD topic selection in machine learning. Pursuing from Nagpur University.', status: 'NEW',         submittedAt: '2025-04-03T09:15:00' },
  { id: 2, name: 'Priya Sharma',    email: 'priya.sharma@vnit.ac.in', phone: '+91 87654 32109', service: 'Research Paper Writing',  message: 'Need to publish a Scopus Q1 paper on deep learning for medical imaging.',                      status: 'IN_PROGRESS', submittedAt: '2025-04-02T14:30:00' },
  { id: 3, name: 'Ajay Kulkarni',   email: 'ajay.k@gmail.com',        phone: '+91 76543 21098', service: 'Patent/Trademark',        message: 'I have invented a new IoT sensor for smart agriculture. Need patent filing guidance.',          status: 'NEW',         submittedAt: '2025-04-02T11:00:00' },
  { id: 4, name: 'Sneha Desai',     email: 'sneha.desai@pune.edu',    phone: '+91 65432 10987', service: 'Thesis Writing',          message: 'MTech thesis on blockchain security. Need complete chapter writing support.',                    status: 'RESOLVED',    submittedAt: '2025-04-01T16:45:00' },
  { id: 5, name: 'Mohammed Shaikh', email: 'm.shaikh@research.in',    phone: '+91 54321 09876', service: 'Publication Support',     message: 'Want to publish in IEEE Xplore. Have a paper on wireless sensor networks ready for review.',     status: 'IN_PROGRESS', submittedAt: '2025-03-31T10:20:00' },
  { id: 6, name: 'Ananya Joshi',    email: 'ananya.j@coep.ac.in',     phone: '',                service: 'AI Tools',                message: 'Interested in AI research writer and plagiarism checker for my BE final year project.',           status: 'NEW',         submittedAt: '2025-03-30T13:00:00' },
  { id: 7, name: 'Vikram Patil',    email: 'vikram.patil@iit.ac.in',  phone: '+91 43210 98765', service: 'Industrial Internship',   message: 'Looking for 6-month data science internship after completing BTech this year.',                  status: 'RESOLVED',    submittedAt: '2025-03-28T09:00:00' },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  NEW:         { label: 'New',         bg: '#dbeafe', color: '#1d4ed8', dot: '#3b82f6' },
  IN_PROGRESS: { label: 'In Progress', bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
  RESOLVED:    { label: 'Resolved',    bg: '#dcfce7', color: '#166534', dot: '#22c55e' },
  CLOSED:      { label: 'Closed',      bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' },
};

const SERVICE_COLORS = {
  'PhD Assistance':         '#2563eb',
  'Research Paper Writing': '#7c3aed',
  'Publication Support':    '#059669',
  'Patent/Trademark':       '#dc2626',
  'Thesis Writing':         '#ea580c',
  'AI Tools':               '#0891b2',
  'Industrial Internship':  '#d97706',
  'Web & App Development':  '#7c3aed',
};

const AVATAR_COLORS = [
  { bg: '#dbeafe', color: '#1e40af' },
  { bg: '#dcfce7', color: '#166534' },
  { bg: '#fef3c7', color: '#92400e' },
  { bg: '#fce7f3', color: '#9d174d' },
  { bg: '#ede9fe', color: '#5b21b6' },
  { bg: '#ffedd5', color: '#9a3412' },
];

// ─── Helper functions ─────────────────────────────────────────────────────────

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function fmtDate(dt) {
  if (!dt) return '—';
  return new Date(dt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function fmtTime(dt) {
  if (!dt) return '';
  return new Date(dt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

// ─── StatusBadge component ────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.CLOSED;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: cfg.bg, color: cfg.color,
      padding: '4px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}

// ─── MetricCard component ─────────────────────────────────────────────────────

function MetricCard({ value, label, color, sub }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e5e4e0',
      borderRadius: 16, padding: '22px 24px',
      boxShadow: '0 2px 8px rgba(10,22,40,0.04)',
    }}>
      <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 6, fontFamily: 'Outfit, sans-serif' }}>{label}</div>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 700, color: color || '#0a1628', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11.5, color: '#9ca3af', marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

// ─── Main InquiriesPage component ────────────────────────────────────────────

export default function InquiriesPage({ onNavigate }) {
  const [inquiries, setInquiries]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [isDemo, setIsDemo]         = useState(false);
  const [errorMsg, setErrorMsg]     = useState('');
  const [search, setSearch]         = useState('');
  const [filterStatus, setFilter]   = useState('ALL');
  const [filterService, setService] = useState('ALL');
  const [sortBy, setSortBy]         = useState('date_desc');
  const [expanded, setExpanded]     = useState(null);
  const [updating, setUpdating]     = useState(null);
  const [toast, setToast]           = useState('');

  // ── Fetch inquiries from backend ──────────────────────────────────────────

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Dynamic import so the file doesn't crash if api.js doesn't exist yet
      const { contactApi } = await import('../../services/api.js');
      const res = await contactApi.getInquiries();
      setInquiries(res.data || []);
      setIsDemo(false);
    } catch {
      // Backend not running — use demo data so the page is never blank
      setInquiries(DEMO_DATA);
      setIsDemo(true);
      setErrorMsg('Backend not connected — showing demo data. Start Spring Boot to see real inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ── Metrics ───────────────────────────────────────────────────────────────

  const metrics = useMemo(() => ({
    total:      inquiries.length,
    newCount:   inquiries.filter(i => i.status === 'NEW').length,
    inProgress: inquiries.filter(i => i.status === 'IN_PROGRESS').length,
    resolved:   inquiries.filter(i => i.status === 'RESOLVED').length,
  }), [inquiries]);

  // ── Services list for dropdown ────────────────────────────────────────────

  const services = useMemo(() =>
    [...new Set(inquiries.map(i => i.service).filter(Boolean))].sort()
  , [inquiries]);

  // ── Filtered + sorted list ────────────────────────────────────────────────

  const visible = useMemo(() => {
    let list = [...inquiries];
    if (filterStatus !== 'ALL') list = list.filter(i => i.status === filterStatus);
    if (filterService !== 'ALL') list = list.filter(i => i.service === filterService);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        (i.name || '').toLowerCase().includes(q) ||
        (i.email || '').toLowerCase().includes(q) ||
        (i.phone || '').includes(q) ||
        (i.service || '').toLowerCase().includes(q) ||
        (i.message || '').toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (sortBy === 'date_desc') return new Date(b.submittedAt) - new Date(a.submittedAt);
      if (sortBy === 'date_asc')  return new Date(a.submittedAt) - new Date(b.submittedAt);
      if (sortBy === 'name')      return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'status')    return (a.status || '').localeCompare(b.status || '');
      return 0;
    });
    return list;
  }, [inquiries, filterStatus, filterService, search, sortBy]);

  // ── Status update ─────────────────────────────────────────────────────────

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    try {
      if (!isDemo) {
        const { contactApi } = await import('../../services/api.js');
        const res = await contactApi.updateStatus(id, newStatus);
        setInquiries(prev => prev.map(i => i.id === id ? res.data : i));
      } else {
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
      }
      showToast('Status updated!');
    } catch (e) {
      alert('Failed to update: ' + e.message);
    } finally {
      setUpdating(null);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      if (!isDemo) {
        const { contactApi } = await import('../../services/api.js');
        await contactApi.deleteInquiry(id);
      }
      setInquiries(prev => prev.filter(i => i.id !== id));
      if (expanded === id) setExpanded(null);
      showToast('Inquiry deleted.');
    } catch (e) {
      alert('Failed to delete: ' + e.message);
    }
  };

  // ── Export CSV ────────────────────────────────────────────────────────────

  const exportCSV = () => {
    const cols = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Status', 'Submitted At', 'Message'];
    const rows = visible.map(i => [
      i.id, i.name, i.email, i.phone || '', i.service || '', i.status,
      i.submittedAt ? new Date(i.submittedAt).toLocaleString('en-IN') : '',
      `"${(i.message || '').replace(/"/g, '""')}"`,
    ].join(','));
    const csv = [cols.join(','), ...rows].join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = `ubt-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  // ── Shared inline styles ──────────────────────────────────────────────────

  const btnBase = { cursor: 'pointer', fontFamily: 'Outfit, sans-serif', border: 'none', fontWeight: 600, fontSize: 13, borderRadius: 8, padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none' };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: '#f8f7f4' }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateX(-50%) translateY(10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        .inq-row:hover { background: #fafafa !important; }
        .inq-del:hover { background: #fca5a5 !important; }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: '#050d1a', marginBottom: 4 }}>
              📋 Student Inquiries
            </div>
            <div style={{ fontSize: 13.5, color: '#6b7280', fontFamily: 'Outfit, sans-serif' }}>
              All contact form submissions — view, track, and respond
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={fetchData}  style={{ ...btnBase, background: '#fff', color: '#6b7280', border: '1px solid #e5e4e0', fontWeight: 500 }}>🔄 Refresh</button>
            <button onClick={exportCSV} style={{ ...btnBase, background: '#050d1a', color: '#e8b84b' }}>⬇ Export CSV</button>
            {onNavigate && (
              <button onClick={() => onNavigate('admin')} style={{ ...btnBase, background: '#0a1628', color: '#e8b84b' }}>← Back</button>
            )}
          </div>
        </div>

        {/* ── Demo warning banner ─────────────────────────────────────────── */}
        {isDemo && (
          <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 12, padding: '12px 18px', marginBottom: 24, fontSize: 13, color: '#92400e', fontFamily: 'Outfit, sans-serif' }}>
            ⚡ <strong>Demo mode</strong> — Start Spring Boot backend to see real student inquiries from your database.
          </div>
        )}

        {/* ── Metrics ────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
          <MetricCard value={metrics.total}      label="Total Inquiries"  sub="All time" />
          <MetricCard value={metrics.newCount}   label="New"              color="#1d4ed8" sub="Needs attention" />
          <MetricCard value={metrics.inProgress} label="In Progress"      color="#92400e" sub="Being handled" />
          <MetricCard value={metrics.resolved}   label="Resolved"         color="#166534" sub="Completed" />
        </div>

        {/* ── Toolbar ────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
          <input
            type="text"
            placeholder="🔍  Search name, email, service, message..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1 1 220px', padding: '9px 14px', border: '1px solid #e5e4e0', borderRadius: 10, fontFamily: 'Outfit, sans-serif', fontSize: 13.5, background: '#fff', color: '#050d1a', outline: 'none' }}
          />
          <select value={filterService} onChange={e => setService(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e5e4e0', borderRadius: 10, fontFamily: 'Outfit, sans-serif', fontSize: 13, background: '#fff', color: '#050d1a', cursor: 'pointer', outline: 'none' }}>
            <option value="ALL">All Services</option>
            {services.map(sv => <option key={sv} value={sv}>{sv}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ padding: '9px 14px', border: '1px solid #e5e4e0', borderRadius: 10, fontFamily: 'Outfit, sans-serif', fontSize: 13, background: '#fff', color: '#050d1a', cursor: 'pointer', outline: 'none' }}>
            <option value="date_desc">Newest first</option>
            <option value="date_asc">Oldest first</option>
            <option value="name">Name A–Z</option>
            <option value="status">By status</option>
          </select>
        </div>

        {/* ── Status filter pills ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
          {[
            { key: 'ALL',         label: `All (${metrics.total})` },
            { key: 'NEW',         label: `New (${metrics.newCount})` },
            { key: 'IN_PROGRESS', label: `In Progress (${metrics.inProgress})` },
            { key: 'RESOLVED',    label: `Resolved (${metrics.resolved})` },
            { key: 'CLOSED',      label: 'Closed' },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{
              padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
              border: filterStatus === f.key ? 'none' : '1px solid #e5e4e0',
              background: filterStatus === f.key ? 'linear-gradient(135deg,#e8b84b,#fcd34d)' : '#fff',
              color: filterStatus === f.key ? '#050d1a' : '#6b7280',
              fontWeight: filterStatus === f.key ? 700 : 500,
              fontSize: 13, fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
            }}>{f.label}</button>
          ))}
        </div>

        {/* ── Count ──────────────────────────────────────────────────────── */}
        {!loading && (
          <div style={{ fontSize: 12.5, color: '#9ca3af', marginBottom: 14, fontFamily: 'Outfit, sans-serif' }}>
            Showing {visible.length} of {inquiries.length} inquiries
          </div>
        )}

        {/* ── Loading spinner ─────────────────────────────────────────────── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: 32, height: 32, border: '3px solid #e5e4e0', borderTopColor: '#e8b84b', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
            <div style={{ color: '#9ca3af', fontSize: 14 }}>Loading inquiries...</div>
          </div>
        )}

        {/* ── Empty state ─────────────────────────────────────────────────── */}
        {!loading && visible.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>📭</div>
            <div style={{ fontSize: 16, color: '#374151', fontWeight: 500, marginBottom: 8 }}>No inquiries found</div>
            <div style={{ fontSize: 13.5 }}>
              {inquiries.length === 0 ? 'No one has submitted the contact form yet.' : 'Try adjusting your search or filters.'}
            </div>
          </div>
        )}

        {/* ── Inquiry cards ───────────────────────────────────────────────── */}
        {!loading && visible.map((inq) => {
          const isOpen   = expanded === inq.id;
          const av       = getAvatarColor(inq.name);
          const svcColor = SERVICE_COLORS[inq.service] || '#6b7280';
          const isBusy   = updating === inq.id;

          return (
            <div key={inq.id} style={{
              background: '#fff',
              border: `1px solid ${isOpen ? '#e8b84b' : '#e5e4e0'}`,
              borderRadius: 16, marginBottom: 12, overflow: 'hidden',
              boxShadow: isOpen ? '0 4px 20px rgba(232,184,75,0.12)' : '0 2px 8px rgba(10,22,40,0.04)',
              transition: 'all 0.25s',
            }}>

              {/* ── Card header (always visible) ── */}
              <div
                className="inq-row"
                onClick={() => setExpanded(isOpen ? null : inq.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 22px', cursor: 'pointer' }}
              >
                {/* Avatar circle */}
                <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, background: av.bg, color: av.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>
                  {getInitials(inq.name)}
                </div>

                {/* Name, email, service */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#050d1a', fontSize: 14.5, fontFamily: 'Outfit, sans-serif' }}>{inq.name}</div>
                  <div style={{ fontSize: 12.5, color: '#6b7280', marginTop: 1 }}>{inq.email}</div>
                  {inq.service && (
                    <span style={{ display: 'inline-block', marginTop: 4, fontSize: 11, padding: '2px 10px', borderRadius: 999, background: svcColor + '18', color: svcColor, fontWeight: 600, border: `1px solid ${svcColor}25` }}>
                      {inq.service}
                    </span>
                  )}
                </div>

                {/* Status + date + chevron */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                  <StatusBadge status={inq.status} />
                  <div style={{ fontSize: 11.5, color: '#9ca3af' }}>{fmtDate(inq.submittedAt)} {fmtTime(inq.submittedAt)}</div>
                  <div style={{ fontSize: 12, color: '#d1d5db', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</div>
                </div>
              </div>

              {/* ── Expanded details ── */}
              {isOpen && (
                <div style={{ padding: '0 22px 22px', borderTop: '1px solid #f1f0ed' }}>

                  {/* Detail grid — 4 fields in 2 columns */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', marginTop: 16, marginBottom: 16 }}>

                    <div>
                      <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Phone</div>
                      <div style={{ fontSize: 13.5, color: '#050d1a', fontWeight: 500 }}>{inq.phone || '—'}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Service Requested</div>
                      <div style={{ fontSize: 13.5, color: '#050d1a', fontWeight: 500 }}>{inq.service || '—'}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Inquiry ID</div>
                      {/* ✅ FIXED — was: style={s.detailVal} style={{ fontFamily:'monospace'... }} (two style props = error) */}
                      <div style={{ fontSize: 13, color: '#050d1a', fontWeight: 500, fontFamily: 'monospace' }}>#{inq.id}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Submitted</div>
                      <div style={{ fontSize: 13.5, color: '#050d1a', fontWeight: 500 }}>{fmtDate(inq.submittedAt)} at {fmtTime(inq.submittedAt)}</div>
                    </div>

                  </div>

                  {/* Message box */}
                  {inq.message && (
                    <>
                      <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Message</div>
                      <div style={{ background: '#f8f7f4', borderRadius: 12, padding: '14px 16px', fontSize: 14, color: '#374151', lineHeight: 1.75, marginBottom: 16, fontStyle: 'italic' }}>
                        "{inq.message}"
                      </div>
                    </>
                  )}

                  {/* Action row */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>

                    {/* Status dropdown */}
                    <div>
                      <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>Update Status</div>
                      <select
                        value={inq.status}
                        disabled={isBusy}
                        onChange={e => handleStatusChange(inq.id, e.target.value)}
                        style={{ padding: '8px 14px', border: '1px solid #e5e4e0', borderRadius: 8, fontFamily: 'Outfit, sans-serif', fontSize: 13, background: '#fff', cursor: 'pointer', color: '#050d1a' }}
                      >
                        <option value="NEW">New</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                      {isBusy && <span style={{ fontSize: 12, color: '#9ca3af', marginLeft: 8 }}>Saving...</span>}
                    </div>

                    {/* WhatsApp */}
                    {inq.phone && (
                      <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ ...btnBase, background: '#dcfce7', color: '#166534' }}>
                        💬 WhatsApp
                      </a>
                    )}

                    {/* Call */}
                    {inq.phone && (
                      <a href={`tel:${inq.phone.replace(/\s/g, '')}`}
                        onClick={e => e.stopPropagation()}
                        style={{ ...btnBase, background: '#dbeafe', color: '#1d4ed8' }}>
                        📞 Call
                      </a>
                    )}

                    {/* Email */}
                    <a
                      href={`mailto:${inq.email}?subject=Re: Your ${inq.service || 'Inquiry'} at UBT Technology&body=Dear ${inq.name},%0D%0A%0D%0AThank you for contacting UBT Technology Incubation.%0D%0A%0D%0A`}
                      onClick={e => e.stopPropagation()}
                      style={{ ...btnBase, background: '#ede9fe', color: '#5b21b6' }}>
                      ✉ Reply Email
                    </a>

                    {/* Delete */}
                    <button
                      className="inq-del"
                      onClick={e => { e.stopPropagation(); handleDelete(inq.id); }}
                      style={{ ...btnBase, background: '#fee2e2', color: '#dc2626', marginLeft: 'auto' }}>
                      🗑 Delete
                    </button>

                  </div>
                </div>
              )}
            </div>
          );
        })}

      </div>

      {/* ── Toast ── */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', background: '#050d1a', color: '#e8b84b', padding: '12px 24px', borderRadius: 12, fontSize: 13.5, fontWeight: 600, fontFamily: 'Outfit, sans-serif', boxShadow: '0 8px 24px rgba(0,0,0,0.25)', zIndex: 9999, animation: 'fadeInUp 0.2s ease' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
