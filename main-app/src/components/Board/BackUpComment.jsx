import React, { useState, useEffect } from 'react';
import * as S from './BoardDetail.style';
import { useAtom, useAtomValue } from 'jotai';
import {
  useCreateComment,
  useGetComment,
  useUpdateComment,
  useDeleteComment,
} from '../../API/CommentApi';
import { selectedBoardAtom, commentsAtom } from '../../Atoms/BoardAtom'; // 현재는 selectedPostAtom에 해당 id의 게시글 정보가 들어간상태

const BoardComment = () => {
  const selectedBoard = useAtomValue(selectedBoardAtom);
  const [input, setInput] = useState(''); //댓글입력상태
  const [replyInput, setReplyInput] = useState(''); //대댓글 입력상태
  const [replyToCommentId, setReplyToCommentId] = useState(''); //답글달기 =>내가 지금 작성하려는 댓글이 / 최상위 댓글의 대댓글이 맞는지 확인용
  const [comments, setComments] = useAtom(commentsAtom); //post요청 한 것을 가져온 댓글

  //댓글 get
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

  const handleCreateSubmit = async (e) => {
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

  //댓글 put
  const { mutateAsync: updateComment } = useUpdateComment();
  const handleCommentUpdate = async (id, text) => {
    try {
      await updateComment(id, { text });
      setComments(
        (
          prevComments //이전 댓글목록을 새로운 댓글목록으로
        ) =>
          prevComments.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                text,
              };
            }
            return comment;
          })
      );
      alert('댓글 수정 완료');
    } catch (err) {
      console.log(err.message);
    }
  };

  //댓글 delete
  const { mutateAsync: deleteComment } = useDeleteComment();
  const handleCommentDelete = async (id) => {
    try {
      const response = await deleteComment(id);
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              deleteAt: new Date(),
            };
          }
          return comment;
        })
      );
      alert(response.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  //대댓글 post
  // const handleReplySubmit = async (e, parent_id) => {
  //   e.preventDefault();
  //   try {
  //     const response = await createComment({
  //       board_id: selectedBoard.id,
  //       parent_id,
  //       text: replyInput,
  //     });
  //     alert('대댓글 작성 완료');
  //     setReplyInput('');
  //     const newComment = response.data;
  //     const updatedComments = comments.map((comment) => {
  //       if (comment.id === parent_id) {
  //         // 대댓글(child)의 부모id가  부모인 댓글의 id랑 일치하면 children에다 넣어라
  //         return {
  //           ...comment,
  //           children: [...comment.children, newComment], // 이전에 적힌 대댓글(children) 배열에 추가
  //         };
  //       }
  //       return comment;
  //     });
  //     setComments(updatedComments);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // if (isCommentLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (isCommentError) {
  //   return <div>Error: {isCommentError?.message}</div>; // 서버에서 반환된 에러메세지 보여줌
  // }

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
      alert('대댓글 작성 완료');
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };
  if (isCommentLoading) {
    return <div>Loading...</div>;
  }
  if (isCommentError) {
    return <div>Error: {isCommentError?.message}</div>; // 서버에서 반환된 에러메세지 보여줌
  }
  return (
    <S.CommentContainer>
      <form onSubmit={handleCreateSubmit}>
        {/* 댓글 post요청 */}
        <input
          type='text'
          placeholder='댓글을 입력하세요'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <S.CommentManage>
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
                  <S.CommentEdit>
                    <button onClick={() => handleCommentUpdate(comment)}>
                      댓글 수정
                    </button>
                    <button onClick={() => handleCommentDelete(comment.id)}>
                      댓글 삭제
                    </button>
                  </S.CommentEdit>
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
                    <S.CommentEdit>
                      <button onClick={() => handleCommentUpdate(comment)}>
                        댓글 수정
                      </button>
                      <button onClick={() => handleCommentDelete(comment.id)}>
                        댓글 삭제
                      </button>
                    </S.CommentEdit>
                  </S.Reply>
                ))}
            </S.Comment>
          ))}
      </S.ReplyContainer>
    </S.CommentContainer>
  );
};

export default BoardComment;
