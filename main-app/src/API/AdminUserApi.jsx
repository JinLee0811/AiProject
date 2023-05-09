import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SERVER } from './AxiosApi';

export const useGetUsers = () => {
  return useQuery(['users'], async () => {
    const { data } = await SERVER.get('/admin/users/${id}');
    return data;
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await SERVER.delete(`/admin/users/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    }
  );
};
