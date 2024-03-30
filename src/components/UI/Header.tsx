import React from 'react';
import { Link } from 'react-router-dom';

import classes from '@/components/UI/Header.module.scss';
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
        <button onClick={onSaveFirstStep} type="button">
          Ersten Schritt beenden
        </button>
      );
    }

    return forward ? <Link to={forward}>weiter</Link> : null;
  };

  return (
    <header className={classes.header}>
      {children && <h3>{children}</h3>}
      <button type="button">info</button>
      <button type="button" onClick={() => resetStore()}>
        Zurücksetzen
      </button>
      {back && <Link to={back}>Zurück</Link>}
      {forwardOutput()}
    </header>
  );
}
