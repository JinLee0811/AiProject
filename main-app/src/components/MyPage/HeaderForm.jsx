import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderForm = () => {
  return (
    <Nav>
      <Menu>
        <StyledLink to='/service'>
          <MenuBar>진단 목록</MenuBar>
        </StyledLink>
        <StyledLink to=''>
          <MenuBar>나의 게시물</MenuBar>
        </StyledLink>
        <StyledLink to=''>
          <MenuBar>나의 정보</MenuBar>
        </StyledLink>
        <StyledLink to=''>
          <MenuBar>회원 탈퇴</MenuBar>
        </StyledLink>
      </Menu>
    </Nav>
  );
};

const Nav = styled.nav`
  padding-bottom: 20px;
`;

const Menu = styled.nav`
  display: flex;

  justify-content: center;
  align-items: center;
  width: 500px;
  height: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const MenuBar = styled.div`
  padding-left: 10px;
  margin-right: 20px;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: black;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default HeaderForm;
