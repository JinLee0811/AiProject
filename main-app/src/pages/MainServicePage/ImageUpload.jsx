import React, { useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { useAtom } from 'jotai';
import { fileAtom, resultAtom } from '../../Atoms/MainServiceAtom';
import { useCreateImage, useCreateSolution } from '../../API/MainServiceApi';

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
  // 초기화 버튼과 저장 버튼 활성화/비활성화 조건
  const isResetDisabled = !file && !result;
  const isSaveDisabled = !result || isSolutionCreating;

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
              <ResultTitle> 예측 작물 :asdasd</ResultTitle>
              <ResultTitle>질병 이름: asdasd</ResultTitle>

              <Result>
                "감염된 식물 부분은 즉시 제거하고 폐기해야 합니다.", "물을 뿌릴
                때 잎에 직접 물이 닿지 않도록 하고, 대신 뿌리 부근에 물을
                주세요.", "예방을 위해 식물을 심기 전에 씨앗을 잠시 물에
                담갔다가 건조시키는 방법이 효과적입니다."
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
  color: #4ba888;
`;
const Title = styled.div`
  font-size: 20px;
  color: #4ba888;
  font-weight: 900;
  margin: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
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
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 500px;
  margin-bottom: 20px;
  border: 1px solid #759783;
  border-radius: 5px;
  background-color: #d8dddb98;
`;
const ResultTitle = styled.div`
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
`;
const Result = styled.div`
  margin: 10px;
  font-size: 3px;
  align-items: center;
  font-size: 15px;
  background-color: white;
  border: 1px solid black;
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
