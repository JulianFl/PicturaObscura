import React from 'react';

import classes from '@/components/UI/PrimaryButton.module.scss';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isFinish?: boolean;
}
export function PrimaryButton({
  isFinish,
  children,
  onClick,
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${isFinish ? classes.finish : ''} ${classes.button}`}
    >
      {children}
    </button>
  );
}
