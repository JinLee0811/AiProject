import { useAtom } from 'jotai';
import { useQuery, useMutation } from 'react-query';
import { SERVER } from './AxiosApi';
import {
  accessTokenAtom,
  refreshTokenAtom,
  userAtom,
} from '../Atoms/TokenAtom';
import { useNavigate } from 'react-router-dom';

//토큰 api 추가 해야함 2개? (access token refresh 요청,토큰 유효성 검사 부분)
//어세스 리프레시 동시만료 시에는 로그인이고
//어세스만 만료시 다시 어세스 요청 (리프레시를 가지고)
// api 3개 -> 로그인, 회원가입, 토큰

// 사용자 로그인 요청
const login = async (email, password) => {
  const response = await SERVER.post('/signin', { email, password });
  const { accessToken, refreshToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  return accessToken;
};

// access token refresh 요청
const getRefreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await SERVER.post('/api/auth/refresh', { refreshToken });
  const { accessToken } = response.data;
  localStorage.setItem('accessToken', accessToken);
  return accessToken;
};

// useAuth Hook
export const useAuth = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
  const [user, setUser] = useAtom(userAtom); // 유저 정보를 담는 Atom
  const navigate = useNavigate();

  // 로그인을 위한 useMutation Hook
  const loginMutation = useMutation(login, {
    onSuccess: (accessToken) => setAccessToken(accessToken),
  });

  // 로그아웃 함수
  const logout = async () => {
    try {
      await SERVER.post('/signout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null); // 로그아웃 시 유저 정보도 초기화
  };

  // 토큰 유효성 검사 부분
  useQuery(
    'accessToken',
    async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await SERVER.get('/api/protected', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data); // 유저 정보 업데이트
          return token;
        } catch (error) {
          if (error.response.status === 401) {
            const newToken = await getRefreshAccessToken();
            return newToken;
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

  // setUser 함수 정의
  const setUserData = (data) => {
    setUser(data);
  };

  // isAdmin 상태 계산
  const isAdmin = user?.role === 'admin';

  return {
    accessToken,
    user,
    login: loginMutation.mutate,
    logout,
    isAdmin,
  };
};

// 회원가입 hook
const registerUser = async (userData) => {
  const { data } = await SERVER.post('/signup', userData);
  return data;
};

export function useRegister() {
  return useMutation(registerUser);
}
