import React, { useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { useAtom } from 'jotai';
import { fileAtom, resultAtom } from '../../Atoms/MainServiceAtom';
import { useCreateImage, useCreateSolution } from '../../API/MainServiceApi';

// 이미지 url 받기
const ImageUpload = () => {
  const [file, setFile] = useAtom(fileAtom);
  const [result, setResult] = useAtom(resultAtom);
  const { mutate: createImage, isLoading: isImageUploading } = useCreateImage();
  const { mutate: createSolution, isLoading: isSolutionCreating } =
    useCreateSolution();

  const handleDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  // 이미지 업로드 로직
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const data = await createImage(formData);
      setResult({
        title: data.title,
        items: data.items,
        imageUrl: URL.createObjectURL(file),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 데이터 저장 로직 (저장을 한번만 시키기)
  const handleSolutionCreate = async () => {
    if (!result || isSolutionCreating) {
      return;
    }
    try {
      const solution = {
        title: result.title,
        items: result.items,
      };
      const data = await createSolution(solution);
      console.log('Created solution:', data);
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
  useEffect(() => {
    if (!file && !result) {
      return;
    }
    setFile(null);
    setResult(null);
  }, [result, setResult]);

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
            {/* <ResultBox>
              <ResultTitle> 예측 작물 : {result.crop_name}</ResultTitle>
              <Result>질병 이름: {result.disease_name}</Result>
              <Result>해결책: {result.disease_solution}</Result>
            </ResultBox> */}
            <ResultBox>
              <Result>
                <ResultTitle>진 단 서🔎</ResultTitle>
                <ResultImage src='https://www.newssc.co.kr/news/photo/202107/48405_32603_2018.jpg' />

                <ResultContents>
                  👉 당신의 작물은 <ResultStrong>'고추'</ResultStrong>이며, 크롭
                  닥터의 진단 결과 질병의 이름은
                  <ResultStrong>'탄저병'</ResultStrong> 입니다.
                </ResultContents>
                <ResultSolution>
                  <ResultStrong2>
                    👨‍🌾아래의 해결방법을 참고하세요👨‍🌾
                  </ResultStrong2>
                  <ResultStrong3>
                    "감염된 식물 부분은 즉시 제거하고 폐기해야 합니다.", "물을
                    뿌릴 때 잎에 직접 물이 닿지 않도록 하고, 대신 뿌리 부근에
                    물을 주세요.", "예방을 위해 식물을 심기 전에 씨앗을 잠시
                    물에 담갔다가 건조시키는 방법이 효과적입니다."
                  </ResultStrong3>
                </ResultSolution>
              </Result>
            </ResultBox>
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
  margin-left: 50px;
  border-radius: 10px;
  border: 3px solid white;
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
