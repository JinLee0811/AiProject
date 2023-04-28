import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './BoardForm.style';
import Dropzone from 'react-dropzone';
import { atom, useAtom } from 'jotai';

const titleAtom = atom('');
const contentAtom = atom('');
const imageAtom = atom('');

const BoardForm = () => {
  const [title, setTitle] = useAtom(titleAtom);
  const [content, setContent] = useAtom(contentAtom);
  const [image, setImage] = useAtom(imageAtom);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //여기다 axios post요청
    // post 요청시에는 forData를 만들어서 거기에 내가 적은것들 append해서~ 서버로 axios post요청 하는 순서.
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   const formData = new FormData();
    //   formData.append('title', title); //보낼 데이터 이름, 실제 데이터
    //   formData.append('content', content);
    //   formData.append('image', image);
    //   try {
    //     await axios.post('http://example.com/api/board', formData); //주소,보낼 formData
    //     setTitle(''); //요청 성공하고나면 아래처럼 set함수들 다 초기화
    //     setContent('');
    //     setImage('');
    //     navigate('/BoardPage');
    //   } catch (error) {
    //     console.error(error);
    //   }
    e.preventDefault();
    setTitle('');
    setContent('');
    setImage('');
    navigate('/BoardPage');
  };

  const handleDrop = (acceptedFiles) => {
    // 파일 업로드 처리
    // 업로드된 파일 정보를 state에 저장
    setImage(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  };
  return (
    <S.Container>
      <S.FormContainer>
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
              <S.ImageContainer>
                <img src={URL.createObjectURL(image)} alt='Example' />
              </S.ImageContainer>
            ) : (
              <Dropzone onDrop={handleDrop} accept='image/*'>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className='DropBorder'>
                      클릭 후 올리고 싶은 사진파일을 선택해주세요!
                    </p>
                  </div>
                )}
              </Dropzone>
            )}
          </div>
          <button type='submit'>성장일지 작성하기</button>
        </form>
      </S.FormContainer>
    </S.Container>
  );
};

export default BoardForm;
