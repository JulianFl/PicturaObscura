import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Main } from '@/components/UI/Main';

const FORWARD_ROUTE = '/instruction/0';
const BACK_ROUTE = '/';
function Intro() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          navigate(FORWARD_ROUTE);

          break;
        case 'ArrowLeft':
          navigate(BACK_ROUTE);

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
      forward={FORWARD_ROUTE}
      back={BACK_ROUTE}
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
