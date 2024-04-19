import React, { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import classes from '@/components/DraggableImage.module.scss';
import { useUserStore } from '@/store/useUserStore';
import { UserDataType } from '@/types/types';

export const MARKER_WIDTH = 50;
export const MARKER_HEIGHT = 50;
export function DraggableImage() {
  const { setMarker, resetMarker } = useUserStore((state) => state.actions);
  const { id } = useParams();
  const pageId = Number(id);
  const [aspectRatio, setAspectRatio] = useState<number>();

  const markerPosition = useUserStore(
    (state) => state.userData[pageId]?.markerPosition
  );

  const userData = useUserStore((state) => state.userData);
  const nodeRef = useRef(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const onStop = (event: DraggableEvent, data: DraggableData) => {
    const { node, x, y } = data;

    const imageElement = imgRef.current;
    if (imageElement) {
      const imageRect = imageElement.getBoundingClientRect();

      // const relativeX =
      //   node.getBoundingClientRect().x - imageRect.left + MARKER_WIDTH / 2;
      // const relativeY =
      //   node.getBoundingClientRect().y - imageRect.top + MARKER_HEIGHT;
      //
      const relativeX = node.getBoundingClientRect().x - imageRect.left;
      const relativeY = node.getBoundingClientRect().y - imageRect.top;

      const percentageX = (relativeX / imageRect.width) * 100;
      const percentageY = (relativeY / imageRect.height) * 100;

      if (relativeY > imageRect.height) {
        console.log('out of bounds, below');
      }
      if (relativeY < 0) {
        console.log('out of bounds, above');
      }
      if (relativeX > imageRect.width) {
        console.log('out of bounds, right');
      }
      if (relativeX < 0) {
        console.log('out of bounds, left');
      }

      setMarker(pageId, {
        x,
        y,
        relativeX,
        relativeY,
        percentageX,
        percentageY,
        imageSizeX: imageRect.width,
        imageSizeY: imageRect.height,
      });
    }
  };
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (!rootRef.current) {
      return;
    }
    const img = event.currentTarget;
    const aspectRatioImage = img.naturalWidth / img.naturalHeight;

    setAspectRatio(aspectRatioImage);
  };

  useEffect(() => {
    const handleResize = () => {
      const userDataEntries: [string, UserDataType][] =
        Object.entries(userData);

      const elementsWithMarkerPosition = userDataEntries.filter(
        ([key, value]) => value.markerPosition !== undefined
      );

      if (elementsWithMarkerPosition !== undefined) {
        // console.log(elementsWithMarkerPosition);
        elementsWithMarkerPosition.forEach((element) => {
          const index = element[0];
          resetMarker(Number(index));
        });
      }
    };
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userData]);

  // TODO Marker hat nicht die Maße 50 zu 50

  return (
    <div className={`box column ${classes['draggable-image']} `} ref={rootRef}>
      <img
        src={INITIAL_STEPS[pageId].image}
        ref={imgRef}
        onLoad={handleImageLoad}
        alt="Bild"
        width="auto"
        height="auto"
        className={
          aspectRatio && aspectRatio <= 1.2
            ? classes.portrait
            : classes.landscape
        }
      />
      <Draggable
        onStop={(event, data) => onStop(event, data)}
        nodeRef={nodeRef}
        position={{
          x: markerPosition?.x ?? 0,
          y: markerPosition?.y ?? 0,
        }}
      >
        <svg
          ref={nodeRef}
          className={`box ${classes['draggable-marker']}`}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          height={MARKER_HEIGHT}
          viewBox="0 -960 960 960"
          width={MARKER_WIDTH}
        >
          <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
        </svg>
      </Draggable>
    </div>
  );
}
