import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import classes from '@/components/Feelings.module.scss';
import { useUserStore } from '@/store/useUserStore';
import { FeelingProps, FeelingType } from '@/types/types';

export function Feelings() {
  const { id } = useParams();
  const { t } = useTranslation();
  const pageId = Number(id);
  const { addFeeling } = useUserStore((state) => state.actions);
  const checkedFeeling = useUserStore(
    (state) => state.userData[pageId]?.checkedFeeling
  );

  const step = INITIAL_STEPS[pageId];
  const feelingChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const feeling = event.target.value as FeelingType;
    // if (!event.target.checked) {
    //   removeFeeling(pageId, feeling);
    //
    //   return;
    // }
    const feelingElement = step.feelings.find((f) => f.key === feeling);
    addFeeling(INITIAL_STEPS[pageId].id, feelingElement);
  };

  return (
    <section className={`${classes.feelings}`}>
      {step.feelings.map((feeling, index) => (
        <div key={`${step.id}${feeling.key}`}>
          <input
            type="radio"
            id={`${step.id}${feeling.key}`}
            onChange={feelingChangeHandler}
            checked={checkedFeeling?.key === feeling.key}
            value={feeling.key}
          />
          <label htmlFor={`${step.id}${feeling.key}`}>
            {t(`feelings.feeling${index + 1}`)}
          </label>
        </div>
      ))}
    </section>
  );
}
