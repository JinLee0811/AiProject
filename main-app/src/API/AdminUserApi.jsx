import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const useGetUsers = () => {
  return useQuery(['users'], async () => {
    const { data } = await axios.get('/admin/users/${id}');
    return data;
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await axios.delete(`/admin/users/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users']);
      },
    }
  );
};
