// components/AuthorServices/ResearchImpact.jsx

const ResearchImpact = ({ onNavigate }) => {
  const metrics = [
    { icon: '📊', label: 'H-Index Improvement', value: '3x avg growth', desc: 'Measurable increase in author citation impact within 18 months.' },
    { icon: '🌍', label: 'Global Reach', value: '40+ Countries', desc: 'Research published in journals read across six continents.' },
    { icon: '📰', label: 'Papers Published', value: '400+', desc: 'Successfully facilitated publications in Q1–Q2 indexed journals.' },
    { icon: '🏆', label: 'Best Paper Awards', value: '28+', desc: 'Client papers recognized at international conferences.' },
  ];

  const journals = [
    { name: 'Scopus', color: '#e8613c', papers: '120+' },
    { name: 'Web of Science', color: '#2563eb', papers: '85+' },
    { name: 'UGC Care Group 1', color: '#16a34a', papers: '90+' },
    { name: 'IEEE', color: '#7c3aed', papers: '55+' },
    { name: 'PubMed', color: '#dc2626', papers: '28+' },
    { name: 'DOAJ', color: '#0891b2', papers: '22+' },
  ];

  const process = [
    { step: '01', title: 'Topic Analysis', desc: 'Deep-dive into research gaps, existing literature, and citation landscape.' },
    { step: '02', title: 'Journal Selection', desc: 'AI-assisted matching to best-fit journals based on scope, impact factor, and acceptance rate.' },
    { step: '03', title: 'Manuscript Crafting', desc: 'Expert writers and domain specialists collaborate to produce high-quality manuscripts.' },
    { step: '04', title: 'Review & Revision', desc: 'Rigorous internal peer review, plagiarism check, and language editing before submission.' },
    { step: '05', title: 'Submission & Follow-up', desc: 'We handle submission logistics and reviewer correspondence until acceptance.' },
  ];

  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div className="page-hero">
        <div className="badge animate-fade-up">Author Services → Research Impact</div>
        <h1 className="animate-fade-up delay-100">Amplify Your<br/>Research Impact</h1>
        <div className="gold-line" />
        <p className="animate-fade-up delay-200">
          From manuscript preparation to global publication — UBTECH helps researchers achieve
          measurable citation impact in world-class indexed journals.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 32 }} className="animate-fade-up delay-300">
          <button className="btn-primary" onClick={() => onNavigate('contact')}>Start Your Research Journey</button>
          <button className="btn-outline" onClick={() => onNavigate('publications')}>View Publications</button>
        </div>
      </div>

      {/* Impact metrics */}
      <section style={{ padding: '80px', background: '#f8f7f4' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label animate-fade-up">Proven Results</div>
          <h2 className="section-title animate-fade-up delay-100">Real Research, Real Impact</h2>
        </div>
        <div className="grid-4">
          {metrics.map((m, i) => (
            <div key={i} className={`card animate-scale-in delay-${(i+1)*100}`} style={{ padding: '32px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>{m.icon}</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 700, color: '#0a1628', marginBottom: 6 }}>{m.value}</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1a3a6b', marginBottom: 10 }}>{m.label}</div>
              <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual with image */}
      <section style={{ padding: '80px', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="section-label">Our Research Process</div>
            <h2 className="section-title" style={{ marginBottom: 32 }}>A Structured Path to Publication Success</h2>
            {process.map((p, i) => (
              <div key={i} className={`animate-fade-up delay-${(i+1)*100}`}
                style={{ display: 'flex', gap: 18, marginBottom: 24 }}>
                <div style={{
                  minWidth: 44, height: 44,
                  background: 'linear-gradient(135deg, #0a1628, #1a3a6b)',
                  borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#e8b84b', fontWeight: 700, fontSize: 13,
                }}>{p.step}</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#0a1628', marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 13.5, color: '#6b7280', lineHeight: 1.65 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700"
              alt="Research team" style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 16 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <img src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400"
                alt="Data analysis" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12 }} />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                alt="Expert" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Journal coverage */}
      <section style={{ padding: '80px', background: '#0a1628' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label" style={{ color: '#e8b84b' }}>Journal Coverage</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#fff', fontWeight: 700 }}>
            Published Across Elite Databases
          </h2>
        </div>
        <div className="grid-3" style={{ maxWidth: 900, margin: '0 auto' }}>
          {journals.map((j, i) => (
            <div key={i} className={`animate-scale-in delay-${(i+1)*100}`} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14, padding: '28px 24px',
              display: 'flex', alignItems: 'center', gap: 16,
              transition: 'background 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = `${j.color}22`}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: j.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, color: '#fff', flexShrink: 0,
              }}>📖</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 600, marginBottom: 3 }}>{j.name}</div>
                <div style={{ color: '#e8b84b', fontSize: 22, fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>{j.papers}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>papers published</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px', textAlign: 'center', background: 'linear-gradient(135deg, #e8b84b, #fcd34d)' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: '#0a1628', fontWeight: 700, marginBottom: 16 }}>
          Ready to Boost Your Research Impact?
        </h2>
        <p style={{ color: '#0a162899', marginBottom: 32, fontSize: '1.05rem' }}>
          Join 2,500+ researchers who've transformed their academic careers with UBTECH.
        </p>
        <button className="btn-primary" onClick={() => onNavigate('contact')}
          style={{ background: '#0a1628', color: '#e8b84b' }}>
          Schedule Free Consultation →
        </button>
      </section>
    </div>
  );
};

export default ResearchImpact;
