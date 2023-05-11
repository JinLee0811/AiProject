import axios from 'axios';
import { SERVER_BASE_URL } from './Server';

// 어세스 토큰이 필요한 요청을 보낼 때 사용할 서버 인스턴스
const serverWithToken = axios.create({
  baseURL: SERVER_BASE_URL,
});

serverWithToken.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 어세스 토큰이 필요없는 요청을 보낼 때 사용할 서버 인스턴스
const serverWithoutToken = axios.create({
  baseURL: SERVER_BASE_URL,
});

export { serverWithToken, serverWithoutToken };
