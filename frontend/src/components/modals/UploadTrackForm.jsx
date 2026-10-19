import { useState } from 'react';
import { api } from '../../api/client';

export default function UploadTrackForm({ onSuccess }) {
  const [songTitle, setSongTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !songTitle) {
      setError('Title and audio file are required.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', songTitle);
      formData.append('music', file);

      await api.createMusic(formData);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded bg-red-500/20 p-2 text-sm text-red-400 border border-red-500/30">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm text-[#b3b3b3] mb-1">Track Title</label>
        <input
          type="text"
          required
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          className="w-full rounded bg-[#282828] p-2.5 text-white outline-none focus:ring-1 focus:ring-[#1ed760]"
          placeholder="Song Title"
        />
      </div>

      <div>
        <label className="block text-sm text-[#b3b3b3] mb-1">Audio File</label>
        <input
          type="file"
          required
          accept="audio/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-sm text-[#b3b3b3] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#282828] file:text-white hover:file:bg-neutral-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 mt-2 bg-[#1ed760] text-black font-bold rounded-full disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Uploading...' : 'Publish Track'}
      </button>
    </form>
  );
}