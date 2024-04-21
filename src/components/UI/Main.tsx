import React from 'react';

import { Header, HeaderProps } from '@/components/UI/Header';
import classes from '@/components/UI/Main.module.scss';

interface MainProps extends HeaderProps {
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
  className?: string;
  progress?: number;
}
export function Main({
  forward,
  back,
  children,
  headerChildren,
  onSaveFirstStep,
  className,
  progress = 0,
}: MainProps) {
  return (
    <>
      <Header onSaveFirstStep={onSaveFirstStep} forward={forward} back={back}>
        {headerChildren || null}
      </Header>
      <progress value={progress} max="100" />
      <main
        className={`${classes.main} ${className ? classes[className] : ''}`}
      >
        {children}
      </main>
    </>
  );
}
