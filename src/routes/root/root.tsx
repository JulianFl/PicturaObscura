import React from 'react';

import { Main } from '@/components/UI/Main';

function Root() {
  return (
    <Main forward="/intro">
      <section>
        <h2>The Visual Literacy Workshop</h2>
        <h1>Pictura Obscura</h1>
        <figure>
          <img src="https://picsum.photos/id/238/910/466?grayscale=1" />
        </figure>
      </section>
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Root;
