import { React, useState, useEffect } from 'react';
import * as S from './BoardForm.style';
import Dropzone from 'react-dropzone';
import { useCreateBoard, useUpdateBoard } from '../../API/BoardAPi';
import { useGetDetailBoard } from '../../API/BoardAPi';
import { useAtom, useAtomValue } from 'jotai';
import { BOARD_PATH } from '../common/path';
import { useParams } from 'react-router-dom';
import { selectedBoardAtom } from '../../Atoms/BoardAtom';

const BoardForm = ({ onPageChange }) => {
  const [select, setSelect] = useAtom(selectedBoardAtom);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('PUBLIC');

  const { mutateAsync: createPost, isLoading: isCreating } = useCreateBoard(); //내가 작성한 커스텀 훅을  mutate를 통해 반환!
  const { mutateAsync: updatePost, isLoading: isUpdating } = useUpdateBoard();
  // 여기서 mutate: createPost 는 mutate써먹을 함수명을 정하는 거겠죠?
  const handleSubmit = async (e) => {
    //react-query사용시
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title); //보낼 데이터 이름, 실제 데이터
      formData.append('content', content);
      formData.append('image', image);
      formData.append('status', status);
      for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      if (select && select.id) {
        // selectedPost가 있으면서 유효한 id가 있는 경우에만 업데이트 수행
        await updatePost({ id: select.id, updatedPost: formData });
      } else {
        //없으면 => 글쓰기 버튼클릭.
        await createPost(formData);
      }
    } catch (error) {
      console.log(error);
    }
    alert('작성이 완료되었습니다!');
    setSelect('');
    onPageChange(BOARD_PATH);
  };
  const handlImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleDrop = (acceptedFiles) => {
    // 파일 업로드 처리
    // 업로드된 파일 정보를 state에 저장
    const selectedImage = acceptedFiles[0];
    setImage(selectedImage);
  };

  useEffect(() => {
    // 넘겨온 데이터가 맞으면 해당 데이터의 값들 보여주기
    if (select) {
      setTitle(select.title);
      setContent(select.content);
      if (select.image) {
        setImage(select.image);
      } else {
        setImage('');
      }
    }
  }, [select]);

  return (
    <S.Container>
      <S.FormContainer>
        <form onSubmit={handleSubmit}>
          <S.CheckBox
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value='PUBLIC'>공개</option>
            <option value='PRIVATE'>비공개</option>
          </S.CheckBox>
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
              style={{ whiteSpace: 'pre-line' }}
            />
          </div>
          <div>
            <label>사진첨부</label>
            {image ? (
              <S.ImageContainer>
                <img
                  src={
                    typeof image === 'string' //파일 객체로 오는경우 src에 담아서 이미지화.
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt='Example'
                  onClick={() => {
                    document.getElementById('imageInput').click();
                  }}
                />
                <input //input 쓰는 이유는 사진 들어온거 클릭하고 파일변경시 바로 교체되게 하려고!
                  id='imageInput'
                  type='file'
                  accept='image/*' //허용되는 파일 유형지정
                  onChange={handlImageChange}
                  style={{ display: 'none' }}
                />
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
          <button type='submit' disabled={isCreating || isUpdating}>
            {isCreating || isUpdating ? '작성 중...' : '작성하기'}
          </button>
          {/* 게시글 등록 혹은 업데이트가 진행중이면 중... 아니면 작성하기 + 추가적인 로직 생각해보기*/}
        </form>
      </S.FormContainer>
    </S.Container>
  );
};

export default BoardForm;
