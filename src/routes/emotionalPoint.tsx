import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { INITIAL_STEPS } from '@/InitialSteps';
import { DraggableImage } from '@/components/DraggableImage';
import { Feelings } from '@/components/Feelings';
import { IsLoading } from '@/components/IsLoading';
import { Strength } from '@/components/Strength';
import { Main } from '@/components/UI/Main';
import { useSendData } from '@/mutation';
import classes from '@/routes/emotionalPoint.module.scss';
import { useUserStore } from '@/store/useUserStore';

// const HEADER_DEFAULT_TEXT =
//   'Place the pin where you feel the most emotion in the picture, then choose which emotion it evoked and finally how much emotion this image gives you overall >';

function EmotionalPoint() {
  const { userData } = useUserStore();
  const { resetStore } = useUserStore((state) => state.actions);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const HEADERTEXT_FIRSTPAGE_PIN = t('explanation.HEADERTEXT_FIRSTPAGE_PIN');
  const HEADERTEXT_FIRSTPAGE_FEELINGS = t(
    'explanation.HEADERTEXT_FIRSTPAGE_FEELINGS'
  );
  const sendData = useSendData();
  const lastStepHandler = async () => {
    const userId = uuidv4();
    await sendData.mutateAsync({ id: userId, userData });
    resetStore();
    navigate('/');
  };

  const { id } = useParams();
  const pageId = Number(id);
  const forward = `/emotional-point/${pageId + 1}`;
  const back: string | undefined = `/emotional-point/${pageId - 1}`;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          if (pageId < INITIAL_STEPS.length - 1) {
            navigate(`/emotional-point/${pageId + 1}`);
          }

          break;
        case 'ArrowLeft':
          if (pageId > 0) {
            navigate(`/emotional-point/${pageId - 1}`);
          }
          if (pageId === 0) {
            navigate(`/instruction/4`);
          }

          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pageId, navigate]);

  if (Number.isNaN(pageId)) {
    return <h1>Keine Zahl</h1>;
  }
  if (pageId < 0 || !INITIAL_STEPS[pageId]) {
    return <h1>Seite nicht gefunden</h1>;
  }

  let headerChildren = HEADERTEXT_FIRSTPAGE_PIN;
  if (userData[pageId]?.markerPosition) {
    headerChildren = HEADERTEXT_FIRSTPAGE_FEELINGS;
  }

  const progress = (pageId / (INITIAL_STEPS.length - 1)) * 100;

  return (
    <Main
      forward={forward}
      back={pageId > 0 ? back : '/instruction'}
      headerChildren={headerChildren}
      onLastStep={
        pageId >= INITIAL_STEPS.length - 1 ? lastStepHandler : undefined
      }
      progress={progress}
    >
      {sendData.isPending ? (
        <IsLoading />
      ) : (
        <>
          <DraggableImage />
          <div
            className={`${classes['wrap-emotional-point']} ${userData[pageId]?.markerPosition === undefined ? classes.hide : ''}`}
          >
            <Strength />
            <Feelings />
          </div>
        </>
      )}
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default EmotionalPoint;
