import React from 'react';
import { Link } from 'react-router-dom';

import classes from '@/components/UI/Header.module.scss';
import { useUserStore } from '@/store/useUserStore';

export interface HeaderProps {
  children?: React.ReactNode;
  back?: string;
  forward?: string;
}
export function Header({ children, forward, back }: HeaderProps) {
  const { resetStore } = useUserStore((state) => state.actions);

  return (
    <header className={classes.header}>
      {children && <h3>{children}</h3>}
      <button type="button">info</button>
      <button type="button" onClick={() => resetStore()}>
        Zurücksetzen
      </button>
      {back && <Link to={back}>Zurück</Link>}
      {forward && <Link to={forward}>weiter</Link>}
    </header>
  );
}
