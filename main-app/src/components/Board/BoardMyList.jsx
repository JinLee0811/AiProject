import { React, useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import styled from 'styled-components';
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
import { useCreateLike, useGetLike } from '../../API/BoardAPi';
import { Auth } from '../../API/authApi';
const BoardMyList = ({ onPageChange }) => {
  const [boards, setBoards] = useAtom(boardsAtom); //axois.get을 통해 불러올 게시글 목록 표시
  const setSelectedBoard = useSetAtom(selectedBoardAtom); //클릭한 게시글의 정보를 저장하는 상태
  const navigate = useNavigate();
  const { isLoggedIn } = Auth();
  const [likedBoard, setLikedBoard] = useState('');
  const { data: fetchedBoard, isLoading, isError } = useGetMyBoard();
  const { data: likeCheck } = useGetLike();

  useEffect(() => {
    if (likeCheck) {
      setLikedBoard(likeCheck.boardId);
      console.log(likeCheck.boardId);
    }
  }, [likeCheck]);

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
          src='https://img.freepik.com/premium-photo/different-green-house-plants-window-sunny-summer-day-banner-selective-focus_121867-1623.jpg'
          alt='Example'
        />
        <div className='buttons'>
          <button onClick={boardClick}>전체보기</button>
          <button onClick={myBoardClick}>내 게시글 보기</button>
          <button onClick={formClick}>글쓰기</button>
        </div>
        <S.FormContainer>
          {boards.length === 0 ? (
            <NoBoards>첫 게시글을 작성해 보세요</NoBoards>
          ) : (
            <ul>
              {[...boards].reverse().map((board) => {
                const isLiked =
                  likedBoard && likedBoard.some((postId) => postId == board.id);
                return (
                  <li key={board.id}>
                    <p className='time'>{filterTime(board.created_at)}</p>
                    <h2>{board.title}</h2>
                    <p style={{ whiteSpace: 'pre-line' }}>{board.content}</p>
                    <S.ListImage src={board.image} alt={board.title} />
                    <S.Infor>
                      <span className='material-symbols-outlined'>
                        emoji_nature
                      </span>
                      <p className='nickname'>{board.user.nickname}</p>
                    </S.Infor>
                    <p className='comment'>
                      <LikeHeart onClick={() => detailClick(board.id)}>
                        {isLiked && isLoggedIn ? '❤️' : '🤍'}
                      </LikeHeart>
                      조회 {board.views} • 댓글 {board.commentCount} • 좋아요{' '}
                      {board.likes}
                    </p>
                    <button
                      className='Detail'
                      onClick={() => detailClick(board.id)}>
                      구경하기
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </S.FormContainer>
      </S.Container>
    </>
  );
};

const NoBoards = styled.div`
  font-size: 18px;
  margin-top: 200px;
  margin-left: 270px;
  width: 500px;
  height: 450px;
`;
const LikeHeart = styled.button`
  border: none;
  font-size: 20px;
  background-color: transparent;
  margin-right: 10px;
  background-color: white;
`;
export default BoardMyList;
