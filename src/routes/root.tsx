import React, { useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Link, useParams } from 'react-router-dom';
import Steps from '../../Steps';
import { FeelingType } from '../types/types';
import useUserStore from '../store/useUserStore';

function Root() {
  const { userData, actions } = useUserStore();
  const nodeRef = useRef(null);
  const parentRef = useRef<HTMLDivElement>(null);

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

  const onStop = (e: DraggableEvent, data: DraggableData) => {
    const parentRect = parentRef.current?.getBoundingClientRect();
    if (parentRect) {
      const x = data.x - parentRect.x;
      const y = data.y - parentRect.y;
      actions.setMarker(pageId, { x, y });
    }
  };
  const changeRangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.setStrength(pageId, Number(e.target.value));
  };
  const feelingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const feeling = e.target.value as FeelingType;
    actions.setFeeling(pageId, feeling);
  };
  console.log(userData);

  return (
    <div>
      <div>
        {Steps[pageId] && (
          <div>
            <div
              className="box"
              style={{
                position: 'relative',
                padding: '0',
                display: 'inline-flex',
              }}
              ref={parentRef}
            >
              <Draggable
                onStop={(e, data) => onStop(e, data)}
                nodeRef={nodeRef}
                position={{
                  x: (userData && userData[pageId]?.markerPosition?.x) ?? 0,
                  y: (userData && userData[pageId]?.markerPosition?.y) ?? 0,
                }}
              >
                <div
                  ref={nodeRef}
                  className="box"
                  style={{
                    position: 'absolute',
                    color: 'white',
                  }}
                >
                  Marker
                </div>
              </Draggable>
              <img
                src={Steps[pageId].image}
                alt="Bild"
                width="200px"
                height="300"
              />
            </div>
            <div>
              <input
                type="range"
                value={
                  userData && userData[pageId] ? userData[pageId].strength : 0
                }
                onChange={changeRangeHandler}
                min="0"
                max="10"
              />
            </div>
            <ul>
              {Steps[pageId].feelings.map((feeling) => (
                <div key={`${Steps[pageId].id}${feeling}`}>
                  <input
                    type="radio"
                    id={`${Steps[pageId].id}${feeling}`}
                    name="feeling"
                    defaultChecked={
                      userData &&
                      userData[pageId] &&
                      userData[pageId].feeling === feeling
                    }
                    onChange={feelingChangeHandler}
                    value={feeling}
                  />
                  <label htmlFor={`${Steps[pageId].id}${feeling}`}>
                    {feeling}
                  </label>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      {pageId > 0 && <Link to={`/${pageId - 1}`}>Vorherige Seite</Link>}
      {pageId < Steps.length - 1 && (
        <Link to={`/${pageId + 1}`}>Nächste Seite</Link>
      )}
    </div>
  );
}

export default Root;
