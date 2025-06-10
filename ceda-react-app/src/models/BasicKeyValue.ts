// Based on ceda.model.BasicKeyValue
export interface BasicKeyValue {
  id?: string; // Optional, might not be needed if just a data structure
  key: string;
  value: any;
  type?: string; // e.g., 'string', 'number', 'boolean', 'date'
  // created_by?: string; // From Sencha model, might be overkill for frontend
  // created_date?: Date;
  // modified_by?: string;
  // modified_date?: Date;
  // version?: number;
}
