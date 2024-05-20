import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Main } from '@/components/UI/Main';

function Intro() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          navigate(`/emotional-point/0`);

          break;
        case 'ArrowLeft':
          navigate(`/`);

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
  }, [navigate]);

  return (
    <Main
      forward="/emotional-point/0"
      back="/"
      headerChildren="Den emotionalen Punkt des Bildes erkennen"
      className="intro"
    >
      <p>
        Ursprünglich im Lateinischen als „das Gestochene" angelegt, bezeichnet
        der Begriff des punctums eine „kleine Stelle", einen „sehr kleinen
        Fleck, Tupfen, oder Einstich" im Bild. So gründet das punctum nicht wie
        das studium auf dem allgemeinen bzw. „höflichen Interesse" an einem
        Foto, sondern durchbohrt jenes als „Pfeil" und hinterlässt an der
        Schnittstelle eine „Wunde"
      </p>
      <p>
        In der Fotografie angelegte Informationen werden als Teil des studiums
        sichtbar und bahnen sich im Zuge der kulturellen Wahrnehmung den Weg ins
        Bewusstsein. Dagegen bildet das punctum einen unbewussten Stich, es
        bricht affektiv in die Welt des Betrachters ein und rückt jegliche
        informationellen Bezüge in den Hintergrund. Was an der Stelle des
        Einstichs bleibt, ist eine Betroffenheit, eine Emotion oder eine
        Sehnsucht.
      </p>
      <p>-Die helle Kammer, 1980 Von Roland Barthes</p>
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Intro;
