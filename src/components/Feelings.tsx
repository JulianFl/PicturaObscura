import React from 'react';
import Steps from '../Steps';
import { FeelingType } from '../types/types';
import { StepProps } from '../types/interfaces';

interface FeelingsComponentProps {
  feelings: FeelingType[];
  step: StepProps;
  onFeelingClick: (feeling: FeelingType) => void;
}
function Feelings({ feelings, step, onFeelingClick }: FeelingsComponentProps) {
  const feelingClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const feeling = e.currentTarget.textContent as FeelingType;
    onFeelingClick(feeling);
  };
  return (
    <ul>
      {feelings.map((feeling) => (
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

export default Feelings;
