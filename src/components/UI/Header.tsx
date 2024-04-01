import React from 'react';
import { Link } from 'react-router-dom';

import classes from '@/components/UI/Header.module.scss';
import { PrimaryButton } from '@/components/UI/PrimaryButton';
import { useUserStore } from '@/store/useUserStore';

export interface HeaderProps {
  children?: React.ReactNode;
  back?: string;
  forward?: string;
  onSaveFirstStep?: () => void;
}
export function Header({
  onSaveFirstStep,
  children,
  forward,
  back,
}: HeaderProps) {
  const { resetStore } = useUserStore((state) => state.actions);

  const forwardOutput = () => {
    if (onSaveFirstStep) {
      return (
        <Link className={classes.next} to="/personal-references">
          Fertig
        </Link>
      );
    }

    return forward ? (
      <Link className={classes.next} to={forward}>
        weiter
      </Link>
    ) : null;
  };

  return (
    <header className={classes.header}>
      {children && <h3>{children}</h3>}
      {/* <button type="button">info</button> */}
      <PrimaryButton onClick={() => resetStore()}>Abbrechen</PrimaryButton>
      {back && (
        <Link className={classes.next} to={back}>
          Zurück
        </Link>
      )}
      {forwardOutput()}
    </header>
  );
}
