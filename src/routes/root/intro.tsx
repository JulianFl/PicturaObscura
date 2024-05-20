import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Main } from '@/components/UI/Main';

function Intro() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      headerChildren={t('intro.header')}
      className="intro"
    >
      <p>{t('intro.paragraph1')}</p>
      <p>{t('intro.paragraph2')}</p>
      <p>{t('intro.paragraph3')}</p>
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Intro;
