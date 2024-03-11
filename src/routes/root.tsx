import React, { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Link, useParams } from 'react-router-dom';
import Steps from '../../Steps';
import { FeelingType } from '../../types/types';

interface UserDataProps {
  markerPosition?: {
    x: number;
    y: number;
  };
  feeling?: FeelingType;
  strength?: number;
}

const INITIAL_USER_DATA: UserDataProps = {
  strength: 0,
};

function Root() {
  const [userData, setUserData] = useState<UserDataProps>(INITIAL_USER_DATA);
  const nodeRef = useRef(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();
  const idPage = Number(id);

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
      setUserData((prevState) => ({
        ...(prevState || {}),
        markerPosition: { x, y },
      }));
    }
  };
  const changeRangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...(prevState || {}),
      strength: Number(e.target.value),
    }));
  };
  const feelingClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const feeling = e.currentTarget.textContent as FeelingType;
    setUserData((prevState) => ({
      ...(prevState || {}),
      feeling,
    }));
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
                value={userData.strength}
                onChange={changeRangeHandler}
                min="0"
                max="10"
              />
            </div>
            <ul>
              {Steps[idPage].feelings.map((feeling) => (
                <li key={Steps[idPage].id + feeling}>
                  <button type="button" onClick={feelingClickHandler}>
                    {feeling}
                  </button>
                </li>
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
