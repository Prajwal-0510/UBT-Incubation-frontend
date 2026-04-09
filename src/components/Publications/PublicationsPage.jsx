// components/Publications/PublicationsPage.jsx

const journalTypes = [
  {
    id: 'ugc-care',
    title: 'UGC Care Journals',
    icon: '🏛️',
    color: '#16a34a',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700',
    description: 'University Grants Commission approved journals — Group 1 and Group 2 — covering all domains of science, technology, management, and arts.',
    highlights: ['Group 1 (High Impact)', 'Group 2 (Standard)', 'Peer Reviewed', 'Fast Publication'],
    turnaround: '15–30 days',
  },
  {
    id: 'scopus',
    title: 'Scopus / Web of Science',
    icon: '🌐',
    color: '#2563eb',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700',
    description: 'Publication in globally recognized Scopus and Web of Science indexed journals with high impact factors, respected across international academia.',
    highlights: ['High Impact Factor', 'Globally Indexed', 'SCI / SCIE Journals', 'Citation Tracking'],
    turnaround: '30–90 days',
  },
  {
    id: 'ieee',
    title: 'IEEE & Conference Papers',
    icon: '📡',
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700',
    description: 'IEEE journal and conference paper support — including paper writing, formatting per IEEE template, and submission to IEEE Xplore-indexed events.',
    highlights: ['IEEE Template Formatting', 'Conference Proceedings', 'IEEE Xplore Indexed', 'International Visibility'],
    turnaround: '20–45 days',
  },
  {
    id: 'plagiarism-policy',
    title: 'Plagiarism Policy',
    icon: '🛡️',
    color: '#dc2626',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700',
    description: 'Our strict zero-plagiarism guarantee backed by Turnitin and iThenticate checks. Every manuscript is verified below 10% similarity before submission.',
    highlights: ['Turnitin Verified', 'iThenticate Report', '<10% Similarity', 'Grammar & Style Check'],
    turnaround: '24–48 hours',
  },
];

const stats = [
  { val: '400+', label: 'Papers Published' },
  { val: '9+', label: 'Indexing Databases' },
  { val: '95%', label: 'First-Attempt Acceptance' },
  { val: '3 Days', label: 'Fastest Publication' },
];

const PublicationsPage = ({ onNavigate }) => {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div className="page-hero" style={{ backgroundImage: 'linear-gradient(135deg, #0a1628 0%, #1a1a4e 60%, #2563eb 100%)' }}>
        <div className="badge animate-fade-up">Publications</div>
        <h1 className="animate-fade-up delay-100">Publish in the World's<br/>Most Prestigious Journals</h1>
        <div className="gold-line" />
        <p className="animate-fade-up delay-200">
          From UGC Care to Scopus, Web of Science, and IEEE — UBTECH facilitates publication
          in the journals that matter most for your academic career.
        </p>
      </div>

      {/* Stats */}
      <section style={{ padding: '60px 80px', background: '#fff' }}>
        <div className="grid-4">
          {stats.map((s, i) => (
            <div key={i} className={`animate-fade-up delay-${(i+1)*100}`}
              style={{ textAlign: 'center', padding: '28px', borderRight: i < 3 ? '1px solid #e5e4e0' : 'none' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.8rem', fontWeight: 700, color: '#0a1628' }}>{s.val}</div>
              <div style={{ fontSize: 13.5, color: '#6b7280', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Journal types */}
      <section style={{ padding: '0 80px 80px', background: '#f8f7f4' }}>
        <div style={{ textAlign: 'center', padding: '60px 0 48px' }}>
          <div className="section-label">Publication Services</div>
          <h2 className="section-title">Choose Your Publication Track</h2>
        </div>
        <div className="grid-2">
          {journalTypes.map((j, i) => (
            <div key={j.id} className={`card animate-fade-up delay-${(i+1)*100}`} style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: 200 }}>
                <img src={j.image} alt={j.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${j.color}ee, transparent 50%)` }} />
                <div style={{
                  position: 'absolute', bottom: 16, left: 20,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: 28 }}>{j.icon}</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>{j.title}</span>
                </div>
                <div style={{
                  position: 'absolute', top: 14, right: 16,
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                  color: '#e8b84b', padding: '4px 12px', borderRadius: 999,
                  fontSize: 11, fontWeight: 600,
                }}>⏱ {j.turnaround}</div>
              </div>
              <div style={{ padding: '24px 28px' }}>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.75, marginBottom: 18 }}>{j.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {j.highlights.map((h, k) => (
                    <span key={k} style={{
                      background: `${j.color}12`, color: j.color,
                      padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
                    }}>{h}</span>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  style={{
                    background: j.color, color: '#fff', border: 'none',
                    padding: '10px 22px', borderRadius: 8, cursor: 'pointer',
                    fontWeight: 600, fontSize: 13, transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Get Started →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Indexing databases banner */}
      <section style={{ padding: '60px 80px', background: '#0a1628' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#fff', fontWeight: 700 }}>
            We Publish In All Major Databases
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
          {['Scopus', 'Web of Science', 'IEEE Xplore', 'UGC Care', 'PubMed', 'DOAJ', 'Google Scholar', 'Ei Compendex'].map((db, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.8)',
              padding: '10px 22px', borderRadius: 999,
              fontSize: 13, fontWeight: 500,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,184,75,0.15)'; e.currentTarget.style.color = '#e8b84b'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
            >
              {db}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PublicationsPage;
