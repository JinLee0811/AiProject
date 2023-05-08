import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export const useGetComment = (boardId) => {
  return useQuery('comment', async () => {
    const { data } = axios.get(`/comment/${boardId}`);
    return data;
  });
};

//댓글 post
export const useCreateComment = (boardId, pId) => {
  // postman으로 endPoint 보내는 거 보고 맞추기.
  const queryClient = useQueryClient();

  return useMutation(
    async (newComment) => {
      const { data } = await axios.post(`/comment/${boardId}`, newComment);
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
