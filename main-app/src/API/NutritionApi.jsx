import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SERVER } from './AxiosApi';

// GET Hook
export const useGetNutrition = (input, options) => {
  return useQuery(
    ['nutrition'],
    async () => {
      const { data } = await SERVER.get('/tonics');
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
      const { data } = await SERVER.post('/admin/tonics/', newNutrition);
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
      const { data } = await SERVER.put(
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
      const { data } = await SERVER.delete(`/admin/tonics/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['nutrition']);
      },
    }
  );
};
