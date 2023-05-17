import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Redirect,
} from 'react-router-dom';

import App from './App';
import './index.css';
import {
  MainPage,
  BoardListPage,
  BoardMyListPage,
  ServicePage,
  BoardDetailPage,
  BoardFormPage,
  LoginPage,
  SignUpPage,
  MyPage,
  ImageUpload,
  AdminPage,
  BoardManage,
  UserManage,
  NutritionManage,
  AddNutrition,
  NutritionPage,
  CategoryPage,
  InfoPage,
  SignOutPage,
  SolutionListPage,
  SolutionDetail,
  NutritionDetailPage,
  ChangePassword,
} from './pages';
import { Auth } from './API/authApi';

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
        children: [
          {
            path: 'info',
            element: <InfoPage />,
          },
          {
            path: 'solutionList',
            element: <SolutionListPage />,
          },
          {
            path: 'signout',
            element: <SignOutPage />,
          },
          {
            path: 'solutionDetail/:detailId',
            element: <SolutionDetail />,
          },
          {
            path: 'changePassword',
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: '/board',
        element: <BoardListPage />,
      },
      {
        path: '/board/My',
        element: <BoardMyListPage />,
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
        path: '/board/detail/:boardId',
        element: <BoardDetailPage />,
      },
      {
        path: '/nutrition',
        element: <NutritionPage />,
      },
      {
        path: '/nutrition/detail/:tonicId',
        element: <NutritionDetailPage />,
      },
      {
        path: '/board/Form',
        element: <BoardFormPage />,
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
          {
            path: 'Category',
            element: <CategoryPage />,
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
