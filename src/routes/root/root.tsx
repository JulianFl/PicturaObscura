import React, { useEffect } from 'react';
import { onLCP, onFID, onCLS } from 'web-vitals';

import { Main } from '@/components/UI/Main';

function Root() {
  useEffect(() => {
    // if ('storage' in navigator && 'estimate' in navigator.storage) {
    //   const { usage, quota } = await navigator.storage.estimate();
    //   console.log(`Using ${usage} out of ${quota} bytes.`);
    //
    //   if (quota && quota < 120000000) {
    //     console.log('Incognito');
    //     onCLS((metric) => console.log('CLS:', metric));
    //     onFID((metric) => console.log('FID:', metric));
    //     onLCP((metric) => console.log('LCP:', metric));
    //   } else {
    //     console.log('Not Incognito');
    //   }
    // } else {
    //   console.log('Can not detect');
    // }
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
