import dayjs from 'dayjs';
import localizedFomat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';

import DayJsImage from '@/assets/dayjs.png';
import de from '@/dayjs/locales/de';
import classes from '@/routes/assignment.module.scss';

const localeKeys = ['de', 'en', 'hy-am', 'ar-dz'];

dayjs.extend(localizedFomat);
dayjs.extend(relativeTime);
// @ts-ignore
dayjs.locale(de.name, de);
export function DayJs() {
  const [locale, setLocale] = useState(de.name);

  const setLocation = async (key: string) => {
    const localeFile = await import(`../../dayjs/locales/${key}.ts`);
    dayjs.locale(key, localeFile.default);
    setLocale(localeFile.default.name);
  };

  return (
    <article>
      <h2>Day.js</h2>
      <img src={DayJsImage} />
      <div className={classes.locales}>
        {localeKeys.map((localeKey) => (
          <button
            type="button"
            key={localeKey}
            onClick={() => setLocation(localeKey)}
            disabled={locale === localeKey}
          >
            {localeKey}
          </button>
        ))}
      </div>
      <div className={classes.date}>{dayjs().format('LLLL')}</div>
    </article>
  );
}
