import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function BoardForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    onAdd(title, content);
    setTitle('');
    setContent('');
    // setImage("");
    navigate('/BoardPage');
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='title'>제목</label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className='content'>내용:</label>
            <input
              id='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {/* <div>
        <label>사진첨부</label>
        <input id="image" value={image} onChange={(e) => setContent(e.target.value)} />
      </div> */}
          <button type='submit'>완료</button>
        </form>
      </FormContainer>
    </Container>
  );
}

export default BoardForm;

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
  justify-content: center;
  align-items: center;
  background-color: #f5fffa;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  height: 600px;
  width: 800px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    label {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    input {
      padding: 0.5rem;
      border-radius: 3px;
      border: none;
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    }
  }

  button[type='submit'] {
    padding: 0.5rem 1rem;
    background-color: green;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: darkgreen;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }
  }
`;
