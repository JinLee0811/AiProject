import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCreateNutrition, useUpdateNutrition } from '../../API/NutritionApi';
import { useAtomValue } from 'jotai';
import { selectedNutritionAtom } from '../../Atoms/NutritionAtom';
// import { useGetCategories } from '../../API';
// import { categoryAtom } from '../../Atoms/CategoryAtom';
// 카테고리 박스에 카테고리 부르기

function TonicForm() {
  const selectedNutrition = useAtomValue(selectedNutritionAtom);
  const [name, setName] = useState(selectedNutrition?.name || '');
  const [shortDescription, setShortDescription] = useState(
    selectedNutrition?.short_description || ''
  );
  const [description, setDescription] = useState(
    selectedNutrition?.description || ''
  );
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    selectedNutrition?.categories.name || []
  );
  const [previewImage, setPreviewImage] = useState(
    selectedNutrition?.imageUrl || ''
  );

  const { mutate: createNutrition, isLoading: isCreating } =
    useCreateNutrition();
  const { mutate: updateNutrition, isLoading: isUpdating } =
    useUpdateNutrition();

  useEffect(() => {
    // API로부터 카테고리를 가져옵니다.
    fetch('/tonics/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleReset = () => {
    setName('');
    setShortDescription('');
    setDescription('');
    setImage(null);
    setSelectedCategories([]);
    setPreviewImage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('short_description', shortDescription);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('categories', selectedCategories.join(','));

      if (selectedNutrition) {
        await updateNutrition({ id: selectedNutrition.id, data: formData });
      } else {
        await createNutrition(formData);
      }

      handleReset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='category'>카테고리</Label>
      <CategoryBox>
        {categories.map((category) => (
          <CategoryLabel key={category}>
            <CategoryInput
              type='checkbox'
              id={category}
              name={category.name}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            <CategoryText htmlFor={category}>{category}</CategoryText>
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
      <Input1 id='image' type='file' onChange={handleImageChange} />
      {previewImage && <PreviewImage src={previewImage} alt='uploaded image' />}
      <Button type='submit' disabled={isCreating || isUpdating}>
        {isCreating || isUpdating ? '등록 중...' : '등록하기'}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;

  flex-direction: column;
  margin: 0 auto;
  max-width: 400px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
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
  align-items: center;
  justify-content: left;
  padding: 10px;
  width: auto;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  height: 40px;
`;

const CategoryLabel = styled.label`
  display: flex;
  margin: 3px;
  align-items: center;
  flex-direction: center;
`;

const CategoryInput = styled.input`
  margin-right: 5px;
`;

const CategoryText = styled.span`
  font-size: 14px;
`;

export default TonicForm;
