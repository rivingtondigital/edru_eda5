import React, { useEffect } from 'react';
import './App.css';
import AppRouter from './navigation/AppRouter';
import { useUserStore } from './store/userStore';
import { ensureSampleInstruments } from './services/storageService'; // Import

function App() {
  // Get the checkAuth function from the store.
  // Using .getState() here is safe if checkAuth is stable and doesn't change.
  const checkAuth = useUserStore.getState().checkAuth;

  useEffect(() => {
    checkAuth(); // Check auth status when the app component mounts
    ensureSampleInstruments(); // Ensure sample instruments are populated on app load

    // Optional: Add listener for storage changes from other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'ceda_currentUser' || event.key === 'ceda_users' || event.key === 'ceda_instruments') {
        // If current user or users list changes, re-check auth
        if (event.key === 'ceda_currentUser' || event.key === 'ceda_users') {
            checkAuth();
        }
        // If instruments change in another tab, could reload instruments in store (advanced)
        // For now, checkAuth is the main concern for this listener.
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuth]); // checkAuth is stable, so this effect runs once on mount

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
