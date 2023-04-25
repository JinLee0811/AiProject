import React, { useState } from 'react';
import styled from 'styled-components';

const MyPageProfileForm = () => {
  //   const [email, setEmail] = useState('');
  //   const [nickname, setNickName] = useState('');
  const DummyProfile = {
    email: 'user@gmail.com',
    nickname: '냐옹',
  };

  return (
    <>
      <Container>
        <ProfileForm>
          <Contents>{DummyProfile.email}</Contents>
          <Contents>{DummyProfile.nickname}</Contents>
          <button>진단받으러가기</button>
        </ProfileForm>
      </Container>
    </>
  );
};

export default MyPageProfileForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
`;

const ProfileForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  button {
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin-top: 80px;
  }
`;

const Contents = styled.div`
  font-size: 20px;
  margin-top: 20px;
`;
