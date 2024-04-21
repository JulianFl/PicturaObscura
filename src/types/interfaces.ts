import { FeelingType, UserDataType } from '@/types/types';

export interface ImageProps {
  url: string;
  width: number;
  height: number;
  aspectRatio: 'landscape' | 'portrait' | 'square';
}
export interface StepProps {
  id: number;
  feelings: FeelingType[];
  image: ImageProps;
}

export interface UserDataProps {
  [key: number]: UserDataType;
}
