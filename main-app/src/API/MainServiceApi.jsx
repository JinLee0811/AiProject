import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

// POST Hook: 질병 진단 이미지 업로드 후 결과물 반환
export const useCreateImage = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newImage) => {
      const { data } = await axios.post('/solutions/predict', newImage);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('solutions');
      },
    }
  );
};

// GET Hook: 등록된 해결책 조회
export const useGetSolutions = (options) => {
  return useQuery(
    'solutions',
    async () => {
      const { data } = await axios.get('/solutions');
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
      const { data } = await axios.post('/solutions', newSolution);
      return data;
    },
    {
      onSuccess: (newSolution) => {
        queryClient.invalidateQueries('solutions');
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
      const { data } = await axios.delete(`/solutions/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('solutions');
      },
    }
  );
};
