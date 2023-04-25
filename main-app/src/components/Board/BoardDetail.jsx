import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import { useInView } from 'react-intersection-observer';

const BoardDetail = () => {
  const location = useLocation(); //list에서 해당 정보만 받아오는 부분
  const { title, content, like, image, nickname, views, commentCount } =
    location.state;
  const [comments, setComments] = useState([
    //댓글과 대댓글을 담는 comments 배열
    // { text: '첫 번째 댓글', replies: [] },
    // { text: '두 번째 댓글', replies: [] },
  ]);
  const [input, setInput] = useState(''); //댓글입력상태
  const [replyInput, setReplyInput] = useState(''); //대댓글 입력상태
  const [replyIndex, setReplyIndex] = useState(null); //대댓글 작성할 댓글의 index 담는상태

  const handleSubmit = (e) => {
    //새 댓글 배열에 추가
    e.preventDefault();
    setComments([...comments, { text: input, replies: [] }]);
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

  // const [ref1, inView1] = useInView({
  //   threshold: 0.5,
  // });

  // const [ref2, inView2] = useInView({
  //   threshold: 0.5,
  // });

  // const [ref3, inView3] = useInView({
  //   threshold: 0.5,
  // });

  return (
    <Container>
      <FormContainer>
        <h1 className='title'>{title}</h1>
        <Nickname>{nickname}</Nickname>
        <h2 className='content'>{content}</h2>
        <h2 className='image'>{image}</h2>
        <Section>
          <p className='views'>조회 {views}</p>
          <p className='like'>{like}</p>
          <p>{commentCount}</p>
        </Section>
        <CommentContainer>
          <form onSubmit={handleSubmit}>
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
          <ReplyContainer>
            {comments.map((comment, index) => (
              <Comment key={index}>
                <p>{comment.text}</p>
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
                    <Reply key={index}>
                      <p>{reply}</p>
                    </Reply>
                  )
                )}
              </Comment>
            ))}
          </ReplyContainer>
        </CommentContainer>
      </FormContainer>
    </Container>
  );
};

export default BoardDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5fffa;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  height: 750px;
  overflow: auto;
  h1.title {
    width: 200px;
    padding: 12px 25px;
  }
  h2 {
    padding: 12px 25px;
    margin-bottom: 14px;
    width: 800px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  h2.content {
    width: 800px;
    height: 200px;
  }
  h2.image {
    height: 300px;
  }
`;
const Nickname = styled.div`
  width: 45px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;
const Section = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #333;
  margin-top: 10px;
  p {
    dispaly: block;
  }
  // p.views {
  //   padding: 0 50px 0 0;
  //   margin-right: 25px;
  //   background-color: green;
  //   color: white;
  //   border: none;
  //   border-radius: 4px;
  //   padding: 8px 16px;
  //   box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  // }
  // p.like {
  //   background-color: green;
  //   color: white;
  //   border: none;
  //   border-radius: 4px;
  //   padding: 8px 16px;
  //   box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  // }
`;
const CommentContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }
  form input {
    padding: 12px 25px;
    margin-bottom: 14px;
    width: 800px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border: grey;
    border-radius: 8px;
  }
  form button {
    width: 60px;
    margin-left: 92%;
  }
`;
const Reply = styled.div`
  p {
    padding: 12px 25px;
    margin-bottom: 14px;
    width: 800px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border: grey;
    border-radius: 8px;
  }
`;
const ReplyContainer = styled.div``;
const Comment = styled.div``;
