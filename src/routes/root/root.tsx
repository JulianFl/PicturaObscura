import * as dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import { Main } from '@/components/UI/Main';

function Root() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          navigate(`/intro`);

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
