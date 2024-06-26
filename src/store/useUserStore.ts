import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserDataProps } from '@/types/interfaces';
import { FeelingProps, FeelingType, MarkerPositionType } from '@/types/types';

type UserState = {
  userData: UserDataProps;
  actions: {
    setMarker: (id: number, draggableData: MarkerPositionType) => void;
    resetMarker: (id: number) => void;
    setStrength: (id: number, strength: number) => void;
    addFeeling: (id: number, feeling: FeelingProps | undefined) => void;
    // removeFeeling: (id: number, value: string) => void;
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
        resetMarker: (id) =>
          set(
            produce((state) => {
              if (!state.userData[id]) {
                return;
              }
              state.userData[id].markerPosition = undefined;
            })
          ),
        addFeeling: (id, feeling) =>
          set(
            produce((state) => {
              if (!state.userData[id]) {
                state.userData[id] = {};
              }
              state.userData[id].checkedFeeling = feeling;
            })
          ),
        // removeFeeling: (id, feeling) =>
        //   set(
        //     produce((state) => {
        //       state.userData[id].checkedFeelings = state.userData[
        //         id
        //       ].checkedFeelings?.filter(
        //         (element: FeelingType) => element !== feeling
        //       );
        //     })
        //   ),
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
