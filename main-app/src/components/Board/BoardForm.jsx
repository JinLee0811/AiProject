import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { atom, useAtom } from 'jotai';

const BoardForm = ({ onAdd }) => {
  const titleAtom = atom('');
  const contentAtom = atom('');
  const imageAtom = atom('');
  const [title, setTitle] = useAtom(titleAtom);
  const [content, setContent] = useAtom(contentAtom);
  const [image, setImage] = useAtom(imageAtom);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    onAdd(title, content);
    setTitle('');
    setContent('');
    setImage('');
    navigate('/BoardPage');
  };

  const handleDrop = (acceptedFiles) => {
    // 파일 업로드 처리
    // 업로드된 파일 정보를 state에 저장
    setImage(acceptedFiles[0]);
  };
  return (
    <Container>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <label>제목</label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className='content'>내용</label>
            <textarea
              className='textarea'
              id='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label>사진첨부</label>
            {image ? (
              <ImageContainer>
                <img src={URL.createObjectURL(image)} alt='Uploaded Image' />
              </ImageContainer>
            ) : (
              <Dropzone onDrop={handleDrop} accept='image/*'>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className='DropBorder'>
                      Drag and drop an image or click here to select a file
                    </p>
                  </div>
                )}
              </Dropzone>
            )}
          </div>
          <button type='submit'>완료</button>
        </form>
      </FormContainer>
    </Container>
  );
};

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
  overflow: auto;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .textarea {
    height: 100px;
    width: 600px;
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
    .DropBorder {
      height: 50px;
      display: flex;
      align-items: center;
      border: 2px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 20px;
      max-width: 500px;
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
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin-bottom: 1rem;

  img {
    max-height: 100%;
    max-width: 100%;
  }
`;
