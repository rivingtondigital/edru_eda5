import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

const ProtectedRoute: React.FC = () => {
  // Attempt to initialize auth state from storage on component load.
  // This is crucial for scenarios where the app is reloaded or opened in a new tab.
  // The checkAuth() action reads from localStorage and updates the store's state.
  React.useEffect(() => {
    useUserStore.getState().checkAuth();
  }, []);

  // Get isAuthenticated from the store *after* checkAuth has had a chance to run.
  // Using useUserStore() directly subscribes the component to store updates.
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isLoading = useUserStore((state) => state.isLoading); // Potentially show a loader

  const location = useLocation();

  // If authentication state is still being determined (e.g. checkAuth was async, or isLoading is true),
  // you might want to show a loading spinner here.
  // For this purely client-side setup, checkAuth is synchronous, so isLoading might not be strictly needed here
  // unless checkAuth itself becomes async (e.g. validating a token with a backend).
  if (isLoading && !isAuthenticated) {
     // Optional: return a loading indicator if checkAuth were async and taking time
     // return <div>Loading authentication status...</div>;
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Render the child route components.
};

export default ProtectedRoute;
