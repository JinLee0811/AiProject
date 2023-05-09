import React from 'react';
import styled from 'styled-components';
import { Outlet, NavLink } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  return (
    <Aside>
      <ul>
        <SideBarProfile>
          <Profile src='https://via.placeholder.com/150' />
          <ProfileText>돼지감자</ProfileText>
        </SideBarProfile>

        <li>
          <StyledLink
            to='solutionList'
            active={location.pathname === '/mypage/solutionList'}>
            진단 목록
          </StyledLink>
        </li>
        <li>
          <StyledLink to='info' active={location.pathname === '/mypage/info'}>
            나의 정보
          </StyledLink>
        </li>
        <li>
          <StyledLink
            to='signout'
            active={location.pathname === '/mypage/signout'}>
            회원 탈퇴
          </StyledLink>
        </li>
      </ul>
    </Aside>
  );
}

function MyPage() {
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
const Profile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin-bottom: 10px;
`;

const ProfileText = styled.div`
  font-size: 17px;
  width: 700px;
  font-weight: bold;
  margin-bottom: 70px;
  text-align: center;
`;

const Container = styled.section`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vh;
  margin-top: 1rem;
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
    justify-content: center;
    width: 100%;
    background-color: #fff;
  }
`;

export default MyPage;
