import React from 'react';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import classes from '@/components/Feelings.module.scss';
import { useUserStore } from '@/store/useUserStore';
import { FeelingProps, FeelingType } from '@/types/types';

export function Feelings() {
  const { id } = useParams();
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
    addFeeling(pageId, feelingElement);
  };

  return (
    <section className={`${classes.feelings}`}>
      {step.feelings.map((feeling) => (
        <div key={`${step.id}${feeling.key}`}>
          <input
            type="radio"
            id={`${step.id}${feeling.key}`}
            onChange={feelingChangeHandler}
            checked={checkedFeeling?.key === feeling.key}
            value={feeling.key}
          />
          <label htmlFor={`${step.id}${feeling.key}`}>{feeling.key}</label>
        </div>
      ))}
    </section>
  );
}
