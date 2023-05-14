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
import { userAtom } from '../../Atoms/TokenAtom';

const BoardComment = () => {
  const [input, setInput] = useState(''); //댓글입력상태
  const [replyInput, setReplyInput] = useState(''); //대댓글 입력상태
  const [replyCommentId, setReplyCommentId] = useState(''); //답글달기 =>내가 지금 작성하려는 댓글이 / 최상위 댓글의 대댓글이 맞는지 확인용
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [user] = useAtom(userAtom);

  //댓글 get
  const { boardId } = useParams();
  const { isLoading, data: detailBoard } = useGetDetailBoard(boardId, {
    onError: (error) => console.log(error.message),
  });

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
      const newComment = {
        ...response,
        user: {
          ...user,
        },
      };
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (err) {
      console.log(err);
    }
  };

  //댓글 put
  const { mutate: updateComment } = useUpdateComment(detailBoard.id);
  const handleCommentUpdate = async (id, { text: input }) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content: input };
      }
      return comment;
    });
    console.log(updatedComments);
    try {
      await updateComment(id, { content: input }); //서버 업데이트 요청하고
      console.log();
      setComments(updatedComments); //댓글 업데이트
      alert('댓글 수정 완료');
      setEditingCommentId(null); // 수정모드 종료

      console.log(updatedComments);
    } catch (err) {
      console.log(err.message);
    }
  };

  // 댓글 delete
  const { mutateAsync: deleteCommentMutation } = useDeleteComment(
    detailBoard.id
  );
  const handleCommentDelete = async (id) => {
    if (user.id !== detailBoard.user.id) {
      // 지우려는 사람이 본인이 아닐경우
      alert('해당 게시글을 삭제할 수 없습니다.');
      return;
    }
    const confirmResult = window.confirm('댓글을 삭제하시겠습니까?'); //취소 눌렀을시 삭제안되게
    if (!confirmResult) {
      return;
    }
    try {
      await deleteCommentMutation(id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (err) {
      console.log(err.message);
    }
    alert('삭제되었습니다!');
    console.log(comments);
  };

  return (
    <>
      <S.CommentContainer>
        <S.FirstForm onSubmit={handleCreateSubmit}>
          <S.Nickname>{user.nickname}</S.Nickname>
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
          {comments.map((selectedComment) => (
            <S.CommentContainer key={selectedComment.id}>
              {editingCommentId === selectedComment.id ? (
                <form>
                  <input
                    type='text'
                    placeholder='댓글을 입력하세요'
                    value={editingCommentText}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                  />
                  <S.CommentEDU>
                    <label
                      className='write'
                      type='button'
                      onClick={() => {
                        handleCommentUpdate(selectedComment.id, {
                          text: editingCommentText,
                        });
                        setEditingCommentText(''); // 수정 완료 후 입력값 초기화
                      }}>
                      수정완료
                    </label>
                    <label
                      onClick={() => handleCommentDelete(selectedComment.id)}>
                      삭제
                    </label>
                    <label
                      className='replyComment'
                      type='button'
                      onClick={() => {
                        if (replyCommentId === selectedComment.id) {
                          setReplyCommentId(null); // 답글작성폼 닫기
                        } else {
                          setReplyCommentId(selectedComment.id); // 답글작성폼 열기
                        }
                      }}>
                      답글달기
                    </label>
                  </S.CommentEDU>
                </form>
              ) : (
                <>
                  <S.Nickname>{detailBoard.user.nickname}</S.Nickname>
                  <S.CommentContent>{selectedComment.content}</S.CommentContent>
                  <S.CommentEDU>
                    <label
                      type='button'
                      onClick={() => {
                        if (editingCommentId === selectedComment.id) {
                          setEditingCommentId('댓글을 입력하세요'); // 수정 취소
                        } else {
                          setEditingCommentId(selectedComment.id); // 수정 모드로 전환
                          setEditingCommentText(selectedComment.content); // 수정할 댓글 내용 설정
                        }
                      }}>
                      수정
                    </label>
                    <label
                      onClick={() => handleCommentDelete(selectedComment.id)}>
                      삭제
                    </label>
                    <label
                      className='replyComment'
                      type='button'
                      onClick={() => {
                        if (replyCommentId === selectedComment.id) {
                          setReplyCommentId(null); // 답글작성폼 닫기
                        } else {
                          setReplyCommentId(selectedComment.id); // 답글작성폼 열기
                        }
                      }}>
                      답글달기
                    </label>
                  </S.CommentEDU>
                </>
              )}
              {replyCommentId === selectedComment.id && (
                <form>
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
            </S.CommentContainer>
          ))}
        </S.SecondForm>
      </S.CommentContainer>
    </>
  );
};

export default BoardComment;
