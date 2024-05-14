import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type VitalsState = {
  lcp?: any;
  inp?: any;
  cls?: any;
  actions: {
    setLcp: (lcp: any) => void;
    setInp: (inp: any) => void;
    setCls: (cls: any) => void;
  };
};

const defaultVitalsState: Omit<VitalsState, 'actions'> = {
  lcp: undefined,
  inp: undefined,
  cls: undefined,
};

export const useVitalsStore = create<VitalsState>()(
  persist(
    (set) => ({
      ...defaultVitalsState,

      actions: {
        setLcp: (lcp: any) =>
          set(
            produce((state) => {
              state.lcp = lcp;
            })
          ),
        setInp: (inp: any) =>
          set(
            produce((state) => {
              state.inp = inp;
            })
          ),

        setCls: (cls: any) =>
          set(
            produce((state) => {
              state.cls = cls;
            })
          ),

        resetStore: () => set(defaultVitalsState),
      },
    }),
    {
      name: `VITALS_STORE`,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);
