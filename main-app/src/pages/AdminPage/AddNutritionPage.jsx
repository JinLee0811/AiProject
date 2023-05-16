import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAtom, useSetAtom } from 'jotai';
import { useCreateNutrition, useUpdateNutrition } from '../../API/NutritionApi';
import { useGetCategories } from '../../API/CategoryApi';
import { selectedNutritionAtom } from '../../Atoms/NutritionAtom';

function TonicForm() {
  const [select, setSelect] = useAtom(selectedNutritionAtom);
  const [prevCategories, setPrevCategories] = useState([]);
  const setSelectedNutrition = useSetAtom(selectedNutritionAtom);
  const [categories, setCategories] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [name, setName] = useState(select ? select.name : '');
  const [shortDescription, setShortDescription] = useState(
    select ? select.short_description : ''
  );
  const [description, setDescription] = useState(
    select ? select.description : ''
  );
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(select ? select.image : '');

  const { data: fetchedCategories } = useGetCategories({
    onError: (error) => console.log(error.message),
  });
  const { mutate: createNutrition } = useCreateNutrition();
  const { mutate: updateNutrition } = useUpdateNutrition();
  const inputRef = useRef();

  useEffect(() => {
    if (fetchedCategories) {
      const initialCategories = fetchedCategories.map((category) => ({
        id: category.id,
        name: category.name,
      }));
      setCategories(initialCategories);
    }
  }, [fetchedCategories]);

  useEffect(() => {
    if (select) {
      setCheckedList(select.categories.map((category) => category.id));
    }
  }, []);

  const handleReset = () => {
    setImage('');
    setName('');
    setShortDescription('');
    setDescription('');
    setCheckedList([]);
    setPreviewImage('');
    setSelectedNutrition('');
    inputRef.current.value = '';
    console.log(inputRef);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('short_description', shortDescription);
      formData.append('description', description);
      formData.append('image', image);

      // categoryIds가 배열인 경우 set() 메서드를 사용하여 formData에 추가
      if (checkedList.length < 1) {
        if (!select || !select.id) {
          alert('카테고리를 선택해주세요!');
          return;
        }
        formData.append('categoryIds[]', 0);
      } else {
        formData.append('categoryIds[]', checkedList);
      }

      if (select && select.id) {
        await updateNutrition({ id: select.id, formData });
        alert('수정되었습니다.');
      } else {
        await createNutrition(formData);
        alert('등록되었습니다.');
      }
      handleReset();
      console.log([...formData.entries()]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // 파일이 존재하는 경우
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      // inputRef.current.value = file.name;
      console.log(file);
    } else {
      setImage(null);
      // setPreviewImage(URL.createObjectURL(null));
      inputRef.current.value = '';
      event.target.value = '';
    }
  };

  const checkedCategory = (id) => {
    // checkedList state 값 활용
    if (checkedList.indexOf(id) < 0) {
      // 체크한 카테고리 id 값 확인
      setCheckedList((checkedList) => [...checkedList, id]);
    } else {
      // 체크해제 확인을 위한 filter 활용
      setCheckedList(checkedList.filter((checkedList) => checkedList !== id));
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor='category'>카테고리</Label>
        <CategoryBox>
          {categories.map((item) => (
            <CategoryLabel key={item.id}>
              <CategoryInput
                type='checkbox'
                checked={checkedList.includes(item.id)}
                onClick={() => checkedCategory(item.id)}
              />
              <CategoryText>{item.name}</CategoryText>
            </CategoryLabel>
          ))}
        </CategoryBox>
        <Label htmlFor='tonic-name'>영양제 이름</Label>
        <Input
          id='tonic-name'
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Label htmlFor='short-description'>짧은 글 소개</Label>
        <Input
          id='short-description'
          type='text'
          value={shortDescription}
          onChange={(event) => setShortDescription(event.target.value)}
        />
        <Label htmlFor='long-description'>긴글 소개</Label>
        <TextArea
          id='long-description'
          rows='5'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Label htmlFor='image'>이미지 업로드</Label>
        <Input1
          ref={inputRef}
          id='image'
          type='file'
          onChange={handleImageChange}
        />
        {previewImage && (
          <PreviewImage src={previewImage} alt='uploaded image' />
        )}
        <Button type='submit'>{select ? '수정하기' : '등록하기'}</Button>
      </Form>
      <Reset onClick={handleReset}>초기화</Reset>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
`;

const Reset = styled.button`
  display: inline-block;
  height: 40px;
  width: 400px;
  font-weight: bold;
  text-align: center;
  background-color: #759783;
  font-size: 15px;
  letter-spacing: -0.6px;
  text-decoration: none solid rgb(128, 128, 128);
  vertical-align: middle;
  word-spacing: 0px;
  color: #fff;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: green;
  }
`;

const Input = styled.input`
  font-size: 14px;
  letter-spacing: -0.6px;
  line-height: 18px;
  text-indent: 5px;
  color: #808080;
  text-decoration: none solid rgb(128, 128, 128);
  background-color: white;
  display: inline-block;
  height: 25px;
  width: 400px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  cursor: text;
`;
const Input1 = styled.input`
  background-color: white;
  display: inline-block;
  padding: 5px;
  height: 20px;
  width: 200px;
  margin-bottom: 15px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  cursor: text;
`;

const TextArea = styled.textarea`
  padding: 15px;
  width: 400px;
  margin-bottom: 10px;
  text-decoration: none solid rgb(128, 128, 128);
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const Button = styled.button`
  display: inline-block;
  height: 40px;
  width: 400px;
  font-weight: bold;
  text-align: center;
  background-color: #759783;
  font-size: 15px;
  letter-spacing: -0.6px;
  text-decoration: none solid rgb(128, 128, 128);
  vertical-align: middle;
  word-spacing: 0px;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  :hover {
    background-color: green;
  }
`;

const PreviewImage = styled.img`
  width: 400px;
  height: 200px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  object-position: center;
  box-shadow: 0 0 10px #759683;
  border-radius: 5px;
`;
const CategoryBox = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px;
  width: 400px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const CategoryLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 3px;
  text-align: center;
`;

const CategoryInput = styled.input`
  margin-right: 5px;
`;

const CategoryText = styled.span`
  font-size: 14px;
`;

export default TonicForm;
