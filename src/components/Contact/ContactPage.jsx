// =============================================================================
// src/components/Contact/ContactPage.jsx  — FIXED version
// Now actually POSTs to Spring Boot backend at /api/contact
// =============================================================================

import { useState } from 'react';
import { contactApi } from '../../services/api';

const ContactPage = () => {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState('');

  const services = [
    'PhD Assistance', 'Research Paper Writing', 'Publication Support',
    'Patent/Trademark', 'Thesis Writing', 'AI Tools',
    'Industrial Internship', 'Web & App Development',
  ];

  const offices = [
    { city: 'Pune Office',        whatsapp: '+919370272741', phone: '+91 9370272741', address: 'Pune, Maharashtra',        icon: '🏛️' },
    { city: 'Ahilyanagar Office', whatsapp: '+919370272741', phone: '+91 9370272741', address: 'Ahilyanagar, Maharashtra', icon: '🌟', badge: 'New' },
  ];

  // ── Submit handler — posts to Spring Boot ─────────────────────────────────
  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await contactApi.submit({
        name:    form.name.trim(),
        email:   form.email.trim(),
        phone:   form.phone.trim()   || null,
        service: form.service        || null,
        message: form.message.trim() || null,
      });
      setSubmitted(true);
    } catch (e) {
      setError('Submission failed: ' + e.message + '. Please try WhatsApp or call directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <div className="page-hero">
        <div className="badge animate-fade-up">Contact Us</div>
        <h1 className="animate-fade-up delay-100">Let's Start Your<br/>Academic Journey</h1>
        <div className="gold-line" />
        <p className="animate-fade-up delay-200">Free 30-minute consultation · No obligation · Expert guidance</p>
      </div>

      <section style={{ padding: '80px', background: '#f8f7f4' }}>
        {/* Office contacts */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="section-label">Our Offices</div>
            <h2 className="section-title">Contact Our Branches</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>
            {offices.map((o, i) => (
              <div key={i} className="card animate-fade-up" style={{ padding: '26px 24px', animationDelay: `${i * 0.1}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ fontSize: 36 }}>{o.icon}</div>
                  {o.badge && (
                    <span style={{ background: '#059669', color: '#fff', fontSize: 10, padding: '3px 10px', borderRadius: 999, fontWeight: 700 }}>{o.badge}</span>
                  )}
                </div>
                <h4 style={{ fontWeight: 700, color: '#0a1628', fontSize: '1rem', marginBottom: 5 }}>{o.city}</h4>
                <p style={{ fontSize: 12.5, color: '#9ca3af', marginBottom: 16 }}>{o.address}</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href={`https://wa.me/${o.whatsapp}`} target="_blank" rel="noreferrer"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#dcfce7', color: '#16a34a', padding: '9px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>
                    💬 WhatsApp
                  </a>
                  <a href={`tel:${o.phone.replace(/\s/g, '')}`}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: '#dbeafe', color: '#2563eb', padding: '9px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>
                    📞 Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48 }}>
          {/* Info column */}
          <div>
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>We're Here to Help</h2>
            <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: 32, fontSize: 14 }}>
              Whether you need guidance on your PhD research, want to publish in a Scopus journal,
              or need to file a patent — our team is ready to assist at every step.
            </p>
            {[
              { icon: '📧', label: 'Email',         value: 'info@ubtorg.com',              color: '#2563eb' },
              { icon: '📞', label: 'Phone',         value: '+91 9370272741',               color: '#059669' },
              { icon: '📍', label: 'Location',      value: 'Office No. 709, Landmark Center, Pune-Satara Road, Parvati, Pune', color: '#dc2626' },
              { icon: '🕐', label: 'Working Hours', value: 'Mon–Sat: 9:00 AM – 7:00 PM',  color: '#7c3aed' },
            ].map((info, i) => (
              <div key={i} className={`animate-fade-up delay-${(i + 1) * 100}`}
                style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 18, padding: '16px 18px', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `${info.color}15`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', fontWeight: 600, marginBottom: 3 }}>{info.label}</div>
                  <div style={{ fontWeight: 600, color: '#0a1628', fontSize: 14 }}>{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form column */}
          <div style={{ background: '#fff', borderRadius: 20, padding: '40px', boxShadow: '0 8px 32px rgba(10,22,40,0.08)' }}>
            {submitted ? (
              // Success state
              <div className="animate-scale-in" style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 60, marginBottom: 18 }}>✅</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#0a1628', marginBottom: 12 }}>
                  Thank You, {form.name}!
                </h3>
                <p style={{ color: '#6b7280', lineHeight: 1.7 }}>
                  Your inquiry has been saved. Our team will contact you at <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                  style={{ marginTop: 24, padding: '10px 24px', borderRadius: 10, background: '#0a1628', color: '#e8b84b', border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              // Form state
              <>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#0a1628', marginBottom: 6 }}>
                  Request Free Consultation
                </h3>
                <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 26 }}>
                  Fill out the form — we'll respond within 24 hours.
                </p>

                {/* Error banner */}
                {error && (
                  <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10, padding: '12px 16px', marginBottom: 18, fontSize: 13, color: '#dc2626' }}>
                    ⚠️ {error}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Dr. / Mr. / Ms."
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="you@university.edu"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>
                      Service Needed
                    </label>
                    <select
                      className="form-input"
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      style={{ cursor: 'pointer' }}>
                      <option value="">Select a service</option>
                      {services.map((sv, i) => <option key={i} value={sv}>{sv}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 5 }}>
                    Message
                  </label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Describe your research topic or requirement..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 14, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                  {submitting ? '⏳ Submitting...' : 'Submit Enquiry →'}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
