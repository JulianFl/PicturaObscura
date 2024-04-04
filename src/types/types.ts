export type FeelingType =
  | 'Freude'
  | 'Trauer'
  | 'Ekel'
  | 'Angst'
  | 'Wut'
  | 'Ehrfurcht'
  | 'Schock'
  | 'No Emotion';

export type MarkerPositionType = {
  x: number;
  y: number;
  relativeX: number;
  relativeY: number;
  percentageX: number;
  percentageY: number;
  imageSizeX: number;
  imageSizeY: number;
};

export type UserDataType = {
  markerPosition?: MarkerPositionType;
  checkedFeelings?: FeelingType[];
  strength?: number;
};
