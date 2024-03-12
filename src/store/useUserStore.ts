import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserDataProps } from '../types/interfaces';
import { MarkerPositionType } from '../types/types';

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

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...defaultUserState,

      actions: {
        setStrength: (id, strength) =>
          set((state) => {
            return {
              ...state,
              userData: {
                ...state.userData,
                [id]: {
                  ...state.userData[id],
                  strength,
                },
              },
            };
          }),
        setFeeling: (id, feeling) =>
          set((state) => {
            return {
              ...state,
              userData: {
                ...state.userData,
                [id]: {
                  ...state.userData[id],
                  feeling,
                },
              },
            };
          }),
        setMarker: (id, data) =>
          set((state) => {
            return {
              ...state,
              userData: {
                ...state.userData,
                [id]: {
                  ...state.userData[id],
                  markerPosition: data,
                },
              },
            };
          }),
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

export default useUserStore;
