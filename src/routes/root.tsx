import React, { useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Link, useParams } from 'react-router-dom';
import Steps from '../../Steps';
import { FeelingType } from '../types/types';
import useUserStore from '../store/useUserStore';

function Root() {
  // const [userData, setUserData] = useState<UserDataProps>();
  const { userData, actions } = useUserStore();
  const nodeRef = useRef(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();
  const idPage = Number(id);

  /* if (idPage > 0 && (userData === undefined || userData.length === 0)) {
    return <Navigate to="/0" />;
  } */
  if (Number.isNaN(idPage)) {
    return <h1>Keine Zahl</h1>;
  }
  if (idPage < 0 || idPage >= Steps.length) {
    return <h1>Seite nicht gefunden</h1>;
  }

  const onStop = (e: DraggableEvent, data: DraggableData) => {
    const parentRect = parentRef.current?.getBoundingClientRect();
    if (parentRect) {
      const x = data.x - parentRect.x;
      const y = data.y - parentRect.y;
      actions.setMarker(idPage, { x, y });
    }
  };
  const changeRangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.setStrength(idPage, Number(e.target.value));
  };
  const feelingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const feeling = e.target.value as FeelingType;
    actions.setFeeling(idPage, feeling);
  };
  console.log(userData);

  return (
    <div>
      <div>
        {Steps[idPage] && (
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
                  x: (userData && userData[idPage]?.markerPosition?.x) ?? 0,
                  y: (userData && userData[idPage]?.markerPosition?.y) ?? 0,
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
                src={Steps[idPage].image}
                alt="Bild"
                width="200px"
                height="300"
              />
            </div>
            <div>
              <input
                type="range"
                value={
                  userData && userData[idPage] ? userData[idPage].strength : 0
                }
                onChange={changeRangeHandler}
                min="0"
                max="10"
              />
            </div>
            <ul>
              {Steps[idPage].feelings.map((feeling) => (
                <div key={`${Steps[idPage].id}${feeling}`}>
                  <input
                    type="radio"
                    id={`${Steps[idPage].id}${feeling}`}
                    name="feeling"
                    defaultChecked={
                      userData &&
                      userData[idPage] &&
                      userData[idPage].feeling === feeling
                    }
                    onChange={feelingChangeHandler}
                    value={feeling}
                  />
                  <label htmlFor={`${Steps[idPage].id}${feeling}`}>
                    {feeling}
                  </label>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      {idPage > 0 && <Link to={`/${idPage - 1}`}>Vorherige Seite</Link>}
      {idPage < Steps.length - 1 && (
        <Link to={`/${idPage + 1}`}>Nächste Seite</Link>
      )}
    </div>
  );
}

export default Root;
