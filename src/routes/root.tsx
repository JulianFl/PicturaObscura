import React, { EventHandler, useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Link, useParams } from 'react-router-dom';
import Steps from '../Steps';
import { FeelingType } from '../types/types';
import useUserStore from '../store/useUserStore';
import DraggableImage from '../components/DraggableImage';
import Strength from '../components/Strength';
import Feelings from '../components/Feelings';

function Root() {
  const { userData, actions } = useUserStore();

  const { id } = useParams();
  const pageId = Number(id);

  /* if (idPage > 0 && (userData === undefined || userData.length === 0)) {
    return <Navigate to="/0" />;
  } */
  if (Number.isNaN(pageId)) {
    return <h1>Keine Zahl</h1>;
  }
  if (pageId < 0 || pageId >= Steps.length) {
    return <h1>Seite nicht gefunden</h1>;
  }

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
        {Steps[pageId] && (
          <div>
            <DraggableImage
              markerPosition={
                userData && userData[pageId] && userData[pageId].markerPosition
                  ? userData[pageId].markerPosition
                  : { x: 0, y: 0 }
              }
              onChangeMarkerPositionState={changeMarkerPositionStateHandler}
              image={Steps[pageId].image}
            />
            <Strength
              strength={
                userData && userData[pageId] ? userData[pageId].strength : 0
              }
              onChangeRange={changeRangeStateHandler}
            />
            <Feelings
              feelings={Steps[pageId].feelings}
              step={Steps[pageId]}
              onFeelingClick={feelingClickHandler}
            />
          </div>
        )}
      </div>

      {pageId > 0 && <Link to={`/${pageId - 1}`}>Vorherige Seite</Link>}
      {pageId < Steps.length - 1 && (
        <Link to={`/${pageId + 1}`}>Nächste Seite</Link>
      )}
      <button type="button" onClick={() => actions.resetStore()}>
        Zurücksetzen
      </button>
    </div>
  );
}

export default Root;
