import React, { useEffect, useState } from 'react';
import * as S from './BoardDetail.style';
import styled from 'styled-components';
import { useSetAtom } from 'jotai';
import { useDeleteBoard } from '../../API/BoardAPi';
import { useCreateLike, useGetLike } from '../../API/BoardAPi';
import { selectedBoardAtom } from '../../Atoms/BoardAtom'; // 현재는 selectedPostAtom에 해당 id의 게시글 정보가 들어간상태
import { useNavigate } from 'react-router-dom';
import { BOARD_FORM_PATH, BOARD_PATH } from '../common/path';
import BoardComment from './BoardComment';
import { useGetDetailBoard } from '../../API/BoardAPi';
import { useParams } from 'react-router-dom';
import { useUser } from '../../API/UserApi';
import { Auth } from '../../API/authApi';

const BoardDetail = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = Auth();
  const { boardId } = useParams();
  const setSelectedBoard = useSetAtom(selectedBoardAtom);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState('');
  const { isLoading, data: detailBoard } = useGetDetailBoard(boardId, {
    onError: (error) => console.log(error.message),
  });
  const { data: user } = useUser();
  const { data: likeCheck } = useGetLike();

  useEffect(() => {
    if (!isLoggedIn) {
      return; // 로그인되지 않은 경우, 요청을 수행하지 않고 종료합니다.
    }
    if (likeCheck) {
      const userLikedPosts = likeCheck.boardId;
      const isLiked = userLikedPosts.some((postId) => postId == boardId);
      setLiked(isLiked);
    } else {
      setLiked(false);
    }
  }, [boardId, likeCheck, isLoggedIn]);

  useEffect(() => {
    if (detailBoard) {
      setLikeCount(detailBoard.likes);
    }
  }, [detailBoard]);

  const handleBoardUpdate = (detailBoard) => {
    if (!isLoggedIn) {
      return; // 로그인되지 않은 경우, 함수 실행을 건너뜁니다.
    }

    if (user.id !== detailBoard.user.id) {
      alert('해당 게시글을 수정할 수 없습니다.');
      return;
    }

    alert('게시글을 수정하시겠습니까?');
    setSelectedBoard(detailBoard);
    navigate(BOARD_FORM_PATH);
  };
  const handleBoardGo = () => {
    navigate('/board');
  };

  //   //게시글 삭제
  const { mutateAsync: deleteBoard } = useDeleteBoard();

  const handleBoardDelete = async (id) => {
    if (!isLoggedIn) {
      return; // 로그인되지 않은 경우, 함수 실행을 건너뜁니다.
    }

    if (user.id !== detailBoard.user.id) {
      // 지우려는 사람이 본인이 아닐경우
      alert('해당 게시글을 삭제할 수 없습니다.');
      return;
    }
    const confirmResult = window.confirm('회원의 게시글을 삭제하시겠습니까?'); //취소 눌렀을시 삭제안되게
    if (!confirmResult) {
      return;
    }
    try {
      await deleteBoard(id);
      detailBoard((prevBoards) =>
        prevBoards.filter((board) => board.id !== id)
      );
    } catch (err) {
      console.log(err.message);
    }
    alert('삭제되었습니다!');
    navigate(BOARD_PATH);
  };

  const { mutateAsync: createLike } = useCreateLike(boardId);
  const handleLike = async () => {
    if (!isLoggedIn) {
      window.location.href = '/login'; // 로그인 페이지 경로로 리디렉션
      return;
    }
    try {
      const response = await createLike();
      if (response.likes === 1) {
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
      } else if (response.likes === -1 || response.likes === 0) {
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterTime = (time) => {
    // 서버에서 보내주는 시간 값을 Date 객체로 바꿈
    const serverTime = new Date(time);
    // 클라이언트의 로컬 시간대에 맞추어 변환
    const localTime = new Date(serverTime.getTime()); //현재 시간에서 뺌
    const filter = Date.now() - localTime.getTime();
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
  if (isLoading || !detailBoard) {
    return <div>Loading...</div>;
  }
  return (
    <S.Container>
      <S.FormContainer>
        <div className='buttons'>
          <button
            onClick={() => {
              handleBoardGo();
            }}>
            목록
          </button>
          <button
            onClick={() => {
              if (!isLoggedIn) {
                window.location.href = '/login'; // 로그인 페이지 경로로 리디렉션
                return;
              }
              handleBoardUpdate(detailBoard);
            }}>
            수정
          </button>

          <button
            onClick={() => {
              if (!isLoggedIn) {
                window.location.href = '/login'; // 로그인 페이지 경로로 리디렉션
                return;
              }
              handleBoardDelete(detailBoard.id);
            }}>
            삭제
          </button>
        </div>
        <h1 className='title'>{detailBoard.title}</h1>
        <div className='information'>
          <span className='material-symbols-outlined'>emoji_nature</span>
          <p className='nickname'>{detailBoard.user.nickname}</p>
          <p className='time'>{filterTime(detailBoard.created_at)}</p>
        </div>
        <S.DetailImage src={detailBoard.image} />
        <h2 className='content' style={{ whiteSpace: 'pre-line' }}>
          {detailBoard.content}
        </h2>
        <p className='comment'>
          <LikeHeart onClick={handleLike}>{liked ? '❤️' : '🤍'}</LikeHeart>
          조회 {detailBoard.views} • 댓글 {detailBoard.comments.length} • 좋아요{' '}
          {likeCount}
        </p>
        <BoardComment />
      </S.FormContainer>
    </S.Container>
  );
};

const LikeHeart = styled.button`
  border: none;
  font-size: 20px;
  background-color: transparent;
  margin-right: 10px;
`;

export default BoardDetail;
