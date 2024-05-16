import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import { BarChart } from '@/components/BarChart';
import { MARKER_HEIGHT, MARKER_WIDTH } from '@/components/DraggableImage';
import { IsLoading } from '@/components/IsLoading';
import { StatisticCircle } from '@/components/StatisticCircle';
import { Strength } from '@/components/Strength';
import { Main } from '@/components/UI/Main';
import { db } from '@/firebase';
import classes from '@/routes/statistics.module.scss';
import { MarkerPositionType, UserDataType } from '@/types/types';
import { getImageUrl } from '@/utils/image-util';

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
  // const [data, setData] = useState<DBDataProps[]>();
  const [imageBounding, setImageBounding] = useState<DOMRect>();
  const { id } = useParams();

  const pageId = Number(id);
  const image = getImageUrl(INITIAL_STEPS[pageId].image.url);
  const forward = `/statistics/${pageId + 1}`;
  const back: string | undefined = `/statistics/${pageId - 1}`;
  const navigate = useNavigate();
  const { data, isPending, error } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'pictura'));
      const documents = querySnapshot.docs.map(
        (doc) => doc.data() as DBDataProps
      );

      // setData(documents);
      return documents;
    },
  });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'pictura'));
  //     const documents = querySnapshot.docs.map(
  //       (doc) => doc.data() as DBDataProps
  //     );
  //     setData(documents);
  //   };
  //
  //   fetchData();
  // }, []);

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

  const handleImageLoad = () => {
    if (imageRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      setImageBounding(imageRect);
    }
  };
  if (isPending || !data) {
    return <IsLoading />;
  }
  const currentPageData = data
    .map((element) => element[pageId])
    .filter((el) => el);

  const checkedFeelings = currentPageData
    .map((element) => element?.checkedFeeling)
    .filter((el) => el);
  const feelingCounts: { [key: string]: number } = {};

  for (const feeling of checkedFeelings) {
    if (feeling) {
      if (!feelingCounts[feeling.key]) {
        feelingCounts[feeling.key] = 0;
      }
      feelingCounts[feeling.key] = feelingCounts[feeling.key] + 1;
    }
  }
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
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Main
      headerChildren="Statistik"
      forward={forward}
      back={pageId > 0 ? back : '#'}
    >
      <div
        className={`${classes.column} ${classes.image} ${classes[INITIAL_STEPS[pageId].image.aspectRatio]}`}
      >
        {/* <h3>Anzahl Marker: {filteredMarkerPositions.length}</h3> */}
        <div className={classes.imageWrapper}>
          <img src={image} ref={imageRef} onLoad={handleImageLoad} alt="" />
          {currentPageData &&
            currentPageData.map((userdata, index) => (
              <StatisticCircle
                data={userdata}
                key={index}
                imageBounding={imageBounding}
              />
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
