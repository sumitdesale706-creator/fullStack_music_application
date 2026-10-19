import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PlayerBar from '../player/PlayerBar';

export default function MainLayout({
  albums,
  musics,
  onOpenAuth,
  onOpenUpload,
}) {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden pb-24">
      <Sidebar
        albums={albums}
        onOpenUpload={onOpenUpload}
      />
      <main className="flex-1 m-2 bg-gradient-to-b from-[#1f1f1f] to-[#121212] rounded-lg overflow-y-auto p-8">
        <Navbar onOpenAuth={onOpenAuth} />
        {/* Pass musics and albums down via context prop */}
        <Outlet context={{ musics, albums }} />
      </main>
      <PlayerBar />
    </div>
  );
}