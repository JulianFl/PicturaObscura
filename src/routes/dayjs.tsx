import dayjs from 'dayjs';
import de from 'dayjs/locale/de';
import localizedFomat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const localesArray = [
  'de',
  'en',
  'ar',
  'es',
  'fr',
  'it',
  'ja',
  'ko',
  'nl',
  'pt',
  'ru',
  'zh',
];
dayjs.extend(localizedFomat);
dayjs.extend(relativeTime);

// dayjs.locale(locale);
function Dayjs() {
  const { locale } = useParams();
  console.log(locale);
  // const date123 = Date.now();
  const tmeFromNowValue = dayjs('1999-01-01').fromNow();
  console.log(de);
  // dayjs.locale(locale);
  // const module = await import(`./dir/${file}.js`);
  const getLanguage = async () => {
    // const lang = await getLanguage();
    /**
     * We manually use relative path import to make the rollup plugin happy.
     */
    const translations = await import(
      `../../node_modules/dayjs/locale/${locale}.js`
    );
    console.log(translations);
    // translations = !lang.startsWith('en')
    //   ? await modules[`./${lang}.js`]()
    //   : await modules[`./en-us.js`]();
  };
  //
  // useEffect(() => {
  //   const loadLocale = async () => {
  //     if (locale && localesArray.includes(locale)) {
  //       try {
  //         const module = await import(`dayjs/locale/${locale}.js`);
  //         console.log(module);
  //         // dayjs.locale(module.default);
  //       } catch (error) {
  //         console.error(`Failed to load locale: ${locale}`, error);
  //       }
  //     }
  //   };
  //
  //   loadLocale();
  // }, [locale]);

  // const getLocales = async (language: string) => {
  //   if (localesArray.includes(localeString)) {
  //     dayjs.locale(locale);
  //     const module = await import(`./dir/${file}.js`);
  //   }
  // };
  return (
    <div>
      <h1
        style={{
          margin: '1rem',
        }}
      >
        Dayjs
      </h1>
      <button type="button" onClick={getLanguage}>
        GetLanguage
      </button>
      {localesArray.map((localeElement) => (
        <Link
          style={{
            margin: '1rem',
          }}
          to={`/dayjs/${localeElement}`}
          key={localeElement}
        >
          {localeElement}
        </Link>
      ))}
      {dayjs().format('L LT')}
      {/* {tmeFromNowValue} */}
    </div>
  );
}
// eslint-disable-next-line import/no-default-export
export default Dayjs;
