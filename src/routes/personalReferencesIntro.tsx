import React, { useEffect, useState } from 'react';

import { INITIAL_STEPS } from '@/InitialSteps';
import { MARKER_HEIGHT, MARKER_WIDTH } from '@/components/DraggableImage';
import { Main } from '@/components/UI/Main';
import classes from '@/routes/personalReferencesIntro.module.scss';
import { useUserStore } from '@/store/useUserStore';
import { UserDataType } from '@/types/types';

type ImageSizeType = {
  width: number;
  height: number;
};

function PersonalReferencesIntro() {
  const { userData } = useUserStore((state) => state);
  const userDataEntries: [string, UserDataType][] = Object.entries(userData);
  const [imageSizes, setImageSizes] = useState<ImageSizeType[]>([]);

  const sortedUserData = userDataEntries.sort(
    (a, b) => (b[1].strength || 0) - (a[1].strength || 0)
  );
  const topThreeUserData = sortedUserData.slice(0, 3);
  const imageRefs = Array.from({ length: topThreeUserData.length }, () =>
    React.createRef<HTMLImageElement>()
  );

  useEffect(() => {
    const handleResize = () => {
      const newImageSizes = imageRefs.map((ref, index) => {
        const rect = ref.current?.getBoundingClientRect();
        const originalWidth = userData[index].markerPosition?.imageSizeX || 0;
        const originalHeight = userData[index].markerPosition?.imageSizeY || 0;
        const newWidth = rect?.width || 0;
        const newHeight = rect?.height || 0;

        const widthFactor = newWidth / originalWidth;
        const heightFactor = newHeight / originalHeight;

        return {
          width: newWidth,
          height: newHeight,
          widthFactor,
          heightFactor,
        };
      });
      setImageSizes(newImageSizes);
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imageRefs, userData]);

  if (!userDataEntries.length) {
    return <div>Keine Einträge</div>;
  }
  let widthFactor = 1;
  let heightFactor = 1;
  const renderElement = (element: [string, UserDataType], mapIndex: number) => {
    const index = Number(element[0]);
    if (imageSizes[mapIndex] !== undefined) {
      const rect = imageSizes[mapIndex];
      const originalWidth = userData[index].markerPosition?.imageSizeX || 0;
      const originalHeight = userData[index].markerPosition?.imageSizeY || 0;
      const newWidth = rect?.width || 0;
      const newHeight = rect?.height || 0;

      widthFactor = newWidth / originalWidth;
      heightFactor = newHeight / originalHeight;
      // console.log(newHeight, originalHeight);
      // console.log(`Width factor for image ${mapIndex}: ${widthFactor}`);
      // console.log(`Height factor for image ${mapIndex}: ${heightFactor}`);
      // //
      // console.log(
      //   `Drittel Bild Width:  ${imageSizes[mapIndex].width}`,
      //   `Natürliche Bildweite ${userData[index].markerPosition?.imageSizeX}`,
      //   `Drittel Bild Height: ${imageSizes[mapIndex].height}`,
      //   `NatÜRLICHE Bildhöhe ${userData[index].markerPosition?.imageSizeY}`
      // );
    }

    return (
      <label htmlFor={`imageSelection-${index}`} className={classes.intro}>
        <input
          type="radio"
          name="imageSelection"
          id={`imageSelection-${index}`}
          value={index}
        />
        <figure>
          <img
            src={INITIAL_STEPS[index].image}
            alt="test"
            ref={imageRefs[mapIndex]}
            width={userData[index].markerPosition?.imageSizeX ?? 0}
            height={userData[index].markerPosition?.imageSizeY ?? 0}
          />
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            height={MARKER_HEIGHT * heightFactor}
            viewBox="0 -960 960 960"
            width={MARKER_WIDTH * widthFactor}
            style={{
              position: 'absolute',
              top: `${(userData[index].markerPosition?.relativeY ?? 0) * heightFactor}px`,
              left: `${(userData[index].markerPosition?.relativeX ?? 0) * widthFactor}px`,
            }}
          >
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
          </svg>
        </figure>
        {/* <p>{JSON.stringify()}</p> */}
        <p>{element[1].strength}</p>
        <div>
          {element[1].checkedFeelings &&
            element[1].checkedFeelings.map((feeling) => (
              <span key={feeling}>{feeling}</span>
            ))}
        </div>
      </label>
    );
  };

  return (
    <Main>
      {topThreeUserData.map((element, index) => renderElement(element, index))}
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default PersonalReferencesIntro;
