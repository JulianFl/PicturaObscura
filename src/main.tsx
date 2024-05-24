import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@/assets/reset.css';
import '@/assets/fonts.scss';
import '@/assets/styles.scss';

import Assignment from '@/routes/assignment';
import EmotionalPoint from '@/routes/emotionalPoint';
import Instruction from '@/routes/root/instruction';
import Intro from '@/routes/root/intro';
import Root from '@/routes/root/root';
import Statistics from '@/routes/statistics';
import deTranslations from '@/translations/de.json';
import enTranslations from '@/translations/en.json';

import i18n from 'i18next';

export const INITIAL_LANGUAGE = 'en';
// Import the functions you need from the SDKs you need
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    de: {
      translation: deTranslations,
    },
  },
  lng: INITIAL_LANGUAGE,
  fallbackLng: INITIAL_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/intro',
    element: <Intro />,
  },
  {
    path: '/instruction/:id',
    element: <Instruction />,
  },
  {
    path: 'emotional-point/:id',
    element: <EmotionalPoint />,
  },
  {
    path: 'statistics/:id',
    element: <Statistics />,
  },
  {
    path: 'assignment',
    element: <Assignment />,
  },
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
