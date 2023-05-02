import { useMutation } from 'react-query';
import axios from 'axios';

export const useAddCommentMutation = () => {
  return useMutation(
    async (commentData) => await axios.post('/api/comments', commentData),
    {}
  );
};
