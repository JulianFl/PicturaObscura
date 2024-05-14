import dayjs from 'dayjs';
import localizedFomat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import { onCLS, onINP, onLCP } from 'web-vitals/attribution';

import { locales } from '@/dayjs/locale/locales';
import classes from '@/routes/dayjs.module.scss';

const localesMapped = Object.entries(locales).map(([key, value]) => ({
  key,
  name: value.name,
}));
const first = localesMapped[0];

dayjs.extend(localizedFomat);
dayjs.extend(relativeTime);
// @ts-ignore
dayjs.locale(first.name, locales[first.key]);

function Dayjs() {
  const [locale, setLocale] = useState(first.name);

  const getLanguage = (localeElement: { key: string; name: string }) => {
    // @ts-ignore
    dayjs.locale(locales[localeElement.name], locales[localeElement.key]);
    setLocale(localeElement.name);
  };

  return (
    <section className={classes.dayjs}>
      <h1
        style={{
          margin: '1rem',
        }}
      >
        Day.js
      </h1>
      <div className={classes.locales}>
        {localesMapped.map((localeElement) => (
          <button
            type="button"
            onClick={() => getLanguage(localeElement)}
            key={localeElement.name}
            disabled={locale === localeElement.name}
          >
            {localeElement.name}
          </button>
        ))}
      </div>
      <div className={classes.date}>{dayjs().format('LLLL')}</div>
      {/* {tmeFromNowValue} */}
    </section>
  );
}
// eslint-disable-next-line import/no-default-export
export default Dayjs;
