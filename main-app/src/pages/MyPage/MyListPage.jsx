import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const MyListPage = () => {
  return (
    <MyListWrapper>
      <HeaderForm />
      <MainForm>
        <ProfileForm />
      </MainForm>
    </MyListWrapper>
  );
};

const MyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainForm = styled.div`
  display: flex;
  flex-direction: row;
`;

export default MyListPage;
