import React from 'react';

import networkTabImage from '@/assets/network_tab.png';
import { DayJs } from '@/components/Assignment/DayJs';
import { Vitals } from '@/components/Assignment/Vitals';
import classes from '@/routes/assignment.module.scss';

function Assignment() {
  return (
    <section className={classes.assignment}>
      <h1>Assignment</h1>
      <DayJs />
      <Vitals />
      <article>
        <h2>3. Largest Resource/Asset</h2>
        <p>
          According to the network tab the "index-BtqweGmO.js" is the largest
          resource and has a size of 283Kb.
        </p>
        <img src={networkTabImage} alt="" />
      </article>
    </section>
  );
}
// eslint-disable-next-line import/no-default-export
export default Assignment;
