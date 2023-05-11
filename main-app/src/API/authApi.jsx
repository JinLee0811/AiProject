import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';
import { useAtom } from 'jotai';
import {
  isLoggedInAtom,
  isAdminAtom,
  accessTokenAtom,
  refreshTokenAtom,
  userAtom,
} from '../Atoms/TokenAtom';

const LOGIN_MUTATION_KEY = 'loginMutation';

export const Auth = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
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

          // 추가된 코드 시작
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setIsLoggedIn(false);
            setIsAdmin(false);
            setUser(null);
            window.location.href = '/login';
          }
          // 추가된 코드 끝
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
        queryClient.invalidateQueries(LOGIN_MUTATION_KEY);
        window.location.href = '/';
      },
      onError: (error) => {
        setError(error.response.data.message);
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
    }
  );

  const login = (data) => loginMutation.mutate(data);
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    logoutMutation.mutate();
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
