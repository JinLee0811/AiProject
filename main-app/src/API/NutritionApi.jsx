import { useQuery, useMutation, useQueryClient } from 'react-query';
import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';

// GET Hook
export const useGetNutrition = (input, options) => {
  return useQuery(
    ['nutrition'],
    async () => {
      const { data } = await serverWithoutToken.get('/tonics');
      return data;
    },
    { ...options }
  );
};

// POST Hook
export const useCreateNutrition = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newNutrition) => {
      const { data } = await serverWithToken.post(
        '/admin/tonics/',
        newNutrition
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['nutrition']);
      },
    }
  );
};

// PUT Hook
export const useUpdateNutrition = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id, updatedNutrition) => {
      const { data } = await serverWithToken.put(
        `/admin/tonics/${id}`,
        updatedNutrition
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['nutrition']);
      },
    }
  );
};

// DELETE Hook
export const useDeleteNutrition = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await serverWithToken.delete(`/admin/tonics/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['nutrition']);
      },
    }
  );
};
