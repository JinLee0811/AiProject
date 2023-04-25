import { React, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
// import BoardForm from './BoardForm';
import styled from 'styled-components';
import axios from 'axios';

const postAtom = atom([]);
function BoardList() {
  let navigate = useNavigate();
  const [posts, setPosts] = useAtom(postAtom);
  useEffect(() => {
    axios
      .get('/BoardList.json')
      .then((response) => {
        setPosts(response.data); //postAtom에 업데이트
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setPosts]);

  function detailClick(id) {
    // axios   => axios사용시 이런식으로?
    // .get(`/BoardList/${id}.json`)
    // .then((response) => {
    //   navigate('/BoardDetail'
    const post = posts.find((post) => post.id === id);
    navigate('/BoardDetail', {
      state: {
        title: post.title,
        content: post.content,
        like: post.like,
        nickname: post.nickname,
        image: post.image,
        views: post.views,
        commentCount: post.commentCount,
      },
    });
  }
  function formClick() {
    navigate('/BoardForm');
  }
  return (
    <>
      <Container>
        <h1>성장일지</h1>
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
