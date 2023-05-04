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
  color: ${(props) => (props.active ? 'red' : 'black')};
`;

const Container = styled.section`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vh;
  margin-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContainer = styled.section`
  flex: 1;
  padding: 40px;
  font-size: 1.2rem;
`;

const Aside = styled.aside`
  width: 150px;
  position: relative;
  top: 0;
  left: 0;
  border-right: 1px solid #ccc;

  ul {
    list-style: none;
    text-decoration: none;
    margin-top: 40px;

    & li {
      margin-bottom: 2rem;
      cursor: pointer;
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      display: flex;
      padding-inline-start: 0;
      li {
        padding-right: 1rem;
        margin: 0;
      }
    }
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #fff;
  }
`;

export default AdminPage;
