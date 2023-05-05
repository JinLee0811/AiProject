import { React, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import * as S from './Nutrition.style';
import axios from 'axios';
import { nutritionsAtom, selectedNutritionAtom } from '../../Atoms/BoardAtom'; //전역으로 관리 초기값들을 저장해둔 곳
import { useNavigate } from 'react-router-dom';

const BoardList = ({ onPageChange }) => {
  const navigate = useNavigate();
  const [nutritions, setNutritions] = useAtom(nutritionsAtom); //axois.get을 통해 불러올 게시글 목록 표시
  const setSelectedNutrition = useSetAtom(selectedNutritionAtom); //클릭한 게시글의 정보를 저장하는 상태
  // const {
  //   data: fetchedBoard,
  //   isLoading,
  //   isError,
  // } = useGetBoard({
  //   onError: (error) => console.log(error.message),
  // }); //get
  useEffect(() => {
    axios
      .get('/Nutrition.json')
      .then((response) => {
        setNutritions(response.data); //가져온 data가 비어있던 postAtom에 업데이트 됨
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setNutritions]); //두번째 매개변수로 setPosts 박아둠으로써 상태가 업데이트될 때마다 데이터를 가져오고 컴포넌트를 업데이트

  const detailClick = (id) => {
    const nutrition = nutritions.find((nutrition) => nutrition.id === id);
    setSelectedNutrition(nutrition); //해당 id의 게시글 정보를 selectedPostAtom에 저장 (selectedPostAtom에을 Detail에서 쓸거임)
    navigate('/board');
  };
  const shortenContent = (content) => {
    //5글자 이상인 경우 뒤는 ... 으로 요약처리!
    if (content.length > 3) {
      return content.slice(0, 5) + '...';
    }
    return content;
  };

  return (
    <>
      <S.Container>
        <S.FormContainer>
          <ul>
            {nutritions.map((nutrition) => (
              <li key={nutrition.id}>
                <p className='image'>{nutrition.image}</p>
                <h2>{nutrition.title}</h2>
                <p>{shortenContent(nutrition.content)}</p>
                {/* content는 미리보기식으로 첫줄만 보이고 이후엔 ... 표기 */}
                <button
                  className='Detail'
                  onClick={() => detailClick(nutrition.id)}>
                  구경하기
                </button>
              </li>
            ))}
          </ul>
        </S.FormContainer>
      </S.Container>
    </>
  );
};
export default BoardList;
