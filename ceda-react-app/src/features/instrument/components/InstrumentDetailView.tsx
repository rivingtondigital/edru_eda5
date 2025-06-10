import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInstrumentStore } from '../../../store/instrumentStore';
import { useAssessmentStore } from '../../../store/assessmentStore';
import { Instrument } from '../../../models/Instrument';

const InstrumentDetailView: React.FC = () => {
  const { instrumentId } = useParams<{ instrumentId: string }>();
  const navigate = useNavigate();

  const {
    currentInstrument: deprecatedCurrentInstrument, // Avoid using this if relying on getInstrumentById
    setCurrentInstrumentById,
    getInstrumentById,
    loadInstruments, // To ensure instruments are loaded if navigating directly
    instrumentList
  } = useInstrumentStore();

  const { startAssessment, currentAssessment } = useAssessmentStore();

  // Local state to hold the instrument to display, fetched via ID
  const [instrumentToDisplay, setInstrumentToDisplay] = useState<Instrument | null | undefined>(undefined);

  useEffect(() => {
    // Ensure instruments are loaded. If not, load them.
    if (instrumentList.length === 0) {
      loadInstruments();
    }
  }, [instrumentList, loadInstruments]);

  useEffect(() => {
    if (instrumentId) {
      // Attempt to get instrument from already loaded list
      const inst = getInstrumentById(instrumentId);
      setInstrumentToDisplay(inst);
      // If the instrument store also maintains a 'currentInstrument', set it.
      // This might be redundant if components always use getInstrumentById.
      setCurrentInstrumentById(instrumentId);
    } else {
      setInstrumentToDisplay(null); // No ID, no instrument
    }
  }, [instrumentId, setCurrentInstrumentById, getInstrumentById, instrumentList]); // Re-run if instrumentList changes

  // Redirect if an assessment is already in progress with this instrument
  useEffect(() => {
    if (currentAssessment && currentAssessment.instrument_id === instrumentId && currentAssessment.questionstack && currentAssessment.questionstack.length > 0) {
        // Check if currentAssessment has a valid question to navigate to
        const lastQuestionId = currentAssessment.questionstack[currentAssessment.questionstack.length - 1];
        if (lastQuestionId) {
            navigate(`/assessment/question/${lastQuestionId}`); // Navigate to the specific question
        } else {
            // Fallback if questionstack is somehow empty but assessment exists (edge case)
            navigate('/assessment/question');
        }
    }
  }, [currentAssessment, instrumentId, navigate]);


  const handleStartAssessment = () => {
    if (instrumentToDisplay) {
      startAssessment(instrumentToDisplay);
      // Navigate to the first question. Assessment store should set up initial questionStack.
      // The actual first question ID will be derived from currentAssessment.questionStack in QuestionView.
      navigate(`/assessment/question`); // Generic assessment question route
    }
  };

  if (instrumentToDisplay === undefined && instrumentList.length > 0) {
    // Instruments loaded, but specific one not found by ID
    return <p>Instrument with ID '{instrumentId}' not found. <Link to="/instruments">Back to list.</Link></p>;
  }

  if (!instrumentToDisplay) {
      // Still loading instruments or instrumentId is invalid
      return <p>Loading instrument details...</p>;
  }


  return (
    <div>
      <h2>{instrumentToDisplay.name}</h2>
      <p>{instrumentToDisplay.description}</p>
      <p>
        Version:
        {instrumentToDisplay.version?.version_string
          ? instrumentToDisplay.version.version_string
          : `${instrumentToDisplay.version?.major}.${instrumentToDisplay.version?.minor}`
        }
      </p>
      {instrumentToDisplay.questions && instrumentToDisplay.questions.length > 0 ? (
        <button onClick={handleStartAssessment} disabled={!instrumentToDisplay.initial_question_id}>
          {instrumentToDisplay.initial_question_id ? 'Start Assessment' : 'Cannot start (No initial question ID)'}
        </button>
      ) : (
        <p>This instrument has no questions and cannot be started.</p>
      )}
      <hr/>
      <Link to="/instruments">Back to Instrument List</Link>
    </div>
  );
};

export default InstrumentDetailView;
