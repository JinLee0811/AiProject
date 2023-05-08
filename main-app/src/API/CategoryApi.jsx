import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

// GET Hook
export const useGetCategories = (options) => {
  return useQuery(
    ['categories'],
    async () => {
      const { data } = await axios.get('/tonics/categories');
      return data;
    },
    { ...options }
  );
};

// POST Hook
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newCategory) => {
      const { data } = await axios.post('admin/tonics/category', newCategory);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
      },
    }
  );
};

// PUT Hook
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id, updatedCategory) => {
      const { data } = await axios.put(
        `/admin/tonics/categories/${id}`,
        updatedCategory
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
      },
    }
  );
};

// DELETE Hook
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await axios.delete(`admin/tonics/categories/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
      },
    }
  );
};
