import { Trigger } from './Trigger';

export interface Answer {
    id: string;
    text: string;
    value: any; // string, number, boolean, etc.
    question_id: string; // Belongs to which question
    triggers?: Trigger[]; // Triggers associated with selecting this answer
    // any other fields
}
