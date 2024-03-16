import React, { useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import classes from '@/components/DraggableImage.module.scss';
import { MarkerPositionType } from '@/types/types';

interface DraggableImageProps {
  markerPosition?: MarkerPositionType;
  onChangeMarkerPositionState: (markerPosition: MarkerPositionType) => void;
  image: string;
}

export function DraggableImage({
  markerPosition,
  onChangeMarkerPositionState,
  image,
}: DraggableImageProps) {
  const nodeRef = useRef(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const markerWidth = 50;
  const markerHeight = 50;
  const onStop = (event: DraggableEvent, data: DraggableData) => {
    const { x } = data;
    const { y } = data;
    onChangeMarkerPositionState({ x, y });
  };

  return (
    <div className={`box ${classes['draggable-image']}`} ref={parentRef}>
      <Draggable
        onStop={(event, data) => onStop(event, data)}
        nodeRef={nodeRef}
        position={{
          x: markerPosition?.x ?? 0,
          y: markerPosition?.y ?? 0,
        }}
      >
        <div
          ref={nodeRef}
          className={`box ${classes['draggable-marker']}`}
          style={{ width: markerWidth, height: markerHeight }}
        />
      </Draggable>
      <img src={image} alt="Bild" width="200px" height="300px" />
    </div>
  );
}
