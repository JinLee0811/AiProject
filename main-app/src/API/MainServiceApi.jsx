import { useQuery, useMutation, useQueryClient } from 'react-query';
import { serverWithToken, serverWithoutToken } from '../config/AxiosRequest';

// POST Hook: 질병 진단 이미지 업로드 후 결과물 반환
export const useCreateImage = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  return useMutation(
    async (newImage) => {
      const { data } = await serverWithoutToken.post('solution/predict', {
        data: newImage,
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['solutions']);
      },
      onError: (error) => {
        setError(error.response.data.message);
      },
    }
  );
};
// GET Hook: 등록된 해결책 조회
export const useGetSolutions = (options) => {
  return useQuery(
    ['solutions'],
    async () => {
      const { data } = await serverWithToken.get('/solution');
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
      const { data } = await serverWithToken.post('/solutions', newSolution);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['solutions']);
      },
    }
  );
};

// DELETE Hook: 등록된 해결책 삭제
export const useDeleteSolution = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id) => {
      const { data } = await serverWithToken.delete(`/solutions/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['solutions']);
      },
    }
  );
};

// GET Hook: 등록된 해결책 상세조회
export const useGetDetailSolutions = (detailId) => {
  return useQuery(['solutionDetil', detailId], async () => {
    const { data } = await serverWithToken.get(`/solution/${detailId}`);
    return data;
  });
};
