import React, { useState } from 'react';
import styled from 'styled-components';
import { useCreateNutrition, useUpdateNutrition } from '../../API/NutritionApi';
import { useAtomValue } from 'jotai';
import { selectedNutritionAtom } from '../../Atoms/NutritionAtom';

function TonicForm() {
  const selectedNutrition = useAtomValue(selectedNutritionAtom);
  const [name, setName] = useState(selectedNutrition?.name || '');
  const [shortDescription, setShortDescription] = useState(
    selectedNutrition?.shortDescription || ''
  );
  const [description, setDescription] = useState(
    selectedNutrition?.description || ''
  );
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(selectedNutrition?.category || '');
  const [previewImage, setPreviewImage] = useState(
    selectedNutrition?.imageUrl || ''
  );

  const { mutate: createNutrition, isLoading: isCreating } =
    useCreateNutrition();
  const { mutate: updateNutrition, isLoading: isUpdating } =
    useUpdateNutrition();

  const handleReset = () => {
    setName('');
    setShortDescription('');
    setDescription('');
    setImage(null);
    setCategory('');
    setPreviewImage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('shortDescription', shortDescription);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('category', category);

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

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='category'>카테고리</Label>
      <Input
        id='category'
        type='text'
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />

      <Label htmlFor='product-name'>영양제 이름</Label>
      <Input
        id='product-name'
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
      <Input id='image' type='file' onChange={handleImageChange} />
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
  max-width: 600px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  padding: 15px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #759683;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: green;
  }
`;

const PreviewImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  object-position: center;
  box-shadow: 0 0 10px #759683;
`;

export default TonicForm;
