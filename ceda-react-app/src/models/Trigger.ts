// Based on ceda.model.Trigger
// A trigger represents an action or event that occurs when certain conditions are met,
// often as a result of an answer or a rule.

export interface Trigger {
  id: string; // trigger_id
  name?: string; // A descriptive name for the trigger

  // What kind of action this trigger performs
  // e.g., 'set_value', 'show_message', 'navigate', 'call_function'
  action_type: string;

  // Parameters for the action, structure depends on action_type
  // For 'set_value': { variable_name: string, value: any, scope?: 'assessment' | 'instrument' }
  // For 'show_message': { message_text: string, level?: 'info' | 'warning' | 'error' }
  // For 'navigate': { target_id: string } // e.g. question_id or a special target
  action_params: Record<string, any>;

  condition?: string; // Optional condition for this trigger to fire, if not implicitly fired by association

  // Context: where this trigger is defined or to what it applies
  instrument_id?: string;
  question_id?: string; // If specific to a question
  answer_id?: string;   // If specific to an answer

  // Fields from Sencha model like created_by, created_date are omitted for now
  // version?: number;
}
