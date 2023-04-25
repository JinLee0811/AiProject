import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const MyPageData = () => {
  return (
    <>
      <MyPageWrapper>
        <HeaderForm />
        <ProfileForm />
        <MyDataForm>
          <Contents>이메일</Contents>
          <Contents>이름</Contents>
          <Contents>닉네임</Contents>
          <Contents>비밀번호</Contents>
          <Contents>비밀번호확인</Contents>
        </MyDataForm>
      </MyPageWrapper>
    </>
  );
};

const MyPageWrapper = styled.div``;

const MyDataForm = styled.div``;

const Contents = styled.div``;

export default MyPageData;
