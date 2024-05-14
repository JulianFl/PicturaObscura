import React, { useEffect } from 'react';
import { onCLS, onINP, onLCP } from 'web-vitals/attribution';

import { DayJs } from '@/components/Assignment/DayJs';
import { Vitals } from '@/components/Assignment/Vitals';
import classes from '@/routes/assignment.module.scss';
import { useVitalsStore } from '@/store/useVitalsStore';

function Assignment() {
  return (
    <section className={classes.assignment}>
      <h1>Assignment</h1>
      <DayJs />
      <Vitals />
      <article>
        <h2>Largest Resource/Asset</h2>
        <p>
          According to the vite-bundle-visualizer the
          "firestore/dist/index.esm2017.js" is the largest resource and has a
          rendered size of 557.64Kb. The second largest is chart.js: 389.81Kb
        </p>
      </article>
    </section>
  );
}
// eslint-disable-next-line import/no-default-export
export default Assignment;
