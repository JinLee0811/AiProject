import { useQuery, useMutation, useQueryClient } from 'react-query';
import { SERVER } from './AxiosApi';

// POST Hook: 질병 진단 이미지 업로드 후 결과물 반환
export const useCreateImage = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newImage) => {
      const { data } = await SERVER.post('/solutions/predict', newImage);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['solutions']);
      },
    }
  );
};

// GET Hook: 등록된 해결책 조회
export const useGetSolutions = (options) => {
  return useQuery(
    ['solutions'],
    async () => {
      const { data } = await SERVER.get('/solutions');
      return data;
    },
    { ...options }
  );
};

// POST Hook: 해결책 저장
export const useCreateSolution = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newSolution) => {
      const { data } = await SERVER.post('/solutions', newSolution);
      return data;
    },
    {
      onSuccess: (newSolution) => {
        queryClient.invalidateQueries(['solutions']);
        console.log('New solution created:', newSolution);
      },
    }
  );
};

// DELETE Hook: 등록된 해결책 삭제
export const useDeleteSolution = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await SERVER.delete(`/solutions/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['solutions']);
      },
    }
  );
};
