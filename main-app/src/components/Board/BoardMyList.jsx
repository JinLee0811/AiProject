import { React, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import * as S from './BoardList.style';
import { useNavigate } from 'react-router-dom';
import { useGetMyBoard } from '../../API/BoardAPi';
import { boardsAtom, selectedBoardAtom } from '../../Atoms/BoardAtom'; //전역으로 관리 초기값들을 저장해둔 곳
import {
  BOARD_PATH,
  BOARD_DETAIL_PATH,
  BOARD_MY_PATH,
  BOARD_FORM_PATH,
} from '../common/path';

const BoardMyList = ({ onPageChange }) => {
  const [boards, setBoards] = useAtom(boardsAtom); //axois.get을 통해 불러올 게시글 목록 표시
  const setSelectedBoard = useSetAtom(selectedBoardAtom); //클릭한 게시글의 정보를 저장하는 상태
  const navigate = useNavigate();
  const { data: fetchedBoard, isLoading, isError } = useGetMyBoard();

  useEffect(() => {
    if (fetchedBoard) {
      setBoards(fetchedBoard);
    }
  }, [fetchedBoard, setBoards]);

  const detailClick = (boardId) => {
    //해당 id의 게시글 정보를 selectedPostAtom에 저장 (selectedPostAtom에을 Detail에서 쓸거임)
    navigate(`/board/detail/${boardId}`);
  };
  const boardClick = () => {
    onPageChange(BOARD_PATH);
  };
  const myBoardClick = () => {
    onPageChange(BOARD_MY_PATH);
  };
  const formClick = () => {
    setSelectedBoard('');
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
        <S.BannerImage
          src='https://img.freepik.com/free-photo/home-decor-indoor-planhttps://img.freepik.com/free-photo/picture-frame-leaning-against-white-wall_53876-133178.jpg?size=626&ext=jpg&ga=GA1.1.383630718.1678090108&semt=aist-shelf_53876-130000.jpg?w=1800&t=st=1683690318~exp=1683690918~hmac=28f5fe10fb2f0e42e923ea8ff4069705e5a82327e6f34b6521afc857a956bc93'
          alt='Example'
        />
        <div className='buttons'>
          <button onClick={boardClick}>전체보기</button>
          <button onClick={myBoardClick}>내 게시글 보기</button>
          <button onClick={formClick}>글쓰기</button>
        </div>
        <S.FormContainer>
          <ul>
            {boards.map((board) => (
              <li key={board.id}>
                <p className='time'>{filterTime(board.created_at)}</p>{' '}
                {/* 등록날짜 표시 */}
                <h2>{board.title}</h2>
                <p>{shortenContent(board.content)}</p>
                {/* content는 미리보기식으로 첫줄만 보이고 이후엔 ... 표기 */}
                <S.ListImage src={board.image} alt={board.title} />
                <S.Infor>
                  <span className='material-symbols-outlined'>
                    emoji_nature
                  </span>
                  <p className='nickname'>{board.user.nickname}</p>
                </S.Infor>
                <p className='comment'>
                  조회 {board.views} • 댓글 • 관심 {board.likes}
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
export default BoardMyList;
