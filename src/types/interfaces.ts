import { FeelingProps, FeelingType, UserDataType } from '@/types/types';

export interface ImageProps {
  url: string;
  width: number;
  height: number;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  credits: string;
}
export interface StepProps {
  id: number;
  feelings: FeelingProps[];
  image: ImageProps;
}

export interface UserDataProps {
  [key: number]: UserDataType;
}
