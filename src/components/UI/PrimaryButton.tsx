import React from 'react';

import classes from '@/components/UI/PrimaryButton.module.scss';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isFinish?: boolean;
  disabled?: boolean;
}
export function PrimaryButton({
  isFinish,
  children,
  onClick,
  disabled,
}: PrimaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${isFinish ? classes.finish : ''} ${classes.button}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
