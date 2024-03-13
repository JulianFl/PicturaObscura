import React from 'react';

interface StrengthProps {
  strength: number;
  onChangeRange: (strength: number) => void;
}
function Strength({ strength, onChangeRange }: StrengthProps) {
  const changeRangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRange(Number(event.target.value));
  };
  return (
    <div>
      <input
        type="range"
        value={strength}
        onChange={changeRangeHandler}
        min="0"
        max="10"
      />
    </div>
  );
}

export default Strength;
