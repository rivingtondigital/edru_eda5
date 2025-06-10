import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../../../store/assessmentStore';

const NotesView: React.FC = () => {
  const { currentAssessment, notes, updateNotes, saveAssessment, currentQuestionId } = useAssessmentStore();
  const [currentNotes, setCurrentNotes] = useState(notes || "");
  const navigate = useNavigate();

  useEffect(() => {
    // Update local notes state if it changes in the store (e.g. on assessment load)
    setCurrentNotes(notes || "");
  }, [notes]);

  if (!currentAssessment) {
    return (
        <div>
            <p>No active assessment. Cannot view or edit notes.</p>
            <button onClick={() => navigate('/instruments')}>Select an Instrument</button>
        </div>
    );
  }

  const handleSaveNotesAndReturn = () => {
    updateNotes(currentNotes);
    // Optionally, trigger a full assessment save. This ensures notes are persisted with other data.
    saveAssessment().then(() => {
        // alert('Notes and assessment progress saved!'); // Alert can be intrusive
        console.log('Notes and assessment progress saved.');
        // Navigate back to the current question, or to a suitable fallback if no current question.
        if (currentQuestionId) {
            navigate(`/assessment/question`); // Assuming QuestionView handles currentQuestionId from store
        } else {
            // If there's no current question (e.g., assessment just started, or completed but notes edited)
            // navigate to instrument details or results page.
            navigate(`/instruments/${currentAssessment.instrument_id}`);
        }
    }).catch(err => {
        console.error("Failed to save assessment with notes:", err);
        alert("Error saving notes and assessment. Please try again.");
    });
  };

  const handleCancelAndReturn = () => {
    // Revert local changes if any, by re-fetching from store (though not strictly necessary if not saved)
    setCurrentNotes(notes || "");
    if (currentQuestionId) {
        navigate(`/assessment/question`);
    } else {
        navigate(`/instruments/${currentAssessment.instrument_id}`);
    }
  };

  return (
    <div>
      <h2>Assessment Notes</h2>
      <p>For Instrument: {currentAssessment.instrumentname || currentAssessment.instrument_id}</p>
      <textarea
        value={currentNotes}
        onChange={(e) => setCurrentNotes(e.target.value)}
        rows={10}
        cols={60} // Slightly wider
        placeholder="Enter your notes here..."
        style={{ width: '100%', boxSizing: 'border-box', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <br />
      <div style={{marginTop: '10px'}}>
        <button onClick={handleSaveNotesAndReturn} style={{marginRight: '10px'}}>Save Notes & Return</button>
        <button onClick={handleCancelAndReturn}>Cancel & Return</button>
      </div>
    </div>
  );
};

export default NotesView;
