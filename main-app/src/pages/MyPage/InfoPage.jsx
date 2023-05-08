import React, { useState } from 'react';
import styled from 'styled-components';

const Info = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 서버로 데이터 전송하는 로직 구현
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ProfileImageWrapper>
        <ProfileImage
          src={
            profileImage
              ? URL.createObjectURL(profileImage)
              : 'https://via.placeholder.com/150'
          }
        />
        <ProfileImageInput
          type='file'
          name='profileImage'
          onChange={handleImageChange}
        />
        <ProfileImageLabel>프로필 등록 및 변경</ProfileImageLabel>
      </ProfileImageWrapper>
      <FormGroup>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='name'>이름</label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='name'>닉네임</label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button type='submit'>수정하기</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const ProfileImageLabel = styled.label`
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 110px;
  height: 30px;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  font-size: 0.8rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-bottom: 5px;
  label {
    margin-bottom: 5px;
    font-size: 1rem;
  }

  input {
    font-size: 15px;
    font-weight: 400;
    letter-spacing: -0.6px;
    line-height: 18px;
    text-indent: 18px;
    color: #808080;
    text-decoration: none solid rgb(128, 128, 128);
    background-color: white;
    display: inline-block;
    height: 40px;
    width: 300px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    cursor: text;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 40px;
  background-color: #759783;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: green;
  }
`;

export default Info;
