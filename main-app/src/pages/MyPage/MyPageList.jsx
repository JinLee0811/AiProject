import React from 'react';
import styled from 'styled-components';
import ProfileForm from '../../components/MyPage/ProfileForm';
import HeaderForm from '../../components/MyPage/HeaderForm';

const MyPageList = () => {
  return (
    <MyPageListForm>
      <HeaderForm />
      <ProfileForm />
    </MyPageListForm>
  );
};

const MyPageListForm = styled.div``;

export default MyPageList;
