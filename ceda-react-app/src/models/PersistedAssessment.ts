// Based on ceda.model.PersistedAssessment
// This model represents an assessment as it is stored,
// potentially denormalized or with fields specific to persistence.

export interface PersistedAssessment {
  identity: string; // Primary key for the stored assessment
  instrument_id: string;
  instrumentname?: string; // Denormalized
  user_id?: string;
  username?: string; // Denormalized

  creation_date: string; // ISO date string
  last_modified_date: string; // ISO date string
  finish_date?: string; // ISO date string

  version_major?: number;
  version_minor?: number;

  notes?: string;

  triggers?: Record<string, any>;
  backedvalues?: Record<string, any>;
  savedvalues?: Record<string, any>;

  questionstack?: string[];

  percentage?: number;
  complete?: boolean;

  // 'values' from the Sencha model was an association to BasicKeyValue.
  // In a persisted JSON form, it might be an array of such objects.
  values?: Array<{ key: string; value: any; type?: string }>;

  client_id?: string; // As in Sencha model
  // Any other fields specific to the persisted format
}
