import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { atom, useAtom } from 'jotai';

const fadeAtom = atom(true);

const Navbar = () => {
  const [fadeToggle, setFadeToggle] = useAtom(fadeAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeToggle((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [setFadeToggle]);

  return (
    <>
      <Nav>
        <StyledLink to='/'>
          <LogoBox>
            <LogoImage src='https://cdn-icons-png.flaticon.com/512/5186/5186886.png' />
            <Logo>CropDoctor</Logo>
          </LogoBox>
        </StyledLink>

        <Menu>
          <StyledLink to='/service'>
            <MenuItem1>진단하기</MenuItem1>
          </StyledLink>
          <StyledLink to='/board'>
            <MenuItem>크롭토크</MenuItem>
          </StyledLink>
          <StyledLink to='/nutrition'>
            <MenuItem>크롭영양제</MenuItem>
          </StyledLink>
          <StyledLink to='/admin/user'>
            <MenuItem>admin</MenuItem>
          </StyledLink>
        </Menu>
        <Menu>
          <StyledLink to='/mypage'>
            <MenuItem>마이페이지</MenuItem>
          </StyledLink>
          <StyledLink to='/login'>
            <MenuItem>로그인</MenuItem>
          </StyledLink>
          <StyledLink to='/signup'>
            <MenuItem>회원가입</MenuItem>
          </StyledLink>
        </Menu>
      </Nav>
      <NavWrite>
        <NavWriteTag fadeIn={fadeToggle}>
          {fadeToggle
            ? '당신의 작물을 진단하세요👨‍🌾'
            : '당신의 작물의 성장일지를 기록하세요👨‍🌾'}
        </NavWriteTag>
      </NavWrite>
    </>
  );
};

const LogoBox = styled.div`
  display: flex;
  align-items: center;
`;
const LogoImage = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 0px;
`;

const Nav = styled.nav`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #e5e8e7;
  margin: 0;
`;
const fadeInOut = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
`;
const NavWrite = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  background-color: #759683;
  padding: 10px;
  margin-bottom: 0px;
  border-bottom: 1px solid #e5e8e7;
  font-size: 17px;
  transition: color 0.5s ease-in-out;
`;
const NavWriteTag = styled.p`
  color: white;
  /* animation: ${fadeInOut} 4s ease-in-out infinite; */
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #759683;
  margin: 0;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const MenuItem1 = styled.li`
  margin-right: 20px;
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  color: #4ba888;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
const MenuItem = styled.li`
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

const SearchInput = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 1rem;
  padding: 5px;
  margin: 0 10px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Navbar;
