import { useState } from 'react';
import { api } from '../../api/client';

export default function CreateAlbumForm({ availableMusics, onSuccess }) {
  const [albumTitle, setAlbumTitle] = useState('');
  const [selectedMusicIds, setSelectedMusicIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleSelect = (id) => {
    setSelectedMusicIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!albumTitle) {
      setError('Album title is required.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await api.createAlbum({
        title: albumTitle,
        musics: selectedMusicIds,
      });
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
        <label className="block text-sm text-[#b3b3b3] mb-1">Album Title</label>
        <input
          type="text"
          required
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
          className="w-full rounded bg-[#282828] p-2.5 text-white outline-none focus:ring-1 focus:ring-[#1ed760]"
          placeholder="Album Title"
        />
      </div>

      <div>
        <label className="block text-sm text-[#b3b3b3] mb-2">Select Tracks for Album</label>
        <div className="max-h-48 overflow-y-auto space-y-2 rounded bg-[#282828]/50 p-2 border border-neutral-700">
          {availableMusics.length === 0 ? (
            <p className="text-xs text-neutral-400">No tracks loaded in main view.</p>
          ) : (
            availableMusics.map((m) => (
              <label
                key={m._id}
                className="flex items-center gap-3 p-2 rounded hover:bg-[#282828] cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedMusicIds.includes(m._id)}
                  onChange={() => toggleSelect(m._id)}
                  className="accent-[#1ed760]"
                />
                <span className="font-medium text-white">{m.title}</span>
                <span className="text-xs text-[#b3b3b3] ml-auto">
                  {m.artist?.username || 'Unknown'}
                </span>
              </label>
            ))
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 mt-2 bg-[#1ed760] text-black font-bold rounded-full disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Creating...' : 'Create Album'}
      </button>
    </form>
  );
}