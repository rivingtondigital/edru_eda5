import { Instrument } from '../models/Instrument';
import { Question } from '../models/Question'; // Make sure Question model is comprehensive for this
import { Version } from '../models/Version';
import { Assessment } from '../models/Assessment'; // Added Assessment import

// Basic localStorage wrapper
// Encryption/decryption logic (e.g., with sjcl) will be added later if needed.

const getItem = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error);
      return null;
    }
  }
  return null;
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item "${key}":`, error);
  }
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

export const storageService = {
  getItem,
  setItem,
  removeItem,
  // listSavedAssessments and deleteSavedAssessment will be added below after definition
};

// --- Instrument Sample Data Logic ---

const INSTRUMENTS_STORAGE_KEY = 'ceda_instruments';

const getSampleInstruments = (): Instrument[] => {
  const sampleVersion: Version = { id: 'v1.0.0a', major: 1, minor: 0, patch: 0, build: 'a', version_string: '1.0.0a' };

  const sampleQuestion1: Question = {
    id: 'q1', question_id: 'q1', text: 'Sample Question 1: How are you feeling?', initial: true,
    question_type: 'select_one',
    answers: [
      { id: 'a1_1', text: 'Good', value: 'good' },
      { id: 'a1_2', text: 'Okay', value: 'okay' },
      { id: 'a1_3', text: 'Bad', value: 'bad' },
    ],
    rules: [{id: 'r1', expression: 'true', target_question_id: 'q2'}]
  };
  const sampleQuestion2: Question = {
    id: 'q2', question_id: 'q2', text: 'Sample Question 2: What is your favorite color?',
    question_type: 'select_one',
    answers: [
      { id: 'a2_1', text: 'Red', value: 'red' },
      { id: 'a2_2', text: 'Blue', value: 'blue' },
    ],
    rules: [{id: 'r2', expression: 'true', target_action: 'finish'}]
  };
  return [
    {
      id: 'instr_1',
      name: 'General Well-being Assessment',
      description: 'A short survey about your general well-being.',
      version: sampleVersion,
      questions: [sampleQuestion1, sampleQuestion2],
      initial_question_id: 'q1'
    },
    {
      id: 'instr_2',
      name: 'Color Preference Survey',
      description: 'A quick survey about colors.',
      version: sampleVersion,
      questions: [sampleQuestion2],
      initial_question_id: 'q2'
    },
  ];
};

export const ensureSampleInstruments = (): void => {
  const instruments = storageService.getItem<Instrument[]>(INSTRUMENTS_STORAGE_KEY);
  if (!instruments || instruments.length === 0) {
    storageService.setItem(INSTRUMENTS_STORAGE_KEY, getSampleInstruments());
    console.log('Sample instruments populated into localStorage.');
  } else {
    // console.log('Instruments already exist in localStorage or are empty after check; not populating samples.');
  }
};


// --- Saved Assessment Listing Logic ---
export interface SavedAssessmentListItem {
  id: string; // assessment_id (actual ID like 'as_TIMESTAMP_RANDOM')
  key: string; // The full localStorage key (e.g. 'assessment_as_TIMESTAMP_RANDOM')
  instrumentId?: string;
  instrumentName?: string; // Added for better display
  timestamp: number;
  name?: string; // Display name for the saved assessment item
}

const ASSESSMENT_KEY_PREFIX = 'assessment_';

export const listSavedAssessments = (): SavedAssessmentListItem[] => {
  const items: SavedAssessmentListItem[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(ASSESSMENT_KEY_PREFIX)) {
      const assessment = getItem<Assessment>(key);
      if (assessment) {
        const timestamp = parseInt(assessment.id.split('_')[1] || '0', 10); // Assuming ID like 'as_TIMESTAMP_RANDOM'
        items.push({
          id: assessment.id, // The actual assessment ID
          key: key,          // The full localStorage key
          instrumentId: assessment.instrument_id, // Corrected to instrument_id
          instrumentName: assessment.instrumentname, // Use stored instrument name
          timestamp: timestamp,
          name: `${assessment.instrumentname || 'Assessment'} (Saved: ${new Date(timestamp).toLocaleString()})`
        });
      }
    }
  }
  return items.sort((a, b) => b.timestamp - a.timestamp); // Sort newest first
};

export const deleteSavedAssessment = (assessmentId: string): void => {
    // assessmentId here is the actual ID, not the full key.
    removeItem(ASSESSMENT_KEY_PREFIX + assessmentId);
    console.log(`Removed assessment: ${ASSESSMENT_KEY_PREFIX}${assessmentId}`);
};

// Re-export storageService with new methods if preferred, or allow direct import of new functions
// For simplicity, new functions are exported directly.
// If we wanted them on storageService object:
// storageService.listSavedAssessments = listSavedAssessments;
// storageService.deleteSavedAssessment = deleteSavedAssessment;
