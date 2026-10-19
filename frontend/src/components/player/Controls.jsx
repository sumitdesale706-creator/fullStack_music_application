import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

export default function Controls({ isPlaying, onTogglePlay, onNext, onPrev, disabled }) {
  return (
    <div className="flex items-center gap-6 mb-1">
      <button
        onClick={onPrev}
        disabled={disabled}
        className="text-[#b3b3b3] hover:text-white transition disabled:opacity-30 cursor-pointer"
      >
        <SkipBack size={20} />
      </button>
      <button
        onClick={onTogglePlay}
        disabled={disabled}
        className="p-2.5 rounded-full bg-white text-black hover:scale-105 transition disabled:opacity-50 cursor-pointer"
      >
        {isPlaying ? (
          <Pause size={18} fill="currentColor" />
        ) : (
          <Play size={18} fill="currentColor" className="ml-0.5" />
        )}
      </button>
      <button
        onClick={onNext}
        disabled={disabled}
        className="text-[#b3b3b3] hover:text-white transition disabled:opacity-30 cursor-pointer"
      >
        <SkipForward size={20} />
      </button>
    </div>
  );
}