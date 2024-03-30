import React from 'react';

import { Main } from '@/components/UI/Main';
import { useUserStore } from '@/store/useUserStore';

function PersonalReferences() {
  const { userData } = useUserStore((state) => state);
  const userDataEntries = Object.entries(userData);
  const sortedUserData = userDataEntries.sort(
    (a, b) => (b[1].strength || 0) - (a[1].strength || 0)
  );
  const topThreeUserData = sortedUserData.slice(0, 3);
  console.log(topThreeUserData);

  return (
    <Main
      // forward="/emotional-point/0"
      headerChildren="Teil 1/3: Den emotionalen Punkt des Bildes erkennen"
    >
      <section>
        <p>
          Ursprünglich im Lateinischen als „das Gestochene" angelegt, bezeichnet
          der Begriff des punctums eine „kleine Stelle", einen „sehr kleinen
          Fleck, Tupfen, oder Einstich" im Bild. So gründet das punctum nicht
          wie das studium auf dem allgemeinen bzw. „höflichen Interesse" an
          einem Foto, sondern durchbohrt jenes als „Pfeil" und hinterlässt an
          der Schnittstelle eine „Wunde"
        </p>
        <p>
          In der Fotografie angelegte Informationen werden als Teil des studiums
          sichtbar und bahnen sich im Zuge der kulturellen Wahrnehmung den Weg
          ins Bewusstsein. Dagegen bildet das punctum einen unbewussten Stich,
          es bricht affektiv in die Welt des Betrachters ein und rückt jegliche
          informationellen Bezüge in den Hintergrund. Was an der Stelle des
          Einstichs bleibt, ist eine Betroffenheit, eine Emotion oder eine
          Sehnsucht.
        </p>
        <p>-Die helle Kammer, 1980 Von Roland Barthes</p>
      </section>
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default PersonalReferences;