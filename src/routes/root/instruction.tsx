import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import FirstImage from '@/assets/Test1.jpg';
import { Main } from '@/components/UI/Main';

function Instruction() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();

  const pageId = Number(id);
  const forward =
    pageId < 4 ? `/instruction/${pageId + 1}` : `/emotional-point/0`;
  const back = pageId === 0 ? `/intro` : `/instruction/${pageId - 1}`;
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          if (pageId < 4) {
            navigate(forward);

            return;
          }

          navigate(forward);
          break;
        case 'ArrowLeft':
          if (pageId === 0) {
            navigate(back);

            return;
          }
          navigate(back);

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
  }, [navigate, pageId]);

  return (
    <Main
      forward={forward}
      back={back}
      headerChildren={t('instruction.header')}
      className="instruction"
    >
      {pageId === 0 && (
        <img
          src={FirstImage}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      )}
      {pageId === 1 && <div>Bild 2</div>}
      {pageId === 2 && <div>Bild 3</div>}
      {pageId === 3 && <div>Bild 4</div>}
    </Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default Instruction;
