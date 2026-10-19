import { useOutletContext } from 'react-router-dom';
import TrackCard from '../components/cards/TrackCard';
import AlbumCard from '../components/cards/AlbumCard';
import { usePlayer } from '../context/PlayerContext';

export default function HomeView() {
  const { musics, albums } = useOutletContext();
  const { playTrack } = usePlayer();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Latest Tracks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {musics.map((music) => (
          <TrackCard
            key={music._id}
            track={music}
            onPlay={() => playTrack(music, musics)}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Featured Albums</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <AlbumCard
            key={album._id}
            album={album}
          />
        ))}
      </div>
    </div>
  );
}