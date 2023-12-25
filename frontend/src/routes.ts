import React from 'react';

export const routes = [
  {
    path: '/login',
    element: React.lazy(() => import('./views/Login'))
  },
  {
    path: '/home',
    element: React.lazy(() => import('./views/Home'))
  },
  {
    path: '/register',
    element: React.lazy(() => import('./views/Register'))
  }
];
