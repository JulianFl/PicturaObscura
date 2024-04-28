import React from 'react';
import { useParams } from 'react-router-dom';

import classes from '@/components/Strength.module.scss';
import { useUserStore } from '@/store/useUserStore';

interface StrengthProps {
  hideStrength?: boolean;
  disabled?: boolean;
  average?: number;
}
export function Strength({ average, hideStrength, disabled }: StrengthProps) {
  const { id } = useParams();
  const pageId = Number(id);
  const { setStrength } = useUserStore((state) => state.actions);
  const strength = useUserStore((state) => state.userData[pageId]?.strength);
  const changeRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrength(pageId, Number(event.target.value));
  };
  // console.log(average);

  return (
    <div className={`${hideStrength ? classes.hide : ''} ${classes.strength}`}>
      <span>10</span>
      <input
        disabled={disabled}
        type="range"
        value={average ?? strength ?? 0}
        step={0.1}
        onChange={changeRangeHandler}
        min={1}
        max={10}
      />
      <span>1</span>
    </div>
  );
}
