import React from 'react';

import { useUserStore } from '@/store/useUserStore';

interface StrengthProps {
  pageId: number;
}
export function Strength({ pageId }: StrengthProps) {
  const { setStrength } = useUserStore((state) => state.actions);
  const strength = useUserStore((state) => state.userData[pageId]?.strength);
  const changeRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrength(pageId, Number(event.target.value));
  };

  return (
    <div>
      <input
        type="range"
        value={strength ?? 0}
        onChange={changeRangeHandler}
        min="0"
        max="10"
      />
    </div>
  );
}
