import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

// GET Hook
export const useGetNutrition = (options) => {
  return useQuery(
    'nutrition',
    async () => {
      const { data } = await axios.get('/admin/nutrition');
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
      const { data } = await axios.post('/admin/nutrition', newNutrition);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('nutrition');
      },
    }
  );
};

// PUT Hook
export const useUpdateNutrition = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedNutrition) => {
      const { data } = await axios.put(
        `/admin/nutrition/${updatedNutrition.id}`,
        updatedNutrition
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('nutrition');
      },
    }
  );
};

// DELETE Hook
export const useDeleteNutrition = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await axios.delete(`/admin/nutrition${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('nutrition');
      },
    }
  );
};
