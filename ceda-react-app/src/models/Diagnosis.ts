// Based on ceda.model.Diagnosis
export interface Diagnosis {
  id: string; // Or diagnosis_id
  name: string;
  text?: string; // Detailed description or criteria
  condition?: string; // The expression/condition that leads to this diagnosis
  instrument_id?: string; // Which instrument this diagnosis belongs to
  // Fields from Sencha model like created_by, created_date etc.
  // are omitted for brevity unless specifically needed for frontend logic.
  // version?: number;
}
