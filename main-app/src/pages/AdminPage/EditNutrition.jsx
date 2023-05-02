import React, { useState } from 'react';
import styled from 'styled-components';
import useApiRequest from '../../API/useApi';
import axios from 'axios';
import { useAtom } from 'jotai';

function EditForm() {
  const [productName, setProductName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [image, setImage] = useState(null);

  const { isLoading, sendRequest } = useApiRequest();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('shortDescription', shortDescription);
      formData.append('longDescription', longDescription);
      formData.append('image', image);
      const response = await sendRequest('/api/products', 'post', formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='product-name'>영양제 이름</Label>
      <Input
        id='product-name'
        type='text'
        value={productName}
        onChange={(event) => setProductName(event.target.value)}
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
        value={longDescription}
        onChange={(event) => setLongDescription(event.target.value)}
      />

      <Label htmlFor='image'>이미지 업로드</Label>
      <Input id='image' type='file' onChange={handleImageChange} />

      <Button type='submit' disabled={isLoading}>
        {isLoading ? '수정 중...' : '수정하기'}
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

export default EditForm;
