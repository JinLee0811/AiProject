import { React, useState, useEffect } from 'react';
import * as S from './BoardForm.style';
import Dropzone from 'react-dropzone';
import { useCreateBoard, useUpdateBoard } from '../../../API/BoardAPi';
import { selectedBoardAtom } from '../../../Atoms/BoardAtom';
import { useAtomValue } from 'jotai';
import { BOARD_PATH } from '../../common/path';

const BoardForm = ({ onPageChange }) => {
  const selectedBoard = useAtomValue(selectedBoardAtom); //detail에서 넘어온 값들이 곧 selectedBoard임
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

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
      // const formData = new FormData(e.target); 위 방식과 다를 게 없는 듯 한데 맞는지 근데 이럼 title 이름이랑 실제데이터 지정 못하는거아님?
      // mutate(formData);
      if (selectedBoard) {
        //selectedPost 있으면 update 없으면 create
        await updatePost({ id: selectedBoard.id, data: formData });
        alert('작성이 완료되었습니다!');
      } else {
        await createPost(formData);
        alert('작성이 완료되었습니다!');
        // setTitle('');
        // setContent('');
        // setImage(null); //요렇게 작동 안될 시 useEffect 쓰기!
      }
    } catch (error) {
      console.log(error);
    }
    onPageChange(BOARD_PATH);
  };

  const handleDrop = (acceptedFiles) => {
    // 파일 업로드 처리
    // 업로드된 파일 정보를 state에 저장
    setImage(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  };

  //selectedBoard가 변경 될 때마다 실행한다 (3항연산자를 초기값으로 쓰는게 아니라 useEffect!)
  useEffect(() => {
    if (selectedBoard) {
      setTitle(selectedBoard.title);
      setContent(selectedBoard.content);
      setImage(selectedBoard.image);
    }
  }, [selectedBoard]);

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
