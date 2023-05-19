import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import {
  isLoggedInAtom,
  isAdminAtom,
  accessTokenAtom,
  refreshTokenAtom,
  isErrorAtom,
  userAtom,
} from '../Atoms/TokenAtom';

const LOGIN_MUTATION_KEY = 'loginMutation';

export const Auth = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useAtom(isErrorAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    if (access_token && refresh_token) {
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setIsLoggedIn(true);

      serverWithToken
        .get('/user/profile')
        .then((response) => {
          const user = response.data;
          setUser(user);
          setIsAdmin(user.is_admin === 1);
        })
        .catch((error) => {
          console.error(error);
          setIsAdmin(false);
          handleUnauthorized();
        });
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUser(null);
    }
  }, [setUser, isLoggedIn]);

  const loginMutation = useMutation(
    (data) => serverWithoutToken.post('/user/signin', data),
    {
      onSuccess: (response) => {
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        window.location.href = '/';
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || '로그인 실패';
        setError(errorMessage);
      },
    }
  );

  const logoutMutation = useMutation(() =>
    serverWithToken.post('/user/signout')
  );

  const refreshMutation = useMutation(
    () => serverWithToken.post('/user/access'),
    {
      onSuccess: (response) => {
        const { access_token } = response.data;
        setAccessToken(access_token);
      },
      onError: (error) => {
        console.error(error);
        handleUnauthorized();
      },
    }
  );

  const handleUnauthorized = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    window.location.href = '/login';
  };
  const login = (data) => loginMutation.mutate(data);
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    logoutMutation.mutate();
    window.location.href = '/';
    queryClient.invalidateQueries(LOGIN_MUTATION_KEY);
  };
  const refresh = () => refreshMutation.mutate();

  return {
    login,
    logout,
    refresh,
    error,
    isLoggedIn,
    isAdmin,
    user,
  };
};
