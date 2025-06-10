import { create } from 'zustand';
import { Instrument } from '../models/Instrument';
import { storageService, ensureSampleInstruments } from '../services/storageService'; // ensureSampleInstruments imported

const INSTRUMENTS_STORAGE_KEY = 'ceda_instruments'; // Consistent key from storageService

interface InstrumentState {
  currentInstrument: Instrument | null;
  instrumentList: Instrument[];
  loading: boolean;
  error: string | null;
  setCurrentInstrumentById: (instrumentId: string | null) => void; // Changed to ID based, allow null to clear
  loadInstruments: () => Promise<void>;
  getInstrumentById: (instrumentId: string) => Instrument | undefined;
}

export const useInstrumentStore = create<InstrumentState>((set, get) => ({
  currentInstrument: null,
  instrumentList: [],
  loading: false,
  error: null,
  setCurrentInstrumentById: (instrumentId) => {
    if (instrumentId === null) {
      set({ currentInstrument: null });
      return;
    }
    const instrument = get().instrumentList.find(inst => inst.id === instrumentId);
    set({ currentInstrument: instrument || null, error: instrument ? null : `Instrument with ID ${instrumentId} not found.` });
  },
  loadInstruments: async () => {
    set({ loading: true, error: null });
    try {
      ensureSampleInstruments(); // Make sure sample data is there if storage is empty
      const instruments = storageService.getItem<Instrument[]>(INSTRUMENTS_STORAGE_KEY) || [];
      set({ instrumentList: instruments, loading: false });
      if (instruments.length === 0) {
        console.warn("No instruments found in storage after ensuring samples. Check storageService.ts logic if this is unexpected.");
      }
    } catch (e: any) {
      console.error("Failed to load instruments:", e);
      set({ error: e.message || 'Failed to load instruments', loading: false });
    }
  },
  getInstrumentById: (instrumentId) => {
    return get().instrumentList.find(inst => inst.id === instrumentId);
  }
}));
