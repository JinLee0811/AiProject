import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import * as S from './BoardList.style';
import { boardsAtom } from '../../Atoms/BoardAtom'; //전역으로 관리 초기값들을 저장해둔 곳
import { BOARD_PATH, BOARD_MY_PATH, BOARD_FORM_PATH } from '../common/path';
import { useGetLike } from '../../API/BoardAPi';
import { useNavigate, Link } from 'react-router-dom';
import { serverWithoutToken } from '../../config/AxiosRequest';
import { Auth } from '../../API/authApi';
const BoardList = ({ onPageChange }) => {
  const navigate = useNavigate();
  const [boards, setBoards] = useAtom(boardsAtom);
  const { isLoggedIn } = Auth();
  const [likedBoard, setLikedBoard] = useState('');

  const { data: likeCheck } = useGetLike();

  useEffect(() => {
    if (likeCheck) {
      setLikedBoard(likeCheck.boardId);
    }
  }, [likeCheck]);

  useEffect(() => {
    serverWithoutToken
      .get('/board')
      .then((response) => {
        setBoards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setBoards]);

  const detailClick = (boardId) => {
    navigate(`/board/detail/${boardId}`);
  };
  const boardClick = () => {
    onPageChange(BOARD_PATH);
  };
  const myBoardClick = () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    onPageChange(BOARD_MY_PATH);
  };
  const formClick = () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }
    onPageChange(BOARD_FORM_PATH);
  };
  const shortenContent = (content) => {
    if (content.length > 3) {
      return content.slice(0, 5) + '...';
    }
    return content;
  };
  const filterTime = (time) => {
    // 서버에서 보내주는 시간 값을 Date 객체로 바꿈
    const serverTime = new Date(time);
    // 클라이언트의 로컬 시간대에 맞추어 변환
    const localTime = new Date(serverTime.getTime());
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
  const MAX_TITLE_LENGTH = 13;
  return (
    <>
      <S.Container>
        <S.BannerImage
          src='https://candsinteriors.co.uk/wp-content/uploads/2019/10/house-plants-stratford-garden-centre-header.jpg'
          alt='Example'
        />
        <Ranking>
          <BothBox>
            {' '}
            <ViewRanking>
              <Title>조회수 순위</Title>
              <RankList>
                {boards &&
                  boards
                    .sort((a, b) => b.views - a.views) // view를 기준으로 내림차순 정렬
                    .slice(0, 5) // 상위 5개 요소 추출
                    .map((board, index) => (
                      <RankListItem key={board.title} isFirst={index === 0}>
                        <ViewRankingTitle>
                          <LinkStyle to={`/board/detail/${board.id}`}>
                            {board.title.length > MAX_TITLE_LENGTH
                              ? board.title.slice(0, MAX_TITLE_LENGTH) + '...'
                              : board.title}
                            {'   '}
                            <CommentBox>({board.commentCount})</CommentBox>
                          </LinkStyle>
                        </ViewRankingTitle>
                      </RankListItem>
                    ))}
              </RankList>
            </ViewRanking>
            <LikeRanking>
              <Title>좋아요 순위</Title>
              <RankList>
                {boards &&
                  boards
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 5) // 상위 5개 요소 추출
                    .map((board, index) => (
                      <RankListItem key={board.title} isFirst={index === 0}>
                        <ViewRankingTitle>
                          <LinkStyle to={`/board/detail/${board.id}`}>
                            {board.title.length > MAX_TITLE_LENGTH
                              ? board.title.slice(0, MAX_TITLE_LENGTH) + '...'
                              : board.title}
                            {'   '}
                            <CommentBox>({board.commentCount})</CommentBox>
                          </LinkStyle>
                        </ViewRankingTitle>
                      </RankListItem>
                    ))}
              </RankList>
            </LikeRanking>
          </BothBox>
        </Ranking>

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
const Ranking = styled.div`
  display: flex;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin-top: 10px;
  margin-left: 37px;
  background-color: white;
  width: 550px;
  height: 200px;
`;
const BothBox = styled.div`
  display: flex;
  margin-left: 30px;
  margin-top: 15px;
`;
const LikeRanking = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 50px;
  width: 220px;
  height: 200px;
`;

const ViewRanking = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 20px;
  width: 220px;
  height: 200px;
`;

const ViewRankingTitle = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: bold;
`;
const Title = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
  margin-left: 30px;
`;
const RankList = styled.ol`
  margin-left: 10px;
  padding-left: 0px;
`;
const RankListItem = styled.li`
  color: ${(props) => (props.isFirst ? 'red' : 'inherit')};
  font-weight: bold;
  font-style: italic;
`;
const CommentBox = styled.div`
  display: inline;
  color: red;
`;

const LinkStyle = styled(Link)`
  color: black;
  text-decoration: none;
  margin-left: 4px;
  font-style: normal;
  :hover {
    text-decoration: underline;
    text-decoration-color: #99aca1;
  }
`;
export default BoardList;
