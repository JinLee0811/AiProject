{
  /* <S.ReplyContainer>
        {comments.map(({ id, comment, children }) => (
          <S.Comment key={id}>
            <p className='commentText'>{comment}</p>
            <button onClick={() => setReplyToCommentId(id)}>답글 달기</button> */
}
{
  /* 답글작성폼 */
}
{
  /* {replyToCommentId === id && (
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
      </S.ReplyContainer> */
}
