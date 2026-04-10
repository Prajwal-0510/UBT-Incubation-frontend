// src/services/api.js — FIXED: token sent on ALL requests (including admin GETs)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getToken  = () => localStorage.getItem('ubt_admin_token');
const saveToken = (t) => localStorage.setItem('ubt_admin_token', t);
const dropToken = () => localStorage.removeItem('ubt_admin_token');

/**
 * KEY FIX: Token is now sent on ALL requests if available.
 *
 * Previously: `if (token && method !== 'GET')` — this meant GET requests
 * to admin-protected routes like /contact/inquiries never sent the JWT,
 * so Spring Security rejected them with 403 even though the user was logged in.
 *
 * Fix: Always include Authorization header when token exists.
 * Public GET routes ignore the token harmlessly — only protected routes use it.
 */
async function request(path, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
  const token = getToken();

  // Send token on ALL requests if available
  // (needed for admin GETs like /contact/inquiries, /admin/stats)
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = { method, headers };
  if (body !== null) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { throw new Error(`Server error (${res.status})`); }
  if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
  return json;
}

// Upload image file → returns public Cloudinary URL
async function uploadImage(file) {
  const token = getToken();
  if (!token) throw new Error('Admin login required to upload images');
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${BASE_URL}/upload/image`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: fd,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message || 'Upload failed');
  return json.data; // Cloudinary URL
}

export const authApi = {
  login:    async (password) => { const j = await request('/auth/login','POST',{password}); if(j?.data?.token) saveToken(j.data.token); return j; },
  logout:   () => dropToken(),
  isLoggedIn: () => !!getToken(),
  verify:   () => request('/auth/verify','GET'),
};
export const galleryApi = {
  getAll: (cat) => request(`/gallery${cat ? `?category=${encodeURIComponent(cat)}` : ''}`),
  add:    (item) => request('/gallery', 'POST', item),
  remove: (id)   => request(`/gallery/${id}`, 'DELETE'),
};
export const projectsApi = {
  getAll: (lv) => request(`/projects${lv ? `?level=${encodeURIComponent(lv)}` : ''}`),
  add:    (p)  => request('/projects', 'POST', p),
  remove: (id) => request(`/projects/${id}`, 'DELETE'),
};
export const updatesApi = {
  getAll:    ()    => request('/updates'),
  add:       (u)   => request('/updates', 'POST', u),
  remove:    (id)  => request(`/updates/${id}`, 'DELETE'),
  togglePin: (id)  => request(`/updates/${id}/pin`, 'PATCH'),
};
export const alumniApi = {
  getAll: (cat) => request(`/alumni${cat ? `?category=${encodeURIComponent(cat)}` : ''}`),
  add:    (d)   => request('/alumni', 'POST', d),
  update: (id, d) => request(`/alumni/${id}`, 'PUT', d),
  remove: (id)  => request(`/alumni/${id}`, 'DELETE'),
};
export const contactApi = {
  submit:        (f)       => request('/contact', 'POST', f),
  getInquiries:  (st)      => request(`/contact/inquiries${st ? `?status=${st}` : ''}`, 'GET'),
  updateStatus:  (id, st)  => request(`/contact/inquiries/${id}/status`, 'PATCH', { status: st }),
  deleteInquiry: (id)      => request(`/contact/inquiries/${id}`, 'DELETE'),
};
export const footerApi = {
  get:    ()  => request('/footer'),
  update: (d) => request('/footer', 'PUT', d),
};
export const testimonialsApi = {
  getAll: ()    => request('/testimonials'),
  add:    (t)   => request('/testimonials', 'POST', t),
  remove: (id)  => request(`/testimonials/${id}`, 'DELETE'),
};
export const adminApi = { getStats: () => request('/admin/stats') };
export { uploadImage };
