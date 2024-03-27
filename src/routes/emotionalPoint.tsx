import React from 'react';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import { DraggableImage } from '@/components/DraggableImage';
import { Feelings } from '@/components/Feelings';
import { Strength } from '@/components/Strength';
import { Main } from '@/components/UI/Main';
import { useUserStore } from '@/store/useUserStore';

function EmotionalPoint() {
  const { userData } = useUserStore();

  const { id } = useParams();
  const pageId = Number(id);

  if (Number.isNaN(pageId)) {
    return <h1>Keine Zahl</h1>;
  }
  if (pageId < 0 || pageId >= INITIAL_STEPS.length) {
    return <h1>Seite nicht gefunden</h1>;
  }

  if (pageId === 0) {
    let headerText =
      'Place the pin where you feel the most emotion in the image';
    if (userData[pageId]?.markerPosition) {
      headerText = 'Choose the emotion this image triggered in you';
    }
    if (userData[pageId]?.checkedFeelings) {
      headerText = 'How strong is this feeling?';
    }

    return (
      <Main forward="/emotional-point/1" headerChildren={headerText}>
        <DraggableImage />
        {userData[pageId]?.markerPosition && <Feelings />}
        {userData[pageId]?.checkedFeelings && <Strength />}
        {/* <button type="button" onClick={() => actions.resetStore()}> */}
        {/*  Zurücksetzen */}
        {/* </button> */}
      </Main>
    );
  }

  return (
    <Main
      forward={`/emotional-point/${pageId + 1}`}
      back={`/emotional-point/${pageId - 1}`}
      headerChildren="Place the pin where you feel the most emotion in the picture, then choose which emotion it evoked and finally how much emotion this image gives you overall >"
    >
      {INITIAL_STEPS[pageId] && (
        <div className="container wrapper">
          <DraggableImage />
          <div className="wrapper column">
            <Strength />
            <Feelings />
          </div>
        </div>
      )}
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default EmotionalPoint;
