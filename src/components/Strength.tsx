import React from 'react';
import { useParams } from 'react-router-dom';

import classes from '@/components/Strength.module.scss';
import { useUserStore } from '@/store/useUserStore';

export function Strength() {
  const { id } = useParams();
  const pageId = Number(id);

  const { setStrength } = useUserStore((state) => state.actions);
  const strength = useUserStore((state) => state.userData[pageId]?.strength);
  const changeRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrength(pageId, Number(event.target.value));
  };

  return (
    <div className={classes.strength}>
      <span>10</span>
      <input
        // orient="vertical"
        type="range"
        value={strength ?? 0}
        step={1}
        onChange={changeRangeHandler}
        min="1"
        max="10"
      />
      <span>1</span>
    </div>
  );
}
