import React, { useState } from 'react';
import * as S from '../BoardDetail.style';
// import { useInView } from 'react-intersection-observer';
import { useAtom } from 'jotai';
import { useDeleteBoard } from '../../../API/BoardAPi';
import { useCreateComment } from '../../../API/CommentApi';
import { selectedBoardAtom, commentsAtom } from '../../../Atoms/BoardAtom'; // 현재는 selectedPostAtom에 해당 id의 게시글 정보가 들어간상태
import { useNavigate } from 'react-router-dom';
import { BOARD_FORM_PATH } from '../../common/path';

const BoardDetail = () => {
  const [selectedBoard, setSelectedBoard] = useAtom(selectedBoardAtom); // useAtomValue를 사용하면 저장된 selectedPost 상태값을 바로가져옴
  const navigate = useNavigate();
  const handleEdit = (selectedBoard) => {
    //수정하기 버튼 클릭시 Form으로 이동
    setSelectedBoard(selectedBoard); //selectedBoard 한 번 더넣어서 Form으로 보내
    navigate(BOARD_FORM_PATH);
  };
  const { mutate: deleteBoard } = useDeleteBoard();

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

  const [comments, setComments] = useAtom(
    //comments와 setComments 모두 써야해서 useAtom 씀.
    commentsAtom
  );
  const [input, setInput] = useState(''); //댓글입력상태
  const [replyInput, setReplyInput] = useState(''); //대댓글 입력상태
  const [replyIndex, setReplyIndex] = useState(null); //대댓글 작성할 댓글의 index 담는상태

  const { mutate: createComment } = useCreateComment();
  // 내가 만든 훅은 mutate를 통해 반환한다!

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createComment({ text: input }); //댓글 작성 후에 새로운댓글 목록에 추가됨!
      //data = 서버로부터 반환된 새 댓글 객체
      setComments(data);
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };
  const handleReplySubmit = (e, index) => {
    //해당 index가 들어오면 comments의 replies배열에 인풋값 추가.
    e.preventDefault();
    const newComments = [...comments];
    newComments[index].replies.push(replyInput);
    setComments(newComments);
    setReplyInput('');
    setReplyIndex(null); //인덱스 초기화
  };
  const handleReplyInput = (e, index) => {
    //대댓글에 입력시
    setReplyInput(e.target.value);
    setReplyIndex(index); // 특정 인덱스로 설정
  };
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
            <button type='submit' disabled={!input}>
              작성
            </button>
          </form>
          <S.ReplyContainer>
            {comments.map((comment, index) => (
              <S.Comment key={index}>
                <p id='commentText'>{comment.text}</p>
                <button
                  onClick={() => setReplyIndex(index)} //replyIndex 상태를 해당 댓글의 index로 변경
                  disabled={replyIndex === index}>
                  대댓글 작성
                </button>
                {replyIndex === index && ( //index로 변경한걸 통해서 해당 대댓글 작성 폼이 보임
                  <form onSubmit={(e) => handleReplySubmit(e, index)}>
                    <input
                      type='text'
                      placeholder='대댓글을 입력하세요'
                      value={replyInput}
                      onChange={(e) => handleReplyInput(e, index)}
                    />
                    <button type='submit' disabled={!replyInput}>
                      작성
                    </button>
                  </form>
                )}
                {comment.replies.map(
                  (
                    reply,
                    index // Reply는 댓글의 대댓글임
                  ) => (
                    <S.Reply key={index}>
                      <p>{reply}</p>
                    </S.Reply>
                  )
                )}
              </S.Comment>
            ))}
          </S.ReplyContainer>
        </S.CommentContainer>
      </S.FormContainer>
    </S.Container>
  );
};
export default BoardDetail;
