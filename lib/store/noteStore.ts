import { create } from "zustand"; 
import { persist } from "zustand/middleware";
import type { NewNote } from "../api";

type DraftState = {
  draft: NewNote;
  updateDraft: (next: NewNote) => void;
  resetDraft: () => void;
};

const defaultNote: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};
export const useDraftStore = create<DraftState>()(
  persist(
    (set) => ({
      draft: defaultNote,
      updateDraft: (next) => set({ draft: next }),
      resetDraft: () => set({ draft: defaultNote }),
    }),
    {
      name: "draft-note-storage",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
