import { useState } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { atom, useAtom } from 'jotai';
import useApiRequest from '../../API/useApi';
import axios from 'axios';

const fileAtom = atom(null);
const resultAtom = atom('진단 내용이 없습니다');

const uploadFile = async (formData) => {
  const response = await axios.post('/api/upload', formData);
  return response.data.result;
};

const ImageUpload = () => {
  const [file, setFile] = useAtom(fileAtom);
  const [result, setResult] = useAtom(resultAtom);
  const [error, setError] = useState(null);

  const { isLoading: isApiRequestLoading, sendRequest } = useApiRequest();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await sendRequest('/api/upload', 'post', formData);
      setResult(result);
    } catch (error) {
      setError(error);
    }
  };

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  return (
    <>
      <Wrapper>
        <LeftBox>
          <Title>아픈 작물의 이미지를 올려주세요.</Title>
          <form onSubmit={handleSubmit}>
            <Dropzone onDrop={handleDrop} accept='image/*' multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <FileUploader {...getRootProps()}>
                  <input {...getInputProps()} />
                  {file ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt='uploaded file'
                    />
                  ) : (
                    '진단 받으실 작물의 이미지를 올려주세요'
                  )}
                </FileUploader>
              )}
            </Dropzone>
            <Button onClick={handleSubmit} disabled={isApiRequestLoading}>
              {isApiRequestLoading ? '진단 중...' : '진단하기'}
            </Button>
          </form>
        </LeftBox>
        <Arrow>➡</Arrow>
        <RightBox>
          <Title>진단을 확인하세요.</Title>
          <ResultBox>
            <ResultTitle>{result.title}</ResultTitle>
            <Result>
              <ul>
                {result &&
                  result.items &&
                  result.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Result>
          </ResultBox>
        </RightBox>
      </Wrapper>
    </>
  );
};

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 60px;
`;
const Arrow = styled.div`
  margin: 50px;
  font-size: 100px;
  color: #4ba888;
`;
const Title = styled.div`
  font-size: 20px;
  color: #4ba888;
  font-weight: 900;
  margin: 10px;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4ba888;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  :hover {
    background-color: #759783;
  }
`;
const ResultBox = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 500px;
  border: 1px solid #4ba888;
`;
const ResultTitle = styled.div`
  margin: 20px;
  font-size: 20px;
  font-weight: 700;
`;
const Result = styled.div`
  margin: 20px;
  font-size: 18px;
  background-color: #d8dddb98;

  ul {
    text-decoration: none;
    list-style: none;
    margin-right: 30px;

    & li {
      text-decoration: none;
      font-size: 1rem;
      margin-top: 20px;
    }
  }
`;

const FileUploader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 500px;
  margin-bottom: 20px;
  border: 2px dashed #759783;
  border-radius: 5px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

export default ImageUpload;
