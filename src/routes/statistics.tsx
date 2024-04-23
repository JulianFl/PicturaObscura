import { findAllByDisplayValue } from '@testing-library/react';
import { collection, getDocs } from 'firebase/firestore';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import { MARKER_HEIGHT, MARKER_WIDTH } from '@/components/DraggableImage';
import { Main } from '@/components/UI/Main';
import { db } from '@/firebase';
import classes from '@/routes/statistics.module.scss';
import { MarkerPositionType, UserDataType } from '@/types/types';

interface MarkerPositionsProps extends MarkerPositionType {
  factorX: number;
  factorY: number;
}

interface DBDataProps {
  [key: string]: UserDataType;
}
function Statistics() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [data, setData] = useState<DBDataProps[]>();
  const [imageBounding, setImageBounding] = useState<DOMRect>();
  const { id } = useParams();

  const pageId = Number(id);
  const image = INITIAL_STEPS[pageId].image.url;
  const forward = `/statistics/${pageId + 1}`;
  const back: string | undefined = `/statistics/${pageId - 1}`;
  const navigate = useNavigate();
  // const image = INITIAL_STEPS[pageId].image.url;
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'pictura'));
      const documents = querySnapshot.docs.map(
        (doc) => doc.data() as DBDataProps
      );
      setData(documents);
    };

    fetchData();
  }, []);

  // useLayoutEffect(() => {
  //   if (elementRect && data) {
  //     console.log(elementRect);
  //     const markerPositionsData = data
  //       .filter((element) => element[pageId]?.markerPosition)
  //       .map((element) => {
  //         const imageWidth = elementRect.width;
  //         const imageHeight = elementRect.height;
  //         const factorX =
  //           imageWidth / element[pageId].markerPosition.imageWidth;
  //         const factorY =
  //           imageHeight / element[pageId].markerPosition.imageHeight;
  //
  //         return {
  //           ...element[pageId].markerPosition,
  //           factorX,
  //           factorY,
  //         };
  //       });
  //
  //     setMarkerPositions(markerPositionsData);
  //   }
  // }, [data, elementRect, pageId]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          if (pageId < INITIAL_STEPS.length - 1) {
            navigate(`/statistics/${pageId + 1}`);
          }

          break;
        case 'ArrowLeft':
          if (pageId > 0) {
            navigate(`/statistics/${pageId - 1}`);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageId, navigate]);
  const left = (markerPosition: MarkerPositionType | undefined) => {
    if (!markerPosition || !imageBounding) {
      return 0;
    }
    const imageWidth = imageBounding?.width;

    const factorX = imageWidth / markerPosition.imageWidth;

    const newMarkerWidth = MARKER_WIDTH - MARKER_WIDTH * factorX;

    const relativeMarkerWidth = newMarkerWidth / 2;

    // Calculate the new x position relative to the old image size
    const newX = markerPosition.relativeX * factorX;

    return newX - relativeMarkerWidth;
  };

  const top = (markerPosition: MarkerPositionType | undefined) => {
    if (!markerPosition || !imageBounding) {
      return 0;
    }
    const imageHeight = imageBounding?.height;
    const factorY = imageHeight / markerPosition.imageHeight;
    const relativeMarkerHeight = MARKER_HEIGHT - MARKER_HEIGHT * factorY;
    // 288.756px
    // Calculate the new y position relative to the old image size
    const newY = markerPosition.relativeY * factorY - relativeMarkerHeight;

    return newY;
  };
  const handleImageLoad = () => {
    if (imageRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      setImageBounding(imageRect);
    }
  };
  if (!data) {
    return <div>Loading</div>;
  }
  const filteredMarkerPositions = data
    .map((element) => element[pageId]?.markerPosition)
    .filter((el) => el);

  // filteredMarkerPositions.map((element) => {
  //   const imageWidth = imageBounding?.width;
  //   const imageHeight = imageBounding?.height;
  //   if ()
  //   const factorX = imageWidth / element[pageId].markerPosition.imageWidth;
  //   const factorY = imageHeight / element[pageId].markerPosition.imageHeight;
  //
  //   return {
  //     ...element[pageId].markerPosition,
  //     factorX,
  //     factorY,
  //   };
  // });

  //     setMarkerPositions(markerPositionsData);
  console.log(filteredMarkerPositions);

  return (
    <Main headerChildren="Statistik" forward={forward} back={back}>
      <div className={`${classes.column}`}>
        <div>
          <img src={image} ref={imageRef} onLoad={handleImageLoad} alt="" />
          {filteredMarkerPositions &&
            filteredMarkerPositions.map((markerPosition, index) => (
              <svg
                key={index}
                className={`${classes.marker}`}
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                height={MARKER_HEIGHT}
                viewBox="0 -960 960 960"
                width={MARKER_WIDTH}
                style={{
                  left: `${left(markerPosition)}px`,
                  top: `${top(markerPosition)}px`,
                }}
              >
                <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
              </svg>
            ))}
        </div>
      </div>
      <div>column</div>
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Statistics;
