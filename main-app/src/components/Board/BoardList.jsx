import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardForm from './BoardForm';
import styled from 'styled-components';

function BoardList() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '제목1',
      content: '내용1',
      like: '1하트',
      nickname: '꽃좋아',
      image: '사진',
      views: '1',
    },
    {
      id: 2,
      title: '제목2',
      content: '내용2',
      like: '2하트',
      nickname: '꽃싫어',
      image: '사진',
      views: '2',
    },
  ]);

  const addPost = (title, content) => {
    const newPost = { id: posts.length + 1, title, content };
    setPosts([...posts, newPost]);
  };
  function detailClick(id) {
    const post = posts.find((post) => post.id === id);
    navigate('/BoardDetail', {
      state: {
        title: post.title,
        content: post.content,
        like: post.like,
        nickname: post.nickname,
        image: post.image,
        views: post.views,
      },
    });
  }
  function formClick() {
    navigate('/BoardForm');
  }
  return (
    <>
      <Container>
        <h1>게시판</h1>
        {/* <BoardForm onAdd={addPost} /> */}
        <button className='write' onClick={formClick}>
          작성하기
        </button>
        <FormContainer>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <button className='Detail' onClick={() => detailClick(post.id)}>
                  자세히 보기
                </button>
              </li>
            ))}
          </ul>
        </FormContainer>
      </Container>
    </>
  );
}
export default BoardList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  button {
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
    }
  }
  .write {
    margin-left: 300px;
  }
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  li {
    padding: 12px 14px;
    margin-bottom: 14px;
    width: 800px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 6px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
  }
  .Detail {
    width: 80px;
    margin-left: auto;
  }
`;
