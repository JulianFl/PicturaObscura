import React from 'react';

import { INITIAL_STEPS } from '@/InitialSteps';
import { useUserStore } from '@/store/useUserStore';
import { FeelingType } from '@/types/types';

interface FeelingsComponentProps {
  pageId: number;
}
export function Feelings({ pageId }: FeelingsComponentProps) {
  const { setFeeling } = useUserStore((state) => state.actions);
  const checkedFeelings = useUserStore(
    (state) => state.userData[pageId]?.checkedFeelings
  );
  const step = INITIAL_STEPS[pageId];
  const feelingChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const feeling = event.target.value as FeelingType;
    setFeeling(pageId, feeling);
  };

  return (
    <ul>
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
