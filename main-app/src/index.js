import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import {
  MainPage,
  BoardPage,
  ServicePage,
  BoardDetailPage,
  BoardFormPage,
  ImageUpload,
  AdminPage,
  BoardManage,
  UserManage,
  NutritionManage,
  AddNutrition,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/board',
        element: <BoardPage />,
      },
      {
        path: '/service',
        element: <ServicePage />,
      },
      {
        path: '/service/upload',
        element: <ImageUpload />,
      },
      {
        path: '/boardDetail',
        element: <BoardDetailPage />,
      },
      {
        path: '/boardForm',
        element: <BoardFormPage />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
        children: [
          {
            path: 'user',
            element: <UserManage />,
          },
          {
            path: 'Board',
            element: <BoardManage />,
          },
          {
            path: 'Nutrition',
            element: <NutritionManage />,
          },
          {
            path: 'AddNutrition',
            element: <AddNutrition />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
