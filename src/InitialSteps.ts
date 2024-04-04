import { StepProps } from '@/types/interfaces';
import { FeelingType } from '@/types/types';

export const FeelingsList: FeelingType[] = [
  'Freude',
  'Trauer',
  'Ekel',
  'Angst',
  'Wut',
  'Ehrfurcht',
  'Schock',
  'No Emotion',
];
export const INITIAL_STEPS: StepProps[] = [
  {
    id: 0,
    feelings: FeelingsList,
    // image: '',
    image: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: 1,
    feelings: FeelingsList,
    // image: '',
    image: 'https://picsum.photos/id/238/600/300',
  },
  {
    id: 2,
    feelings: FeelingsList,
    // image: '',
    image: 'https://picsum.photos/id/239/400/300',
  },
  {
    id: 3,
    feelings: FeelingsList,
    // image: '',
    image: 'https://picsum.photos/id/240/100/700',
  },
  {
    id: 4,
    feelings: FeelingsList,
    // image: '',
    image: 'https://picsum.photos/id/241/200/300',
  },
  {
    id: 5,
    feelings: FeelingsList,
    // image: '',
    image: 'https://picsum.photos/id/242/400/400',
  },
];
