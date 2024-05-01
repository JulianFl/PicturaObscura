import React from 'react';

import classes from '@/components/IsLoading.module.scss';

export function IsLoading() {
  return (
    <div className={classes.isLoading}>
      <div className={classes['lds-ring']}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
