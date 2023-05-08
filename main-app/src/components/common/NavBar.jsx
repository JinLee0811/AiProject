import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { atom, useAtom } from 'jotai';

const fadeAtom = atom(true);
const sentences = [
  '👨‍🌾당신의 작물을 진단하세요👨‍🌾',
  '👨‍🌾당신의 작물의 성장일지를 기록하세요👨‍🌾',
  '👨‍🌾어떤 작물을 기르고 계신가요?👨‍🌾',
  '👨‍🌾작물의 성장은 이루어지고 있나요? 성장과정을 공유하세요👨‍🌾',
  // '작물에 필요한 영양분을 충분히 공급하고 계신가요? 작물의 건강을 위해 중요합니다👨‍🌾',
  '👨‍🌾작물을 키우는데 궁금한 점이 있다면 언제든지 질문해주세요👨‍🌾',
  // '당신의 작물에게 부여할 별명을 지어보는 것은 어떨까요?👨‍🌾',
];
const Navbar = () => {
  const [fadeToggle, setFadeToggle] = useAtom(fadeAtom);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeToggle((prev) => (prev + 1) % sentences.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [setFadeToggle]);

  return (
    <>
      <NavLogo>
        <StyledLink to='/'>
          <LogoBox>
            <LogoImage src='https://cdn-icons-png.flaticon.com/512/5186/5186886.png' />
            <Logo>CropDoctor</Logo>
          </LogoBox>
        </StyledLink>
      </NavLogo>
      <Nav>
        <Menu>
          <StyledLink to='/'>
            <MenuItem>홈</MenuItem>
          </StyledLink>
          <StyledLink to='/service'>
            <MenuItem1>진단하기</MenuItem1>
          </StyledLink>
          <StyledLink to='/board'>
            <MenuItem>크롭토크</MenuItem>
          </StyledLink>
          <StyledLink to='/nutritionpage'>
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
          <SearchInput placeholder={'Crop을 검색하세요.'} />
        </Menu>
      </Nav>
      <NavWrite>
        <NavWriteTag>{sentences[fadeToggle]}</NavWriteTag>
      </NavWrite>
    </>
  );
};
const NavLogo = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  background-color: white;
  padding: 10px;
  margin-bottom: 0px;
  margin-top: 15px;
  font-size: 17px;
`;
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
  margin: 0px;
  min-width: 900px;
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
  padding: 5px;
  margin-right: 20px;
  font-size: 18px;
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
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: black;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  font-size: 12px;
  letter-spacing: -0.6px;
  line-height: 14.4px;
  text-decoration: none solid rgb(77, 77, 77);
  word-spacing: 0px;
  padding: 3px;
  width: 100px;
  margin: 0 5px;
  background-color: #f2f2f2;
  background-position: 0% 0%;
  color: #4d4d4d;
  &:focus {
    outline: none;
    border-bottom: 1px solid #000;
  }
  &::placeholder {
    font-size: 5px;
    color: #999;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Navbar;
