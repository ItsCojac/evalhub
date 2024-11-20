import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface HistoryState<T> {
  past: T[];
  present: T | null;
  future: T[];
}

interface UndoRedoState<T> extends HistoryState<T> {
  canUndo: boolean;
  canRedo: boolean;
  set: (newPresent: T) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

const MAX_HISTORY_LENGTH = 50;

export const createUndoRedoStore = <T>() =>
  create<UndoRedoState<T>>()(
    devtools(
      (set, get) => ({
        past: [],
        present: null,
        future: [],
        canUndo: false,
        canRedo: false,

        set: (newPresent: T) =>
          set((state) => {
            const past = [...state.past, state.present].filter(
              Boolean
            ) as T[];
            if (past.length > MAX_HISTORY_LENGTH) {
              past.shift();
            }
            return {
              past,
              present: newPresent,
              future: [],
              canUndo: true,
              canRedo: false,
            };
          }),

        undo: () =>
          set((state) => {
            if (state.past.length === 0) return state;

            const previous = state.past[state.past.length - 1];
            const newPast = state.past.slice(0, -1);

            return {
              past: newPast,
              present: previous,
              future: [state.present, ...state.future].filter(
                Boolean
              ) as T[],
              canUndo: newPast.length > 0,
              canRedo: true,
            };
          }),

        redo: () =>
          set((state) => {
            if (state.future.length === 0) return state;

            const next = state.future[0];
            const newFuture = state.future.slice(1);

            return {
              past: [...state.past, state.present].filter(
                Boolean
              ) as T[],
              present: next,
              future: newFuture,
              canUndo: true,
              canRedo: newFuture.length > 0,
            };
          }),

        clear: () =>
          set({
            past: [],
            present: null,
            future: [],
            canUndo: false,
            canRedo: false,
          }),
      }),
      { name: 'UndoRedo Store' }
    )
  );