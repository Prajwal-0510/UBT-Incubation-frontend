import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';

const AdminPage = ({ onNavigate }) => {
  const { isAdmin, login, logout } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const ok = login(password);
      setLoading(false);
      if (!ok) { setError('Incorrect password. Try: ubtech@admin2025'); setPassword(''); }
    }, 600);
  };

  if (isAdmin) return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: '#f8f7f4' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px' }}>
        <div className="animate-scale-in" style={{
          background: '#fff', borderRadius: 20, padding: '48px',
          boxShadow: '0 8px 40px rgba(5,13,26,0.1)',
          border: '1px solid #e5e4e0',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 56, marginBottom: 18 }}>⚙️</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#050d1a', marginBottom: 8 }}>Admin Dashboard</h2>
          <p style={{ color: '#6b7280', marginBottom: 36 }}>You are logged in as Admin. Navigate to sections to manage content.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 36 }}>
            {[
              { label: '🖼️ Manage Gallery', page: 'gallery' },
              { label: '🔬 Manage Projects', page: 'online-projects' },
              { label: '📋 View Inquiries', page: 'inquiries' },
              { label: '📢 Manage Updates', page: 'manage-updates' },
            ].map((a, i) => (
              <button key={i} onClick={() => onNavigate(a.page)} style={{
                background: '#050d1a', color: '#e8b84b',
                border: 'none', padding: '14px 20px', borderRadius: 10,
                cursor: 'pointer', fontWeight: 600, fontSize: 13.5,
                fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#050d1a'; }}
              >{a.label}</button>
            ))}
          </div>

          <button onClick={logout} style={{
            background: '#fee2e2', color: '#dc2626', border: 'none',
            padding: '10px 24px', borderRadius: 8, cursor: 'pointer',
            fontWeight: 600, fontSize: 13, fontFamily: 'Outfit, sans-serif',
          }}>🚪 Logout</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'linear-gradient(135deg, #050d1a, #0a1628 50%, #0f2044)', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 440, margin: '0 auto', padding: '40px 24px', width: '100%' }}>
        <div className="animate-scale-in" style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(232,184,75,0.2)',
          borderRadius: 20, padding: '48px 40px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{
              width: 64, height: 64,
              background: 'linear-gradient(135deg, #e8b84b, #fcd34d)',
              borderRadius: 16, margin: '0 auto 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, boxShadow: '0 8px 24px rgba(232,184,75,0.4)',
            }}>🔐</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#fff', marginBottom: 6 }}>Admin Login</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13.5 }}>Enter your admin password to continue</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 7 }}>Password</label>
            <input
              type="password"
              className="form-input"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }}
              placeholder="Enter admin password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
            {error && <div style={{ color: '#fca5a5', fontSize: 12.5, marginTop: 7 }}>⚠️ {error}</div>}
          </div>

          <button onClick={handleLogin} disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
            {loading ? '⏳ Verifying...' : '🔓 Login to Admin Panel'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 11.5, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>
            Demo password: ubtech@admin2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
