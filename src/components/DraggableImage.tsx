import React, { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import classes from '@/components/DraggableImage.module.scss';
import { useUserStore } from '@/store/useUserStore';
import { getImageUrl } from '@/utils/image-util';

export const MARKER_WIDTH = 32;
export const MARKER_HEIGHT = 40;
export function DraggableImage() {
  const { setMarker, resetMarker } = useUserStore((state) => state.actions);
  const { id } = useParams();
  const pageId = Number(id);

  const markerPosition = useUserStore(
    (state) => state.userData[pageId]?.markerPosition
  );
  const [isLoading, setIsLoading] = useState(true);
  const userData = useUserStore((state) => state.userData);
  const nodeRef = useRef<any>(null);
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
      <figure className={classes[INITIAL_STEPS[pageId].image.aspectRatio]}>
        <img
          src={getImageUrl(INITIAL_STEPS[pageId].image.url)}
          ref={imgRef}
          alt="Bild"
          className={classes[INITIAL_STEPS[pageId].image.aspectRatio]}
          width={INITIAL_STEPS[pageId].image.width}
          height={INITIAL_STEPS[pageId].image.height}
          // onClick={(event) => imageClickHandler(event)}
          onLoad={() => setIsLoading(false)}
        />
        <figcaption>
          {INITIAL_STEPS[pageId].image.credits.split('\n').map((str) => (
            <p key={str}>{str}</p>
          ))}
        </figcaption>
      </figure>

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
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 20"
            ref={nodeRef}
            width={32}
            height={40}
            className={`box ${classes['draggable-marker']} ${!grabbed && markerPosition === undefined ? classes.animate : ''}`}
            fill="white"
          >
            <g id="Ebene_1-2" data-name="Ebene 1">
              <path
                className="cls-1"
                d="M8,10a2,2,0,0,0,2-2A2,2,0,0,0,8,6,2,2,0,0,0,6,8a2,2,0,0,0,2,2Zm0,7.35a27.9,27.9,0,0,0,4.53-5.09A7.77,7.77,0,0,0,14,8.2a6,6,0,0,0-1.74-4.46A5.79,5.79,0,0,0,8,2,5.79,5.79,0,0,0,3.74,3.74,6,6,0,0,0,2,8.2a7.71,7.71,0,0,0,1.48,4.06A27.42,27.42,0,0,0,8,17.35ZM8,20a33,33,0,0,1-6-6.36A9.86,9.86,0,0,1,0,8.2a7.71,7.71,0,0,1,2.41-6A8,8,0,0,1,8,0a8,8,0,0,1,5.59,2.23A7.71,7.71,0,0,1,16,8.2a9.86,9.86,0,0,1-2,5.44A33,33,0,0,1,8,20Z"
              />
            </g>
          </svg>
        </Draggable>
      </div>
      {/* </div> */}
    </div>
  );
}
