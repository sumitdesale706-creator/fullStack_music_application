import { usePlayer } from '../../context/PlayerContext';
import TrackInfo from './TrackInfo';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import VolumeBar from './VolumeBar';

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    togglePlay,
    handleNext,
    handlePrev,
    seek,
    changeVolume,
    toggleMute,
  } = usePlayer();

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-[#181818] border-t border-neutral-800 px-4 flex items-center justify-between z-40">
      <TrackInfo track={currentTrack} />
      <div className="flex flex-col items-center max-w-xl w-2/4">
        <Controls
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onNext={handleNext}
          onPrev={handlePrev}
          disabled={!currentTrack}
        />
        <ProgressBar currentTime={currentTime} duration={duration} onSeek={seek} />
      </div>
      <VolumeBar
        volume={volume}
        isMuted={isMuted}
        onChangeVolume={changeVolume}
        onToggleMute={toggleMute}
      />
    </footer>
  );
}