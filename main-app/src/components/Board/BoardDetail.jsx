import React, { useEffect, useState } from 'react';
import * as S from './BoardDetail.style';
import { useAtom, useSetAtom } from 'jotai';
import { useDeleteBoard } from '../../API/BoardAPi';
import { useCreateLike, useDeleteLike } from '../../API/LikeAPi';
import { detailBoardAtom, selectedBoardAtom } from '../../Atoms/BoardAtom'; // 현재는 selectedPostAtom에 해당 id의 게시글 정보가 들어간상태
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
  //   //@@@@@@@@@@@@@@좋아요@@@@@@@@@@@@@@@

  // //   const { mutateAsync: createLike } = useCreateLike(selectedBoard.id);
  // //   const { mutateAsync: deleteLike } = useDeleteLike(selectedBoard.id);
  // //   const { currentUser } = useAuth();

  //   const handleLike = async () => {
  //     try {
  //       if (selectedBoard.user === currentUser.id) {
  //         // 이미 좋아요를 누른 경우, 삭제
  //         await deleteLike(currentUser.id);
  //         setSelectedBoard((prev) => ({
  //           ...prev,
  //           user: null,
  //           isLiked: false,
  //         }));
  //       } else {
  //         // 좋아요를 누르지 않은 경우, 생성
  //         await createLike(currentUser.id);
  //         setSelectedBoard((prev) => ({
  //           //현재 setSelectedBoard 객체 가져와서 거기다 추가
  //           ...prev,
  //           user: currentUser.id,
  //           isLiked: true,
  //         }));
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const filterTime = (time) => {
    // 서버에서 보내주는 시간 값을 Date 객체로 바꿈
    const serverTime = new Date(time);
    // 클라이언트의 로컬 시간대에 맞추어 변환
    const localTime = new Date( //현재 시간에서 뺌
      serverTime.getTime() - serverTime.getTimezoneOffset() * 60 * 1000
    );
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
        <h2 className='content'>{detailBoard.content}</h2>
        <S.DetailImage src={detailBoard.image} />
        <p className='comment'>
          조회 {detailBoard.views} • 댓글 • 관심
          {/* <S.HeartIcon isLiked={selectedBoard.isLiked} onClick={handleLike} /> */}
          {/* <span onClick={handleLike}>
//             {selectedBoard.isLiked ? (
//               <S.RedHeartIcon /> // isLiked가 true => 빨간하트
//             ) : (
//               <S.EmptyHeartIcon /> // isLiked가 false => 빈하트
//             )}
//             {selectedBoard.likes}
//           </span> */}
        </p>
        <BoardComment />
      </S.FormContainer>
    </S.Container>
  );
};

export default BoardDetail;
