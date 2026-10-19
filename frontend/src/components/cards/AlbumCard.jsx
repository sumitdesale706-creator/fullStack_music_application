import { Disc3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AlbumCard({ album }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/album/${album._id}`)}
      className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828]/60 transition group cursor-pointer"
    >
      <div className="h-36 bg-neutral-800 rounded mb-4 flex items-center justify-center relative text-neutral-500">
        <Disc3 size={40} />
      </div>
      <h3 className="font-semibold text-white truncate">{album.title}</h3>
      <p className="text-xs text-[#b3b3b3] truncate mt-1">
        By {album.artist?.username || 'Artist'}
      </p>
    </div>
  );
}