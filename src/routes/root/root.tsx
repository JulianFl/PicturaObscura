import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React from 'react';

import { Main } from '@/components/UI/Main';
import { db } from '@/firebase';

function Root() {
  // const addTest = async () => {
  //   await setDoc(doc(db, 'test', 'LA'), {
  //     name: 'Los Angeles',
  //     state: 'CA',
  //     country: 'USA',
  //   });
  // };

  return (
    <Main forward="/intro">
      <section>
        <h2>The Visual Literacy Workshop</h2>
        <h1>Pictura Obscura</h1>
        <figure>
          <img src="https://picsum.photos/id/238/910/466?grayscale=1" />
        </figure>
        {/* <button type="button" onClick={addTest}> */}
        {/*  Save */}
        {/* </button> */}
      </section>
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Root;
