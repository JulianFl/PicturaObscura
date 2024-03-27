import React from 'react';
import { useParams } from 'react-router-dom';

import { INITIAL_STEPS } from '@/InitialSteps';
import classes from '@/components/Feelings.module.scss';
import { useUserStore } from '@/store/useUserStore';
import { FeelingType } from '@/types/types';

export function Feelings() {
  const { id } = useParams();
  const pageId = Number(id);
  const { addFeeling, removeFeeling } = useUserStore((state) => state.actions);
  const checkedFeelings = useUserStore(
    (state) => state.userData[pageId]?.checkedFeelings
  );

  const step = INITIAL_STEPS[pageId];
  const feelingChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const feeling = event.target.value as FeelingType;
    if (!event.target.checked) {
      removeFeeling(pageId, feeling);

      return;
    }
    addFeeling(pageId, feeling);
  };

  return (
    <ul className={classes.feelings}>
      {step.feelings.map((feeling) => (
        <div key={`${step.id}${feeling}`}>
          <input
            type="checkbox"
            id={`${step.id}${feeling}`}
            onChange={feelingChangeHandler}
            checked={checkedFeelings?.includes(feeling) ?? false}
            value={feeling}
          />
          <label htmlFor={`${step.id}${feeling}`}>{feeling}</label>
        </div>
      ))}
    </ul>
  );
}
