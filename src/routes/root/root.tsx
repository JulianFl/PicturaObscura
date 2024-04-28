import * as dayjs from 'dayjs';
import React, { useEffect } from 'react';

import { Main } from '@/components/UI/Main';

function Root() {
  useEffect(() => {
    // onCLS((metric) => console.log('CLS:', metric));
    // onFID((metric) => console.log('FID:', metric));
    // onLCP((metric) => console.log('LCP:', metric));
  }, []);

  return (
    <Main forward="/intro" className="root">
      <section>
        <h2>The Visual Literacy Workshop</h2>
        <h1>Pictura Obscura</h1>
      </section>
      <figure>{/* <img src={cityImage} width={800} /> */}</figure>
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Root;
