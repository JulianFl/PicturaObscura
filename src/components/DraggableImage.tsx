import React, { useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import classes from '@/components/DraggableImage.module.scss';
import { useUserStore } from '@/store/useUserStore';

export function DraggableImage() {
  const { setMarker } = useUserStore((state) => state.actions);
  const { id } = useParams();
  const pageId = Number(id);

  const markerPosition = useUserStore(
    (state) => state.userData[pageId]?.markerPosition
  );

  const nodeRef = useRef(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const markerWidth = 50;
  const markerHeight = 50;
  const onStop = (event: DraggableEvent, data: DraggableData) => {
    const { x } = data;
    const { y } = data;
    setMarker(pageId, { x, y });
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
      <img
        src={INITIAL_STEPS[pageId].image}
        alt="Bild"
        width="200px"
        height="300px"
      />
    </div>
  );
}
