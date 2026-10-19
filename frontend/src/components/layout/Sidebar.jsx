import { Disc3, Home, Search, Library, PlusCircle } from 'lucide-react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ albums, onOpenUpload }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { albumId: currentAlbumId } = useParams();

  return (
    <aside className="w-64 bg-black flex flex-col p-4 space-y-4 select-none">
      <div 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 px-2 py-3 text-white cursor-pointer"
      >
        <Disc3 size={32} className="text-[#1ed760]" />
        <span className="font-bold text-xl tracking-tight">Spotify Clone</span>
      </div>

      <nav className="space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 px-3 py-2 font-medium rounded-md w-full transition ${
              isActive ? 'text-white bg-[#282828]/50' : 'text-[#b3b3b3] hover:text-white'
            }`
          }
        >
          <Home size={22} />
          <span>Home</span>
        </NavLink>
        <button
          disabled
          className="flex items-center gap-4 px-3 py-2 text-neutral-600 font-medium rounded-md w-full cursor-not-allowed"
        >
          <Search size={22} />
          <span>Search</span>
        </button>
      </nav>

      <div className="flex-1 bg-[#181818] rounded-lg p-4 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between text-[#b3b3b3] mb-4">
          <div className="flex items-center gap-2">
            <Library size={22} />
            <span className="font-semibold text-sm">Your Library</span>
          </div>
          {currentUser?.role === 'artist' && (
            <button onClick={onOpenUpload} title="Upload Track / Album" className="hover:text-white cursor-pointer">
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div className="overflow-y-auto space-y-2 flex-1 pr-1">
          {albums.map((album) => {
            const isSelected = currentAlbumId === album._id;
            return (
              <div
                key={album._id}
                onClick={() => navigate(`/album/${album._id}`)}
                className={`p-2 rounded cursor-pointer transition flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#282828] text-white'
                    : 'hover:bg-[#282828]/40 text-[#b3b3b3]'
                }`}
              >
                <div className="h-10 w-10 bg-neutral-700 rounded flex items-center justify-center flex-shrink-0 text-neutral-400">
                  <Disc3 size={18} />
                </div>
                <div className="truncate">
                  <p className="text-sm font-semibold truncate text-white">{album.title}</p>
                  <p className="text-xs text-[#b3b3b3] truncate">
                    Album • {album.artist?.username || 'Artist'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}