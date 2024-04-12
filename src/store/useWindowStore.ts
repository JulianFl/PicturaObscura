import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WindowState = {
  width?: number;
  height?: number;
  actions: {
    setWindowSize: (width: number, height: number) => void;
  };
};

const defaultWindowState: Omit<WindowState, 'actions'> = {
  width: undefined,
  height: undefined,
};

export const useWindowStore = create<WindowState>()(
  persist(
    (set) => ({
      ...defaultWindowState,

      actions: {
        setWindowSize: (width, height) =>
          set(
            produce((state) => {
              state.width = width;
              state.height = height;
            })
          ),

        resetStore: () => set(defaultWindowState),
      },
    }),
    {
      name: `WINDOW_STORE`,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);
