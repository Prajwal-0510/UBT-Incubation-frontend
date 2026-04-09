// components/IPR/IPRPage.jsx

const iprServices = [
  {
    id: 'patent',
    icon: '⚗️',
    title: 'Patent Filing',
    color: '#2563eb',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=700',
    description: 'End-to-end patent support — from prior art search and patent drafting to filing with the Indian Patent Office (IPO) and international PCT applications.',
    steps: ['Prior Art Search', 'Patent Drafting', 'Filing with IPO', 'Examination & Grant', 'PCT / International Filing'],
    timeline: '18–36 months',
    cost: 'Starting ₹15,000',
  },
  {
    id: 'trademark',
    icon: '™️',
    title: 'Trademark Registration',
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700',
    description: 'Protect your brand identity with trademark registration. We handle search, application filing, examination response, and certificate procurement.',
    steps: ['Trademark Search', 'Class Selection', 'Application Filing', 'Examination Reply', 'Certificate Issued'],
    timeline: '12–18 months',
    cost: 'Starting ₹8,000',
  },
  {
    id: 'copyright',
    icon: '©️',
    title: 'Copyright Registration',
    color: '#059669',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=700',
    description: 'Register copyright for literary works, software code, research papers, artistic creations, and music with the Copyright Office of India.',
    steps: ['Work Documentation', 'Application Preparation', 'Filing with Copyright Office', 'Examination', 'Certificate Issuance'],
    timeline: '30–90 days',
    cost: 'Starting ₹4,000',
  },
  {
    id: 'industrial-design',
    icon: '🎨',
    title: 'Industrial Design',
    color: '#dc2626',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=700',
    description: 'Protect the visual and ornamental aspects of your product with industrial design registration under the Designs Act, 2000.',
    steps: ['Design Documentation', 'Novelty Assessment', 'Application Filing', 'Examination', 'Registration & Renewal'],
    timeline: '3–12 months',
    cost: 'Starting ₹6,000',
  },
];

const whyProtect = [
  { icon: '🔒', title: 'Exclusive Rights', desc: 'Legal monopoly over your invention, brand, or creative work.' },
  { icon: '💰', title: 'Commercial Value', desc: 'License your IP for revenue generation and business partnerships.' },
  { icon: '🌍', title: 'Global Protection', desc: 'PCT and Madrid Protocol filing for international coverage.' },
  { icon: '🏆', title: 'Academic Credit', desc: 'Patents and copyrights add significant value to your academic profile.' },
];

const IPRPage = ({ onNavigate }) => {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1a0a28 0%, #2d1a4e 55%, #3a1a6b 100%)' }}>
        <div className="badge animate-fade-up">Intellectual Property Rights</div>
        <h1 className="animate-fade-up delay-100">Protect Your<br/>Intellectual Property</h1>
        <div className="gold-line" />
        <p className="animate-fade-up delay-200">
          Secure your inventions, brands, and creative works with professional IPR services.
          UBTECH guides you through every stage — from filing to grant.
        </p>
        <div style={{ display: 'flex', gap: 28, marginTop: 40, flexWrap: 'wrap' }} className="animate-fade-up delay-300">
          {['Patent', 'Trademark', 'Copyright', 'Industrial Design'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
              <span style={{ color: '#e8b84b' }}>✦</span> {t}
            </div>
          ))}
        </div>
      </div>

      {/* Why protect */}
      <section style={{ padding: '80px', background: '#f8f7f4' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label">Why It Matters</div>
          <h2 className="section-title">The Value of Protecting Your IP</h2>
        </div>
        <div className="grid-4">
          {whyProtect.map((w, i) => (
            <div key={i} className={`card animate-scale-in delay-${(i+1)*100}`}
              style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>{w.icon}</div>
              <h3 style={{ fontWeight: 700, color: '#0a1628', marginBottom: 10 }}>{w.title}</h3>
              <p style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.7 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IPR Services */}
      <section style={{ padding: '80px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label">Our IPR Services</div>
          <h2 className="section-title">Complete IP Protection Suite</h2>
        </div>
        <div className="grid-2">
          {iprServices.map((svc, i) => (
            <div key={svc.id} className={`card animate-fade-up delay-${(i+1)*100}`}>
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img src={svc.image} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${svc.color}cc, transparent 50%)` }} />
                <div style={{ position: 'absolute', bottom: 16, left: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 28 }}>{svc.icon}</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{svc.title}</span>
                </div>
                <div style={{ position: 'absolute', top: 14, right: 14 }}>
                  <div style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: 999, marginBottom: 6 }}>
                    <span style={{ color: '#e8b84b', fontSize: 11, fontWeight: 600 }}>⏱ {svc.timeline}</span>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: 999 }}>
                    <span style={{ color: '#4ade80', fontSize: 11, fontWeight: 600 }}>💰 {svc.cost}</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{svc.description}</p>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Process Steps</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {svc.steps.map((step, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ background: `${svc.color}15`, color: svc.color, padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500 }}>{step}</span>
                        {j < svc.steps.length - 1 && <span style={{ color: '#d1d5db', fontSize: 10 }}>→</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  style={{ background: svc.color, color: '#fff', border: 'none', padding: '10px 22px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
                >
                  File Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ padding: '70px 80px', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#fff', fontWeight: 700, marginBottom: 10 }}>
            Unsure Which Protection You Need?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 480 }}>
            Our IP consultants offer a free 30-minute session to identify the right protection strategy for your work.
          </p>
        </div>
        <button className="btn-primary" onClick={() => onNavigate('contact')}>Book Free IP Consultation →</button>
      </section>
    </div>
  );
};

export default IPRPage;
