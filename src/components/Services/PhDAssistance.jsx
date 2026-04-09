// components/Services/PhDAssistance.jsx

const stages = [
  { num: '01', title: 'Topic Selection', icon: '💡', desc: 'We analyze current research gaps, your interest area, and institutional requirements to identify a novel, publishable PhD topic.' },
  { num: '02', title: 'Synopsis / Proposal', icon: '📋', desc: 'Complete synopsis writing including introduction, literature review, objectives, methodology, and expected outcomes.' },
  { num: '03', title: 'Literature Review', icon: '📚', desc: 'Exhaustive literature survey from 50–100+ peer-reviewed sources, organized thematically with critical analysis.' },
  { num: '04', title: 'Research Methodology', icon: '🔬', desc: 'Quantitative, qualitative, or mixed-methods design with appropriate statistical tools and data collection strategies.' },
  { num: '05', title: 'Data Collection & Analysis', icon: '📊', desc: 'Statistical analysis using SPSS, R, Python, MATLAB — with proper interpretation and visualization.' },
  { num: '06', title: 'Chapter Writing', icon: '✍️', desc: 'All thesis chapters — introduction, review, methodology, results, discussion, conclusion — written to publication standards.' },
  { num: '07', title: 'Journal Publications', icon: '📰', desc: 'Minimum 2–3 research papers extracted from your thesis and published in Scopus/UGC Care journals.' },
  { num: '08', title: 'Viva-Voce Prep', icon: '🎓', desc: 'Mock viva sessions, expected question preparation, and defense strategy coaching with domain experts.' },
];

const PhDAssistance = ({ onNavigate }) => {
  return (
    <div style={{ paddingTop: 68 }}>
      <div className="page-hero">
        <div className="badge animate-fade-up">Services → PhD Assistance</div>
        <h1 className="animate-fade-up delay-100">Complete PhD Research<br/>Support — Start to Degree</h1>
        <div className="gold-line" />
        <p className="animate-fade-up delay-200">
          Our PhD assistance program covers every stage of your doctoral journey —
          from topic selection to successful viva-voce defense.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 32 }} className="animate-fade-up delay-300">
          <button className="btn-primary" onClick={() => onNavigate('contact')}>Start PhD Journey</button>
          <button className="btn-outline" onClick={() => onNavigate('research-impact')}>View Research Impact</button>
        </div>
      </div>

      {/* Image + intro */}
      <section style={{ padding: '80px', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="section-label">Why Choose Our PhD Program?</div>
            <h2 className="section-title" style={{ marginBottom: 22 }}>Expert Guidance at Every Milestone</h2>
            <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: 20 }}>
              Our team of 50+ subject matter experts — comprising PhDs, postdocs, and senior researchers —
              provide personalized mentorship for candidates across all engineering, science, management, and humanities disciplines.
            </p>
            <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: 28 }}>
              Since 2017, we've guided 500+ candidates to successful PhD completion with a 98% success rate
              in university evaluations and viva examinations.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { val: '500+', label: 'PhD Completions' },
                { val: '98%', label: 'Viva Success Rate' },
                { val: '50+', label: 'Domain Experts' },
                { val: '15+', label: 'Disciplines Covered' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#f8f7f4', borderRadius: 12, padding: '18px 20px' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700, color: '#0a1628' }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500" alt="PhD guidance"
              style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 14, gridRow: '1 / span 2' }} />
            <img src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400" alt="Research"
              style={{ width: '100%', height: 94, objectFit: 'cover', borderRadius: 12 }} />
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400" alt="Lab"
              style={{ width: '100%', height: 94, objectFit: 'cover', borderRadius: 12 }} />
          </div>
        </div>
      </section>

      {/* Journey steps */}
      <section style={{ padding: '80px', background: '#f8f7f4' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label">The PhD Journey</div>
          <h2 className="section-title">8-Stage Research Support Framework</h2>
        </div>
        <div className="grid-4">
          {stages.map((s, i) => (
            <div key={i} className={`card animate-fade-up delay-${(i % 4 + 1) * 100}`} style={{ padding: '28px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 10, color: '#e8b84b', fontWeight: 700, letterSpacing: '0.12em' }}>STEP {s.num}</span>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
              </div>
              <h4 style={{ fontWeight: 700, color: '#0a1628', fontSize: '1rem', marginBottom: 10 }}>{s.title}</h4>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '70px 80px', background: '#0a1628', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#fff', fontWeight: 700, marginBottom: 14 }}>
          Begin Your PhD Journey with Confidence
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}>Free consultation · No obligation · Expert guidance</p>
        <button className="btn-primary" onClick={() => onNavigate('contact')}>Talk to a PhD Expert Today →</button>
      </section>
    </div>
  );
};

export default PhDAssistance;
