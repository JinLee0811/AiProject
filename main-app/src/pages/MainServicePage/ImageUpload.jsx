import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { useCreateImage, useCreateSolution } from '../../API/MainServiceApi';
import { Auth } from '../../API/authApi';
import { useLocation } from 'react-router-dom';

// 이미지 url 받기
const ImageUpload = () => {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const { isLoggedIn } = Auth();
  const locate = useLocation();
  const { mutateAsync: createImage, isLoading: isImageUploading } = useCreateImage();
  const { mutate: createSolution, isLoading: isSolutionCreating } =
    useCreateSolution();

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  // 이미지 업로드 로직
  const handleImageUpload = async () => {
    if (!file) {
      alert('진단받을 이미지가 없습니다.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', file);
      const data = await createImage(formData);
      setResult(data);
      console.log(data)

    } catch (error) {
      console.error(error);
    }
  };

  // 데이터 저장 로직 (저장을 한번만 시키기)
  const handleSolutionCreate = async () => {
    if (!isLoggedIn) {
      locate('/login');
      return;
    }
    if (!result || isSolutionCreating) {
      alert('진단 내역이 없습니다');
      return;
    }
    try {
      const solution = { result };
      const data = await createSolution(solution);
      console.log('진단 저장', data);
    } catch (error) {
      console.error(error);
    }
  };

  // 초기화 로직
  const handleReset = () => {
    setFile(null);
    setResult(null);
  };
  // 초기화 버튼과 저장 버튼 활성화 / 비활성화 조건
  const isResetDisabled = !file && !result;
  const isSaveDisabled = !result || isSolutionCreating;
  // const isFormDisabled = (!file && !result) || isSolutionCreating || !result;

  // 업로드 된 파일이나 결과값이 바뀌면 초기화
  // useEffect(() => {
  //   if (!file && !result) {
  //     return;
  //   }
  //   setFile(null);
  //   setResult(null);
  // }, [result, setResult]);

  console.log(result)

  return (
    <>
      <Wrapper>
        <LeftBox>
          <Title>아픈 작물의 이미지를 올려주세요.</Title>
          <form onSubmit={handleImageUpload}>
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
            <Button
              onClick={handleImageUpload}
              disabled={!file || isImageUploading}>
              {isImageUploading ? '진단 중...' : '진단하기'}
            </Button>
          </form>
        </LeftBox>
        <Arrow>➡</Arrow>
        <RightBox>
          <Title>진단을 확인하세요.</Title>
          <form onSubmit={handleSolutionCreate}>
            {result && (
              <ResultBox>
                <Result>
                  <ResultTitle>진 단 서🔎</ResultTitle>
                  <ResultImage src={result.image} />
                  <ResultContents>
                    👉 당신의 작물은{' '}
                    <ResultStrong>'{result.crop_name}'</ResultStrong>이며, 크롭
                    닥터의 진단 결과 질병의 이름은
                    <ResultStrong>'{result.disease_name}'</ResultStrong> 입니다.
                  </ResultContents>
                  <ResultSolution>
                    <ResultStrong2>
                      👨‍🌾아래의 해결방법을 참고하세요👨‍🌾
                    </ResultStrong2>
                    <ResultStrong3>"{result.disease_solution}"</ResultStrong3>
                  </ResultSolution>
                </Result>
              </ResultBox>
            )}
            {!result && (
              <ResultBox>
                <ResultTitle1>진 단 서🔎</ResultTitle1>
                <ResultImage1 src='https://img.freepik.com/premium-vector/illustration-of-cute-male-doctor-with-stethoscope-kawaii-vector-cartoon-character-design_380474-32.jpg' />
                <ResultContents>👉 진단 결과가 없습니다.</ResultContents>
                <ResultSolution></ResultSolution>
              </ResultBox>
            )}
            <Button onClick={handleReset} disabled={isResetDisabled}>
              초기화
            </Button>
            <Button onClick={handleSolutionCreate} disabled={isSaveDisabled}>
              {isSolutionCreating ? '저장 중...' : '저장하기'}
            </Button>
          </form>
        </RightBox>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 350px;
    height: 100vh;
  }
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Arrow = styled.div`
  margin: 50px;
  font-size: 100px;
  color: #759683;
`;
const Title = styled.div`
  font-size: 20px;
  color: #759683;
  font-weight: 900;
  margin: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #759683;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  :hover {
    background-color: #4ba888;
  }
`;
const ResultBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 500px;
  margin-bottom: 20px;
  border: 2px solid #759783;
  border-radius: 5px;
  background-color: #d8dddb98;
  overflow: auto;
`;
const ResultTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 700;
`;
const ResultTitle1 = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 700;
`;
const ResultContents = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
`;
const ResultStrong = styled.div`
  display: inline;
  border-radius: 0px;
  padding: 1px;
  color: green;
`;
const ResultStrong2 = styled.div`
  display: block;
  border-radius: 0px;
  padding: 1px;
  color: black;
  margin-bottom: 3px;
`;
const ResultStrong3 = styled.div`
  display: block;
  border-radius: 0px;
  padding: 10px;
  color: black;
  margin-bottom: 3px;
  color: green;
  border: 1px solid black;
`;
const Result = styled.div`
  margin: 10px;
  height: 700px;
  padding: 15px;
  align-items: center;
  background-color: white;
  border: 1px solid black;
`;
const ResultSolution = styled.div`
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
  color: green;
`;
const ResultImage = styled.img`
  margin-top: 5px;
  width: 250px;
  height: 150px;
  margin: 0 auto;
  border-radius: 10px;
  border: 3px solid white;
`;
const ResultImage1 = styled.img`
  width: 250px;
  height: 250px;
  margin: 0 auto;
  border-radius: 10px;
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

const Message = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export default ImageUpload;
