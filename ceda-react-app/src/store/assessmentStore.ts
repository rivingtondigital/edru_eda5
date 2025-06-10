import { create } from 'zustand';
import { Assessment } from '../models/Assessment';
import { Instrument } from '../models/Instrument';
// Ensure Answer and Rule are correctly exported. Assuming they are part of Question.ts for now or separate files.
// If they are inline interfaces in Question.ts, they might need to be exported explicitly or moved.
// For this implementation, assuming Answer is a type/interface available for import.
import { Question, Answer, Rule } from '../models/Question';
import { storageService } from '../services/storageService';
import { useInstrumentStore } from './instrumentStore';

interface AssessmentState {
  currentAssessment: Assessment | null;
  questionStack: string[];
  currentQuestionId: string | null;
  triggers: Record<string, any>;
  savedValues: Record<string, any>;
  notes: string;
  isAssessmentComplete: boolean;
  isLoading: boolean; // Retained from previous
  error: string | null;   // Retained from previous
  startAssessment: (instrument: Instrument) => void;
  answerQuestion: (questionId: string, answer: Answer) => void;
  updateNotes: (notes: string) => void;
  saveAssessment: () => Promise<void>;
  loadAssessment: (assessmentId: string) => Promise<void>;
  isDirty: boolean;
  getCurrentQuestion: () => Question | null;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  currentAssessment: null,
  questionStack: [],
  currentQuestionId: null,
  triggers: {},
  savedValues: {},
  notes: "",
  isDirty: false,
  isAssessmentComplete: false,
  isLoading: false,
  error: null,

  startAssessment: (instrument) => {
    if (!instrument || !instrument.id) {
        console.error("startAssessment: Invalid instrument provided.", instrument);
        set({ error: "Cannot start assessment with invalid instrument data.", isLoading: false, currentAssessment: null, questionStack: [], currentQuestionId: null });
        return;
    }
    const initialQuestionId = instrument.initial_question_id || (instrument.questions && instrument.questions.length > 0 ? instrument.questions[0].id : null);

    if (!initialQuestionId) {
        console.error("startAssessment: Instrument has no initial question or no questions.", instrument);
        set({ error: "Instrument has no initial question.", isLoading: false, currentAssessment: null, questionStack: [], currentQuestionId: null });
        return;
    }

    const newAssessment: Assessment = {
      id: `as_${Date.now()}_${Math.random().toString(36).substring(2,10)}`,
      instrument_id: instrument.id,
      creation_date: new Date(),
      last_modified_date: new Date(),
      identity: '', // Will be set to id
      questionstack: [initialQuestionId], // Initialize stack with the first question
      triggers: {},
      savedvalues: {},
      notes: "",
      version_major: instrument.version?.major,
      version_minor: instrument.version?.minor,
      instrumentname: instrument.name,
      complete: false,
      percentage: 0,
    };
    newAssessment.identity = newAssessment.id;

    set({
      currentAssessment: newAssessment,
      questionStack: newAssessment.questionstack,
      currentQuestionId: initialQuestionId,
      triggers: {},
      savedValues: {},
      notes: "",
      isDirty: true,
      isAssessmentComplete: false,
      isLoading: false,
      error: null,
    });
  },

  answerQuestion: (questionId, selectedAnswer) => {
    const currentQ = get().getCurrentQuestion();
    if (!currentQ || currentQ.id !== questionId || !get().currentAssessment) {
        console.warn("answerQuestion: Current question mismatch or no assessment. Aborting.", { qId: questionId, currentQId: currentQ?.id });
        return;
    }

    const newSavedValues = { ...get().savedValues, [questionId]: selectedAnswer.value };

    let nextQuestionId: string | null = null;
    let assessmentComplete = false;

    if (currentQ.rules && currentQ.rules.length > 0) {
      for (const rule of currentQ.rules) {
        // Simplified rule evaluation:
        // 1. Check if rule.expression is 'true' (literal string)
        // 2. Check if rule.expression refers to the selected answer's value (e.g., "answer.value == 'good'")
        // This is still very basic. A real engine would parse and evaluate complex expressions.
        let ruleMatched = false;
        if (rule.expression.toLowerCase() === 'true') {
            ruleMatched = true;
        } else if (rule.expression.toLowerCase() === `answer.value == '${selectedAnswer.value}'`) { // Basic check for answer value match
            ruleMatched = true;
        }
        // Add more conditions for rule.expression if needed, e.g. checking selectedAnswer.id

        if (ruleMatched) {
            if (rule.target_action === 'finish' || rule.target_question_id === 'finish') { // Adjusted to check both target fields
                assessmentComplete = true;
                nextQuestionId = null; // Explicitly nullify next question if finishing
                break;
            }
            if (rule.target_question_id) {
                nextQuestionId = rule.target_question_id;
                break;
            }
        }
      }
    }

    if (!nextQuestionId && !assessmentComplete) {
        const instrument = useInstrumentStore.getState().getInstrumentById(get().currentAssessment!.instrument_id);
        if (instrument) {
            const currentQuestionIndex = instrument.questions.findIndex(q => q.id === questionId);
            if (currentQuestionIndex !== -1 && currentQuestionIndex < instrument.questions.length - 1) {
                nextQuestionId = instrument.questions[currentQuestionIndex + 1].id;
            } else {
                assessmentComplete = true;
            }
        } else {
            // Should not happen if assessment started correctly
            console.error("answerQuestion: Could not find instrument for current assessment.");
            assessmentComplete = true; // Fallback to complete if instrument data is missing
        }
    }

    const oldQuestionStack = get().questionStack;
    let newQuestionStack = [...oldQuestionStack];

    if (!assessmentComplete && nextQuestionId) {
        // Avoid adding duplicates if user somehow re-answers current question leading to same next one
        if (oldQuestionStack[oldQuestionStack.length -1] !== nextQuestionId) {
             newQuestionStack.push(nextQuestionId);
        }
    }

    set({
      savedValues: newSavedValues,
      currentAssessment: { ...get().currentAssessment!, savedvalues: newSavedValues, last_modified_date: new Date(), complete: assessmentComplete },
      questionStack: newQuestionStack,
      currentQuestionId: assessmentComplete ? null : nextQuestionId,
      isAssessmentComplete: assessmentComplete,
      isDirty: true,
    });
  },

  getCurrentQuestion: (): Question | null => {
    const state = get();
    if (!state.currentAssessment || !state.currentQuestionId) return null;
    const instrument = useInstrumentStore.getState().getInstrumentById(state.currentAssessment.instrument_id);
    return instrument?.questions.find(q => q.id === state.currentQuestionId) || null;
  },

  updateNotes: (notes) => set((state) => ({
      notes,
      isDirty: true,
      currentAssessment: state.currentAssessment ? { ...state.currentAssessment, notes, last_modified_date: new Date() } : null,
  })),

  saveAssessment: async () => {
    const assessment = get().currentAssessment;
    if (assessment) {
        set({ isLoading: true, error: null });
        const dataToSave: Assessment = {
            ...assessment,
            questionstack: get().questionStack,
            triggers: get().triggers,
            savedvalues: get().savedValues,
            notes: get().notes,
            complete: get().isAssessmentComplete, // Save completion status
            last_modified_date: new Date(),
            // Consider saving currentQuestionId if you want to resume from that exact point
            // For example: currentQuestionIdPersist: get().currentQuestionId
        };
        try {
            await storageService.setItem(`assessment_${assessment.id}`, dataToSave);
            set({ isDirty: false, isLoading: false, currentAssessment: dataToSave });
        } catch (e: any) {
            set({ isLoading: false, error: e.message || "Failed to save assessment."});
        }
    } else {
        set({ isLoading: false });
    }
  },
  loadAssessment: async (assessmentId: string) => {
    set({ isLoading: true, error: null });
    try {
        const loadedAssessment = await storageService.getItem<Assessment>(`assessment_${assessmentId}`);
        if (loadedAssessment) {
            const stack = loadedAssessment.questionstack || [];
            // Determine currentQuestionId: if complete, null. Else, last on stack.
            // Or, if you saved currentQuestionIdPersist, use that.
            const isComplete = loadedAssessment.complete || false;
            const currentQId = isComplete ? null : (stack.length > 0 ? stack[stack.length -1] : null);

            set({
                currentAssessment: loadedAssessment,
                questionStack: stack,
                currentQuestionId: currentQId,
                triggers: loadedAssessment.triggers || {},
                savedValues: loadedAssessment.savedvalues || {},
                notes: loadedAssessment.notes || "",
                isAssessmentComplete: isComplete,
                isDirty: false,
                isLoading: false,
            });
        } else {
            set({ currentAssessment: null, questionStack:[], currentQuestionId: null, isLoading: false, error: `Assessment ${assessmentId} not found.`});
        }
    } catch (e: any) {
        set({ currentAssessment: null, questionStack:[], currentQuestionId: null, isLoading: false, error: e.message || `Failed to load assessment ${assessmentId}.`});
    }
  },
}));
