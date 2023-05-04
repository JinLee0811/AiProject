import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../BoardForm.style';
import Dropzone from 'react-dropzone';
// import { atom, useAtom } from 'jotai';
import { useBoardUploadMutation } from '../../../API/useBoardUploadMutation';

const BoardForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const { mutate } = useBoardUploadMutation(); //내가 작성한 커스텀 훅을  mutate를 통해 반환!

  const handleSubmit = (e) => {
    //react-query사용시
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title); //보낼 데이터 이름, 실제 데이터
    formData.append('content', content);
    formData.append('image', image);
    // const formData = new FormData(e.target); 위 방식과 다를 게 없는 듯 한데 맞는지 근데 이럼 title 이름이랑 실제데이터 지정 못하는거아님?
    // mutate(formData);
    mutate(formData); //formData 설정해서 추가할거 추가한 후 mutate에 담아주기만 하면 끝??

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
    // e.preventDefault();
    setTitle('');
    setContent('');
    setImage(null);
    navigate('/BoardListPage');
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
