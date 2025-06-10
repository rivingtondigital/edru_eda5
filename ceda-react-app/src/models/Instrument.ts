import { Question } from './Question';
import { Version } from './Version'; // Assuming Version.ts will be created
import { Diagnosis } from './Diagnosis'; // Instruments can have diagnoses
import { Trigger } from './Trigger'; // Instruments can define global triggers

export interface Instrument {
  id: string; // instrument_id
  name: string;
  description?: string;

  questions: Question[]; // Embedded questions for simplicity for now
  // Alternatively, could be question_ids: string[] if questions are fetched separately

  initial_question_id?: string; // Starting question_id, was initialQuestionId in example

  version_id?: string; // Foreign key to Version model
  version?: Version; // Embedded version information

  diagnoses?: Diagnosis[]; // Possible diagnoses for this instrument
  triggers?: Trigger[]; // Global triggers for this instrument? Or part of questions/answers

  // Fields from Sencha model like created_by, created_date etc.
  // are omitted for frontend model unless necessary.
  // published?: boolean;
  // settings?: Record<string, any>; // For instrument-specific settings
}
