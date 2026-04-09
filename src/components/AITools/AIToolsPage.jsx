// components/AITools/AIToolsPage.jsx

const tools = [
  {
    id: 'ai-writer',
    icon: '✍️',
    title: 'AI Research Writer',
    color: '#2563eb',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700',
    description: 'AI-powered research paper drafting tool trained on thousands of published papers. Generate structured drafts, literature summaries, and methodology sections.',
    features: ['Abstract Generation', 'Literature Review Draft', 'Methodology Writing', 'Results Interpretation', 'Citation Suggestions'],
    badge: 'Most Popular',
  },
  {
    id: 'plagiarism-checker',
    icon: '🔍',
    title: 'Plagiarism Checker',
    color: '#dc2626',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700',
    description: 'Powered by iThenticate and Turnitin databases. Detect plagiarism across 90+ billion web pages, journals, and academic papers. Get instant similarity reports.',
    features: ['Turnitin Integration', 'iThenticate Database', 'Sentence-Level Detection', 'Similarity Report PDF', 'Paraphrase Suggestions'],
    badge: 'Turnitin Powered',
  },
  {
    id: 'grammar-checker',
    icon: '📝',
    title: 'Grammar & Language Editor',
    color: '#059669',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700',
    description: 'Academic-grade grammar correction with discipline-specific vocabulary. Fix grammar, syntax, clarity, and academic tone for research papers.',
    features: ['Academic Tone Correction', 'Grammar & Syntax Fix', 'Passive/Active Voice', 'Readability Scoring', 'APA/IEEE Style Checks'],
    badge: 'Academic Grade',
  },
  {
    id: 'journal-finder',
    icon: '🎯',
    title: 'AI Journal Finder',
    color: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700',
    description: 'Paste your abstract and our AI matches it to the best-fit journals based on scope, impact factor, acceptance rate, and turnaround time.',
    features: ['Abstract-Based Matching', 'Impact Factor Filter', 'Open Access Options', 'Acceptance Rate Data', 'Submission Guidelines'],
    badge: 'AI-Powered',
  },
];

const AIToolsPage = ({ onNavigate }) => {
  return (
    <div style={{ paddingTop: 68 }}>
      {/* Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0f2044 50%, #0a1a3a 100%)' }}>
        {/* Animated dots */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: i % 3 === 0 ? 4 : 2, height: i % 3 === 0 ? 4 : 2,
              background: '#e8b84b',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + (i % 4) * 0.1,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 2}s`,
            }} />
          ))}
        </div>

        <div className="badge animate-fade-up">AI Tools Suite</div>
        <h1 className="animate-fade-up delay-100">Supercharge Research<br/>with AI Technology</h1>
        <div className="gold-line" />
        <p className="animate-fade-up delay-200">
          Our suite of AI-powered academic tools — built specifically for researchers, PhD candidates,
          and academicians — saves hours of effort and elevates quality.
        </p>
      </div>

      {/* Tools */}
      <section style={{ padding: '80px', background: '#f8f7f4' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="section-label">Our AI Tools</div>
          <h2 className="section-title">Intelligent Tools for Smarter Research</h2>
        </div>

        {tools.map((tool, i) => (
          <div key={tool.id}
            className={`animate-fade-up delay-${(i+1)*100}`}
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1fr 1.4fr' : '1.4fr 1fr',
              gap: 0, marginBottom: 28, background: '#fff',
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(10,22,40,0.08)',
              border: '1px solid #e5e4e0',
              transition: 'box-shadow 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 48px rgba(10,22,40,0.16)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(10,22,40,0.08)'; e.currentTarget.style.transform = 'none'; }}
          >
            {/* Image */}
            {i % 2 === 0 && (
              <div style={{ position: 'relative', minHeight: 300, overflow: 'hidden' }}>
                <img src={tool.image} alt={tool.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent, ${tool.color}33)` }} />
                {tool.badge && (
                  <div style={{
                    position: 'absolute', top: 20, left: 20,
                    background: tool.color, color: '#fff',
                    padding: '5px 14px', borderRadius: 999,
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>{tool.badge}</div>
                )}
              </div>
            )}

            {/* Content */}
            <div style={{ padding: '44px' }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>{tool.icon}</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: '#0a1628', marginBottom: 14 }}>
                {tool.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.8, marginBottom: 22 }}>{tool.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {tool.features.map((f, j) => (
                  <span key={j} style={{
                    background: `${tool.color}12`, color: tool.color,
                    padding: '5px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 500,
                    border: `1px solid ${tool.color}25`,
                  }}>{f}</span>
                ))}
              </div>
              <button
                onClick={() => onNavigate('contact')}
                style={{
                  background: `linear-gradient(135deg, ${tool.color}, ${tool.color}cc)`,
                  color: '#fff', border: 'none',
                  padding: '11px 26px', borderRadius: 10,
                  cursor: 'pointer', fontWeight: 600, fontSize: 13.5,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 20px ${tool.color}44`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Try {tool.title} →
              </button>
            </div>

            {/* Image right side */}
            {i % 2 !== 0 && (
              <div style={{ position: 'relative', minHeight: 300, overflow: 'hidden' }}>
                <img src={tool.image} alt={tool.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to left, transparent, ${tool.color}33)` }} />
                {tool.badge && (
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    background: tool.color, color: '#fff',
                    padding: '5px 14px', borderRadius: 999,
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>{tool.badge}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Tech stack */}
      <section style={{ padding: '70px 80px', background: '#0a1628', textAlign: 'center' }}>
        <div className="section-label" style={{ color: '#e8b84b', marginBottom: 12 }}>Powered By</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#fff', fontWeight: 700, marginBottom: 40 }}>
          Industry-Leading AI Technology
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
          {['Turnitin', 'iThenticate', 'GPT-4', 'Grammarly API', 'Scopus API', 'CrossRef', 'DOAJ API', 'PubMed'].map((t, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '10px 22px', borderRadius: 10,
              color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500,
            }}>{t}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AIToolsPage;
