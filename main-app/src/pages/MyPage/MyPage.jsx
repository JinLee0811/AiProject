import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const Mypage = () => {
  return (
    <>
      <MyPageWrapper>
        <HeaderForm />
        <ProfileForm />
        <MyBoardForm>나의 게시물</MyBoardForm>
      </MyPageWrapper>
    </>
  );
};

const MyPageWrapper = styled.div`
  display: flex;
`;

const MyBoardForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export default Mypage;
