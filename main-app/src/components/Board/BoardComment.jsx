import React, { useState, useEffect } from 'react';
import * as S from './BoardComment.style';
import { useAtom, useAtomValue } from 'jotai';
import { useGetBoard } from '../../API/BoardAPi';
import {
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from '../../API/CommentApi';
import { useGetDetailBoard } from '../../API/BoardAPi';
import { useParams } from 'react-router-dom';

const BoardComment = () => {
  const [input, setInput] = useState(''); //댓글입력상태
  const [replyInput, setReplyInput] = useState(''); //대댓글 입력상태
  const [replyCommentId, setReplyCommentId] = useState(''); //답글달기 =>내가 지금 작성하려는 댓글이 / 최상위 댓글의 대댓글이 맞는지 확인용
  const { boardId } = useParams();
  const { isLoading, data: detailBoard } = useGetDetailBoard(boardId, {
    onError: (error) => console.log(error.message),
  });
  //댓글 get
  // const {
  //   data: fetchedComment,
  //   isLoading: isCommentLoading,
  //   isError: isCommentError,
  // } = useGetBoard(selectedBoard.id, {
  //   onSuccess: (data) => {
  //     const comments = data.filter(
  //       ({ parent_comment_id }) => !parent_comment_id
  //     );
  //     const commentReply = data.filter(
  //       ({ parent_comment_id }) => parent_comment_id
  //     );

  //     const modifiedComments = comments.map((comment) => {
  //       const children = commentReply.filter(
  //         ({ parent_comment_id }) => parent_comment_id === comment.id
  //       );
  //       return { ...comment, children };
  //     });
  //     setComments([...modifiedComments]);
  //   },
  // });

  // useEffect(() => {
  //   if (fetchedComment) {
  //     setComments(fetchedComment);
  //   }
  // }, [fetchedComment, setComments]);
  // 최종적으로 가공된 데이터 => [{id, comment, children: [{id, comment}]}]
  // render해서 사용할때 comments.map(({id,comment,children}) => (children.map(reply) => ...))
  // const {
  //   data: fetchedComment,
  //   isLoading: isCommentLoading,
  //   isError: isCommentError,
  // } = useGetBoard(selectedBoard.id);

  // useEffect(() => {
  //   if (fetchedComment) {
  //     const comments = fetchedComment.filter(
  //       ({ parent_comment_id }) => !parent_comment_id
  //     );
  //     const commentReply = fetchedComment.filter(
  //       ({ parent_comment_id }) => parent_comment_id
  //     );
  //     const modifiedComments = comments.map((comment) => {
  //       const children = commentReply.filter(
  //         ({ parent_comment_id }) => parent_comment_id === comment.id
  //       );
  //       return { ...comment, children };
  //     });
  //     setComments(modifiedComments);
  //   }
  // }, [fetchedComment]);
  // 댓글 post
  const { mutateAsync: createComment } = useCreateComment(detailBoard.id);
  const [comments, setComments] = useState(detailBoard.comments); //post요청 한 것을 가져온 댓글

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment({
        board_id: detailBoard.id,
        parent_comment_id: null,
        content: input,
      });
      alert('댓글 작성 완료');
      setInput('');
      console.log(comments);
      setComments((prevComments) => [...prevComments, response]);
      console.log(comments);
    } catch (err) {
      console.log(err);
    }
  };

  //댓글 put
  // const { mutateAsync: updateComment } = useUpdateComment();
  // const handleCommentUpdate = async (id, { text: input }) => {
  //   try {
  //     await updateComment(id, { text: input });
  //     setComments(
  //       (
  //         prevComments //이전 댓글목록을 새로운 댓글목록으로
  //       ) =>
  //         prevComments.map((comment) => {
  //           if (comment.id === id) {
  //             return {
  //               ...comment,
  //               text: input,
  //             };
  //           }
  //           return comment;
  //         })
  //     );
  //     alert('댓글 수정 완료');
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  //댓글 delete
  // const { mutateAsync: deleteComment } = useDeleteComment();
  // const handleCommentDelete = async (id) => {
  //   try {
  //     const response = await deleteComment(id);
  //     setComments((prevComments) =>
  //       prevComments.map((comment) => {
  //         if (comment.id === id) {
  //           return {
  //             ...comment,
  //             deleteAt: new Date(),
  //           };
  //         }
  //         return comment;
  //       })
  //     );
  //     alert(response.data.message);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

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

  return (
    <>
      <S.CommentContainer>
        <form onSubmit={handleCreateSubmit}>
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
        <S.CommentList>
          {comments.map((selectedComment) => (
            <S.CommentContainer key={selectedComment.id}>
              <S.CommentContent>{selectedComment.content}</S.CommentContent>

              {/* 답글작성폼 */}
              <S.CommentManage
                onClick={() => {
                  if (replyCommentId === selectedComment.id) {
                    setReplyCommentId(null); // 답글작성폼 닫기
                  } else {
                    setReplyCommentId(selectedComment.id); // 답글작성폼 열기
                  }
                }}>
                {replyCommentId === selectedComment.id
                  ? '답글달기'
                  : '답글달기'}
              </S.CommentManage>
              {/* {replyCommentId === comment.id && ( //대댓글인거지 여긴 지금;
                <form>
                  <input
                    type='text'
                    placeholder='댓글을 입력하세요'
                    value={replyInput}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <S.CommentManage>
                    <button className='write' type='submit' disabled={!input}>
                      작성
                    </button>
                  </S.CommentManage>
                </form> */}
              {/* )} */}
            </S.CommentContainer>
          ))}
        </S.CommentList>
        {/* <S.ReplyContainer>
        {comments.map(({ id, comment, children }) => (
          <S.Comment key={id}>
            <p className='commentText'>{comment}</p>
            <button onClick={() => setReplyToCommentId(id)}>답글 달기</button> */}
        {/* 답글작성폼 */}
        {/* {replyToCommentId === id && (
              <form onSubmit={(e) => handleReplySubmit(e, id)}>
                <input
                  type='text'
                  placeholder='대댓글을 입력하세요'
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                />
                <S.CommentManage>
                  <button onClick={() => handleCommentUpdate(id)}>
                    댓글 수정
                  </button>
                  <button onClick={() => handleCommentDelete(id)}>
                    댓글 삭제
                  </button>
                </S.CommentManage>
                <button type='submit' disabled={!replyInput}>
                  작성
                </button>
              </form>
            )}
            {children.map(({ id, comment }) => (
              <S.Reply key={id}>
                <p>{comment}</p>
                <S.CommentManage>
                  <button onClick={() => handleCommentUpdate(id)}>
                    댓글 수정
                  </button>
                  <button onClick={() => handleCommentDelete(id)}>
                    댓글 삭제
                  </button>
                </S.CommentManage>
              </S.Reply>
            ))}
          </S.Comment>
        ))}
      </S.ReplyContainer> */}
      </S.CommentContainer>
    </>
  );
};

export default BoardComment;
