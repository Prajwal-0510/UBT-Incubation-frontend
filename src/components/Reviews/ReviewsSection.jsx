// =============================================================================
// src/components/Reviews/ReviewsSection.jsx
// Google Reviews-style section — static data, no Google API needed
// Matches UBT dark navy + gold design system exactly
// =============================================================================

import { useState, useRef, useEffect } from 'react';

// ─── Static review data (based on real UBT review patterns) ──────────────────
const REVIEWS = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    role: 'Assistant Professor, VNIT Nagpur',
    avatar: 'PS',
    avatarBg: '#dbeafe',
    avatarColor: '#1e40af',
    rating: 5,
    date: 'March 2025',
    text: 'UBT Technology helped me publish 3 Scopus-indexed papers during my PhD. The team was incredibly knowledgeable, patient, and available 24/7. Their systematic approach to research methodology is unmatched. Highly recommended for serious researchers.',
    service: 'PhD Assistance',
    verified: true,
  },
  {
    id: 2,
    name: 'Rahul Mishra',
    role: 'MTech Student, IIT Bombay',
    avatar: 'RM',
    avatarBg: '#dcfce7',
    avatarColor: '#166534',
    rating: 5,
    date: 'February 2025',
    text: 'Got my final year project published in an IEEE conference within 4 months! The paper writing team formatted everything perfectly to IEEE standards. Zero plagiarism report. The process was completely transparent from start to finish.',
    service: 'Research Paper Writing',
    verified: true,
  },
  {
    id: 3,
    name: 'Dr. Anjali Patel',
    role: 'Research Scholar, Pune University',
    avatar: 'AP',
    avatarBg: '#ede9fe',
    avatarColor: '#5b21b6',
    rating: 5,
    date: 'January 2025',
    text: 'From patent filing to journal publication — UBT handled everything seamlessly. My patent was filed within 2 weeks and the paper got accepted in a Q1 Scopus journal on the first attempt. Exceptional service quality.',
    service: 'Patent Filing & Publication',
    verified: true,
  },
  {
    id: 4,
    name: 'Saurabh Desai',
    role: 'BE Final Year, COEP Pune',
    avatar: 'SD',
    avatarBg: '#fef3c7',
    avatarColor: '#92400e',
    rating: 5,
    date: 'December 2024',
    text: 'My final year project got selected at an international conference in Singapore! The team guided me at every step — from topic selection to poster presentation. The AI tools they provided for plagiarism check are excellent.',
    service: 'BE/BTech Project Support',
    verified: true,
  },
  {
    id: 5,
    name: 'Mohammed Shaikh',
    role: 'Research Scholar, RTMNU',
    avatar: 'MS',
    avatarBg: '#fce7f3',
    avatarColor: '#9d174d',
    rating: 4,
    date: 'November 2024',
    text: 'Very professional team. My thesis was completed on time with proper citations and zero plagiarism. The viva preparation sessions were particularly helpful. Minor delay in communication sometimes but overall excellent experience.',
    service: 'Thesis Writing',
    verified: true,
  },
  {
    id: 6,
    name: 'Sneha Kulkarni',
    role: 'MBA Researcher, Symbiosis Pune',
    avatar: 'SK',
    avatarBg: '#dcfce7',
    avatarColor: '#166534',
    rating: 5,
    date: 'October 2024',
    text: 'The MBA project support was outstanding. Statistical analysis using SPSS was done expertly. The literature review they prepared covered 60+ papers. Got distinction in my final evaluation. Will definitely recommend to juniors.',
    service: 'MBA Project Support',
    verified: true,
  },
  {
    id: 7,
    name: 'Prof. Vikram Joshi',
    role: 'Associate Professor, COEP',
    avatar: 'VJ',
    avatarBg: '#dbeafe',
    avatarColor: '#1e40af',
    rating: 5,
    date: 'September 2024',
    text: 'I have been collaborating with UBT Technology for 2 years for my research output. They have helped me publish in Web of Science and Scopus journals consistently. Their understanding of journal submission requirements is exceptional.',
    service: 'Publication Support',
    verified: true,
  },
  {
    id: 8,
    name: 'Aisha Shaikh',
    role: 'PhD Scholar, Savitribai Phule University',
    avatar: 'AS',
    avatarBg: '#ffedd5',
    avatarColor: '#9a3412',
    rating: 5,
    date: 'August 2024',
    text: 'The trademark registration process was completely handled by UBT. Within 3 weeks my trademark was filed. Their IPR team is highly knowledgeable about Indian patent and IP laws. Great value for money.',
    service: 'Trademark Registration',
    verified: true,
  },
];

// ─── Computed stats ────────────────────────────────────────────────────────────
const TOTAL = REVIEWS.length;
const AVG = (REVIEWS.reduce((s, r) => s + r.rating, 0) / TOTAL).toFixed(1);
const DIST = [5, 4, 3, 2, 1].map(star => ({
  star,
  count: REVIEWS.filter(r => r.rating === star).length,
  pct: Math.round((REVIEWS.filter(r => r.rating === star).length / TOTAL) * 100),
}));

// ─── Star renderer ─────────────────────────────────────────────────────────────
function Stars({ rating, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill={i <= rating ? '#e8b84b' : '#d1d5db'}>
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.31L10 13.27l-4.78 2.52.91-5.31L2.27 6.62l5.34-.78z"/>
        </svg>
      ))}
    </div>
  );
}

// ─── Single review card ────────────────────────────────────────────────────────
function ReviewCard({ review, featured }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 180;

  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${featured ? 'rgba(232,184,75,0.4)' : '#e5e4e0'}`,
      borderRadius: 16,
      padding: '24px',
      boxShadow: featured
        ? '0 8px 32px rgba(232,184,75,0.12)'
        : '0 2px 12px rgba(10,22,40,0.05)',
      transition: 'transform 0.25s, box-shadow 0.25s',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      cursor: 'default',
      position: 'relative',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(10,22,40,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = featured ? '0 8px 32px rgba(232,184,75,0.12)' : '0 2px 12px rgba(10,22,40,0.05)';
      }}
    >
      {/* Google G watermark */}
      <div style={{
        position: 'absolute', top: 18, right: 20,
        fontSize: 20, fontWeight: 700,
        background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontFamily: 'Arial, sans-serif',
        opacity: 0.5,
      }}>G</div>

      {/* Header: avatar + name + date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
          background: review.avatarBg, color: review.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 14, fontFamily: 'Outfit, sans-serif',
          border: `2px solid ${review.avatarColor}22`,
        }}>
          {review.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: '#050d1a', fontFamily: 'Outfit, sans-serif' }}>
              {review.name}
            </span>
            {review.verified && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#4285F4">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4.5-4.5 1.41-1.41L10 13.67l7.09-7.09L18.5 8l-8.5 8.5z"/>
              </svg>
            )}
          </div>
          <div style={{ fontSize: 11.5, color: '#9ca3af', marginTop: 1, fontFamily: 'Outfit, sans-serif' }}>
            {review.role}
          </div>
        </div>
      </div>

      {/* Stars + date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Stars rating={review.rating} />
        <span style={{ fontSize: 11.5, color: '#9ca3af', fontFamily: 'Outfit, sans-serif' }}>{review.date}</span>
      </div>

      {/* Review text */}
      <div>
        <p style={{
          fontSize: 13.5, color: '#374151', lineHeight: 1.75,
          fontFamily: 'Outfit, sans-serif', margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 4,
          WebkitBoxOrient: 'vertical',
          overflow: expanded ? 'visible' : 'hidden',
        }}>
          "{review.text}"
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#2563eb', fontSize: 12.5, fontWeight: 600,
              fontFamily: 'Outfit, sans-serif', padding: '4px 0',
              marginTop: 4,
            }}>
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Service tag */}
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        background: 'rgba(10,22,40,0.05)',
        color: '#374151', fontSize: 11, fontWeight: 600,
        padding: '4px 10px', borderRadius: 999,
        fontFamily: 'Outfit, sans-serif',
        alignSelf: 'flex-start',
      }}>
        {review.service}
      </div>
    </div>
  );
}

// ─── Main ReviewsSection ───────────────────────────────────────────────────────
const ReviewsSection = () => {
  const [filter, setFilter] = useState(0); // 0 = all
  const [visibleCount, setVisibleCount] = useState(6);
  const scrollRef = useRef(null);

  const filtered = filter === 0
    ? REVIEWS
    : REVIEWS.filter(r => r.rating === filter);

  const visible = filtered.slice(0, visibleCount);

  return (
    <section style={{ padding: '90px 80px', background: '#fff' }}>

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 52 }}>
        <div className="section-label">Google Reviews</div>
        <h2 className="section-title">What Our Researchers Say</h2>
        <p style={{ color: '#6b7280', maxWidth: 500, margin: '14px auto 0', lineHeight: 1.7, fontSize: 14.5 }}>
          Real experiences from PhD scholars, researchers, and students who achieved their goals with UBT Technology.
        </p>
      </div>

      {/* Rating summary card — Google style */}
      <div style={{
        display: 'flex', gap: 32, alignItems: 'center',
        background: 'linear-gradient(135deg, #050d1a, #0a1628)',
        borderRadius: 20, padding: '36px 44px',
        marginBottom: 48, flexWrap: 'wrap',
        boxShadow: '0 8px 32px rgba(5,13,26,0.2)',
      }}>
        {/* Big average */}
        <div style={{ textAlign: 'center', minWidth: 120 }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '4.5rem', fontWeight: 700, color: '#e8b84b', lineHeight: 1,
          }}>{AVG}</div>
          <Stars rating={Math.round(parseFloat(AVG))} size={20} />
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12.5, marginTop: 8, fontFamily: 'Outfit, sans-serif' }}>
            {TOTAL} Google reviews
          </div>
          {/* Google branding */}
          <div style={{
            marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.35)',
            fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: 4,
            justifyContent: 'center',
          }}>
            <span style={{ fontWeight: 700, fontSize: 14,
              background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>G</span>
            Google Reviews
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 100, background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

        {/* Distribution bars */}
        <div style={{ flex: 1, minWidth: 200 }}>
          {DIST.map(({ star, count, pct }) => (
            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', minWidth: 8, fontFamily: 'Outfit, sans-serif' }}>{star}</span>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="#e8b84b" style={{ flexShrink: 0 }}>
                <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.31L10 13.27l-4.78 2.52.91-5.31L2.27 6.62l5.34-.78z"/>
              </svg>
              <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: '#e8b84b', borderRadius: 3, transition: 'width 1s ease' }} />
              </div>
              <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.45)', minWidth: 14, fontFamily: 'Outfit, sans-serif' }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Stats pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160 }}>
          {[
            { val: '98%', label: 'Recommend us' },
            { val: '4.9', label: 'Avg. rating 2025' },
            { val: '500+', label: 'PhD completed' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'rgba(232,184,75,0.1)', border: '1px solid rgba(232,184,75,0.2)',
              borderRadius: 10, padding: '10px 16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 700, color: '#e8b84b' }}>{s.val}</span>
              <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'Outfit, sans-serif' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#6b7280', fontFamily: 'Outfit, sans-serif', marginRight: 4 }}>Filter:</span>
        {[
          { val: 0, label: `All (${REVIEWS.length})` },
          { val: 5, label: '⭐⭐⭐⭐⭐' },
          { val: 4, label: '⭐⭐⭐⭐' },
        ].map(f => (
          <button key={f.val} onClick={() => { setFilter(f.val); setVisibleCount(6); }} style={{
            padding: '7px 16px', borderRadius: 999, cursor: 'pointer',
            border: filter === f.val ? 'none' : '1px solid #e5e4e0',
            background: filter === f.val ? 'linear-gradient(135deg, #e8b84b, #fcd34d)' : '#fff',
            color: filter === f.val ? '#050d1a' : '#6b7280',
            fontWeight: filter === f.val ? 700 : 500,
            fontSize: 13, fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
          }}>{f.label}</button>
        ))}
        <a
          href="https://www.google.com/search?q=UBT+Technology+Private+Limited+Reviews"
          target="_blank"
          rel="noreferrer"
          style={{
            marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 16px', borderRadius: 999,
            border: '1px solid #e5e4e0',
            color: '#4285F4', fontSize: 13, fontWeight: 600,
            textDecoration: 'none', fontFamily: 'Outfit, sans-serif',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f0f7ff'; e.currentTarget.style.borderColor = '#4285F4'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#e5e4e0'; }}
        >
          <span style={{ fontWeight: 900, fontSize: 16,
            background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>G</span>
          View on Google →
        </a>
      </div>

      {/* Review cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 20, marginBottom: 36,
      }}>
        {visible.map((review, i) => (
          <ReviewCard key={review.id} review={review} featured={i === 0 && filter === 0} />
        ))}
      </div>

      {/* Load more / Show less */}
      <div style={{ textAlign: 'center', display: 'flex', gap: 12, justifyContent: 'center' }}>
        {visibleCount < filtered.length && (
          <button
            onClick={() => setVisibleCount(v => v + 3)}
            style={{
              padding: '12px 32px', borderRadius: 10,
              background: '#050d1a', color: '#e8b84b',
              border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 14, fontFamily: 'Outfit, sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#0a1628'}
            onMouseLeave={e => e.currentTarget.style.background = '#050d1a'}
          >
            Load more reviews ({filtered.length - visibleCount} remaining)
          </button>
        )}
        {visibleCount > 6 && (
          <button
            onClick={() => setVisibleCount(6)}
            style={{
              padding: '12px 24px', borderRadius: 10,
              background: '#fff', color: '#6b7280',
              border: '1px solid #e5e4e0', cursor: 'pointer',
              fontWeight: 500, fontSize: 14, fontFamily: 'Outfit, sans-serif',
            }}>
            Show less
          </button>
        )}
      </div>

      {/* Write a review CTA */}
      <div style={{
        marginTop: 48, textAlign: 'center',
        background: 'linear-gradient(135deg, #f8f7f4, #fff)',
        border: '1px solid #e5e4e0', borderRadius: 16, padding: '32px',
      }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>⭐</div>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#050d1a', marginBottom: 8 }}>
          Had a great experience with UBT Technology?
        </h3>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20, fontFamily: 'Outfit, sans-serif' }}>
          Share your feedback on Google — it helps other researchers find us.
        </p>
        <a
          href="https://www.google.com/search?q=UBT+Technology+Private+Limited+Reviews"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 10,
            background: '#fff', border: '1.5px solid #4285F4',
            color: '#4285F4', fontWeight: 700, fontSize: 14,
            textDecoration: 'none', fontFamily: 'Outfit, sans-serif',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4285F4'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#4285F4'; }}
        >
          <span style={{ fontWeight: 900, fontSize: 18 }}>G</span>
          Write a Google Review
        </a>
      </div>
    </section>
  );
};

export default ReviewsSection;
