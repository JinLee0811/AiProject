import { useAtom } from 'jotai';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { accessTokenAtom, refreshTokenAtom } from '../Atoms/TokenAtom';

// 사용자 로그인 요청
const login = async (username, password) => {
  const response = await axios.post('/api/auth/login', { username, password });
  const { accessToken, refreshToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return accessToken;
};

// access token refresh 요청
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await axios.post('/api/auth/refresh', { refreshToken });
  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  return accessToken;
};

// useAuth Hook
export const useAuth = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);

  // 로그인을 위한 useMutation Hook
  const loginMutation = useMutation(login, {
    onSuccess: (accessToken) => setAccessToken(accessToken),
  });

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
  };

  useQuery(
    'accessToken', // 쿼리 이름
    async () => {
      const token = localStorage.getItem('accessToken'); // local storage에서 access token 가져옴
      if (token) {
        try {
          await axios.get('/api/protected', {
            // access token이 유효한지 API 요청으로 확인
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return token;
        } catch (error) {
          if (error.response.status === 401) {
            // access token이 만료되었다면
            const newToken = await refreshAccessToken(); // refresh token으로 새로운 access token을 가져옴
            return newToken; // 새로운 access token 반환
          }
        }
      }
      logout();
      throw new Error('Access token not found');
    },
    {
      retry: false,
      refetchInterval: 10 * 60 * 1000, // Refresh access token every 10 minutes
      onError: () => {
        logout();
      },
    }
  );
  return {
    accessToken,
    login: loginMutation.mutate,
    logout,
  };
};
