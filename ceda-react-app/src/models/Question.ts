// Based on ceda.model.Question
import { Trigger } from './Trigger'; // For rules that might activate triggers

// Renamed from AnswerOption to Answer, and question_id removed as it's implicit.
// This structure is used for defining answer choices within a Question.
export interface Answer {
  id: string;
  text: string;
  value: any;
  display_value?: string;
  sequence?: number;
  triggers?: Trigger[];
  is_default?: boolean;
  is_exclusive?: boolean;
  concept_id?: string;
  // target?: string; // Optional: for direct navigation from answer (as per subtask comment)
}

// Defines a rule for navigation, diagnosis, or triggering events
export interface Rule {
  id: string;
  expression: string;

  target_question_id?: string;
  target_action?: 'finish' | 'diagnosis' | 'trigger' | string;

  diagnosis_id?: string;
  diagnosis_name?: string;

  endifdiagnosis?: boolean;
  comment?: boolean;

  trigger?: {
    identifier: string;
    value: any;
  };

  sequence?: number;
  operator?: string;
  value_to_compare?: any;
  context_question_id?: string;
}

export interface Question {
  id: string;
  question_id: string; // Keep if original data uses this (e.g. external mapping)

  shortname?: string;
  text: string;
  tooltip?: string;

  question_type: string;

  initial?: boolean;

  answers: Answer[]; // Now uses the Answer interface defined above
  rules?: Rule[];

  layout?: string;
  style?: Record<string, string>;

  sequence?: number;
  mandatory?: boolean;
  concept_id?: string;
}
