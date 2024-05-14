import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@/assets/reset.css';
import '@/assets/fonts.scss';
import '@/assets/styles.scss';

import Assignment from '@/routes/assignment';
import EmotionalPoint from '@/routes/emotionalPoint';
import Intro from '@/routes/root/intro';
import Root from '@/routes/root/root';
import Statistics from '@/routes/statistics';

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
