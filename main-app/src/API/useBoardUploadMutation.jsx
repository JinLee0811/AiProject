import { useMutation } from 'react-query';
import axios from 'axios';

export const useBoardUploadMutation = (options) => {
  // boardform 작성시 post요청
  return useMutation(
    async (formData) => await axios('/api/', 'post', formData),
    { ...options }
  );
}; //첫번쨰 인자로 mutation 해야될 함수 넣는거, 두번째 인자는 이제 옵션들인데 내가 원하는 것만 쓰면됨

// 실제 내가 써먹는방법
// const {isLoading, mutate} = useBoardUploadMutation() => 위 내가 작성한 커스텀 훅을 호출하면 mutate를 반환
//isLoading의 경우도 내가 쓸애들 저기다 넣어서 한 번에 불러서 써먹으면댐 따로 state설정 할 필요가 없어진다!
// onClick={mutate} => 어딘가에서 onClick 시에 반환한 mutate를 넣기만 하면 끝임
