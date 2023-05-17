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
export const useCreateNutrition = (input, options) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newNutrition) => {
      const { data } = await serverWithToken.post(
        '/admin/tonics',
        newNutrition
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['nutrition']);
      },
    },
    { ...options }
  );
};

export const useUpdateNutrition = (options) => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, formData }) => {
      const { data } = await serverWithToken.patch(
        `/admin/tonics/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['nutrition']);
      },
      ...options,
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

//영양제 상세보기
export const useGetTonicDetail = (tonicId) => {
  return useQuery(['tonicDetail', tonicId], async () => {
    const { data } = await serverWithoutToken.get(`/tonics/${tonicId}`);
    return data;
  });
};
