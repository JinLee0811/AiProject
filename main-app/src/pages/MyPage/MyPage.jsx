import React from 'react';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const Mypage = () => {
  return (
    <MyPageWrapper>
      <ProfileForm />
      <MainForm>
        <HeaderForm />
        <MyBoardForm>
          <Contents></Contents>
          <Contents></Contents>
          <Contents></Contents>
        </MyBoardForm>
      </MainForm>
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const MyBoardForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 400px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 80%;
  height: 35px;
  margin: 10px;
`;

export default Mypage;
