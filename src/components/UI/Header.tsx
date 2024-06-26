import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Forward from '@/assets/icons/arrow_forward.svg?react';
import Check from '@/assets/icons/check.svg?react';
import Close from '@/assets/icons/close.svg?react';
import classes from '@/components/UI/Header.module.scss';
import { PrimaryButton } from '@/components/UI/PrimaryButton';
import { useUserStore } from '@/store/useUserStore';

export interface HeaderProps {
  children?: React.ReactNode;
  back?: string;
  forward?: string;
  onLastStep?: () => void;
}
export function Header({ onLastStep, children, forward, back }: HeaderProps) {
  const { resetStore } = useUserStore((state) => state.actions);
  const navigate = useNavigate();
  const forwardOutput = () => {
    if (onLastStep) {
      return (
        <PrimaryButton
          onClick={onLastStep}
          isFinish
          // style={{ backgroundColor: '#66bb6a' }}
          // className={classes.next}
          // to="/personal-references"
        >
          <Check />
        </PrimaryButton>
      );
    }

    return forward ? (
      <Link className={classes.next} to={forward}>
        <Forward />
      </Link>
    ) : null;
  };

  return (
    <header className={classes.header}>
      {children && <h3>{children}</h3>}
      <div className={classes['button-group']}>
        <PrimaryButton
          onClick={() => {
            navigate('/');
            resetStore();
          }}
        >
          <Close fill="black" />
        </PrimaryButton>
        {back && (
          <Link className={classes.back} to={back}>
            <Forward />
          </Link>
        )}
        {forwardOutput()}
      </div>
    </header>
  );
}
