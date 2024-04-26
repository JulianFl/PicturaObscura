import { StepProps } from '@/types/interfaces';
import { FeelingType } from '@/types/types';

const images = import.meta.glob('@/assets/images/*');

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
    image: {
      width: 940,
      height: 627,
      url: Object.keys(images)[0],
      aspectRatio: 'landscape',
    },
  },
  {
    id: 1,
    feelings: FeelingsList,
    image: {
      height: 880,
      width: 1201,
      url: Object.keys(images)[1],
      aspectRatio: 'landscape',
    },
  },
  {
    id: 2,
    feelings: FeelingsList,
    image: {
      height: 627,
      width: 940,
      url: Object.keys(images)[2],
      aspectRatio: 'landscape',
    },
  },
  {
    id: 3,
    feelings: FeelingsList,
    image: {
      width: 1366,
      height: 1425,
      url: Object.keys(images)[3],
      aspectRatio: 'portrait',
    },
  },
  {
    id: 4,
    feelings: FeelingsList,
    image: {
      width: 880,
      height: 682,
      aspectRatio: 'landscape',
      url: Object.keys(images)[4],
    },
  },
  {
    id: 5,
    feelings: FeelingsList,
    image: {
      height: 1379,
      width: 2000,
      aspectRatio: 'landscape',
      url: Object.keys(images)[5],
    },
  },
  {
    id: 6,
    feelings: FeelingsList,
    image: {
      width: 815,
      height: 611,
      aspectRatio: 'landscape',
      url: Object.keys(images)[6],
    },
  },
  {
    id: 7,
    feelings: FeelingsList,
    image: {
      height: 1091,
      width: 818,
      aspectRatio: 'portrait',
      url: Object.keys(images)[7],
    },
  },
  {
    id: 8,
    feelings: FeelingsList,
    image: {
      height: 940,
      width: 626,
      aspectRatio: 'portrait',
      url: Object.keys(images)[8],
    },
  },
  {
    id: 9,
    feelings: FeelingsList,
    image: {
      width: 1600,
      height: 1600,
      aspectRatio: 'square',
      url: Object.keys(images)[9],
    },
  },
  // {
  //   id: 10,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[10],
  // },
  // {
  //   id: 11,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[11],
  // },
  // {
  //   id: 12,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[12],
  // },
  // {
  //   id: 13,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[13],
  // },
  // {
  //   id: 14,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[14],
  // },
  // {
  //   id: 15,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[15],
  // },
  // {
  //   id: 16,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[16],
  // },
  // {
  //   id: 17,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[17],
  // },
  // {
  //   id: 18,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[18],
  // },
  // {
  //   id: 19,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[19],
  // },
  // {
  //   id: 20,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[20],
  // },
  // {
  //   id: 21,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[21],
  // },
  // {
  //   id: 22,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[22],
  // },
  // {
  //   id: 23,
  //   feelings: FeelingsList,
  //   image: Object.keys(images)[23],
  // },
];
