import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Disc3, Play } from 'lucide-react';
import { api } from '../api/client';
import { usePlayer } from '../context/PlayerContext';

export default function AlbumDetailView() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api.getAlbumById(albumId)
      .then((data) => {
        if (isMounted) setAlbum(data.album);
      })
      .catch((err) => {
        alert(`Error fetching album: ${err.message}`);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [albumId]);

  if (loading) {
    return <div className="p-8 text-[#b3b3b3]">Loading album details...</div>;
  }

  if (!album) {
    return (
      <div className="p-8 text-[#b3b3b3]">
        <p>Album not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-white underline cursor-pointer">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="text-xs font-semibold uppercase tracking-wider text-[#b3b3b3] hover:text-white mb-6 block cursor-pointer"
      >
        ← Back to Main Library
      </button>

      <div className="flex items-end gap-6 mb-8">
        <div className="h-44 w-44 bg-neutral-800 shadow-2xl rounded flex items-center justify-center text-neutral-500">
          <Disc3 size={64} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider">Album</p>
          <h1 className="text-5xl font-extrabold mt-1 mb-3 text-white">{album.title}</h1>
          <p className="text-sm text-[#b3b3b3]">
            Created by <span className="text-white font-medium">{album.artist?.username}</span> •{' '}
            {album.musics?.length || 0} songs
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-12 text-xs uppercase tracking-wider text-[#b3b3b3] border-b border-neutral-800 pb-2 px-4">
          <span className="col-span-1">#</span>
          <span className="col-span-11">Title</span>
        </div>
        {album.musics && album.musics.length > 0 ? (
          album.musics.map((track, idx) => (
            <div
              key={track._id}
              onClick={() => playTrack(track, album.musics)}
              className="grid grid-cols-12 items-center p-3 rounded hover:bg-white/10 cursor-pointer group text-sm"
            >
              <span className="col-span-1 text-[#b3b3b3] group-hover:text-white flex items-center">
                <Play size={14} className="hidden group-hover:block text-[#1ed760] mr-2" />
                <span className="group-hover:hidden">{idx + 1}</span>
              </span>
              <span className="col-span-11 font-medium text-white flex items-center gap-2">
                {track.title}
              </span>
            </div>
          ))
        ) : (
          <p className="p-4 text-sm text-[#b3b3b3]">No tracks registered in this album.</p>
        )}
      </div>
    </div>
  );
}