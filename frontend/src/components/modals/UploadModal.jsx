import { useState } from 'react';
import { Upload, Disc } from 'lucide-react';
import UploadTrackForm from './UploadTrackForm';
import CreateAlbumForm from './CreateAlbumForm';

export default function UploadModal({ isOpen, onClose, availableMusics, onRefresh }) {
  const [mode, setMode] = useState('song');

  if (!isOpen) return null;

  const handleSuccess = () => {
    onRefresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg rounded-lg bg-[#181818] p-6 shadow-2xl border border-neutral-800">
        <div className="flex border-b border-neutral-700 pb-3 mb-4 space-x-4">
          <button
            onClick={() => setMode('song')}
            className={`flex items-center gap-2 pb-2 font-semibold cursor-pointer ${
              mode === 'song' ? 'border-b-2 border-[#1ed760] text-white' : 'text-[#b3b3b3]'
            }`}
          >
            <Upload size={18} /> Upload Track
          </button>
          <button
            onClick={() => setMode('album')}
            className={`flex items-center gap-2 pb-2 font-semibold cursor-pointer ${
              mode === 'album' ? 'border-b-2 border-[#1ed760] text-white' : 'text-[#b3b3b3]'
            }`}
          >
            <Disc size={18} /> Create Album
          </button>
        </div>

        {mode === 'song' ? (
          <UploadTrackForm onSuccess={handleSuccess} />
        ) : (
          <CreateAlbumForm availableMusics={availableMusics} onSuccess={handleSuccess} />
        )}

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