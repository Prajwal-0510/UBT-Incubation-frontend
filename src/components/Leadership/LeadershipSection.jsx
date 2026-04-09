const leaders = [
  {
    name: 'Manisha Shingvi',
    role: 'Founder & CEO',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: 'Manisha Shingvi is the Founder & CEO of UBT TECHNOLOGY INCUBATION, driving the organization\'s vision and growth in academic and research domains. With a passion for empowering researchers and scholars, she has built UBT TECHNOLOGY into India\'s premier academic support platform since 2017.',
    social: { linkedin: '#', email: 'manisha@ubtorg.com' },
    color: '#7c3aed',
  },
  {
    name: 'Tejas Shingvi',
    role: 'Director',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    bio: 'Tejas Shingvi is the Director of UBT TECHNOLOGY INCUBATION, leading the strategic initiatives and fostering innovation in academic and research services. His expertise in technology and project management has been instrumental in expanding UBT TECHNOLOGY\'s reach across India.',
    social: { linkedin: '#', email: 'tejas@ubtorg.com' },
    color: '#2563eb',
  },
];

const branches = [
  /*{ city: 'Nagpur', address: 'Main Branch — Maharashtra', phone: '+91 98765 43210', icon: '🏢', color: '#e8b84b' },*/
  { city: 'Pune', address: 'Pune Office — Maharashtra', phone: '+91 9370272741', icon: '🏛️', color: '#2563eb' },
  { city: 'Ahilyanagar', address: 'New Branch — Maharashtra', phone: '+91 9370272741', icon: '🌟', color: '#059669', badge: 'New' },
];

const milestones = [
  { year: '2017', event: 'UBT TECHNOLOGY Incubation founded in Pune' },
  { year: '2019', event: 'Expanded to PhD Assistance & Publication services' },
  { year: '2021', event: '500+ researchers served milestone' },
  { year: '2023', event: 'Launched AI Tools Suite & IPR Division' },
  { year: '2024', event: 'Opened Pune & Ahilyanagar branches' },
  { year: '2025', event: '2500+ researchers, 400+ publications' },
];

const LeadershipSection = ({ onNavigate }) => {
  return (
    <section id="about" style={{ background: '#fff', padding: '90px 80px' }}>
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div className="section-label">Leadership & Vision</div>
        <h2 className="section-title">Meet the Visionaries Behind UBT TECHNOLOGY</h2>
        <p style={{ color: '#6b7280', maxWidth: 540, margin: '16px auto 0', lineHeight: 1.75, fontSize: 14.5 }}>
          Founded with a mission to bridge academia and industry, UBT TECHNOLOGY Incubation has grown into
          India's most trusted research support platform under expert leadership.
        </p>
      </div>

      {/* Leaders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, marginBottom: 80 }}>
        {leaders.map((l, i) => (
          <div key={i} className="card animate-fade-up" style={{
            padding: 0, overflow: 'hidden',
            animationDelay: `${i * 0.15}s`,
          }}>
            <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
              <img src={l.img} alt={l.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${l.color}dd 0%, transparent 55%)` }} />
              <div style={{ position: 'absolute', bottom: 18, left: 24 }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{l.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 3 }}>{l.role}</div>
              </div>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>{l.bio}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <a href={`mailto:${l.social.email}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: `${l.color}12`, color: l.color,
                  padding: '7px 16px', borderRadius: 999,
                  fontSize: 12.5, fontWeight: 600, textDecoration: 'none',
                  border: `1px solid ${l.color}25`,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = l.color; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${l.color}12`; e.currentTarget.style.color = l.color; }}
                >📧 Email</a>
                <a href={l.social.linkedin} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(10,22,40,0.06)', color: '#0a1628',
                  padding: '7px 16px', borderRadius: 999,
                  fontSize: 12.5, fontWeight: 600, textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,22,40,0.06)'; e.currentTarget.style.color = '#0a1628'; }}
                >🔗 LinkedIn</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 80 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="section-label">Our Journey</div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: '#0a1628' }}>
            Milestones Since 2017
          </h3>
        </div>
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, #e8b84b, rgba(232,184,75,0.1))', transform: 'translateX(-50%)' }} />
          {milestones.map((m, i) => (
            <div key={i} className="animate-fade-up" style={{
              display: 'flex', gap: 20, alignItems: 'center',
              marginBottom: 28, animationDelay: `${i * 0.1}s`,
              flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
            }}>
              <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                <div style={{
                  display: 'inline-block',
                  background: i % 2 === 0 ? 'linear-gradient(135deg, #050d1a, #0a1628)' : 'linear-gradient(135deg, #e8b84b, #fcd34d)',
                  color: i % 2 === 0 ? '#e8b84b' : '#050d1a',
                  padding: '10px 18px', borderRadius: 10,
                  fontSize: 13.5, fontWeight: 500, lineHeight: 1.5,
                  boxShadow: i % 2 === 0 ? '0 4px 16px rgba(5,13,26,0.15)' : '0 4px 16px rgba(232,184,75,0.25)',
                }}>{m.event}</div>
              </div>
              <div style={{
                width: 42, height: 42, flexShrink: 0,
                background: 'linear-gradient(135deg, #e8b84b, #fcd34d)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 12, color: '#050d1a',
                boxShadow: '0 4px 12px rgba(232,184,75,0.35)',
                zIndex: 1,
              }}>{m.year.slice(2)}</div>
              <div style={{ flex: 1 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Branches */}
      <div>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="section-label">Our Locations</div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: '#0a1628' }}>
            Branches Across Maharashtra
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {branches.map((b, i) => (
            <div key={i} className="card animate-scale-in" style={{
              padding: '28px 24px', textAlign: 'center',
              animationDelay: `${i * 0.1}s`, cursor: 'pointer',
            }}
              onClick={() => onNavigate('contact')}
              onMouseEnter={e => e.currentTarget.style.borderColor = b.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>{b.icon}</div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 700, color: '#0a1628' }}>{b.city}</h4>
                {b.badge && (
                  <span style={{
                    position: 'absolute', top: -4, right: -32,
                    background: b.color, color: '#fff',
                    fontSize: 9, padding: '2px 7px', borderRadius: 999, fontWeight: 700,
                  }}>{b.badge}</span>
                )}
              </div>
              <p style={{ fontSize: 13, color: '#6b7280', margin: '8px 0' }}>{b.address}</p>
              <a href={`tel:${b.phone}`} style={{ color: b.color, fontWeight: 600, fontSize: 13.5, textDecoration: 'none' }}>{b.phone}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
