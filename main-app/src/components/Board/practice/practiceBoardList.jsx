import { React, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import * as S from '../BoardList.style';
import { useGetBoard } from '../../../API/BoardAPi';
import { boardsAtom, selectedBoardAtom } from '../../../Atoms/BoardAtom'; //전역으로 관리 초기값들을 저장해둔 곳
import {
  BOARD_PATH,
  BOARD_DETAIL_PATH,
  BOARD_MY_PATH,
  BOARD_FORM_PATH,
} from '../../common/path';

const BoardList = ({ onPageChange }) => {
  const [boards, setBoards] = useAtom(boardsAtom); //axois.get을 통해 불러올 게시글 목록 표시
  const setSelectedBoard = useSetAtom(selectedBoardAtom); //클릭한 게시글의 정보를 저장하는 상태
  const { data: fetchedBoard, isLoading, isError } = useGetBoard(); //get

  useEffect(() => {
    //fetchedBoard 상태 값이 변경될 때마다 useEffect 훅 호출
    if (fetchedBoard) {
      setBoards(fetchedBoard); //setBoards 에 변경된 상태값 담아서 boards 변경
    }
  }, [fetchedBoard, setBoards]);

  const detailClick = (id) => {
    const board = boards.find((board) => board.id === id);
    setSelectedBoard(board); //해당 id의 게시글 정보를 selectedPostAtom에 저장 (selectedPostAtom에을 Detail에서 쓸거임)
    onPageChange(BOARD_DETAIL_PATH);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {isError.message}</div>; // 서버에서 반환된 에러메세지 보여줌
  }

  const boardClick = () => {
    onPageChange(BOARD_PATH);
  };
  const myBoardClick = () => {
    onPageChange(BOARD_MY_PATH);
  };
  const formClick = () => {
    onPageChange(BOARD_FORM_PATH);
  };
  const shortenContent = (content) => {
    //5글자 이상인 경우 뒤는 ... 으로 요약처리!
    if (content.length > 3) {
      return content.slice(0, 5) + '...';
    }
    return content;
  };
  const filterTime = (time) => {
    const filter = Date.now() - new Date(time);
    const filterSeconds = Math.floor(filter / 1000);
    const filterMinutes = Math.floor(filter / 60000);
    const filterHours = Math.floor(filter / 3600000);
    const filterDays = Math.floor(filter / 86400000);

    if (filterSeconds < 60) {
      return `${filterSeconds}초 전`;
    } else if (filterMinutes < 60) {
      return `${filterMinutes}분 전`;
    } else if (filterHours < 24) {
      return `${filterHours}시간 전`;
    } else {
      return `${filterDays}일 전`;
    }
  };

  return (
    <>
      <S.Container>
        <img className='banner' src='/bannerImage.jpg' alt='Example' />
        <div className='buttons'>
          <button onClick={boardClick}>전체보기</button>
          <button onClick={myBoardClick}>내 게시글 보기</button>
          <button onClick={formClick}>글쓰기</button>
        </div>
        <S.FormContainer>
          <ul>
            {boards.map((board) => (
              <li key={board.id}>
                <p className='time'>{filterTime(board.time)}</p>{' '}
                {/* 등록날짜 표시 */}
                <h2>{board.title}</h2>
                <p>{shortenContent(board.content)}</p>
                {/* content는 미리보기식으로 첫줄만 보이고 이후엔 ... 표기 */}
                <p className='image'>{board.image}</p>
                <S.Infor>
                  <span className='material-symbols-outlined'>
                    emoji_nature
                  </span>
                  <p className='nickname'>{board.nickname}</p>
                </S.Infor>
                <p className='comment'>
                  조회 {board.views} • 댓글 {board.commentCount} • 관심{' '}
                  {board.like}
                </p>
                <button
                  className='Detail'
                  onClick={() => detailClick(board.id)}>
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
