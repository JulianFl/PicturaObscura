import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserDataProps } from '@/types/interfaces';
import { MarkerPositionType } from '@/types/types';

type UserState = {
  userData: UserDataProps;
  actions: {
    setMarker: (id: number, draggableData: MarkerPositionType) => void;
    setStrength: (id: number, strength: number) => void;
    setFeeling: (id: number, value: string) => void;
    resetStore: () => void;
  };
};

const defaultUserState: Omit<UserState, 'actions'> = {
  userData: {},
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...defaultUserState,

      actions: {
        setStrength: (id, strength) =>
          set(
            produce((state) => {
              if (!state.userData[id]) {
                state.userData[id] = {};
              }
              state.userData[id].strength = strength;
            })
          ),
        setFeeling: (id, feeling) =>
          set(
            produce((state) => {
              if (!state.userData[id]) {
                state.userData[id] = {};
              }
              state.userData[id].feeling = feeling;
            })
          ),
        setMarker: (id, data) =>
          set(
            produce((state) => {
              if (!state.userData[id]) {
                state.userData[id] = {};
              }
              state.userData[id].markerPosition = { ...data };
            })
          ),
        resetStore: () => set(defaultUserState),
      },
    }),
    {
      name: `USER_STORE`,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ actions, ...rest }) => rest,
      version: 1,
    }
  )
);
