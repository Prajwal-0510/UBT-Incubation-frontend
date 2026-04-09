import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

const navItems = [
  { label: 'Home', id: 'home' },
  {
    label: 'Services', id: 'services',
    children: [
      { label: '🎓 PhD Assistance', id: 'phd-assistance' },
      { label: '📝 Research Paper Writing', id: 'paper-writing' },
      { label: '📄 Manuscript Formatting', id: 'manuscript' },
      { label: '📚 Thesis & Dissertation', id: 'thesis' },
      { label: '🏭 Industrial Internships', id: 'internships' },
      { label: '💻 Web & App Development', id: 'web-dev' },
    ]
  },
  {
    label: 'Research', id: 'research',
    children: [
      { label: '🔬 Research Impact', id: 'research-impact' },
      { label: '🧪 PhD R&D ', id: 'phd-rd' },
      { label: '⚙️ ME/MTech ', id: 'me-mtech' },
      { label: '🖥️ BE/BTech ', id: 'be-btech' },
      { label: '📊 MBA ', id: 'mba' },
    ]
  },
  {
    label: 'Publications', id: 'publications',
    children: [
      { label: '📡 IEEE & Conference', id: 'ieee' },
      { label: '🌐 Scopus / Web of Science', id: 'scopus' },
      { label: '🛡️ Plagiarism Policy', id: 'plagiarism-policy' },
      { label: '🏛️ UGC Care Journals', id: 'ugc-care' },
    ]
  },
  {
    label: 'IPR', id: 'ipr',
    children: [
      { label: '⚗️ Patent Filing', id: 'patent' },
      { label: '™️ Trademark', id: 'trademark' },
      { label: '©️ Copyright', id: 'copyright' },
      { label: '🎨 Industrial Design', id: 'industrial-design' },
    ]
  },
  {
    label: 'AI Tools', id: 'ai-tools',
    children: [
      { label: '✍️ AI Research Writer', id: 'ai-writer' },
      { label: '🔍 Plagiarism Checker', id: 'plagiarism-checker' },
      { label: '📝 Grammar Editor', id: 'grammar-checker' },
      { label: '🎯 Journal Finder', id: 'journal-finder' },
    ]
  },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Projects', id: 'online-projects' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = ({ activePage, onNavigate }) => {
  const { isAdmin, logout } = useAdmin();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const nav = (id) => { onNavigate(id); setMobileOpen(false); setOpenDropdown(null); };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(5,13,26,0.97)' : 'rgba(5,13,26,0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(232,184,75,0.18)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, padding: '0 32px' }}>
          {/* Logo */}
          <div onClick={() => nav('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 38, height: 38,
              background: 'linear-gradient(135deg, #e8b84b, #fcd34d)',
              borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 900, fontSize: 18, color: '#050d1a',
              boxShadow: '0 4px 12px rgba(232,184,75,0.4)',
            }}>UBT</div>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 20, color: '#fff', lineHeight: 1 }}>UBT TECHNOLOGY</div>
              <div style={{ fontSize: 9, color: '#e8b84b', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>INCUBATION</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', gap: 2, listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
            {navItems.map(item => (
              <li key={item.id} style={{ position: 'relative' }}
                onMouseEnter={() => item.children && setOpenDropdown(item.id)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <button onClick={() => !item.children && nav(item.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: activePage === item.id ? '#e8b84b' : 'rgba(255,255,255,0.82)',
                  fontSize: 13, fontWeight: 500, fontFamily: 'Outfit, sans-serif',
                  padding: '8px 11px', borderRadius: 7,
                  display: 'flex', alignItems: 'center', gap: 4,
                  transition: 'color 0.2s',
                  borderBottom: activePage === item.id ? '2px solid #e8b84b' : '2px solid transparent',
                }}>
                  {item.label}
                  {item.children && <span style={{ fontSize: 8 }}>▾</span>}
                </button>

                {item.children && openDropdown === item.id && (
                  <div style={{
                    position: 'absolute', top: '100%', left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(5,13,26,0.98)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(232,184,75,0.2)',
                    borderRadius: 14, padding: '8px 6px',
                    minWidth: 230,
                    boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                    animation: 'fadeUp 0.2s ease',
                  }}>
                    {item.children.map(child => (
                      <button key={child.id} onClick={() => nav(child.id)} style={{
                        display: 'block', width: '100%', background: 'none', border: 'none',
                        cursor: 'pointer', textAlign: 'left',
                        color: activePage === child.id ? '#e8b84b' : 'rgba(255,255,255,0.75)',
                        padding: '9px 14px', borderRadius: 8, fontSize: 13,
                        fontFamily: 'Outfit, sans-serif', fontWeight: 400,
                        transition: 'all 0.18s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,184,75,0.1)'; e.currentTarget.style.color = '#e8b84b'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = activePage === child.id ? '#e8b84b' : 'rgba(255,255,255,0.75)'; }}
                      >{child.label}</button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right buttons */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {isAdmin && (
              <button onClick={() => nav('admin')} style={{
                background: 'rgba(232,184,75,0.15)', border: '1px solid rgba(232,184,75,0.35)',
                color: '#e8b84b', padding: '7px 14px', borderRadius: 7, cursor: 'pointer',
                fontSize: 12, fontWeight: 600, fontFamily: 'Outfit, sans-serif',
              }}>⚙ Admin</button>
            )}
            <button onClick={() => nav('contact')} style={{
              background: 'linear-gradient(135deg, #e8b84b, #fcd34d)',
              color: '#050d1a', fontWeight: 700, fontSize: 12.5,
              padding: '9px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              fontFamily: 'Outfit, sans-serif',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(232,184,75,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >Get Consultation</button>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger" style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'none', flexDirection: 'column', gap: 5, padding: 4,
            }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 24, height: 2,
                  background: '#e8b84b', borderRadius: 2,
                  transition: 'all 0.3s',
                  transform: mobileOpen
                    ? (i === 0 ? 'rotate(45deg) translate(5px, 5px)' : i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'scaleX(0)')
                    : 'none',
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, bottom: 0,
          background: 'rgba(5,13,26,0.98)', zIndex: 999,
          overflowY: 'auto', padding: '16px 20px',
          animation: 'fadeIn 0.2s ease',
        }}>
          {navItems.map(item => (
            <div key={item.id}>
              <button onClick={() => {
                if (item.children) { setMobileExpanded(mobileExpanded === item.id ? null : item.id); }
                else nav(item.id);
              }} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', background: 'none', border: 'none',
                color: activePage === item.id ? '#e8b84b' : 'rgba(255,255,255,0.85)',
                padding: '14px 4px', fontSize: 15, fontWeight: 500,
                borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
              }}>
                {item.label}
                {item.children && <span>{mobileExpanded === item.id ? '▴' : '▾'}</span>}
              </button>
              {item.children && mobileExpanded === item.id && (
                <div style={{ paddingLeft: 16, paddingBottom: 8 }}>
                  {item.children.map(child => (
                    <button key={child.id} onClick={() => nav(child.id)} style={{
                      display: 'block', width: '100%', background: 'none', border: 'none',
                      color: 'rgba(255,255,255,0.65)', padding: '10px 4px', fontSize: 13.5,
                      textAlign: 'left', cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
                    }}>{child.label}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
