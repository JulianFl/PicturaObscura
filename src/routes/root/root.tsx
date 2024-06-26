import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Main } from '@/components/UI/Main';
import { PrimaryButton } from '@/components/UI/PrimaryButton';

const FORWARD_ROUTE = '/intro';
function Root() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          navigate(FORWARD_ROUTE);

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
      className="root"
      headerChildren={
        <div
          style={{
            display: 'flex',
            gap: '.5rem',
            margin: '0 auto',
          }}
        >
          <PrimaryButton
            onClick={() => changeLanguage('en')}
            disabled={i18n.language === 'en'}
          >
            en
          </PrimaryButton>
          <PrimaryButton
            disabled={i18n.language === 'de'}
            onClick={() => changeLanguage('de')}
          >
            de
          </PrimaryButton>
        </div>
      }
    >
      <section>
        <h2>{t('root.h2')}</h2>
        <h1>{t('root.h1')}</h1>
        <h4>
          <span>Sophie Hennerbichler</span>
          <span>Julian Fleig</span>
        </h4>
      </section>
      <figure>{/* <img src={cityImage} width={800} /> */}</figure>
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Root;
