import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './BoardDetail.style';
// import { useInView } from 'react-intersection-observer';
import { atom, useAtom } from 'jotai';

const commentsAtom = atom([]);
const inputAtom = atom('');
const replyInputAtom = atom('');
const replyIndexAtom = atom(null);

const BoardDetail = () => {
  const location = useLocation(); //list에서 해당 정보만 받아오는 부분
  const { title, content, like, image, nickname, views, commentCount, time } =
    location.state;
  const [comments, setComments] = useAtom(
    commentsAtom
    //댓글과 대댓글을 담는 comments 배열
    // { text: '첫 번째 댓글', replies: [] },
    // { text: '두 번째 댓글', replies: [] },
  );
  const [input, setInput] = useAtom(inputAtom); //댓글입력상태
  const [replyInput, setReplyInput] = useAtom(replyInputAtom); //대댓글 입력상태
  const [replyIndex, setReplyIndex] = useAtom(replyIndexAtom); //대댓글 작성할 댓글의 index 담는상태

  // post요청한 댓글을 get하는 로직을 비동기 fetchData 함수에 담는다!
  // useEffect(() => { 컴포넌트가 렌더링될 때 한 번만 시행하도록 useEffect 씀
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/comments');
  //       setComments(response.data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // fetchData(); 얘가 렌더링시 알아서 실행되면서~ comments에 response.data가 불러와짐.
  // },[]) //두번째 인자로 빈 배열줘야 fetchData 함수가 한 번만 실행

  const handleSubmit = (e) => {
    //새 댓글 배열에 추가하는 axios post요청 ㅇㅇ.
    // const handleSubmit = async(e) => {
    //   e.preventDefault();
    //   try {
    //     const response = await axios.post('/api/comments', {
    //       text: input,
    //       replies: [] //replies 는 해당댓글의 대댓글 배열을 의미함. input댓글값과 그 댓글의 대댓글이 들어올 배열이 보내짐.
    //     });
    //     setComments(...comments, response.data) //기존의 comments배열에 post의 응답데이터를 추가함
    //     setInput('')
    //   } catch(error) {
    //     console.log(error);
    //   }
    // }
    e.preventDefault();
    setComments([...comments, { text: input, replies: [] }]); //replies 는 해당댓글의 대댓글 배열을 의미함.
    setInput('');
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

  const [likeCount, setLikeCount] = useAtom(atom(like || 0));
  const [liked, setLiked] = useAtom(atom(likeCount > 0));

  useEffect(() => {
    setLiked(likeCount > 0);
  }, [likeCount, setLiked]);

  const handleLikeClick = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
      setLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setLiked(true);
    }
  };
  return (
    <S.Container>
      <S.FormContainer>
        <h1 className='title'>{title}</h1>
        <div className='information'>
          <span className='material-symbols-outlined'>emoji_nature</span>
          <p className='nickname'>{nickname}</p>
          <p className='time'>{filterTime(time)}</p>
        </div>
        <h2 className='content'>{content}</h2>
        <h2 className='image'>{image}</h2>
        <p className='comment'>
          조회 {views} • 댓글 {commentCount} • 관심 {like}
          <button onClick={handleLikeClick}>
            {likeCount} {liked ? '취소' : '추가'}
          </button>
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
