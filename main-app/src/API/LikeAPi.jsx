import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateLike = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation(async (userId) => {
    const { data } = await serverWithToken.post(`/like/${boardId}`, userId);
    return data;
  }, queryClient.invalidateQueries('board'));
};
// 그냥 우리는 userId만 담아서 post요청하면됨

export const useDeleteLike = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (userId) => {
      const { data } = await serverWithToken.delete(
        `/like/${boardId}/${userId}`
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('board');
      },
    }
  );
};
