import { FeelingType, UserDataType } from '@/types/types';

export interface StepProps {
  id: number;
  feelings: FeelingType[];
  image: string;
}

export interface UserDataProps {
  [key: number]: UserDataType;
}
