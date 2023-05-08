import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  NCategory1,
  NCategory2,
  NCategory3,
  NutritionPage1,
  CategoryPage,
  InfoPage,
  SignOutPage,
  SolutionListPage,
  SolutionDetail,
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
            path: 'solutionDetail',
            element: <SolutionDetail />,
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
        path: '/board/Detail',
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
        path: '/board/Form',
        element: <BoardFormPage />,
      },
      {
        path: '/nutrition2',
        element: <NutritionPage1 />,
      },
      {
        path: '/nutrition3',
        element: <NutritionPage1 />,
      },
      {
        path: '/nutrition4',
        element: <NutritionPage1 />,
      },
      {
        path: '/nutrition5',
        element: <NutritionPage1 />,
      },
      {
        path: '/nutrition6',
        element: <NutritionPage1 />,
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
      {
        path: '/nutritionpage',
        element: <NutritionPage />,
        children: [
          {
            path: 'ncategory1',
            element: <NCategory1 />,
          },
          {
            path: 'ncategory2',
            element: <NCategory2 />,
          },
          {
            path: 'ncategory3',
            element: <NCategory3 />,
          },
        ],
      },
      {
        path: '/nutritionpage1',
        element: <NutritionPage1 />,
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
