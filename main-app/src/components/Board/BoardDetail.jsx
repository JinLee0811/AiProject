import React, { useEffect, useState } from 'react';
import * as S from './BoardDetail.style';
import { useAtom, useSetAtom } from 'jotai';
import { useDeleteBoard, useCreateLike } from '../../API/BoardAPi';
import { selectedBoardAtom } from '../../Atoms/BoardAtom'; // 현재는 selectedPostAtom에 해당 id의 게시글 정보가 들어간상태
import { useNavigate } from 'react-router-dom';
import { BOARD_FORM_PATH, BOARD_PATH } from '../common/path';
import { userAtom } from '../../Atoms/TokenAtom';
import BoardComment from './BoardComment';
import { useGetDetailBoard } from '../../API/BoardAPi';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [user] = useAtom(userAtom);
  const setSelectedBoard = useSetAtom(selectedBoardAtom);
  const { isLoading, data: detailBoard } = useGetDetailBoard(boardId, {
    onError: (error) => console.log(error.message),
  });
  const [likes, setLikes] = useState('');
  // const { mutateAsync: createLike } = useCreateLike(detailBoard.id);
  // const [likeChange, setLikeChange] = useState(false);
  console.log(detailBoard);
  useEffect(() => {
    if (detailBoard) {
      setLikes(detailBoard.likes);
    }
  }, []);

  const handleBoardUpdate = (detailBoard) => {
    if (user.id !== detailBoard.user.id) {
      // 지우려는 사람이 본인이 아닐경우
      alert('해당 게시글을 수정할 수 없습니다.');
      return;
    }
    alert('게시글을 수정하시겠습니까?');
    setSelectedBoard(detailBoard);
    navigate(BOARD_FORM_PATH);
  };

  //   //게시글 삭제
  const { mutateAsync: deleteBoard } = useDeleteBoard();

  const handleBoardDelete = async (id) => {
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

  //좋아요

  // const handleLike = async () => {
  //   try {
  //     const response = await createLike();
  //     console.log(response);
  //     setLikes(response.likes);
  //     setLikeChange(!likeChange);
  //   } catch (error) {
  //     console.error('좋아요 요청 실패:', error);
  //   }
  // };

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
          <button onClick={() => handleBoardUpdate(detailBoard)}>수정</button>
          <button onClick={() => handleBoardDelete(detailBoard.id)}>
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
        <h2 className='content'>{detailBoard.content}</h2>
        <p className='comment'>
          조회 {detailBoard.views}회 • 댓글 {detailBoard.comments.length}개 •
          관심
          {/* {likes}
          <label onClick={handleLike}>
            {likeChange ? (
              <span class='material-symbols-outlined'>favorite</span>
            ) : (
              <span class='material-symbols-outlined' style={{ color: 'red' }}>
                favorite
              </span>
            )}
          </label> */}
        </p>

        <BoardComment />
      </S.FormContainer>
    </S.Container>
  );
};

export default BoardDetail;
