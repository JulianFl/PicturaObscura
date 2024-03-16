import React from 'react';

import { StepProps } from '@/types/interfaces';
import { FeelingType } from '@/types/types';

interface FeelingsComponentProps {
  step: StepProps;
  onFeelingClick: (feeling: FeelingType) => void;
}
export function Feelings({ step, onFeelingClick }: FeelingsComponentProps) {
  const feelingClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const feeling = event.currentTarget.textContent as FeelingType;
    onFeelingClick(feeling);
  };

  return (
    <ul>
      {step.feelings.map((feeling) => (
        <button
          key={`${step.id}${feeling}`}
          type="button"
          id={`${step.id}${feeling}`}
          onClick={feelingClickHandler}
        >
          {feeling}
        </button>
      ))}
    </ul>
  );
}
