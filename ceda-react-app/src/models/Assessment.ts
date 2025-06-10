// Based on ceda.model.Assessment and PersistedAssessment
import { BasicKeyValue } from './BasicKeyValue'; // Assuming this is relevant for 'values'

export interface Assessment {
  id: string; // Usually a UUID, matches 'identity' in PersistedAssessment
  instrument_id: string; // Foreign key to Instrument
  user_id?: string; // Foreign key to User, if assessments are user-specific

  creation_date: Date;
  last_modified_date: Date;
  finish_date?: Date;

  version_major?: number;
  version_minor?: number;

  notes?: string;

  triggers?: Record<string, any>; // Or a more specific TriggerValueMap
  backedvalues?: Record<string, any>; // Values that are 'backed' by prior answers
  savedvalues?: Record<string, any>; // All current values saved by the user

  questionstack?: string[]; // Array of question_ids representing the path taken

  // Fields from PersistedAssessment.js
  identity: string; // This seems to be the primary key, maps to 'id'
  instrumentname?: string; // Denormalized from Instrument
  username?: string; // Denormalized from User
  percentage?: number; // Calculated progress
  complete?: boolean; // Is the assessment finished
  values?: BasicKeyValue[]; // This seems like a list of key-value pairs for saved data

  // client_id is mentioned in PersistedAssessment but its purpose is unclear in frontend model
  // For now, focusing on core fields.
}
