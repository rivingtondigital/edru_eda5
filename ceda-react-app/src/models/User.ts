// Based on ceda.model.User
export interface User {
  id: string; // user_id, typically UUID
  username: string;

  // Password hash should NOT be stored in the frontend model if dealing with a real backend.
  // This is only for client-side simulation or if the app operates entirely offline
  // and stores user data locally (which has security implications).
  passwordHash?: string;

  email?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;

  is_active?: boolean;
  is_admin?: boolean; // Or roles/permissions system

  // Timestamps from Sencha model, generally not directly managed by frontend
  // created_date?: Date;
  // last_login_date?: Date;
  // modified_date?: Date;

  // Preferences or settings specific to the user
  preferences?: Record<string, any>;

  // Other fields as needed, e.g., from Sencha model:
  // client_id, created_by, modified_by, version
}
