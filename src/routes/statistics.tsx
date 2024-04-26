import Chart from 'chart.js/auto';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import { BarChart } from '@/components/BarChart';
import { MARKER_HEIGHT, MARKER_WIDTH } from '@/components/DraggableImage';
import { Strength } from '@/components/Strength';
import { Main } from '@/components/UI/Main';
import { db } from '@/firebase';
import classes from '@/routes/statistics.module.scss';
import { MarkerPositionType, UserDataType } from '@/types/types';

// Configuration options for the chart
const options = {
  scales: {
    y: {
      ticks: {
        color: 'white', // Change this to the color you want
        beginAtZero: true,
      },
    },
    x: {
      ticks: {
        color: 'white', // Change this to the color you want
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: 'white', // Change this to the color you want
        font: {
          size: 14,
        },
      },
    },
  },
};
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
  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        const imageRect = imageRef.current.getBoundingClientRect();
        setImageBounding(imageRect);
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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

  const currentPageData = data.map((element) => element[pageId]);

  const filteredMarkerPositions = currentPageData
    .map((element) => element?.markerPosition)
    .filter((el) => el);

  const checkedFeelings = currentPageData
    .map((element) => element?.checkedFeelings)
    .filter((el) => el);
  const feelingCounts = checkedFeelings.reduce(
    (acc, curr) => {
      if (!curr) return acc;

      curr.forEach((feeling) => {
        acc[feeling] = (acc[feeling] || 0) + 1;
      });

      return acc;
    },
    {} as { [key: string]: number }
  );

  const strengthValues = currentPageData
    .map((element) => element?.strength)
    .filter((el) => el);
  const totalStrength =
    strengthValues.length > 0 &&
    strengthValues.reduce((acc, curr) => (acc ?? 0) + (curr || 0), 0);
  const averageStrength =
    totalStrength && totalStrength / strengthValues.length;

  const barChartData = {
    labels: Object.keys(feelingCounts),
    datasets: [
      {
        label: '# of Feelings',
        data: Object.values(feelingCounts),
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        // ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Main headerChildren="Statistik" forward={forward} back={back}>
      <div
        className={`${classes.column} ${classes.image} ${classes[INITIAL_STEPS[pageId].image.aspectRatio]}`}
      >
        <div className={classes.imageWrapper}>
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
      <div className={classes.column}>
        {Object.values(feelingCounts).length > 0 && (
          <BarChart data={barChartData} options={options} />
        )}
        {averageStrength && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Average Strength</h2>
            <Strength disabled average={averageStrength} />
          </div>
        )}
      </div>
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Statistics;
