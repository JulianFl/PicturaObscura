import cityImage from '@/assets/images/city.jpeg';
import dogImage from '@/assets/images/dog.jpeg';
import imageImage from '@/assets/images/image.jpeg';
import plantImage from '@/assets/images/plant.jpeg';
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
    image: dogImage,
  },
  {
    id: 1,
    feelings: FeelingsList,
    // image: '',
    image: cityImage,
  },
  {
    id: 2,
    feelings: FeelingsList,
    // image: '',
    image: imageImage,
  },
  {
    id: 3,
    feelings: FeelingsList,
    // image: '',
    image: plantImage,
  },
  {
    id: 4,
    feelings: FeelingsList,
    // image: '',
    image: '@/assets/images/portrait.jpeg',
  },
];
