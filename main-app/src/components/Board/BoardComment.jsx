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
import { Auth } from '../../API/authApi';

const BoardComment = () => {
  const { isLoggedIn } = Auth();
  const [input, setInput] = useState('');
  const [replyInput, setReplyInput] = useState('');
  const [replyCommentId, setReplyCommentId] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [user] = useAtom(userAtom);
  const [commentNumber, setCommentNumber] = useState('');
  const { boardId } = useParams();
  const { isLoading, data: detailBoard } = useGetDetailBoard(boardId, {
    onError: (error) => console.log(error.message),
  });
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    if (detailBoard.comments) {
      const nullParents = detailBoard.comments.filter(
        (comment) => comment.parent_comment_id === null
      );
      const parents = detailBoard.comments.filter(
        (comment) => comment.parent_comment_id !== null
      );
      const number = detailBoard.comments.length;
      setComments(nullParents);
      setReplyComments(parents);
      setCommentNumber(number);
    }
  }, [detailBoard.comments]);
  // 댓글 post
  const { mutateAsync: createComment } = useCreateComment(detailBoard.id); //mutateAsync는 반환되는
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createComment({
        content: input,
      });
      setComments((prevComments) => [...prevComments, response]);
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };

  //댓글 patch
  const { mutateAsync: updateComment } = useUpdateComment(detailBoard.id);
  const handleCommentUpdate = async (id, contentData) => {
    try {
      const response = await updateComment({
        id: id,
        content: contentData.content,
      });
      const updatedComments = comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            content: contentData.content,
          };
        }
        return comment;
      });
      setComments(updatedComments);
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
    if (user.id !== select.user.id) {
      alert('해당 게시글을 삭제할 수 없습니다.');
      return;
    }
    if (window.confirm('회원의 댓글을 삭제하시겠습니까?')) {
      try {
        await deleteCommentMutation(select.id);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== select.id)
        );
        alert('삭제되었습니다.');
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // 대댓글 post
  const { mutateAsync: createReplyComment } = useCreateComment(detailBoard.id);
  const handleReplyCreateSubmit = async (e, id) => {
    // console.log(id);
    e.preventDefault();
    try {
      const response = await createReplyComment({
        content: replyInput,
        parent_comment_id: id,
      });

      setReplyComments((prevComments) => [...prevComments, response]);

      setReplyInput('');
      setReplyCommentId(null);
    } catch (err) {
      console.log(err);
    }
  };

  //대댓글 patch
  const { mutateAsync: updateReplyComment } = useUpdateComment(detailBoard.id);
  const handleReplyCommentUpdate = async (reply, contentData) => {
    try {
      const response = await updateReplyComment({
        id: reply.id,
        content: contentData.content,
      });
      // console.log(response);
      const updatedComments = comments.map((comment) => {
        if (comment.id === reply.id) {
          return {
            ...comment,
            content: contentData.content,
          };
        }
        return comment;
      });

      setReplyComments(updatedComments);

      alert('수정완료');
      setEditingCommentText('');
      setEditingCommentId(null);
    } catch (err) {
      console.log(err);
    }
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
  return (
    <>
      <S.CommentContainer>
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
                          setEditingCommentText('');
                        }}>
                        수정완료
                      </label>
                    </S.CommentEDU>
                  </form>
                ) : (
                  <>
                    <S.Nickname>{selectedComment.user.nickname}</S.Nickname>
                    <S.Time>{filterTime(selectedComment.created_at)}</S.Time>
                    <S.CommentContent>
                      {selectedComment.content}
                    </S.CommentContent>
                    <S.CommentEDU>
                      <label
                        type='button'
                        onClick={() => {
                          if (!isLoggedIn) {
                            window.location.href = '/login';
                            return;
                          }
                          if (user.id !== selectedComment.user.id) {
                            // 지우려는 사람이 본인이 아닐경우
                            alert('해당 댓글을 수정할 수 없습니다.');
                            return;
                          }
                          if (editingCommentId === selectedComment.id) {
                            setEditingCommentId(null); // 수정 취소
                          } else {
                            setEditingCommentId(selectedComment.id);
                            setEditingCommentText(selectedComment.content);
                          }
                        }}>
                        수정
                      </label>
                      <label
                        onClick={() => {
                          if (!isLoggedIn) {
                            window.location.href = '/login';
                            return;
                          }
                          handleCommentDelete(selectedComment);
                        }}>
                        삭제
                      </label>

                      <label
                        type='button'
                        onClick={() => {
                          if (!isLoggedIn) {
                            window.location.href = '/login';
                            return;
                          }
                          if (replyCommentId === selectedComment.id) {
                            setReplyCommentId(null);
                          } else {
                            setReplyCommentId(selectedComment.id);
                          }
                        }}>
                        답글보기
                      </label>
                    </S.CommentEDU>
                  </>
                )}
                <S.ReplyForm>
                  {replyCommentId === selectedComment.id && (
                    <form
                      onSubmit={(e) =>
                        handleReplyCreateSubmit(e, selectedComment.id)
                      }>
                      <div>
                        {replyComments &&
                          replyComments.map(
                            (reply) =>
                              selectedComment.id === reply.parent_comment_id &&
                              reply && (
                                <div key={reply.id}>
                                  <S.Nickname>
                                    <span class='material-symbols-outlined'>
                                      subdirectory_arrow_right
                                    </span>
                                    {reply.user.nickname}
                                  </S.Nickname>
                                  <S.Time>
                                    {filterTime(reply.created_at)}
                                  </S.Time>
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
                                            setEditingCommentId(null);
                                            setEditingCommentText('');
                                          }}>
                                          수정완료
                                        </label>
                                      </S.CommentEDU>
                                    </form>
                                  ) : (
                                    <>
                                      <S.ReplyCommentContent>
                                        {reply.content}
                                      </S.ReplyCommentContent>
                                      <S.CommentEDU>
                                        <label
                                          type='button'
                                          onClick={() => {
                                            if (user.id !== reply.user.id) {
                                              alert(
                                                '해당 대댓글을 수정할 수 없습니다.'
                                              );
                                              return;
                                            }
                                            if (editingCommentId === reply.id) {
                                              setEditingCommentId(null);
                                            } else {
                                              setEditingCommentId(reply.id);
                                              setEditingCommentText(
                                                reply.content
                                              );
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
                      <S.Nickname>
                        <span class='material-symbols-outlined'>
                          subdirectory_arrow_right
                        </span>
                        {user.nickname}
                      </S.Nickname>
                      <input
                        type='text'
                        placeholder='대댓글을 입력하세요'
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                      />
                      <S.ReplyCommentManage>
                        <button
                          className='replyWrite'
                          type='submit'
                          disabled={!replyInput}>
                          작성
                        </button>
                      </S.ReplyCommentManage>
                    </form>
                  )}
                </S.ReplyForm>
              </S.CommentContainer>
            ))}
        </S.SecondForm>
        <S.FirstForm onSubmit={handleCreateSubmit}>
          <S.Nickname1>
            <span class='material-symbols-outlined'>psychiatry</span>
            {user && user.nickname}
          </S.Nickname1>
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
      </S.CommentContainer>
    </>
  );
};

export default BoardComment;
