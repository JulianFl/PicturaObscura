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
};
