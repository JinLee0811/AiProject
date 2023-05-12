import { useQuery, useMutation, useQueryClient } from 'react-query';
import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';

// const selectedBoard = useAtomValue(selectedBoardAtom);
//댓글 get
// export const useGetComment = (boardId) => {
//   return useQuery('comment', async () => {
//     const { data } = serverWithoutToken.get(`/comment/${boardId}`);
//     return data;
//   });
// };

//댓글, 대댓글 post
export const useCreateComment = (boardId) => {
  // postman으로 endPoint 보내는 거 보고 맞추기.
  const queryClient = useQueryClient();

  return useMutation(
    async (newComment) => {
      const { data } = await serverWithToken.post(
        `/comment/${boardId}`,
        newComment
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('BoardList');
        //boardId와 관련된 데이터도 업데이트됨. 새로운 댓글이 추가 된 후 해당 게시물의 댓글 목록도 새로고침.
      },
    }
  );
};

// put
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updateComment) => {
      const { data } = await serverWithToken.put(
        `/comment/${updateComment.id}`,
        updateComment
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comment');
      },
    }
  );
};

// delete
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await serverWithToken.delete(`/comment/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comment');
      },
    }
  );
};
