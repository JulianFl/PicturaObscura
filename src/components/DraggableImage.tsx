import { motion, PanInfo } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
// import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import classes from '@/components/DraggableImage.module.scss';
import { useUserStore } from '@/store/useUserStore';

export const MARKER_WIDTH = 50;
export const MARKER_HEIGHT = 50;
export function DraggableImage() {
  const constraintsRef = useRef(null);

  const { setMarker } = useUserStore((state) => state.actions);
  const { id } = useParams();
  const pageId = Number(id);
  // const [aspectRatio, setAspectRatio] = useState<number>();

  const markerPosition = useUserStore(
    (state) => state.userData[pageId]?.markerPosition
  );

  // const userData = useUserStore((state) => state.userData);
  const nodeRef = useRef(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // const onStop = (event: DraggableEvent, data: DraggableData) => {
  //   const { node, x, y, lastX, lastY, deltaY, deltaX } = data;
  //   console.log('onStop', x, y, lastX, lastY, deltaY, deltaX);
  //   const imageElement = imgRef.current;
  //   if (imageElement) {
  //     const imageRect = imageElement.getBoundingClientRect();
  //
  //     // const relativeX =
  //     //   node.getBoundingClientRect().x - imageRect.left + MARKER_WIDTH / 2;
  //     // const relativeY =
  //     //   node.getBoundingClientRect().y - imageRect.top + MARKER_HEIGHT;
  //     //
  //     const relativeX = node.getBoundingClientRect().x - imageRect.left;
  //     const relativeY = node.getBoundingClientRect().y - imageRect.top;
  //
  //     const percentageX = (relativeX / imageRect.width) * 100;
  //     const percentageY = (relativeY / imageRect.height) * 100;
  //
  //     if (relativeY > imageRect.height) {
  //       console.log('out of bounds, below');
  //     }
  //     if (relativeY < 0) {
  //       console.log('out of bounds, above');
  //     }
  //     if (relativeX > imageRect.width) {
  //       console.log('out of bounds, right');
  //     }
  //     if (relativeX < 0) {
  //       console.log('out of bounds, left');
  //     }
  //
  //     setMarker(pageId, {
  //       x,
  //       y,
  //       relativeX,
  //       relativeY,
  //       percentageX,
  //       percentageY,
  //       imageSizeX: imageRect.width,
  //       imageSizeY: imageRect.height,
  //     });
  //   }
  // };

  useEffect(() => {
    const handleResize = () => {
      if (!markerPosition) {
        return;
      }
      // Calculate new position based on percentage of image size
      const newX = (markerPosition.x / window.innerWidth) * 100;
      const newY = (markerPosition.y / window.innerHeight) * 100;
      setMarker(pageId, { x: newX, y: newY });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [markerPosition, pageId, setMarker]);

  // TODO Marker hat nicht die Maße 50 zu 50
  const dragEndHandler = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    console.log(pageId);
    const { point } = info;
    setMarker(pageId, {
      x: point.x,
      y: point.y,
    });

    // const imageElement = imgRef.current;
  };

  return (
    <div className={`box column ${classes['draggable-image']} `} ref={rootRef}>
      <motion.div style={{ display: 'flex' }} ref={constraintsRef}>
        <img
          src={INITIAL_STEPS[pageId].image.url}
          ref={imgRef}
          alt="Bild"
          width="auto"
          height="auto"
          className={classes[INITIAL_STEPS[pageId].image.aspectRatio]}
        />
        <motion.svg
          drag
          onDragEnd={dragEndHandler}
          dragMomentum={false}
          initial={{ x: markerPosition?.x ?? 0, y: markerPosition?.y ?? 0 }}
          ref={nodeRef}
          className={`box ${classes['draggable-marker']}`}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          height={MARKER_HEIGHT}
          viewBox="0 -960 960 960"
          width={MARKER_WIDTH}
          style={
            {
              // translateX: `${markerPosition?.x ?? 0}px`, // Use pixel-based positioning
              // translateY: `${markerPosition?.y ?? 0}px`, // Use pixel-based positioning
            }
          }
        >
          <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
