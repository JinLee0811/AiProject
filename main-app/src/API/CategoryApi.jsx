import { useQuery, useMutation, useQueryClient } from 'react-query';
import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';

// GET Hook
export const useGetCategories = (input, options) => {
  return useQuery(
    ['categories'],
    async () => {
      const { data } = await serverWithoutToken.get('/tonics/categories');
      return data;
    },
    { ...options }
  );
};
//post hook
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data) => {
      const { data: responseData } = await serverWithToken.post(
        '/admin/tonics/category',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return responseData;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
      },
      onError: (error) => {
        console.log(error);
        alert(error.response.data.message);
      },
    }
  );
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, name }) => {
      const { data } = await serverWithToken.patch(
        `/admin/tonics/categories/${id}`,
        { name },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
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
      const { data } = await serverWithToken.delete(
        `admin/tonics/categories/${id}`
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
