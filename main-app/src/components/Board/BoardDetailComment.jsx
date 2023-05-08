import React, { useState } from 'react';
import * as S from './BoardDetail.style';
// import { useInView } from 'react-intersection-observer';
import { useAtom, useSetAtom } from 'jotai';
import { useCreateComment } from '../../API/CommentApi';
import { selectedBoardAtom, commentsAtom } from '../../Atoms/BoardAtom'; // 현재는 selectedPostAtom에 해당 id의 게시글 정보가 들어간상태

const BoardDetailComment = () => {
  const [selectedBoard] = useSetAtom(selectedBoardAtom);

  const [comments, setComments] = useAtom(
    //comments와 setComments 모두 써야해서 useAtom 씀.
    commentsAtom
  );
  const [input, setInput] = useState(''); //댓글입력상태
  const [replyInput, setReplyInput] = useState(''); //대댓글 입력상태
  const [replyId, setReplyId] = useState('');
  // const [replyIndex, setReplyIndex] = useState(null); //대댓글 작성할 댓글의 index 담는상태

  const { mutate: createComment } = useCreateComment();
  // 내가 만든 훅은 mutate를 통해 반환한다!

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //댓글은 board_id와 text
      const data = await createComment({
        board_id: selectedBoard.id,
        text: input,
      }); //댓글 작성 후에 새로운댓글 목록에 추가됨!
      //data = 서버로부터 반환된 새 댓글 객체
      setComments(data);
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };
  const handleReplySubmit = async (e, comment_id) => {
    //해당 index가 들어오면 comments의 replies배열에 인풋값 추가.
    e.preventDefault();
    try {
      //대댓글은 board_id와 text + comment_id까지
      const data = await createComment({
        board_id: selectedBoard.id,
        comment_id,
        text: replyInput,
      }); //댓글 작성 후에 새로운댓글 목록에 추가됨!
      //data = 서버로부터 반환된 새 댓글 객체
      setComments(data);
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
              onClick={() => setReplyId(comment.id)} //replyIndex 상태를 해당 댓글의 index로 변경
              disabled={!replyInput}>
              대댓글 작성
            </button>
            {replyId === comment.id && ( //index로 변경한걸 통해서 해당 대댓글 작성 폼이 보임
              <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                <input
                  type='text'
                  placeholder='대댓글을 입력하세요'
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                />
                <button type='submit' disabled={!replyInput}>
                  작성
                </button>
              </form>
            )}
            {comment.replies.map((reply) => (
              <S.Reply key={reply.id}>
                <p>{reply.text}</p>
              </S.Reply>
            ))}
          </S.Comment>
        ))}
      </S.ReplyContainer>
    </S.CommentContainer>
  );
};
export default BoardDetailComment;
