
import React, { useState, useCallback, useEffect } from 'react';
import { Artist, View } from './types';
import { INITIAL_ARTISTS, APP_TITLE } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import TimetableView from './components/timetable/TimetableView';
import ArtistListView from './components/artistlist/ArtistListView';
import ArtistDetailModal from './components/ArtistDetailModal';
import BottomNavigation from './components/BottomNavigation';
import Snackbar from './components/ui/Snackbar';

const App: React.FC = () => {
  const [artists, setArtists] = useLocalStorage<Artist[]>('warpedTourArtists', INITIAL_ARTISTS);
  const [currentView, setCurrentView] = useState<View>(View.Timetable);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' | 'info'; key: number } | null>(null);

  // Initialize with seed data if local storage is empty
  useEffect(() => {
    const storedArtists = window.localStorage.getItem('warpedTourArtists');
    if (!storedArtists || JSON.parse(storedArtists).length === 0) {
      setArtists(INITIAL_ARTISTS);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount


  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setSnackbar({ message, type, key: Date.now() });
  };

  const handleSaveArtist = useCallback(async (artistToSave: Artist) => {
    try {
      setArtists((prevArtists) => {
        const existingIndex = prevArtists.findIndex((a) => a.id === artistToSave.id);
        if (existingIndex > -1) {
          const updatedArtists = [...prevArtists];
          updatedArtists[existingIndex] = artistToSave;
          return updatedArtists;
        }
        return [...prevArtists, artistToSave];
      });
      showSnackbar(`Artist "${artistToSave.name}" saved successfully!`, 'success');
      setIsModalOpen(false); // Close modal on successful save from modal's perspective
    } catch (e) {
      console.error("Failed to save artist:", e);
      showSnackbar('Save failed. Please try again.', 'error');
      throw e; // Re-throw to allow modal to handle its state
    }
  }, [setArtists]);

  const handleSelectArtistForEdit = useCallback((artist: Artist) => {
    setEditingArtist(artist);
    setIsModalOpen(true);
  }, []);

  const handleAddNewArtist = useCallback(() => {
    setEditingArtist(null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingArtist(null); // Clear editing artist when modal is closed
  }, []);


  const renderView = () => {
    switch (currentView) {
      case View.Timetable:
        return <TimetableView artists={artists} onSelectArtist={handleSelectArtistForEdit} />;
      case View.ArtistList:
        return <ArtistListView artists={artists} onSelectArtist={handleSelectArtistForEdit} onAddNewArtist={handleAddNewArtist} />;
      default:
        return <TimetableView artists={artists} onSelectArtist={handleSelectArtistForEdit} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen font-sans bg-slate-50 text-slate-800">
      <header className="bg-white shadow-sm p-4 text-center sticky top-0 z-30 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600">{APP_TITLE}</h1>
      </header>

      <main className="flex-grow overflow-y-auto pb-16"> {/* pb-16 for bottom nav */}
        {renderView()}
      </main>

      <BottomNavigation currentView={currentView} onSetView={setCurrentView} />

      {isModalOpen && (
        <ArtistDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveArtist}
          artistToEdit={editingArtist}
        />
      )}
      
      {snackbar && (
        <Snackbar
          key={snackbar.key} // Important for re-triggering animation if message is the same
          message={snackbar.message}
          type={snackbar.type}
          onDismiss={() => setSnackbar(null)}
          onRetry={snackbar.type === 'error' ? () => { /* Implement retry logic if needed */ showSnackbar('Retrying...','info'); } : undefined}
        />
      )}
    </div>
  );
};

export default App;