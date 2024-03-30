import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@/assets/reset.css';
import '@/assets/fonts.scss';
import '@/assets/styles.scss';

import EmotionalPoint from '@/routes/emotionalPoint';
import PersonalReferences from '@/routes/personalReferences';
import Intro from '@/routes/root/intro';
import Root from '@/routes/root/root';

import { doc, getFirestore, setDoc } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
