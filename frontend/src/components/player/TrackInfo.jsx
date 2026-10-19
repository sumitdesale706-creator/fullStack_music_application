import { Music2 } from 'lucide-react';

export default function TrackInfo({ track }) {
  return (
    <div className="flex items-center gap-3 w-1/4 min-w-[180px]">
      <div className="h-14 w-14 bg-neutral-800 rounded flex items-center justify-center flex-shrink-0 text-neutral-400">
        <Music2 size={24} />
      </div>
      <div className="truncate">
        <h4 className="text-white text-sm font-medium truncate">
          {track ? track.title : 'No Track Selected'}
        </h4>
        <p className="text-[#b3b3b3] text-xs truncate">
          {track?.artist?.username || 'Unknown Artist'}
        </p>
      </div>
    </div>
  );
}