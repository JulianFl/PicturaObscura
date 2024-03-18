import { FeelingType, MarkerPositionType } from '@/types/types';

export interface StepProps {
  id: number;
  feelings: FeelingType[];
  image: string;
}

export interface UserDataProps {
  [key: number]: {
    markerPosition?: MarkerPositionType;
    checkedFeelings?: FeelingType[];
    strength?: number;
  };
}
