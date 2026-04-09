// =============================================================================
// src/services/api.js
// FIXED VERSION — headers always merged correctly, body never lost
// =============================================================================

const BASE_URL = import.meta.env.VITE_API_URL;

// ─── Token helpers ─────────────────────────────────────────────────────────────
const getToken  = () => localStorage.getItem("ubt_admin_token");
const saveToken = (t) => localStorage.setItem("ubt_admin_token", t);
const dropToken = () => localStorage.removeItem("ubt_admin_token");

// ─── Core request function ─────────────────────────────────────────────────────
// FIX: headers are built first, then options spread — body is never lost
async function request(path, method = "GET", body = null, requiresAuth = false) {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions = { method, headers };
  if (body !== null) {
    fetchOptions.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, fetchOptions);

  // Handle non-JSON responses gracefully
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Server returned non-JSON response (status ${res.status})`);
  }

  if (!res.ok) {
    // Surface the real server message (validation error, wrong password etc.)
    const msg = json?.message
      || (json?.data && typeof json.data === "object"
          ? Object.values(json.data).join(", ")
          : null)
      || `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return json; // { success, message, data }
}

// =============================================================================
// AUTH
// =============================================================================
export const authApi = {

  // POST /api/auth/login  { "password": "ubtech@admin2025" }
  login: async (password) => {
    // FIX: explicitly pass password as object — was getting swallowed before
    const json = await request("/auth/login", "POST", { password });
    if (json?.data?.token) {
      saveToken(json.data.token);
    }
    return json;
  },

  logout: () => dropToken(),

  isLoggedIn: () => !!getToken(),

  verify: () => request("/auth/verify", "GET"),
};

// =============================================================================
// GALLERY
// =============================================================================
export const galleryApi = {

  // GET /api/gallery  OR  /api/gallery?category=college-visit
  getAll: (category) =>
    request(`/gallery${category ? `?category=${encodeURIComponent(category)}` : ""}`, "GET"),

  // POST /api/gallery  (admin)
  add: (item) => request("/gallery", "POST", item),

  // DELETE /api/gallery/:id  (admin)
  remove: (id) => request(`/gallery/${id}`, "DELETE"),
};

// =============================================================================
// PROJECTS
// =============================================================================
export const projectsApi = {

  // GET /api/projects  OR  /api/projects?level=BE/BTech
  getAll: (level) =>
    request(`/projects${level ? `?level=${encodeURIComponent(level)}` : ""}`, "GET"),

  // POST /api/projects  (admin)
  add: (project) => request("/projects", "POST", project),

  // DELETE /api/projects/:id  (admin)
  remove: (id) => request(`/projects/${id}`, "DELETE"),
};

// =============================================================================
// UPDATES / ANNOUNCEMENTS
// =============================================================================
export const updatesApi = {

  // GET /api/updates
  getAll: () => request("/updates", "GET"),

  // POST /api/updates  (admin)
  add: (update) => request("/updates", "POST", update),

  // DELETE /api/updates/:id  (admin)
  remove: (id) => request(`/updates/${id}`, "DELETE"),

  // PATCH /api/updates/:id/pin  (admin)
  togglePin: (id) => request(`/updates/${id}/pin`, "PATCH"),
};

// =============================================================================
// CONTACT FORM
// =============================================================================
export const contactApi = {

  // POST /api/contact  (public — student submits form)
  submit: (form) => request("/contact", "POST", form),

  // GET /api/contact/inquiries  (admin)
  getInquiries: (status) =>
    request(`/contact/inquiries${status ? `?status=${encodeURIComponent(status)}` : ""}`, "GET"),

  // PATCH /api/contact/inquiries/:id/status  (admin)
  updateStatus: (id, status) =>
    request(`/contact/inquiries/${id}/status`, "PATCH", { status }),

  // DELETE /api/contact/inquiries/:id  (admin)
  deleteInquiry: (id) => request(`/contact/inquiries/${id}`, "DELETE"),
};

// =============================================================================
// TESTIMONIALS
// =============================================================================
export const testimonialsApi = {
  getAll: ()  => request("/testimonials", "GET"),
  add:    (t) => request("/testimonials", "POST", t),
  remove: (id)=> request(`/testimonials/${id}`, "DELETE"),
};

// =============================================================================
// ADMIN DASHBOARD
// =============================================================================
export const adminApi = {
  getStats: () => request("/admin/stats", "GET"),
};
