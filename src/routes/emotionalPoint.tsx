import React from 'react';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import { DraggableImage } from '@/components/DraggableImage';
import { Feelings } from '@/components/Feelings';
import { Strength } from '@/components/Strength';
import { Main } from '@/components/UI/Main';
import { useUserStore } from '@/store/useUserStore';

const HEADER_DEFAULT_TEXT =
  'Place the pin where you feel the most emotion in the picture, then choose which emotion it evoked and finally how much emotion this image gives you overall >';

const HEADERTEXT_FIRSTPAGE_PIN =
  'Place the pin where you feel the most emotion in the image';
const HEADERTEXT_FIRSTPAGE_FEELINGS =
  'Choose the emotion this image triggered in you';
const HEADERTEXT_FIRSTPAGE_STRENGTH = 'How strong is this feeling?';

function EmotionalPoint() {
  const { userData } = useUserStore();
  const { id } = useParams();
  const pageId = Number(id);

  if (Number.isNaN(pageId)) {
    return <h1>Keine Zahl</h1>;
  }
  if (pageId < 0 || pageId >= INITIAL_STEPS.length || !INITIAL_STEPS[pageId]) {
    return <h1>Seite nicht gefunden</h1>;
  }

  const forward = `/emotional-point/${pageId + 1}`;
  let back: string | undefined = `/emotional-point/${pageId - 1}`;
  let headerChildren = HEADER_DEFAULT_TEXT;

  if (pageId === 0) {
    back = undefined;
    headerChildren = HEADERTEXT_FIRSTPAGE_PIN;
    if (userData[pageId]?.markerPosition) {
      headerChildren = HEADERTEXT_FIRSTPAGE_FEELINGS;
    }
    if (userData[pageId]?.checkedFeelings) {
      headerChildren = HEADERTEXT_FIRSTPAGE_STRENGTH;
    }
  }
  console.log(
    pageId === 0 && userData[pageId]?.markerPosition === undefined,
    pageId === 0 && userData[pageId]?.strength === undefined
  );

  return (
    <Main forward={forward} back={back} headerChildren={headerChildren}>
      <DraggableImage />
      <div>
        <Strength
          hideStrength={
            pageId === 0 && userData[pageId]?.checkedFeelings === undefined
          }
        />
        <Feelings
          hideFeelings={
            pageId === 0 && userData[pageId]?.markerPosition === undefined
          }
        />
      </div>
    </Main>
  );
}
// eslint-disable-next-line import/no-default-export
export default EmotionalPoint;
