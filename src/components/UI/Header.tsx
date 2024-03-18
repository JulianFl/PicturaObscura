import React from 'react';
import { Link } from 'react-router-dom';

import classes from '@/components/UI/Header.module.scss';

interface HeaderProps {
  children?: React.ReactNode;
  href: string;
}
export function Header({ children, href }: HeaderProps) {
  return (
    <header className={classes.header}>
      {children && <h3>{children}</h3>}
      <button type="button">info</button>
      <Link to={href}>weiter</Link>
    </header>
  );
}
