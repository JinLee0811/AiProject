import { useMutation } from 'react-query';
import axios from 'axios';

export const useAddCommentMutation = (options) => {
  //댓글 작성 한 거 post
  return useMutation(
    async (commentData) => await axios.post('/api/comments', commentData),
    { ...options }
  );
};
