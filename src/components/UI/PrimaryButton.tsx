import React from 'react';

import classes from '@/components/UI/PrimaryButton.module.scss';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
export function PrimaryButton({ children, onClick }: PrimaryButtonProps) {
  return (
    <button type="button" onClick={onClick} className={classes.button}>
      {children}
    </button>
  );
}
