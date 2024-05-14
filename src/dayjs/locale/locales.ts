// @ts-nocheck

const a = {
  s: 'ein paar Sekunden',
  m: ['eine Minute', 'einer Minute'],
  mm: '%d Minuten',
  h: ['eine Stunde', 'einer Stunde'],
  hh: '%d Stunden',
  d: ['ein Tag', 'einem Tag'],
  dd: ['%d Tage', '%d Tagen'],
  M: ['ein Monat', 'einem Monat'],
  MM: ['%d Monate', '%d Monaten'],
  y: ['ein Jahr', 'einem Jahr'],
  yy: ['%d Jahre', '%d Jahren'],
};

function i(e, n, t) {
  let i = a[t];

  return Array.isArray(i) && (i = i[n ? 0 : 1]), i.replace('%d', e);
}

export const locales = {
  de: {
    name: 'de',
    weekdays:
      'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    months:
      'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
        '_'
      ),
    monthsShort:
      'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.'.split('_'),
    ordinal(event: any) {
      return `${event}.`;
    },
    weekStart: 1,
    yearStart: 4,
    formats: {
      LTS: 'HH:mm:ss',
      LT: 'HH:mm',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY HH:mm',
      LLLL: 'dddd, D. MMMM YYYY HH:mm',
    },
    relativeTime: {
      future: 'in %s',
      past: 'vor %s',
      s: i,
      m: i,
      mm: i,
      h: i,
      hh: i,
      d: i,
      dd: i,
      M: i,
      MM: i,
      y: i,
      yy: i,
    },
  },
  de: {
    name: 'de',
    weekdays:
      'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    months:
      'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
        '_'
      ),
    monthsShort:
      'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.'.split('_'),
    ordinal(event: any) {
      return `${event}.`;
    },
    weekStart: 1,
    yearStart: 4,
    formats: {
      LTS: 'HH:mm:ss',
      LT: 'HH:mm',
      L: 'DD.MM.YYYY',
      LL: 'D. MMMM YYYY',
      LLL: 'D. MMMM YYYY HH:mm',
      LLLL: 'dddd, D. MMMM YYYY HH:mm',
    },
    relativeTime: {
      future: 'in %s',
      past: 'vor %s',
      s: i,
      m: i,
      mm: i,
      h: i,
      hh: i,
      d: i,
      dd: i,
      M: i,
      MM: i,
      y: i,
      yy: i,
    },
  },
  'hy-am': {
    name: 'hy-am',
    weekdays:
      'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split(
        '_'
      ),
    months:
      'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split(
        '_'
      ),
    weekStart: 1,
    weekdaysShort: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    monthsShort: 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
    weekdaysMin: 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
    ordinal(_: any) {
      return _;
    },
    formats: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD.MM.YYYY',
      LL: 'D MMMM YYYY թ.',
      LLL: 'D MMMM YYYY թ., HH:mm',
      LLLL: 'dddd, D MMMM YYYY թ., HH:mm',
    },
    relativeTime: {
      future: '%s հետո',
      past: '%s առաջ',
      s: 'մի քանի վայրկյան',
      m: 'րոպե',
      mm: '%d րոպե',
      h: 'ժամ',
      hh: '%d ժամ',
      d: 'օր',
      dd: '%d օր',
      M: 'ամիս',
      MM: '%d ամիս',
      y: 'տարի',
      yy: '%d տարի',
    },
  },

  en: {
    name: 'en',
    weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
      '_'
    ),
    months:
      'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_'
      ),
    ordinal: function (e) {
      var n = ['th', 'st', 'nd', 'rd'],
        t = e % 100;
      return '[' + e + (n[(t - 20) % 10] || n[t] || n[0]) + ']';
    },
  },
};

// dayjs.locale(localeObject, null, true); // load locale for later use
