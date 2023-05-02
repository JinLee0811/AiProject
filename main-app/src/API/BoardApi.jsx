import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

export const useBoardListQuery = () => {
  //전체 게시물 조회
  return useQuery(
    ['BoardList'], //query-key
    async () => await axios('/api', 'get'),
    {}
  );
};

const useMyBoardListQuery = (userId) => {
  //내 게시물 조회
  return useQuery(
    ['myBoardList', userId], //query-key
    async () => await axios('/api/board-list/${userId}', 'get'), // myList 만 가져올거라 :id
    {}
  );
};

export default useMyBoardListQuery;
// const {   return 이 의미하는게 아래 것들 모두야 즉 아래 것들을 다 쓸 수 있단거지
//     data,
//     dataUpdatedAt,
//     error,
//     errorUpdatedAt,
//     failureCount,
//     failureReason,
//     isError,
//     isFetched,
//     isFetchedAfterMount,
//     isFetching,
//     isPaused,
//     isLoading,
//     isLoadingError,
//     isPlaceholderData,
//     isPreviousData,
//     isRefetchError,
//     isRefetching,
//     isInitialLoading,
//     isStale,
//     isSuccess,
//     refetch,
//     remove,
//     status,
//     fetchStatus,
// } = useQuery

export const useBoardUploadMutation = () => {
  // boardform 작성시 post요청
  return useMutation(
    async (formData) => await axios('/api/', 'post', formData),
    {
      onMutate: () => {}, //요청 보내고 응답값이 오기전에~! 호출되는 애들 (mutation 중에)
      onError: (err, variables, context) => {}, // 서버가 에러를 뱉을 경우
      onSettled: () => {}, // 에러든 성공이든 쨌든 완료됏을때
      onSuccess: (data, variables, context) => {}, // 성공했을 때
    }
  );
}; //첫번쨰 인자로 mutation 해야될 함수 넣는거, 두번째 인자는 이제 옵션들인데 내가 원하는 것만 쓰면됨

// 실제 내가 써먹는방법
// const {isLoading, mutate} = useBoardUploadMutation() => 위 내가 작성한 커스텀 훅을 호출하면 mutate를 반환
//isLoading의 경우도 내가 쓸애들 저기다 넣어서 한 번에 불러서 써먹으면댐 따로 state설정 할 필요가 없어진다!
// onClick={mutate} => 어딘가에서 onClick 시에 반환한 mutate를 넣기만 하면 끝임
