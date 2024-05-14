import React, { useEffect } from 'react';
import { onCLS, onINP, onLCP } from 'web-vitals/attribution';

import classes from '@/routes/assignment.module.scss';
import { useVitalsStore } from '@/store/useVitalsStore';

export function Vitals() {
  const { setLcp, setCls, setInp } = useVitalsStore((state) => state.actions);
  const { lcp, cls, inp } = useVitalsStore((state) => state);

  useEffect(() => {
    onCLS(setCls);
    onINP(setInp);
    onLCP(setLcp);
  }, [setLcp, setCls, setInp]);

  return (
    <article className={classes.vitals}>
      <h2>Core Web Vitals</h2>
      <section>
        <div>
          <h3>LCP</h3>
          {lcp && lcp.value ? lcp.value.toFixed(2) : 495.3}
        </div>
        <div>
          <h3>INP</h3>
          {inp && inp.value ? inp.value.toFixed(2) : 0}
        </div>
        <div>
          <h3>CLS</h3>
          {cls && cls.value ? cls.value.toFixed(2) : 0.15}
        </div>
      </section>
    </article>
  );
}
