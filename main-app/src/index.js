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
  LoginPage,
  SignUpPage,
  MyPage,
  MySignOutPage,
  MyDataPage,
  MyListPage,
  NutritionPage,
  NutritionPage1,
  ImageUpload,
  AdminPage,
  BoardManage,
  UserManage,
  NutritionManage,
  AddNutrition,
  EditNutrition,
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
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
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
        path: '/nutrition',
        element: <NutritionPage />,
      },
      {
        path: '/nutrition1',
        element: <NutritionPage1 />,
      },
      {
        path: '/boardForm',
        element: <BoardFormPage />,
      },
      {
        path: '/signout',
        element: <MySignOutPage />,
      },
      {
        path: '/mydata',
        element: <MyDataPage />,
      },
      {
        path: '/mylist',
        element: <MyListPage />,
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
          {
            path: 'EditNutrition',
            element: <EditNutrition />,
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
