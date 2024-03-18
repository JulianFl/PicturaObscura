import React from 'react';

import { Header } from '@/components/UI/Header';

interface MainProps {
  href: string;
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
}
export function Main({ href, children, headerChildren }: MainProps) {
  return (
    <>
      <Header href={href}>{headerChildren || null}</Header>
      <main>{children}</main>
    </>
  );
}
