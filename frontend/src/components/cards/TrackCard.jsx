import { Music, Play } from 'lucide-react';

export default function TrackCard({ track, onPlay }) {
  return (
    <div
      onClick={onPlay}
      className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828]/60 transition group cursor-pointer"
    >
      <div className="h-36 bg-neutral-800 rounded mb-4 flex items-center justify-center relative text-neutral-500">
        <Music size={40} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlay();
          }}
          className="absolute bottom-2 right-2 p-3 bg-[#1ed760] rounded-full shadow-lg text-black opacity-0 group-hover:opacity-100 transition transform group-hover:translate-y-0 translate-y-2 hover:scale-105 cursor-pointer"
        >
          <Play size={18} fill="currentColor" />
        </button>
      </div>
      <h3 className="font-semibold text-white truncate">{track.title}</h3>
      <p className="text-xs text-[#b3b3b3] truncate mt-1">
        {track.artist?.username || 'Artist'}
      </p>
    </div>
  );
}