import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import { Auth } from '../../API/authApi';
import { useNavigate } from 'react-router-dom';

const fadeAtom = atom(true);
const sentences = [
  '👨‍🌾당신의 작물을 진단하세요👨‍🌾',
  '👨‍🌾당신의 작물의 성장일지를 기록하세요👨‍🌾',
  '👨‍🌾어떤 작물을 기르고 계신가요?👨‍🌾',
  '👨‍🌾작물의 성장은 이루어지고 있나요? 성장과정을 공유하세요👨‍🌾',
  // '작물에 필요한 영양분을 충분히 공급하고 계신가요? 작물의 건강을 위해 중요합니다👨‍🌾',
  // '당신의 작물에게 부여할 별명을 지어보는 것은 어떨까요?👨‍🌾',
];
const Navbar = () => {
  const [fadeToggle, setFadeToggle] = useAtom(fadeAtom);
  const { logout, isLoggedIn, isAdmin } = Auth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeToggle((prev) => (prev + 1) % sentences.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [setFadeToggle]);

  function handleLogoutClick() {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/login');
    }
  }

  function onClickSearch() {
    alert(isAdmin);
  }

  return (
    <>
      <StyledLink to='/'>
        <MenuItem>
          <NavLogo>
            <LogoImage src='https://cdn-icons-png.flaticon.com/512/5186/5186886.png' />
            <Logo>CropDoctor</Logo>
          </NavLogo>
        </MenuItem>
      </StyledLink>
      <Nav1>
        <MenuIcon onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </MenuIcon>
        <MenuLinks isOpen={isOpen}>
          <LeftMenu>
            <StyledLink to='/'>
              <MenuItem>
                <span class='material-symbols-outlined'>home</span>
              </MenuItem>
            </StyledLink>
            <StyledLink to='/service'>
              <MenuItem1>
                {/* <span class='material-symbols-outlined'>image_search</span> */}
                <span>진단하기</span>
              </MenuItem1>
            </StyledLink>
            <StyledLink to='/nutrition'>
              <MenuItem>
                {/* <span class='material-symbols-outlined'>medication</span> */}
                <span>스토어</span>
              </MenuItem>
            </StyledLink>
            <StyledLink to='/board'>
              <MenuItem>
                {/* <span class='material-symbols-outlined'>chat</span> */}
                <span>커뮤니티</span>
              </MenuItem>
            </StyledLink>
          </LeftMenu>
          <RightMenu>
            {isLoggedIn ? (
              <>
                <StyledLink to='/mypage/solutionList'>
                  <MenuItem>
                    <span class='material-symbols-outlined'>person</span>
                  </MenuItem>
                </StyledLink>
                {isAdmin && (
                  <StyledLink to='/admin/user'>
                    <MenuItem>
                      <span class='material-symbols-outlined'>
                        manage_accounts
                      </span>
                    </MenuItem>
                  </StyledLink>
                )}
                <MenuItem onClick={handleLogoutClick}>
                  <span class='material-symbols-outlined'>logout</span>
                </MenuItem>
              </>
            ) : (
              <>
                <StyledLink to='/login'>
                  <MenuItem>
                    <span class='material-symbols-outlined'>person</span>
                  </MenuItem>
                </StyledLink>
              </>
            )}
            <MenuItem>
              {/* <SearchBox>
                <SearchInput type='text' placeholder='Crop을 검색하세요' />
                <SearchButton onClick={onClickSearch}>
                  <span class='material-symbols-outlined'>search</span>
                </SearchButton>
              </SearchBox> */}
            </MenuItem>
          </RightMenu>
          <CloseButton onClick={closeMenu}>X</CloseButton>
        </MenuLinks>
      </Nav1>
      <NavWrite>
        <NavWriteTag>{sentences[fadeToggle]}</NavWriteTag>
      </NavWrite>
    </>
  );
};

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 3rem;
  background-color: transparent;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;
const Nav1 = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 1rem;
`;

const MenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    cursor: pointer;

    div {
      width: 2rem;
      height: 0.25rem;
      background-color: #333;
      margin-bottom: 0.5rem;
      border-radius: 2px;
    }
  }
`;

const MenuLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  color: white;
  background-color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 3rem;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 90%;
    transition: all 0.3s ease-in-out;
    background-color: white;
    padding: 2rem 1rem;
    text-align: center;
  }
`;

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
    transform: translateY(0px);
  }
  
`;
const NavWrite = styled.div`
  width: 100%;
  height: 25px;
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
  @media (max-width: 768px) {
    display: none;
  }
`;
const NavWriteTag = styled.p`
  color: white;
  animation: ${fadeInOut} 3s ease-in-out infinite;
`;

const Logo = styled.h1`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: green;
  margin: 0;
`;

const LeftMenu = styled.ul`
  list-style: none;
  display: flex;
  background-color: white;
  align-items: center;
  margin-right: 0;
  padding: 0;
  @media (max-width: 769px) {
  }
`;
const RightMenu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin-left: 530px;
  background-color: white;
  padding: 0;
  @media (max-width: 998px) {
    margin-left: 0px;
  }
`;

const MenuItem1 = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  margin-right: 20px;
  font-size: 18px;
  font-weight: 900;
  line-height: 24px;
  color: green;
  cursor: pointer;
  &:hover {
    color: #589873;
  }
`;
const MenuItem = styled.li`
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  color: black;
  cursor: pointer;
  &:hover {
    color: green;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 20px;
  padding: 8px;
  @media (max-width: 998px) {
    width: 130px;
  }
`;

const SearchInput = styled.input`
  outline: none;
  letter-spacing: -0.6px;
  flex: 1;
  height: 35px;
  border: 0px;
  font-size: 13px;
  background-color: #f2f2f2;
  color: #333;
  &::placeholder {
    color: #bbb;
  }
  @media (max-width: 998px) {
    width: 100px;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
  @media (max-width: 998px) {
    margin-left: 8px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Navbar;
