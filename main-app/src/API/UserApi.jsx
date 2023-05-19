import { useQuery, useMutation, useQueryClient } from 'react-query';
import { serverWithToken } from '../config/AxiosRequest';
import { Auth } from './authApi';

export const useUser = () => {
  const { isLoggedIn } = Auth();

  return useQuery(['user'], async () => {
    if (!isLoggedIn) {
      return null; // 로그인되지 않은 경우, 더미 데이터(null)를 반환합니다.
    }

    const { data } = await serverWithToken.get('/user/profile');
    return data;
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      await serverWithToken.put('/user/password', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};

export const useUpdateNickname = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      await serverWithToken.put('/user/nickname', data);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (password) => {
      const { data } = await serverWithToken.delete('/user/profile', {
        data: { password },
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};
