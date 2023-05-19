import { useQuery, useMutation, useQueryClient } from 'react-query';
import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';
import { Auth } from './authApi';

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
    ['myBoardList', userId], //query-key
    async () => {
      const { data } = await serverWithToken.get('/board/myboard'); // myList 만 가져올거라 :id
      return data;
    }
  );
};

//게시물 상세보기 get
export const useGetDetailBoard = (boardId) => {
  return useQuery(['BoardDetail', boardId], async () => {
    const { data } = await serverWithoutToken.get(`/board/detail/${boardId}`);
    return data;
  });
};
// 게시글 post
export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newPost) => {
      const { data } = await serverWithToken.post('/board', newPost);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['BoardList']); //여기서 말하는 BoardList는 useQuery의 key?
      }, //식별자를 가진 쿼리 결과를 무효화(invalidate)하여, 해당 쿼리를 다시 실행하도록 유도하는 역할을 한다라..
    }
  );
};

// 게시글 patch
export const useUpdateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, updatedPost }) => {
      const { data } = await serverWithToken.patch(`/board/${id}`, updatedPost);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['BoardList']);
      },
    }
  );
};

// 게시글 delete
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

//좋아요
export const useCreateLike = (boardId) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newPost) => {
      const { data } = await serverWithToken.post(
        `/board/likes/${boardId}`,
        newPost
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['BoardList']); //여기서 말하는 BoardList는 useQuery의 key?
      }, //식별자를 가진 쿼리 결과를 무효화(invalidate)하여, 해당 쿼리를 다시 실행하도록 유도하는 역할을 한다라..
    }
  );
};

export const useGetLike = () => {
  const { isLoggedIn } = Auth();

  return useQuery(['like'], async () => {
    if (!isLoggedIn) {
      return null; // 로그인되지 않은 경우, 더미 데이터(null)를 반환합니다.
    }

    const { data } = await serverWithToken.get('/board/likes');
    return data;
  });
};
