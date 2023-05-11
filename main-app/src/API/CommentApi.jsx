import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SERVER } from './AxiosApi';
import { useAtomValue } from 'jotai';
import { selectedBoardAtom } from '../Atoms/BoardAtom';

// const selectedBoard = useAtomValue(selectedBoardAtom);
//댓글 get
export const useGetComment = (boardId) => {
  return useQuery(
    ['Comments', boardId], //query-key
    async () => {
      const { data } = await SERVER.get(`/board/${boardId}/comments`);
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
      const { data } = await SERVER.post(`/comment/${boardId}`, newComment);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comment');
        queryClient.invalidateQueries(['comment', boardId]);
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
      const { data } = await SERVER.put(
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
      const { data } = await SERVER.delete(`/comment/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comment');
      },
    }
  );
};
