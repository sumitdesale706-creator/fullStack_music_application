import { useAuth } from '../../context/AuthContext';
import { LogIn, LogOut } from 'lucide-react';

export default function Navbar({ onOpenAuth }) {
  const { currentUser, logout } = useAuth();

  return (
    <header className="flex justify-end items-center mb-6">
      {currentUser ? (
        <div className="flex items-center gap-4 bg-[#181818] px-4 py-2 rounded-full border border-neutral-800">
          <span className="text-sm font-semibold">{currentUser.username}</span>
          <span className="text-xs bg-neutral-700 text-[#1ed760] px-2 py-0.5 rounded capitalize">
            {currentUser.role}
          </span>
          <button onClick={logout} className="text-[#b3b3b3] hover:text-white cursor-pointer" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={onOpenAuth}
          className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:scale-105 transition cursor-pointer"
        >
          <LogIn size={16} /> Log In
        </button>
      )}
    </header>
  );
}