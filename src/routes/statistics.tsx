import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import { BarChart } from '@/components/BarChart';
import { IsLoading } from '@/components/IsLoading';
import { StatisticCircle } from '@/components/StatisticCircle';
import { db } from '@/firebase';
import classes from '@/routes/statistics.module.scss';
import { UserDataType } from '@/types/types';
import { getImageUrl } from '@/utils/image-util';

// Configuration options for the chart
const options = {
  indexAxis: 'y',

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
  const [imageBounding, setImageBounding] = useState<DOMRect>();
  const { id } = useParams();
  const pageId = Number(id);
  const image = getImageUrl(INITIAL_STEPS[pageId].image.url);
  const navigate = useNavigate();
  const { data, isPending, error } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, 'pictura'));
      const documents = querySnapshot.docs.map(
        (doc) => doc.data() as DBDataProps
      );

      return documents;
    },
  });
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
      setImageBounding(undefined);
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };

    // Cleanup function to clear the interval when the component unmounts
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pageId < INITIAL_STEPS.length - 1) {
        navigate(`/statistics/${pageId + 1}`);
      } else {
        navigate(`/statistics/0`);
      }
    }, 7000);

    return () => {
      clearInterval(intervalId);
    };
  }, [pageId, navigate]);
  const handleImageLoad = () => {
    if (imageRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      setImageBounding(imageRect);
    }
  };

  if (isPending || !data) {
    return <IsLoading />;
  }

  const currentID = INITIAL_STEPS[pageId].id;

  const currentPageData = data
    .map((element) => element[currentID])
    .filter((el) => el);

  const checkedFeelings = currentPageData
    .map((element) => element?.checkedFeeling)
    .filter((el) => el);

  const feelingCounts: { [key: string]: { count: number; color?: string } } =
    {};

  checkedFeelings.forEach((feeling) => {
    if (feeling) {
      const { key, color } = feeling;

      if (!feelingCounts[key]) {
        feelingCounts[key] = { count: 0, color };
      }
      feelingCounts[key].count += 1;
    }
  });

  const barChartData = {
    labels: Object.keys(feelingCounts),
    datasets: [
      {
        label: '# of Feelings',
        data: Object.values(feelingCounts).map((el) => el.count),
        backgroundColor: Object.values(feelingCounts).map((el) => el.color),
        borderColor: Object.values(feelingCounts).map((el) => el.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className={classes.statistics}>
      <h1>Pictura Obscura - Punctum Results</h1>
      <section>
        <div
          className={`${classes.column} ${classes.image} ${classes[INITIAL_STEPS[pageId].image.aspectRatio]}`}
        >
          <div className={classes.imageWrapper}>
            {!imageBounding && <div className={classes['loading-image']} />}
            {image && (
              <img src={image} ref={imageRef} onLoad={handleImageLoad} alt="" />
            )}
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
        </div>
      </section>
    </main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Statistics;
