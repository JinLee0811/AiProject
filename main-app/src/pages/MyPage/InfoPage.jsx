import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { userAtom } from '../../Atoms/TokenAtom';
import { useMutation, useQueryClient } from 'react-query';
import { serverWithToken } from '../../config/AxiosRequest';

const Info = () => {
  const [user, setUser] = useAtom(userAtom);
  const [nickName, setNickName] = useState(user?.nickname || '');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await serverWithToken.get('/user/profile');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nickName') {
      setNickName(value);
    }
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const queryClient = useQueryClient();
  const updateUserNickName = useMutation(async (data) => {
    const { nickname } = data;
    const response = await serverWithToken.put('/user/nickname', { nickname });
    return response.data;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (window.confirm('정말 닉네임을 변경하시겠습니까?')) {
      try {
        await updateUserNickName.mutateAsync(
          {
            nickname: nickName,
          },
          {
            onSuccess: (data) => {
              setUser(data);
              setNickName(data.nickname);
              queryClient.invalidateQueries('user');
              alert('닉네임이 변경 되었습니다');
            },
          }
        );
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ProfileImageWrapper>
        <ProfileImage src='https://img.freepik.com/premium-vector/cute-funny-camomile-flower-face-vector-doodle-line-cartoon-kawaii-character-illustration-icon-camomile-flower-cartoon-mascot-logo-concept_92289-3133.jpg' />
        <ProfileImageInput
          type='file'
          name='profileImage'
          onChange={handleImageChange}
        />
        <ProfileImageLabel>프로필 이미지</ProfileImageLabel>
      </ProfileImageWrapper>
      <FormGroup>
        <label htmlFor='email'>이메일</label>
        <input type='email' name='email' value={user?.email} disabled />
      </FormGroup>
      <FormGroup>
        <label htmlFor='name'>닉네임</label>
        <input
          type='text'
          name='nickName'
          value={nickName}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button type='submit'>닉네임 변경</Button>
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
  margin-bottom: 20px;
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
  margin-top: 0px;
  margin-bottom: 15px;
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
