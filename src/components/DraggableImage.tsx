import React, { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import classes from '@/components/DraggableImage.module.scss';
import { useUserStore } from '@/store/useUserStore';

interface ImageBoundingProps {
  width: number;
  height: number;
}
export function DraggableImage() {
  const { setMarker } = useUserStore((state) => state.actions);
  const { id } = useParams();
  const pageId = Number(id);
  // const [aspectRatio, setAspectRatio] = useState<number>();
  const [imageBounding, setImageBounding] = useState<ImageBoundingProps>();
  // const [width, height] = useWindowSize();

  const markerPosition = useUserStore(
    (state) => state.userData[pageId]?.markerPosition
  );

  const nodeRef = useRef(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const markerWidth = 50;
  const markerHeight = 50;
  const onStop = (event: DraggableEvent, data: DraggableData) => {
    const { node } = data;

    const imageElement = imgRef.current;
    if (imageElement) {
      const imageRect = imageElement.getBoundingClientRect();

      // Calculate the position of the marker relative to the image
      const relativeX =
        node.getBoundingClientRect().x - imageRect.left + markerWidth / 2;
      const relativeY =
        node.getBoundingClientRect().y - imageRect.top + markerHeight / 2;

      // const percentageX = (relativeX / imageRect.width) * 100;
      // const percentageY = (relativeY / imageRect.height) * 100;

      console.log(relativeX, relativeY);
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

      // setMarker(pageId, { x: relativeX, y: relativeY });
    }
    // setMarker(pageId, { x, y });
  };
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (!rootRef.current) {
      return;
    }
    const img = event.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;

    const imgHeight = img.naturalHeight;
    const rootHeight = rootRef.current?.getBoundingClientRect().height;
    const rootWidth = rootRef.current?.getBoundingClientRect().width;
    const ratio = (rootHeight / imgHeight) * 100;
    // console.log((rootHeight / imgHeight) * img.naturalWidth);

    if (aspectRatio <= 1) {
      console.log(
        'portrait',
        `naturalWidth: ${img.naturalWidth}`,
        `naturalHeight: ${img.naturalHeight}`,
        `newWidth: ${img.naturalWidth * (ratio / 100)}`,
        `newHeight: ${rootHeight}`,
        `ratio: ${ratio}`
      );
      setImageBounding({
        width: img.naturalWidth * (ratio / 100),
        height: rootHeight,
      });
    }
    if (aspectRatio > 1) {
      console.log(
        'landscape',
        `naturalWidth: ${img.naturalWidth}`,
        `naturalHeight: ${img.naturalHeight}`,
        `newWidth: ${rootWidth}`,
        `newHeight: ${img.naturalHeight * (ratio / 100)}`,
        `ratio: ${ratio}`
      );
      setImageBounding({
        width: rootWidth,
        height: img.naturalHeight * (ratio / 100),
      });
    }
  };

  // useEffect(() => {
  //   if (width && imageRef.current && aspectRatio) {
  //     setImageBounding(imageRef.current.getBoundingClientRect());
  //   }
  // }, [imageRef, aspectRatio, width]);

  return (
    <div
      // ${aspectRatio && aspectRatio <= 1 ? classes.portrait : classes.landscape}
      className={`box column ${classes['draggable-image']} `}
      ref={rootRef}
    >
      <img
        src={INITIAL_STEPS[pageId].image}
        ref={imgRef}
        onLoad={handleImageLoad}
        alt="Bild"
        width={imageBounding?.width}
        height={imageBounding?.height}
        className="drop-target"
      />
      {/* <span> */}
      {/*  Window size: {width} x {height} */}
      {/* </span> */}
      <Draggable
        onStop={(event, data) => onStop(event, data)}
        nodeRef={nodeRef}
        position={
          markerPosition
            ? {
                x: markerPosition.x,
                y: markerPosition.y,
              }
            : undefined
        }
        offsetParent={rootRef.current ?? undefined}
        positionOffset={{
          x: rootRef.current?.getBoundingClientRect().width ?? 0,
          y: 0,
        }}
      >
        <div
          ref={nodeRef}
          className={`box ${classes['draggable-marker']}`}
          style={{
            width: markerWidth,
            height: markerHeight,
          }}
        />
      </Draggable>
    </div>
  );
}
