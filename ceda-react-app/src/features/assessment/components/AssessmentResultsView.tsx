import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAssessmentStore } from '../../../store/assessmentStore';
import { useInstrumentStore } from '../../../store/instrumentStore'; // To get instrument details

const AssessmentResultsView: React.FC = () => {
  const { currentAssessment, savedValues, notes, questionStack } = useAssessmentStore();
  const { getInstrumentById } = useInstrumentStore(); // Get function to fetch instrument details
  const navigate = useNavigate();

  if (!currentAssessment) {
    return (
      <div>
        <p>No assessment data available.</p>
        <p><Link to="/instruments">Start an assessment.</Link></p>
      </div>
    );
  }

  const instrument = getInstrumentById(currentAssessment.instrument_id);

  // Optional: Function to clear assessment state and navigate away
  const handleFinishAndClear = () => {
    // Here you might want to:
    // 1. Finalize saving (if not already done or if there's a "finalize" step)
    // 2. Clear the assessment state from Zustand store
    //    useAssessmentStore.setState({ currentAssessment: null, questionStack: [], ...etc. });
    // 3. Navigate to a neutral page, like the instruments list or home.
    console.log("Placeholder: Finalize and clear assessment state.");
    // Example: Clear state (this is a simplified reset, a dedicated action in store might be better)
    useAssessmentStore.setState({
        currentAssessment: null,
        questionStack: [],
        currentQuestionId: null,
        savedValues: {},
        notes: "",
        isAssessmentComplete: false,
        isDirty: false
    });
    navigate("/instruments");
  };

  return (
    <div>
      <h2>Assessment Results</h2>
      <p>
        <strong>Instrument:</strong> {instrument ? instrument.name : currentAssessment.instrument_id}
        {instrument?.version?.version_string && ` (v${instrument.version.version_string})`}
      </p>
      <p><strong>Assessment ID:</strong> {currentAssessment.id}</p>
      {/* Placeholder for completion date - this would ideally be stored in Assessment model */}
      <p><strong>Completed On:</strong> {currentAssessment.finish_date ? new Date(currentAssessment.finish_date).toLocaleDateString() : new Date().toLocaleDateString()}</p>

      <h3>Saved Answers:</h3>
      {Object.keys(savedValues).length > 0 ? (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {Object.entries(savedValues).map(([questionId, value]) => {
            const question = instrument?.questions.find(q => q.id === questionId);
            return (
              <li key={questionId} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                <strong>{question ? question.text : `Question ID: ${questionId}`}:</strong> <br/>
                <span style={{paddingLeft: '15px'}}>{JSON.stringify(value, null, 2)}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No answers were saved.</p>
      )}


      {notes && (
        <>
          <h3>Notes:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px' }}>{notes}</pre>
        </>
      )}

      {questionStack && questionStack.length > 0 && (
        <>
         {/* <h4>Question Path (Debug):</h4>
          <pre>{JSON.stringify(questionStack)}</pre> */}
        </>
      )}

      <hr style={{margin: '20px 0'}} />
      <button onClick={handleFinishAndClear} style={{marginRight: '10px'}}>Finish & Clear Assessment</button>
      <Link to="/instruments">Back to Instruments List</Link>
    </div>
  );
};
export default AssessmentResultsView;
