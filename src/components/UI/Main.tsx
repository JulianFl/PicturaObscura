import React from 'react';

import { Header, HeaderProps } from '@/components/UI/Header';
import classes from '@/components/UI/Main.module.scss';

interface MainProps extends HeaderProps {
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
}
export function Main({
  forward,
  back,
  children,
  headerChildren,
  onSaveFirstStep,
}: MainProps) {
  return (
    <>
      <Header onSaveFirstStep={onSaveFirstStep} forward={forward} back={back}>
        {headerChildren || null}
      </Header>
      <main className={classes.main}>{children}</main>
    </>
  );
}
