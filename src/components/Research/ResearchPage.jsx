// components/Research/ResearchPage.jsx

const branches = [
  { name: 'Computer & IT', icon: '💻', color: '#2563eb', specializations: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Data Science', 'Web/Android Development'] },
  { name: 'Civil Engineering', icon: '🏗️', color: '#16a34a', specializations: ['Construction Management', 'Structural Analysis', 'Geo-technology', 'Transportation', 'Hydraulics'] },
  { name: 'Mechanical Engg.', icon: '⚙️', color: '#ea580c', specializations: ['Design & Analysis', 'Robotics', 'Fabrication', 'Automation', 'Mechatronics'] },
  { name: 'ENTC & Electrical', icon: '⚡', color: '#7c3aed', specializations: ['Image Processing', 'IoT/Embedded', 'Power Electronics', 'VLSI', 'Wireless Comm.'] },
  { name: 'AI & Data Science', icon: '🤖', color: '#0891b2', specializations: ['NLP', 'Reinforcement Learning', 'Big Data', 'Cloud AI', 'Predictive Analytics'] },
  { name: 'Management (MBA)', icon: '📊', color: '#dc2626', specializations: ['Marketing', 'Finance', 'Human Resources', 'Operations', 'Business Analytics'] },
];

const programLevels = [
  {
    level: 'PhD R&D',
    id: 'phd-rd',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700',
    duration: '3–5 years',
    description: 'Comprehensive research support covering literature review, data collection, statistical analysis, paper writing, and thesis submission for doctoral candidates.',
    features: ['Concept & Topic Selection', 'Literature Survey Assistance', 'Research Methodology Design', 'Data Collection & Analysis', 'Thesis Writing & Formatting', 'Viva-Voce Preparation'],
  },
  {
    level: 'ME / MTech',
    id: 'me-mtech',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=700',
    duration: '6–18 months',
    description: 'End-to-end project support for postgraduate engineering students across all branches — from problem identification to final documentation.',
    features: ['Problem Statement Definition', 'System Design & Architecture', 'Implementation Support', 'Result Analysis', 'Paper Writing for Conferences', 'Final Report & Presentation'],
  },
  {
    level: 'BE / BTech',
    id: 'be-btech',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700',
    duration: '4–8 months',
    description: 'Final year project assistance for undergraduate engineering students — structured guidance from proposal to successful project defense.',
    features: ['Project Proposal Writing', 'Hardware/Software Implementation', 'Simulation & Testing', 'IEEE Paper Writing', 'PPT & Report Preparation', 'Defense Coaching'],
  },
];

const ResearchPage = ({ onNavigate }) => {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div className="page-hero">
        <div className="badge animate-fade-up">Research Projects</div>
        <h1 className="animate-fade-up delay-100">Cutting-Edge Research<br/>Across All Disciplines</h1>
        <div className="gold-line" />
        <p className="animate-fade-up delay-200">
          From PhD R&D to final-year undergraduate projects — UBTECH's research division supports
          every level with domain experts, modern tools, and proven methodologies.
        </p>
      </div>

      {/* Program levels */}
      <section style={{ padding: '80px', background: '#f8f7f4' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label">Program Levels</div>
          <h2 className="section-title">Research Support at Every Academic Level</h2>
        </div>
        {programLevels.map((prog, i) => (
          <div key={prog.id}
            className={`card animate-fade-up delay-${(i+1)*100}`}
            style={{
              display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
              gap: 0, marginBottom: 28, overflow: 'hidden',
            }}>
            {i % 2 !== 0 && (
              <div style={{ padding: '40px 44px' }}>
                <ProgramContent prog={prog} onNavigate={onNavigate} />
              </div>
            )}
            <img src={prog.image} alt={prog.level}
              style={{ width: '100%', height: 320, objectFit: 'cover', order: i % 2 !== 0 ? -1 : 1 }} />
            {i % 2 === 0 && (
              <div style={{ padding: '40px 44px' }}>
                <ProgramContent prog={prog} onNavigate={onNavigate} />
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Branches */}
      <section style={{ padding: '80px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label">Specializations</div>
          <h2 className="section-title">Covering All Engineering &amp; Management Branches</h2>
        </div>
        <div className="grid-3">
          {branches.map((b, i) => (
            <div key={i} className={`card animate-scale-in delay-${(i+1)*100}`} style={{ padding: '28px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${b.color}15`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 24,
                }}>{b.icon}</div>
                <h3 style={{ fontWeight: 700, color: '#0a1628', fontSize: '1.05rem' }}>{b.name}</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {b.specializations.map((s, j) => (
                  <span key={j} style={{
                    background: `${b.color}12`, color: b.color,
                    padding: '5px 12px', borderRadius: 999,
                    fontSize: 12, fontWeight: 500,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Images */}
      <section style={{ padding: '0 80px 80px', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800"
            alt="Lab research" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 16 }} />
          <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400"
            alt="Data" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 16 }} />
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400"
            alt="Students" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 16 }} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '70px 80px', background: '#0a1628', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#fff', fontWeight: 700, marginBottom: 16 }}>
          Start Your Research Project Today
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>Guidance from domain experts for every stage of your project.</p>
        <button className="btn-primary" onClick={() => onNavigate('contact')}>Get Free Guidance →</button>
      </section>
    </div>
  );
};

const ProgramContent = ({ prog, onNavigate }) => (
  <div>
    <span style={{
      display: 'inline-block',
      background: '#e8b84b22', color: '#e8b84b',
      padding: '4px 14px', borderRadius: 999,
      fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
      textTransform: 'uppercase', marginBottom: 14,
    }}>{prog.level} · {prog.duration}</span>
    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: '#0a1628', marginBottom: 14 }}>
      {prog.level} Project Support
    </h3>
    <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{prog.description}</p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
      {prog.features.map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
          <span style={{ color: '#e8b84b', fontSize: 16 }}>✦</span> {f}
        </div>
      ))}
    </div>
    <button className="btn-primary" onClick={() => onNavigate('contact')}>Enquire Now →</button>
  </div>
);

export default ResearchPage;
