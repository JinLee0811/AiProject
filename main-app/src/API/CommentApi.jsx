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

//대댓글 get
export const useGetReplyComment = (boardId) => {
  return useQuery(
    ['BoardDetail'], //query-key
    async () => {
      const { data } = await serverWithoutToken.get(`comment/${boardId}`);
      return data;
    }
  );
};

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
        queryClient.invalidateQueries(['BoardDetail', boardId]);
        //boardId와 관련된 데이터도 업데이트됨. 새로운 댓글이 추가 된 후 해당 게시물의 댓글 목록도 새로고침.
      },
    }
  );
};

// put
export const useUpdateComment = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, content, parent_comment_id }) => {
      const { data } = await serverWithToken.patch(
        `/comment/${boardId}/${id}`,
        { content, parent_comment_id }
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('BoardDetail');
      },
    }
  );
};

// delete
export const useDeleteComment = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await serverWithToken.delete(
        `/comment/${boardId}/${id}`
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('BoardDetail');
      },
    }
  );
};
