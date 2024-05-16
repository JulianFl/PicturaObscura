export type FeelingType =
  | 'Joy'
  | 'Love'
  | 'Sadness'
  | 'Disgust'
  | 'Fear'
  | 'Anger'
  | 'Awe'
  | 'Shock';
export interface FeelingProps {
  key: FeelingType;
  color:
    | '#fceb04'
    | '#e3010b'
    | '#0051d4'
    | '#6dd90a'
    | '#17cbdb'
    | '#5e0899'
    | '#fe1faa'
    | '#f78100';
}

export type MarkerPositionType = {
  x: number;
  y: number;
  relativeX: number;
  relativeY: number;
  imageWidth: number;
  imageHeight: number;
  clicked?: boolean;
};

export type UserDataType = {
  markerPosition?: MarkerPositionType;
  checkedFeeling?: FeelingProps;
  strength?: number;
};
