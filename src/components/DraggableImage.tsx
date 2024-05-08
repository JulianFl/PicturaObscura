import React, { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import classes from '@/components/DraggableImage.module.scss';
import { IsLoading } from '@/components/IsLoading';
import { useUserStore } from '@/store/useUserStore';
import { getImageUrl } from '@/utils/image-util';

export const MARKER_WIDTH = 50;
export const MARKER_HEIGHT = 50;
export function DraggableImage() {
  const { setMarker, resetMarker } = useUserStore((state) => state.actions);
  const { id } = useParams();
  const pageId = Number(id);

  const markerPosition = useUserStore(
    (state) => state.userData[pageId]?.markerPosition
  );
  const [isLoading, setIsLoading] = useState(true);
  const userData = useUserStore((state) => state.userData);
  const nodeRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [grabbed, setGrabbed] = useState(false);
  const imageClickHandler = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    const imageElement = imgRef.current;
    const markerElement = nodeRef.current;
    console.log('clicked');
    if (imageElement && markerElement) {
      const imageRect = imageElement.getBoundingClientRect();
      const markerRect = markerElement.getBoundingClientRect();
      const relativeX = event.clientX - markerRect.left;
      const relativeY = event.clientY - markerRect.top;
      const oldMarkerPosition = markerPosition || { x: 0, y: 0 };
      setMarker(pageId, {
        x: oldMarkerPosition.x + relativeX - MARKER_WIDTH / 2,
        y: oldMarkerPosition.y + relativeY - MARKER_HEIGHT,
        relativeX: oldMarkerPosition.x + relativeX,
        relativeY: oldMarkerPosition.y + relativeY,
        imageWidth: imageRect.width,
        imageHeight: imageRect.height,
        clicked: true,
      });
    }
  };
  const onStop = (event: DraggableEvent, data: DraggableData) => {
    event.stopPropagation();

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
      if (relativeY + MARKER_HEIGHT > imageRect.height) {
        console.log('out of bounds, below');

        return;
      }
      if (relativeY + MARKER_HEIGHT < 0) {
        console.log('out of bounds, above');

        return;
      }
      if (relativeX + MARKER_HEIGHT / 2 > imageRect.width) {
        console.log('out of bounds, right');

        return;
      }
      if (relativeX + MARKER_HEIGHT / 2 < 0) {
        console.log('out of bounds, left');

        return;
      }
      // setStartPosition({
      //   x: startRef.current?.getBoundingClientRect().left ?? 0,
      //   y: startRef.current?.getBoundingClientRect().top ?? 0,
      // });
      console.log(
        'onStop',
        x,
        y,
        relativeX,
        relativeY,
        imageRect.width,
        imageRect.height
      );
      setGrabbed(false);
      setMarker(pageId, {
        x,
        y,
        relativeX,
        relativeY,
        imageWidth: imageRect.width,
        imageHeight: imageRect.height,
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const imgRect = imgRef.current?.getBoundingClientRect();
      if (markerPosition && imgRect && markerPosition.y && markerPosition.x) {
        const factorX = imgRect.width / markerPosition.imageWidth;
        const factorY = imgRect.height / markerPosition.imageHeight;

        const relativeMarkerHeight = MARKER_HEIGHT - MARKER_HEIGHT * factorY;
        const newMarkerWidth = MARKER_WIDTH - MARKER_WIDTH * factorX;

        const relativeMarkerWidth = newMarkerWidth / 2;
        const x = markerPosition.x * factorX - relativeMarkerWidth;
        const y = markerPosition.y * factorY - relativeMarkerHeight;
        const relativeX =
          markerPosition.relativeX * factorX - relativeMarkerWidth;
        const relativeY =
          markerPosition.relativeY * factorY - relativeMarkerHeight;

        setMarker(pageId, {
          x,
          y,
          relativeX,
          relativeY,
          imageWidth: imgRect.width,
          imageHeight: imgRect.height,
        });
      }
    };
    // calculateAndSetMarker();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imgRef, markerPosition, pageId, setMarker]);

  // TODO Marker hat nicht die Maße 50 zu 50
  return (
    <div className={`box column ${classes['draggable-image']} `} ref={rootRef}>
      {/* <div style={{ display: 'flex' }}> */}
      {isLoading && <div className={classes.loading} />}

      <img
        src={getImageUrl(INITIAL_STEPS[pageId].image.url)}
        ref={imgRef}
        alt="Bild"
        width={INITIAL_STEPS[pageId].image.width}
        height={INITIAL_STEPS[pageId].image.height}
        className={classes[INITIAL_STEPS[pageId].image.aspectRatio]}
        onClick={(event) => imageClickHandler(event)}
        onLoad={() => setIsLoading(false)}
      />

      <div>
        <Draggable
          onStop={(event, data) => onStop(event, data)}
          nodeRef={nodeRef}
          onMouseDown={(event) => {
            event.stopPropagation();
            setGrabbed(true);
          }}
          position={{
            x: markerPosition?.x ?? 0,
            y: markerPosition?.y ?? 0,
          }}
        >
          <svg
            ref={nodeRef}
            className={`box ${classes['draggable-marker']} ${!grabbed && markerPosition === undefined ? classes.animate : ''}`}
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
      {/* </div> */}
    </div>
  );
}
