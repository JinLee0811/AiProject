import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const MyPageSingOut = () => {
  return (
    <>
      <ProfileForm />
      <HeaderForm />
      <SingOutForm>
        <h1>정말로 탈퇴하시겠습니까?</h1>
        <div>비밀번호</div>
        <div>비밀번호 확인</div>
      </SingOutForm>
    </>
  );
};

const SingOutForm = styled.div``;

export default MyPageSingOut;
