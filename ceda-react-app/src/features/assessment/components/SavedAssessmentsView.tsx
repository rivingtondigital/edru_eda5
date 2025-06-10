import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../../../store/assessmentStore';
import { listSavedAssessments, SavedAssessmentListItem, deleteSavedAssessment as deleteAssessmentFromStorage } from '../../../services/storageService'; // Added listSavedAssessments

// This prefix is defined in storageService.ts. If not exported, define it here or pass from props/context.
// For simplicity, defining it here, but ensure it matches the one in storageService.ts.
const ASSESSMENT_KEY_PREFIX = 'assessment_';

const SavedAssessmentsView: React.FC = () => {
  const [savedAssessments, setSavedAssessments] = useState<SavedAssessmentListItem[]>([]);
  const { loadAssessment, currentAssessment } = useAssessmentStore(); // Added currentAssessment to check if one is active
  const navigate = useNavigate();

  useEffect(() => {
    setSavedAssessments(listSavedAssessments()); // Called directly
  }, []);

  const handleLoadAssessment = async (assessmentIdFromListItem: string) => {
    // The 'id' in SavedAssessmentListItem is the actual assessment ID (e.g., 'as_TIMESTAMP_RANDOM')
    // The loadAssessment function in store expects this actual ID.
    if (currentAssessment && currentAssessment.id !== assessmentIdFromListItem) {
        if (!window.confirm('Loading a different assessment will clear any unsaved progress in the current one. Continue?')) {
            return;
        }
    }
    await loadAssessment(assessmentIdFromListItem);
    navigate('/assessment/question');
  };

  const handleDeleteAssessment = (assessmentIdToDelete: string) => {
    // assessmentIdToDelete is the actual ID (e.g., 'as_TIMESTAMP_RANDOM')
    if (window.confirm('Are you sure you want to delete this saved assessment? This action cannot be undone.')) {
      deleteAssessmentFromStorage(assessmentIdToDelete);
      setSavedAssessments(listSavedAssessments()); // Refresh list - Called directly
      // If the deleted assessment was the current one, clear it from the store
      if (currentAssessment && currentAssessment.id === assessmentIdToDelete) {
        useAssessmentStore.setState({
            currentAssessment: null,
            questionStack: [],
            currentQuestionId: null,
            isAssessmentComplete: false,
            savedValues: {},
            notes: ""
        });
      }
    }
  };

  return (
    <div>
      <h2>Saved Assessments</h2>
      {savedAssessments.length === 0 ? (
        <p>No assessments saved yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {savedAssessments.map((item) => (
            <li key={item.key} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
              <div><strong>{item.name || `Assessment for Instrument: ${item.instrumentName || item.instrumentId || 'Unknown'}`}</strong></div>
              <div>Saved ID: {item.id}</div>
              <div>Timestamp: {new Date(item.timestamp).toLocaleString()}</div>
              <div style={{marginTop: '5px'}}>
                <button onClick={() => handleLoadAssessment(item.id)} style={{ marginRight: '10px' }}>Load</button>
                <button onClick={() => handleDeleteAssessment(item.id)} style={{ color: 'white', backgroundColor: '#dc3545' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')} style={{marginTop: '20px'}}>Back to Home</button>
    </div>
  );
};

export default SavedAssessmentsView;
