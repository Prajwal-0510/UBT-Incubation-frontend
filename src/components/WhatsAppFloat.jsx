import { useState } from 'react';

const offices = [
  /*{ name: 'Nagpur Office', whatsapp: '919876543210', phone: '+91 98765 43210' },*/
  { name: 'Pune Office', whatsapp: '+919370272741', phone: '+91 9370272741' },
  { name: 'Ahilyanagar Office', whatsapp: '+919370272741', phone: '+91 98765 43212' },
];

const WhatsAppFloat = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="whatsapp-float">
      {/* Panel */}
      {open && (
        <div className="animate-scale-in" style={{
          position: 'absolute', bottom: 64, right: 0,
          background: '#fff', borderRadius: 16,
          boxShadow: '0 16px 48px rgba(5,13,26,0.2)',
          border: '1px solid #e5e4e0',
          width: 270, overflow: 'hidden',
          transformOrigin: 'bottom right',
        }}>
          <div style={{ background: '#25D366', padding: '14px 18px' }}>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: 14.5 }}>Contact Our Offices</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 }}>Chat with us on WhatsApp</div>
          </div>
          {offices.map((o, i) => (
            <div key={i} style={{
              padding: '13px 18px',
              borderBottom: i < offices.length - 1 ? '1px solid #f1f0ed' : 'none',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontWeight: 600, fontSize: 13.5, color: '#0a1628' }}>{o.name}</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <a href={`https://wa.me/${o.whatsapp}`} target="_blank" rel="noreferrer"
                  title="WhatsApp"
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', fontSize: 17,
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >💬</a>
                <a href={`tel:${o.phone.replace(/\s/g, '')}`}
                  title="Call"
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', fontSize: 17,
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >📞</a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setOpen(!open)} style={{
        width: 54, height: 54, borderRadius: '50%',
        background: open ? '#dc2626' : '#25D366',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
        transition: 'background 0.3s, transform 0.2s',
        animation: open ? 'none' : 'pulse-gold 2.5s infinite',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'none'}
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default WhatsAppFloat;
