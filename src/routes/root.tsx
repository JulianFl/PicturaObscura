import { createClient } from '@supabase/supabase-js';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import { DraggableImage } from '@/components/DraggableImage';
import { Feelings } from '@/components/Feelings';
import { Strength } from '@/components/Strength';
import { useUserStore } from '@/store/useUserStore';
import { FeelingType, MarkerPositionType } from '@/types/types';

function Root() {
  const { userData, actions } = useUserStore();

  // const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  // const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  // const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Listen to inserts
  const { id } = useParams();
  const pageId = Number(id);

  /* if (idPage > 0 && (userData === undefined || userData.length === 0)) {
    return <Navigate to="/0" />;
  } */
  if (Number.isNaN(pageId)) {
    return <h1>Keine Zahl</h1>;
  }
  if (pageId < 0 || pageId >= INITIAL_STEPS.length) {
    return <h1>Seite nicht gefunden</h1>;
  }
  // const getData = async () => {
  //   const { data, error } = await supabase.from('profiles').select();
  // const { data } = await supabase.from('transferdata').select();
  //
  // console.log(data);
  // };
  const changeMarkerPositionStateHandler = (markerPosition: {
    x: number;
    y: number;
  }) => {
    actions.setMarker(pageId, markerPosition);
  };
  const changeRangeStateHandler = (strength: number) => {
    actions.setStrength(pageId, strength);
  };
  const feelingClickHandler = (feeling: FeelingType) => {
    actions.setFeeling(pageId, feeling);
  };

  return (
    <div>
      <div>
        {INITIAL_STEPS[pageId] && (
          <div>
            <DraggableImage
              markerPosition={userData[pageId]?.markerPosition}
              onChangeMarkerPositionState={changeMarkerPositionStateHandler}
              image={INITIAL_STEPS[pageId].image}
            />
            <Strength
              strength={userData[pageId]?.strength}
              onChangeRange={changeRangeStateHandler}
            />
            <Feelings
              step={INITIAL_STEPS[pageId]}
              onFeelingClick={feelingClickHandler}
            />
          </div>
        )}
      </div>
      {/* <button type="button" onClick={getData}> */}
      {/*  Daten */}
      {/* </button> */}
      {pageId > 0 && <Link to={`/${pageId - 1}`}>Vorherige Seite</Link>}
      {pageId < INITIAL_STEPS.length - 1 && (
        <Link to={`/${pageId + 1}`}>Nächste Seite</Link>
      )}
      <button type="button" onClick={() => actions.resetStore()}>
        Zurücksetzen
      </button>
    </div>
  );
}

// eslint-disable-next-line import/no-default-export
export default Root;
