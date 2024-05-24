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
  onLastStep,
  className,
  progress = 0,
}: MainProps) {
  const isSafari = () =>
    navigator.userAgent.search('Safari') >= 0 &&
    navigator.userAgent.search('Chrome') < 0;

  return (
    <>
      <Header onLastStep={onLastStep} forward={forward} back={back}>
        {headerChildren || null}
      </Header>
      <progress value={progress} max="100" />
      {isSafari() && (
        <div className={`${classes.safari}`}>
          <h3>
            Sorry, but this page is not optimized for Safari. Please use a
            different browser.
          </h3>
        </div>
      )}
      <main
        className={`${classes.main} ${className ? classes[className] : ''} ${className === 'instruction' ? classes['main-instruction'] : ''}`}
      >
        {children}
      </main>
    </>
  );
}
