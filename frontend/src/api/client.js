const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
};


export const api = {
  // POST /api/auth/register
  register: (payload) =>
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    }).then(handleResponse),

  // POST /api/auth/login
  login: (payload) =>
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    }).then(handleResponse),

  // POST /api/auth/logout
  logout: () =>
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(handleResponse),

  // GET /api/music/
  getAllMusics: () =>
    fetch('/api/music/', {
      credentials: 'include',
    }).then(handleResponse),

  // GET /api/music/albums
  getAllAlbums: () =>
    fetch('/api/music/albums', {
      credentials: 'include',
    }).then(handleResponse),

  // GET /api/music/albums/:albumId
  getAlbumById: (albumId) =>
    fetch(`/api/music/albums/${albumId}`, {
      credentials: 'include',
    }).then(handleResponse),

  // POST /api/music/upload
  createMusic: (formData) =>
    fetch('/api/music/upload', {
      method: 'POST',
      body: formData, // contains 'title' and file uploaded as 'music'
      credentials: 'include',
    }).then(handleResponse),

  // POST /api/music/album
  createAlbum: (payload) =>
    fetch('/api/music/album', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), // { title, musics: [] }
      credentials: 'include',
    }).then(handleResponse),
};