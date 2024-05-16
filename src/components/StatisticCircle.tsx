import React from 'react';

import { MARKER_HEIGHT, MARKER_WIDTH } from '@/components/DraggableImage';
import classes from '@/routes/statistics.module.scss';
import { MarkerPositionType, UserDataType } from '@/types/types';

interface StatisticCircleProps {
  data: UserDataType;
  imageBounding?: DOMRect;
}
export function StatisticCircle({ data, imageBounding }: StatisticCircleProps) {
  const left = (_markerPosition: MarkerPositionType | undefined) => {
    if (!_markerPosition || !imageBounding) {
      return 0;
    }
    const imageWidth = imageBounding?.width;

    const factorX = imageWidth / _markerPosition.imageWidth;
    const newMarkerWidth = MARKER_WIDTH - MARKER_WIDTH * factorX;

    const relativeMarkerWidth = newMarkerWidth / 2;

    // Calculate the new x position relative to the old image size
    const newX = _markerPosition.relativeX * factorX;

    return newX - relativeMarkerWidth;
  };

  const top = (_markerPosition: MarkerPositionType | undefined) => {
    if (!_markerPosition || !imageBounding) {
      return 0;
    }
    const imageHeight = imageBounding?.height;
    const factorY = imageHeight / _markerPosition.imageHeight;
    const relativeMarkerHeight = MARKER_HEIGHT - MARKER_HEIGHT * factorY;
    const newY = _markerPosition.relativeY * factorY - relativeMarkerHeight;

    return newY;
  };

  return (
    <div
      className={`${classes.circle}`}
      style={{
        left: `${left(data.markerPosition)}px`,
        top: `${top(data.markerPosition)}px`,
        width: MARKER_WIDTH,
        height: MARKER_HEIGHT,
      }}
    >
      <span style={{ backgroundColor: data.checkedFeeling?.color }} />
    </div>
  );
}
