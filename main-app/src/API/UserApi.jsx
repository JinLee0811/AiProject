import { useQuery, useMutation, useQueryClient } from 'react-query';
import { serverWithToken } from '../config/AxiosRequest';

export const useUser = () => {
  return useQuery('user', async () => {
    const response = await serverWithToken.get('/user/profile');
    return response.data;
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
