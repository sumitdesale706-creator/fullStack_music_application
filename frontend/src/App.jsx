import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { api } from './api/client';
import { useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import HomeView from './views/HomeView';
import AlbumDetailView from './views/AlbumDetailView';
import AuthModal from './components/modals/AuthModal';
import UploadModal from './components/modals/UploadModal';

export default function App() {
  const { currentUser } = useAuth();
  const [musics, setMusics] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const loadData = async () => {
    try {
      const musicData = await api.getAllMusics();
      setMusics(musicData.musics || []);

      const albumData = await api.getAllAlbums();
      setAlbums(albumData.albums || []);
    } catch (err) {
      console.warn('Backend sync notice:', err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  return (
    <>
      <Routes>
        <Route
          element={
            <MainLayout
              albums={albums}
              musics={musics}
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          }
        >
          <Route index element={<HomeView />} />
          <Route path="album/:albumId" element={<AlbumDetailView />} />
        </Route>
      </Routes>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        availableMusics={musics}
        onRefresh={loadData}
      />
    </>
  );
}