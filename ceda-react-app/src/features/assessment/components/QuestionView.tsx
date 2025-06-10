import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAssessmentStore } from '../../../store/assessmentStore';
import { Answer } from '../../../models/Question'; // Import Answer type from Question.ts

const QuestionView: React.FC = () => {
  const {
    currentAssessment,
    getCurrentQuestion,
    answerQuestion,
    isAssessmentComplete,
    questionStack, // For debugging or more complex navigation logic if needed
    savedValues   // For debugging or conditional rendering based on past answers
  } = useAssessmentStore();

  const navigate = useNavigate();
  const currentQuestion = getCurrentQuestion();

  // Effect to handle navigation once isAssessmentComplete changes
  React.useEffect(() => {
    if (isAssessmentComplete) {
      navigate('/assessment/results', { replace: true });
    }
  }, [isAssessmentComplete, navigate]);

  if (!currentAssessment) {
    // This case should ideally be caught by ProtectedRoute or AppRouter logic
    // if an assessment hasn't been started.
    return <Navigate to="/instruments" replace />;
  }

  // If assessment is complete, the effect above should navigate away.
  // This is a fallback or if navigation hasn't happened yet.
  if (isAssessmentComplete) {
     return <p>Assessment complete. Redirecting to results...</p>;
  }

  if (!currentQuestion) {
    // This can happen if isAssessmentComplete is false but currentQuestionId is null
    // (e.g. rules lead to nowhere, or end of sequential questions without 'finish' rule)
    // Or if instrument/assessment setup was faulty.
    return (
      <div>
        <p>There are no more questions in this assessment, or an error occurred.</p>
        <p><button onClick={() => navigate('/assessment/results', { replace: true })}>View Results</button></p>
        <p><Link to={`/instruments/${currentAssessment.instrument_id}`}>Return to Instrument Details</Link></p>
        <p><Link to="/instruments">Select a New Instrument</Link></p>
      </div>
    );
  }

  const handleAnswerSelect = (selectedAnswer: Answer) => {
    answerQuestion(currentQuestion.id, selectedAnswer);
    // Navigation to next question or results will be handled by changes in currentQuestionId or isAssessmentComplete
  };

  return (
    <div>
      <h3>{currentQuestion.text}</h3>
      <div>
        {currentQuestion.answers.map((ans) => (
          <button
            key={ans.id}
            onClick={() => handleAnswerSelect(ans)}
            style={{ margin: '5px', padding: '10px', display: 'block', minWidth: '100px' }}
          >
            {ans.text}
          </button>
        ))}
      </div>
      <div style={{marginTop: '20px'}}>
        <button onClick={() => navigate('/assessment/notes')} style={{marginRight: '10px'}}>View/Edit Notes</button>
        <button onClick={() => useAssessmentStore.getState().saveAssessment().then(() => alert('Progress Saved!'))} style={{marginRight: '10px'}}>Save Progress</button>
      </div>
      <hr style={{margin: '20px 0'}}/>
      <p><Link to={`/instruments/${currentAssessment.instrument_id}`}>Back to Instrument Details</Link></p>

      {/* For debugging: */}
      {/*
      <h4>Debug Info:</h4>
      <pre style={{fontSize: '10px', backgroundColor: '#f0f0f0', padding: '10px'}}>
        Assessment ID: {currentAssessment.id}<br/>
        Instrument ID: {currentAssessment.instrument_id}<br/>
        Is Complete: {isAssessmentComplete.toString()}<br/>
        Current Question ID: {currentQuestion?.id}<br/>
        Question Stack: {JSON.stringify(questionStack)}<br/>
        Saved Values: {JSON.stringify(savedValues, null, 2)}
      </pre>
      */}
    </div>
  );
};

export default QuestionView;
