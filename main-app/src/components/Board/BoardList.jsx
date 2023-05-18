import React, { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import styled from 'styled-components';
import * as S from './BoardList.style';
import { boardsAtom, selectedBoardAtom } from '../../Atoms/BoardAtom'; //전역으로 관리 초기값들을 저장해둔 곳
import {
  BOARD_PATH,
  BOARD_DETAIL_PATH,
  BOARD_MY_PATH,
  BOARD_FORM_PATH,
  LOGIN_PATH,
} from '../common/path';
import { useCreateLike, useGetLike } from '../../API/BoardAPi';
import { useNavigate } from 'react-router-dom';
import { serverWithoutToken } from '../../config/AxiosRequest';
import { Auth } from '../../API/authApi';
const BoardList = ({ onPageChange }) => {
  const navigate = useNavigate();
  const [boards, setBoards] = useAtom(boardsAtom);
  const { isLoggedIn } = Auth();
  const setSelectedBoard = useSetAtom(selectedBoardAtom);
  const [liked, setLiked] = useState(true);
  const [likeCount, setLikeCount] = useState('');
  const [likedBoard, setLikedBoard] = useState('');

  const { data: likeCheck } = useGetLike();

  useEffect(() => {
    if (likeCheck) {
      setLikedBoard(likeCheck.boardId);
      console.log(likeCheck.boardId);
    }
  }, [likeCheck]);

  useEffect(() => {
    serverWithoutToken
      .get('/board')
      .then((response) => {
        setBoards(response.data); //가져온 data가 비어있던 boardsAtom 업데이트 됨
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setBoards]); //두번째 매개변수로 setPosts 박아둠으로써 상태가 업데이트될 때마다 데이터를 가져오고 컴포넌트를 업데이트

  const detailClick = (boardId) => {
    //해당 id의 게시글 정보를 selectedPostAtom에 저장 (selectedPostAtom에을 Detail에서 쓸거임)
    navigate(`/board/detail/${boardId}`);
  };
  const boardClick = () => {
    onPageChange(BOARD_PATH);
  };
  const myBoardClick = () => {
    if (!isLoggedIn) {
      window.location.href = '/login'; // 로그인 페이지 경로로 리디렉션
      return;
    }

    onPageChange(BOARD_MY_PATH);
  };
  const formClick = () => {
    // setSelectedBoard('');
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

  // const { mutateAsync: createLike } = useCreateLike();
  // const handleLike = async (id) => {
  //   try {
  //     const response = await createLike();
  //     if (response.likes === 1) {
  //       setLiked(true);
  //       setLikeCount((prevCount) => prevCount + 1);
  //     } else if (response.likes === -1 || response.likes === 0) {
  //       setLiked(false);
  //       setLikeCount((prevCount) => prevCount - 1);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <S.Container>
        <S.BannerImage
          src='https://candsinteriors.co.uk/wp-content/uploads/2019/10/house-plants-stratford-garden-centre-header.jpg'
          alt='Example'
        />
        <div className='buttons'>
          <button onClick={boardClick}>전체보기</button>
          <button onClick={myBoardClick}>내 게시글 보기</button>
          <button onClick={formClick}>글쓰기</button>
        </div>
        <S.FormContainer>
          <ul>
            {boards &&
              boards
                .filter((board) => board.status === 'PUBLIC')
                .map((board) => {
                  const isLiked =
                    likedBoard &&
                    likedBoard.some((postId) => postId == board.id);
                  return (
                    <li key={board.id}>
                      <p className='time'>{filterTime(board.created_at)}</p>
                      <h2>{board.title}</h2>
                      <p>{board.content}</p>
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
                        조회 {board.views} • 댓글 {board.commentCount} • 관심{' '}
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
        </S.FormContainer>
      </S.Container>
    </>
  );
};
const LikeHeart = styled.button`
  border: none;
  font-size: 20px;
  background-color: transparent;
  margin-right: 10px;
  background-color: white;
`;
export default BoardList;
