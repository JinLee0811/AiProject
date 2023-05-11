import React from 'react';
import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  return (
    <Aside>
      <ul>
        <li>
          <StyledLink to='user' active={location.pathname === '/admin/user'}>
            사용자 관리
          </StyledLink>
        </li>
        <li>
          <StyledLink to='Board' active={location.pathname === '/admin/Board'}>
            게시판 관리
          </StyledLink>
        </li>
        <li>
          <StyledLink
            to='Nutrition'
            active={location.pathname === '/admin/Nutrition'}>
            영양제 관리
          </StyledLink>
        </li>
        <li>
          <StyledLink
            to='AddNutrition'
            active={location.pathname === '/admin/AddNutrition'}>
            영양제 등록
          </StyledLink>
        </li>
        <li>
          <StyledLink
            to='Category'
            active={location.pathname === '/admin/Category'}>
            카테고리 관리
          </StyledLink>
        </li>
      </ul>
    </Aside>
  );
}

function AdminPage() {
  return (
    <Container>
      <Sidebar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Container>
  );
}
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.active ? 'green' : 'black')};
`;

const Container = styled.section`
  display: flex;
  flex-direction: row;
  width: 150vh;
  @media (max-width: 998px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }
`;

const MainContainer = styled.section`
  flex: 1;
  padding: 20px;
  font-size: 1.2rem;
  overflow: scroll;
`;

const SideBarProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 100px;
  @media (max-width: 998px) {
    display: none;
    background-color: #fff;
  }
`;

const Aside = styled.aside`
  width: 200px;
  position: relative;
  top: 0;
  left: 0;
  margin-left: 0px;

  ul {
    list-style: none;
    text-decoration: none;
    margin-top: 40px;

    & li {
      margin-bottom: 2rem;
      cursor: pointer;
      font-size: 1rem;
    }

    @media (max-width: 998px) {
      display: flex;
      padding-inline-start: 0;
      li {
        padding-right: 1rem;
        margin: 0;
      }
    }
  }

  @media (max-width: 998px) {
    display: flex;
    height: 90px;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    position: relative;
    margin-left: 0px;
    top: 0;
    left: 0;
  }
`;

export default AdminPage;
