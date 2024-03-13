import React, { useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { MarkerPositionType } from '../types/types';
import classes from './DraggableImage.module.scss';

interface DraggableImageProps {
  markerPosition: MarkerPositionType;
  onChangeMarkerPositionState: (markerPosition: MarkerPositionType) => void;
  image: string;
}

function DraggableImage({
  markerPosition,
  onChangeMarkerPositionState,
  image,
}: DraggableImageProps) {
  const nodeRef = useRef(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const markerWidth = 50;
  const markerHeight = 50;
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    const { x } = data;
    const { y } = data;
    onChangeMarkerPositionState({ x, y });
  };
  return (
    <div className={`box ${classes['draggable-image']}`} ref={parentRef}>
      <Draggable
        onStop={(e, data) => onStop(e, data)}
        nodeRef={nodeRef}
        position={{
          x: markerPosition.x,
          y: markerPosition.y,
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

export default DraggableImage;
