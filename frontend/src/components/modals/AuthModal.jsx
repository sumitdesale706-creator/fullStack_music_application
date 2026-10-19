import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'artist',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login({
          username: formData.username || undefined,
          email: formData.email || undefined,
          password: formData.password,
        });
      } else {
        await register(formData);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md rounded-lg bg-[#181818] p-8 shadow-2xl border border-neutral-800">
        <h2 className="mb-6 text-2xl font-bold text-white">
          {isLogin ? 'Log in to Spotify' : 'Sign up for Spotify'}
        </h2>

        {error && (
          <div className="mb-4 rounded bg-red-500/20 p-3 text-sm text-red-400 border border-red-500/40">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#b3b3b3]">Username</label>
            <input
              type="text"
              required={!isLogin}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full rounded bg-[#282828] p-3 text-white outline-none focus:ring-2 focus:ring-[#1ed760]"
              placeholder="Username"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#b3b3b3]">Email</label>
            <input
              type="email"
              required={!isLogin}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded bg-[#282828] p-3 text-white outline-none focus:ring-2 focus:ring-[#1ed760]"
              placeholder="name@domain.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#b3b3b3]">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded bg-[#282828] p-3 text-white outline-none focus:ring-2 focus:ring-[#1ed760]"
              placeholder="Password"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm font-medium text-[#b3b3b3]">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded bg-[#282828] p-3 text-white outline-none focus:ring-2 focus:ring-[#1ed760]"
              >
                <option value="artist">Artist (Required for upload / album routes)</option>
                <option value="user">User</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#1ed760] py-3 font-bold text-black transition hover:scale-105 disabled:opacity-50 mt-4 cursor-pointer"
          >
            {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#b3b3b3]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="font-bold text-white underline hover:text-[#1ed760] cursor-pointer"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 block w-full text-center text-xs text-neutral-500 hover:text-white cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}