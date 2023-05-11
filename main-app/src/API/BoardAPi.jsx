import { useQuery, useMutation, useQueryClient } from 'react-query';
import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';

// 전체 get
export const useGetBoard = () => {
  return useQuery(
    ['BoardList'], //query-key
    async () => {
      const { data } = await serverWithoutToken.get('/board');
      return data;
    }
  );
};

// 내 게시물 get
export const useGetMyBoard = (userId) => {
  return useQuery(
    'myBoardList', //query-key
    async () => {
      const { data } = await serverWithToken.get(`/board/${userId}`); // myList 만 가져올거라 :id
      return data;
    }
  );
};

// post
export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newPost) => {
      const { data } = await serverWithToken.post('/board', newPost);
      return data;
    },
    {
      onSuccess: (newPost) => {
        queryClient.invalidateQueries(['BoardList']); //여기서 말하는 BoardList는 useQuery의 key?
        console.log('New Post created:', newPost);
      }, //식별자를 가진 쿼리 결과를 무효화(invalidate)하여, 해당 쿼리를 다시 실행하도록 유도하는 역할을 한다라..
    }
  );
};

// put
export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatePost) => {
      const { data } = await serverWithToken.put(
        `/board/${updatePost.id}`,
        updatePost
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['BoardList']);
      },
    }
  );
};

// delete
export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await serverWithToken.delete(`/board/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['BoardList']);
      },
    }
  );
};

// admin delete
export const useAdminDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await serverWithToken.delete(`/admin/board/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['BoardList']);
      },
    }
  );
};
