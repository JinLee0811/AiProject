import { useQuery, useMutation, useQueryClient } from 'react-query';
import { serverWithToken } from '../config/AxiosRequest';

export const useGetUsers = () => {
  return useQuery(['users'], async () => {
    const { data } = await serverWithToken.get('/admin/users');
    return data;
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await serverWithToken.delete(`/admin/users/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
        alert('해당 유저가 삭제되었습니다.');
      },
    }
  );
};
