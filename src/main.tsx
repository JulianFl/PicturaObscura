import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@/assets/reset.css';
import '@/assets/fonts.scss';
import '@/assets/styles.scss';

import EmotionalPoint from '@/routes/emotionalPoint';
import PersonalReferences from '@/routes/personalReferences';
import PersonalReferencesIntro from '@/routes/personalReferencesIntro';
import Intro from '@/routes/root/intro';
import Root from '@/routes/root/root';

// Import the functions you need from the SDKs you need

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
    path: 'emotional-point/:id',
    element: <EmotionalPoint />,
  },
  {
    path: 'personal-references',
    element: <PersonalReferences />,
  },
  {
    path: '/personal-references/intro',
    element: <PersonalReferencesIntro />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
