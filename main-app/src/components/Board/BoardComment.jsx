import React, { useState, useEffect } from 'react';
import * as S from './BoardComment.style';
import { useAtom } from 'jotai';
import {
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
  useGetReplyComment,
} from '../../API/CommentApi';
import { useGetDetailBoard } from '../../API/BoardAPi';
import { useParams } from 'react-router-dom';
import { userAtom } from '../../Atoms/TokenAtom';

const BoardComment = () => {
  const [input, setInput] = useState(''); //댓글입력상태
  const [replyInput, setReplyInput] = useState(''); //대댓글 입력상태
  const [replyCommentId, setReplyCommentId] = useState(''); //답글달기 =>내가 지금 작성하려는 댓글이 / 최상위 댓글의 대댓글이 맞는지 확인용
  const [commentId, setCommentId] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [showReplyCommentId, setShowReplyCommentId] = useState(null);
  const [user] = useAtom(userAtom);

  // 정리. 잡고들어가자 user는 토큰으로 해결
  // get : boardId, detailBoard.comment ~  어떻게 쓸지는 내가 정해. useEffect / detailBoard.comments / comments 스테이트에 넣을지
  // post : boardId, 선택한 commentId, input 값
  // put : boardId, commentId, input값은 맞지만 변경된 inputEdit 값이겠지
  // delete : boardId, commentId   commentId의 경우는 select로 받아와서 select.id user.id

  //댓글 get
  const { boardId } = useParams();
  const { isLoading, data: detailBoard } = useGetDetailBoard(boardId, {
    onError: (error) => console.log(error.message),
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (detailBoard) {
      setComments(detailBoard.comments);
    }
  }, [detailBoard]);

  // 댓글 post
  const { mutateAsync: createComment } = useCreateComment(detailBoard.id); //mutateAsync는 반환되는 이미지가 확실할때
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment({
        content: input,
      });
      console.log(response);

      setComments((prevComments) => [...prevComments, response]);
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };
  // 대댓글 post
  const { mutateAsync: createReplyComment } = useCreateComment(detailBoard.id); //mutateAsync는 반환되는 이미지가 확실할때
  const handleReplyCreateSubmit = async (e, id) => {
    // console.log(id);
    e.preventDefault();
    try {
      const response = await createReplyComment({
        content: replyInput,
        parent_comment_id: id,
      });
      // console.log(response);

      setReplyComments((prevReplyComments) => [...prevReplyComments, response]);
      setReplyInput('');
      setReplyCommentId(null);
    } catch (err) {
      console.log(err);
    }
  };

  //댓글 put
  const { mutateAsync: updateComment } = useUpdateComment(detailBoard.id);
  const handleCommentUpdate = async (id, contentData) => {
    try {
      const response = await updateComment({
        //여기까지가 기본적인 서버연동
        id: id,
        content: contentData.content,
      });
      const updatedComments = comments.map((comment) => {
        //내가 추가한 커스텀부분
        if (comment.id === id) {
          //수정하려는 댓글 id랑 일치하는지 확인
          return {
            ...comment, //수정이 필요한 댓글 객체
            content: contentData.content, //내용을 수정하려는 내용으로 업데이트
          };
        }
        return comment; //수정 필요없는애들은 그대로
      });
      setComments(updatedComments);
      // console.log(response);
      alert('수정완료');
      setEditingCommentText('');
      setEditingCommentId(null);
    } catch (err) {
      console.log(err);
    }
  };

  //대댓글 put
  const { mutateAsync: updateReplyComment } = useUpdateComment(detailBoard.id);
  const handleReplyCommentUpdate = async (reply, contentData) => {
    console.log(reply);
    console.log(reply.id);
    try {
      const response = await updateReplyComment({
        //여기까지가 기본적인 서버연동
        id: reply.id,
        content: contentData.content,
        parent_comment_id: reply.parent_comment_id,
      });
      const updatedComments = comments.map((comment) => {
        //내가 추가한 커스텀부분
        if (comment.id === reply.id) {
          //수정하려는 댓글 id랑 일치하는지 확인
          return {
            ...comment, //수정이 필요한 댓글 객체
            content: contentData.content, //내용을 수정하려는 내용으로 업데이트
          };
        }
        return comment; //수정 필요없는애들은 그대로
      });
      setComments(updatedComments);
      console.log(response);
      alert('수정완료');
      setEditingCommentText('');
      setEditingCommentId(null);
    } catch (err) {
      console.log(err);
    }
  };

  // 댓글 delete
  const { mutateAsync: deleteCommentMutation } = useDeleteComment(
    detailBoard.id
  );

  const handleCommentDelete = async (select) => {
    console.log(select);
    console.log(select.id);
    if (user.id !== select.user.id) {
      // 지우려는 사람이 본인이 아닐경우
      alert('해당 게시글을 삭제할 수 없습니다.');
      return;
    }
    if (window.confirm('회원의 댓글을 삭제하시겠습니까?')) {
      try {
        await deleteCommentMutation(select.id); //서버요청은 이걸로 끝. / 아래는 프론트쪽에서 내가 해결할 부분
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== select.id)
        );
        alert('삭제되었습니다.');
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const { data: GetReplyComment } = useGetReplyComment(
    detailBoard.id,
    commentId
  );
  const [replycomments, setReplyComments] = useState([]);
  useEffect(() => {
    if (GetReplyComment) {
      setReplyComments(GetReplyComment);
    }
  }, [GetReplyComment]);

  //대댓글 get
  const handleReplyComment = (id) => {
    if (showReplyCommentId === id) {
      setShowReplyCommentId(null); // 답글 숨기기
      setCommentId(null);
    } else {
      setShowReplyCommentId(id); // 답글 보기
      setCommentId(id);
    }
  };
  // console.log(showReplyCommentId);
  return (
    <>
      <S.CommentContainer>
        <S.FirstForm onSubmit={handleCreateSubmit}>
          <S.Nickname>{user && user.nickname}</S.Nickname>
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
        </S.FirstForm>
        <S.SecondForm>
          {comments &&
            comments.map((selectedComment) => (
              <S.CommentContainer key={selectedComment.id}>
                {editingCommentId === selectedComment.id ? (
                  <form>
                    <input
                      type='text'
                      placeholder='수정중입니다...'
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                    />
                    <S.CommentEDU>
                      <label
                        className='write'
                        type='button'
                        onClick={() => {
                          handleCommentUpdate(selectedComment.id, {
                            content: editingCommentText,
                          });
                          setEditingCommentText(''); // 수정완료 후 입력값 초기화
                        }}>
                        수정완료
                      </label>
                    </S.CommentEDU>
                  </form>
                ) : (
                  <>
                    <S.Nickname>{selectedComment.user.nickname}</S.Nickname>
                    <S.CommentContent>
                      {selectedComment.content}
                    </S.CommentContent>
                    <S.CommentEDU>
                      <label
                        type='button'
                        onClick={() => {
                          if (user.id !== selectedComment.user.id) {
                            // 지우려는 사람이 본인이 아닐경우
                            alert('해당 댓글을 수정할 수 없습니다.');
                            return;
                          }
                          if (editingCommentId === selectedComment.id) {
                            setEditingCommentId(null); // 수정 취소
                          } else {
                            setEditingCommentId(selectedComment.id); // 수정 모드로 전환
                            setEditingCommentText(selectedComment.content); // 수정할 댓글 내용 설정
                          }
                        }}>
                        수정
                      </label>
                      <label
                        onClick={() => handleCommentDelete(selectedComment)}>
                        삭제
                      </label>
                      <label
                        type='button'
                        onClick={() => handleReplyComment(selectedComment.id)}>
                        답글보기
                      </label>
                      <label
                        className='replyComment'
                        type='button'
                        onClick={() => {
                          if (replyCommentId === selectedComment.id) {
                            setReplyCommentId(null); // 답글달기 닫기
                          } else {
                            setReplyCommentId(selectedComment.id); // 답글달기 열기
                          }
                        }}>
                        답글달기
                      </label>
                    </S.CommentEDU>
                  </>
                )}
                {replyCommentId === selectedComment.id && (
                  <form
                    onSubmit={(e) =>
                      handleReplyCreateSubmit(e, selectedComment.id)
                    }>
                    <S.Nickname>{user.nickname}</S.Nickname>
                    <input
                      type='text'
                      placeholder='대댓글을 입력하세요'
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                    />
                    <S.CommentManage>
                      <button
                        className='write'
                        type='submit'
                        disabled={!replyInput}>
                        작성
                      </button>
                    </S.CommentManage>
                  </form>
                )}
                {replycomments && showReplyCommentId === selectedComment.id && (
                  <div>
                    {replycomments &&
                      replycomments.map(
                        (reply) =>
                          selectedComment.id === reply.parent_comment_id &&
                          reply && (
                            <div key={reply.id}>
                              <S.Nickname>{reply.user.nickname}</S.Nickname>
                              {editingCommentId === reply.id ? (
                                <form>
                                  <input
                                    type='text'
                                    placeholder='수정중입니다...'
                                    value={editingCommentText}
                                    onChange={(e) =>
                                      setEditingCommentText(e.target.value)
                                    }
                                  />
                                  <S.CommentEDU>
                                    <label
                                      className='write'
                                      type='button'
                                      onClick={() => {
                                        handleReplyCommentUpdate(reply, {
                                          content: editingCommentText,
                                        });
                                        setEditingCommentId(null); // 수정 완료 후 수정 상태 해제
                                        setEditingCommentText(''); // 수정 완료 후 입력값 초기화
                                      }}>
                                      수정완료
                                    </label>
                                  </S.CommentEDU>
                                </form>
                              ) : (
                                <>
                                  <S.CommentContent>
                                    {reply.content}
                                  </S.CommentContent>
                                  <S.CommentEDU>
                                    <label
                                      type='button'
                                      onClick={() => {
                                        if (user.id !== reply.user.id) {
                                          // 지우려는 사람이 본인이 아닐 경우
                                          alert(
                                            '해당 대댓글을 수정할 수 없습니다.'
                                          );
                                          return;
                                        }
                                        if (editingCommentId === reply.id) {
                                          setEditingCommentId(null); // 수정 취소
                                        } else {
                                          setEditingCommentId(reply.id); // 수정 모드로 전환
                                          setEditingCommentText(reply.content); // 수정할 대댓글 내용 설정
                                        }
                                      }}>
                                      수정
                                    </label>
                                    <label
                                      onClick={() =>
                                        handleCommentDelete(reply)
                                      }>
                                      삭제
                                    </label>
                                  </S.CommentEDU>
                                </>
                              )}
                            </div>
                          )
                      )}
                  </div>
                )}
              </S.CommentContainer>
            ))}
        </S.SecondForm>
      </S.CommentContainer>
    </>
  );
};

// export default BoardComment;
