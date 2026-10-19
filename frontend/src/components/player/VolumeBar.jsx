import { Volume2, VolumeX } from 'lucide-react';

export default function VolumeBar({ volume, isMuted, onChangeVolume, onToggleMute }) {
  return (
    <div className="flex items-center justify-end gap-3 w-1/4">
      <button onClick={onToggleMute} className="text-[#b3b3b3] hover:text-white cursor-pointer">
        {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={(e) => onChangeVolume(Number(e.target.value))}
        className="w-24 h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer accent-[#1ed760]"
      />
    </div>
  );
}