// Based on ceda.model.Version
// Represents the version of an instrument or other versioned entity.

export interface Version {
  id: string; // version_id

  major: number;
  minor: number;
  patch?: number; // Or revision
  build?: string; // Or other qualifier

  version_string?: string; // e.g., "1.2.0", could be auto-generated

  release_date?: Date;
  notes?: string; // Description of changes in this version

  // Context for the version (e.g., which instrument it belongs to)
  // This might be instrument_id if Version is a top-level model,
  // or it could be embedded within an Instrument model directly.
  // For now, assuming it can be a standalone model referenced by others.
  // instrument_id?: string;

  // Fields from Sencha model like created_by, created_date are omitted for now
}
