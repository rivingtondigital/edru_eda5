import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import LoginView from '../features/auth/components/LoginView';
import RegisterView from '../features/auth/components/RegisterView';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { useUserStore } from '../store/userStore';
// Removed unused store imports if QuestionViewPlaceholder is fully replaced
// import { useAssessmentStore } from '../store/assessmentStore';
// import { useInstrumentStore } from '../store/instrumentStore';

// Instrument Feature Components
import InstrumentListView from '../features/instrument/components/InstrumentListView';
import InstrumentDetailView from '../features/instrument/components/InstrumentDetailView';

// Assessment Feature Components
import QuestionView from '../features/assessment/components/QuestionView';
import AssessmentResultsView from '../features/assessment/components/AssessmentResultsView';
import NotesView from '../features/assessment/components/NotesView';
import SavedAssessmentsView from '../features/assessment/components/SavedAssessmentsView';

// Updated HomePage component
const HomePage = () => {
  const { isAuthenticated, currentUser, logout } = useUserStore();
  const navigate = useNavigate();
  return (
    <div>
      <h2>Home Page</h2>
      {isAuthenticated && currentUser ? (
        <>
          <p>Welcome, {currentUser.username}!</p>
          <p><Link to="/instruments">View & Start Assessments</Link></p>
          <p><Link to="/saved-assessments">View Saved Assessments</Link></p>
          <button onClick={() => {
            logout();
            navigate('/login'); // Redirect to login after logout
          }}>Logout</button>
        </>
      ) : (
        <p>You are not logged in. Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link>.</p>
      )}
    </div>
  );
};

// Component to handle login redirection if user is already authenticated
const PublicAuthRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }
    return children;
};


const AppRouter: React.FC = () => {
  React.useEffect(() => {
    useUserStore.getState().checkAuth(); // Ensure auth state is checked on router init
  }, []);

  // For dynamic nav links, it's better to use a subscribed component or ensure App re-renders on auth change.
  // useUserStore.getState() in JSX can lead to stale UI if not careful.
  // A simple way to ensure re-render is to select a value from the store:
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);


  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/instruments">Instruments</Link></li>
                {/* Link to current assessment if one is active could go here */}
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/login" element={<PublicAuthRoute><LoginView /></PublicAuthRoute>} />
          <Route path="/register" element={<PublicAuthRoute><RegisterView /></PublicAuthRoute>} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<HomePage />} />
            <Route path="instruments" element={<InstrumentListView />} />
            <Route path="instruments/:instrumentId" element={<InstrumentDetailView />} />
            <Route path="assessment/question" element={<QuestionView />} />
            <Route path="assessment/results" element={<AssessmentResultsView />} />
            <Route path="assessment/notes" element={<NotesView />} />
            <Route path="saved-assessments" element={<SavedAssessmentsView />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
