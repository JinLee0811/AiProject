import React, { useState, useEffect } from 'react';
import * as S from '../BoardDetail.style';
// import { useInView } from 'react-intersection-observer';
import { useAtom } from 'jotai';
import { useDeleteBoard } from '../../../API/BoardAPi';
import { useCreateComment, useGetComment } from '../../../API/CommentApi';
import { selectedBoardAtom, commentsAtom } from '../../../Atoms/BoardAtom'; // 현재는 selectedPostAtom에 해당 id의 게시글 정보가 들어간상태
import { useNavigate } from 'react-router-dom';
import { BOARD_FORM_PATH } from '../../common/path';

const BoardDetail = () => {
  const [selectedBoard, setSelectedBoard] = useAtom(selectedBoardAtom); // useAtomValue를 사용하면 저장된 selectedPost 상태값을 바로가져옴
  const navigate = useNavigate();
  const handleEdit = () => {
    // setSelectedBoard(selectedBoard); //selectedBoard 한 번 더넣어서 Form으로 보낼 필요 x
    alert('게시글을 수정하시겠습니까?');
    navigate(BOARD_FORM_PATH);
  };
  const { mutateAsync: deleteBoard } = useDeleteBoard();

  const handleDelete = async (id) => {
    try {
      const response = await deleteBoard(id);
      setSelectedBoard((prevBoards) =>
        prevBoards.map((board) => {
          if (board.id === id) {
            return {
              ...board,
              deleteAt: new Date(),
            };
          }
          return board;
        })
      );
      alert(response.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  // @@@@@@@@@@@@@@@@@@@@@@@@@댓글댓글댓글댓글댓글댓글댓글@@@@@@@@@@@@@@@@@@@@@

  const [input, setInput] = useState(''); //댓글입력상태
  const [replyInput, setReplyInput] = useState(''); //대댓글 입력상태
  const [replyToCommentId, setReplyToCommentId] = useState(''); //답글달기 =>내가 지금 작성하려는 댓글이 / 최상위 댓글의 대댓글이 맞는지 확인용
  const [comments, setComments] = useAtom(commentsAtom); //post요청 한 것을 가져온 댓글

  //댓글,대댓글 get
  const {
    data: fetchedComment,
    isLoading: isCommentLoading,
    isError: isCommentError,
  } = useGetComment(); //get

  useEffect(() => {
    //fetchedComment 상태 값이 변경될 때마다 useEffect 훅 호출
    if (fetchedComment) {
      setComments(fetchedComment); //setComments 에 변경된 상태값 담아서 comments 변경 = newComment알아서 여기서 변경
    }
  }, [fetchedComment, setComments]);

  //댓글 post
  const { mutateAsync: createComment } = useCreateComment();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //댓글은 board_id와 text
      await createComment({
        board_id: selectedBoard.id,
        text: input,
      });
      alert('댓글 작성 완료');
      // setComments(newComment); //할 필요가 없지 get부분에서 하는거
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };

  //대댓글 post
  const handleReplySubmit = async (e, parent_id) => {
    e.preventDefault();
    try {
      //대댓글은 board_id와 text + comment_id까지
      await createComment({
        board_id: selectedBoard.id,
        parent_id,
        text: replyInput,
      });
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };

  //댓글 수정

  //댓글 삭제
  function filterTime(time) {
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
  }
  if (isCommentLoading) {
    return <div>Loading...</div>;
  }
  if (isCommentError) {
    return <div>Error: {isCommentError?.message}</div>; // 서버에서 반환된 에러메세지 보여줌
  }
  return (
    <S.Container>
      <S.FormContainer>
        <div className='buttons'>
          <button onClick={() => handleEdit(selectedBoard)}>수정</button>
          <button onClick={() => handleDelete(selectedBoard.id)}>삭제</button>
        </div>
        <h1 className='title'>{selectedBoard.title}</h1>
        <div className='information'>
          <span className='material-symbols-outlined'>emoji_nature</span>
          <p className='nickname'>{selectedBoard.nickname}</p>
          <p className='time'>{filterTime(selectedBoard.time)}</p>
        </div>
        <h2 className='content'>{selectedBoard.content}</h2>
        <h2 className='image'>{selectedBoard.image}</h2>
        <p className='comment'>
          조회 {selectedBoard.views} • 댓글 {selectedBoard.commentCount} • 관심{' '}
          {selectedBoard.like}
          {/* <button onClick={handleLikeClick}>
            {likeCount} {liked ? '취소' : '추가'}
          </button> */}
        </p>
        <S.CommentContainer>
          <form onSubmit={handleSubmit}>
            {/* 댓글 post요청 */}
            <input
              type='text'
              placeholder='댓글을 입력하세요'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <S.CommentManage>
              <S.CommentEdit>
                <button type='submit' disabled={!input}>
                  댓글 수정
                </button>
                <button type='submit' disabled={!input}>
                  댓글 삭제
                </button>
              </S.CommentEdit>
              <button className='write' type='submit' disabled={!input}>
                작성
              </button>
            </S.CommentManage>
          </form>
          <S.ReplyContainer>
            {/* comment는 임의로 정한 변수명이고 id, text만 객체로 담은 배열 */}
            {/* filter => parent_id가 없는 애들 구분하는 필터 */}
            {comments
              .filter((comment) => !comment.parent_id)
              .map((comment) => (
                <S.Comment key={comment.id}>
                  <p id='commentText'>{comment.text}</p>
                  <button onClick={() => setReplyToCommentId(comment.id)}>
                    답글 달기
                  </button>
                  {/* 답글달기를 눌렀을 시에 대댓글 폼이 나타나기위한 과정 */}
                  {/* replyToCommentId => 현재 대댓글을 작성하려는 댓글의 id를 저장하는 상태 변수 */}
                  {/* 내가 지금 작성하려는 댓글이 최상위 댓글의 대댓글이 맞는지 확인용 */}
                  {replyToCommentId === comment.id && (
                    <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                      <input
                        type='text'
                        placeholder='대댓글을 입력하세요'
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                      />
                      <button type='submit' disabled={!replyInput}>
                        댓글 수정
                      </button>
                      <button type='submit' disabled={!replyInput}>
                        댓글 삭제
                      </button>
                      <button type='submit' disabled={!replyInput}>
                        작성
                      </button>
                    </form>
                  )}
                  {/* parent_id값이 현재 댓글의 id값이랑 같은 애들만 불러오는 필터 */}
                  {/* 여기서의 reply는 임의로 정한 변수명이고 id, text, parent_id를 가진 객체를 담은 배열 */}
                  {comments
                    .filter((reply) => reply.comments_id === comment.id)
                    .map((reply) => (
                      <S.Reply key={reply.id}>
                        <p>{reply.text}</p>
                      </S.Reply>
                    ))}
                </S.Comment>
              ))}
          </S.ReplyContainer>
        </S.CommentContainer>
      </S.FormContainer>
    </S.Container>
  );
};
export default BoardDetail;
