import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Box>
      <BoxLogo>
        <LogoImage src='https://cdn-icons-png.flaticon.com/512/5186/5186886.png' />
        <Logo>CropDoctor</Logo>
      </BoxLogo>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href='#'>팀장 : 이정진</FooterLink>
            <FooterLink href='#'>작물 진단 서비스</FooterLink>
          </Column>
          <Column>
            <Heading>FE</Heading>
            <FooterLink href='#'>이정진</FooterLink>
            <FooterLink href='#'>탁효창</FooterLink>
          </Column>
          <Column>
            <Heading>BE</Heading>
            <FooterLink href='#'>김은수</FooterLink>
            <FooterLink href='#'>김수정</FooterLink>
          </Column>
        </Row>
      </Container>
      <CompanyInfo>© 2023 CropDoctor, We did!</CompanyInfo>
    </Box>
  );
};

const Box = styled.div`
  margin-top: 220px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 100%;
  height: 300px;
  @media (max-width: 1000px) {
  }
`;
const CompanyInfo = styled.div`
  display: flex;
  justify-content: center;
  font-size: 12px;
  margin-top: 40px;
`;
const Logo = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: green;
  margin: 0;
`;
const LogoImage = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 0px;
`;
const BoxLogo = styled.div`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 30px;
  margin-top: 15px;
  font-size: 17px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
  grid-gap: 50px;
  justify-content: center;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(115px, 1fr));
    grid-gap: 0px;
  }
`;

const FooterLink = styled.a`
  color: black;
  margin-bottom: 20px;
  font-size: 13px;
  text-decoration: none;

  &:hover {
    color: green;
    transition: 200ms ease-in;
  }
`;

const Heading = styled.p`
  font-size: 17px;
  color: black;
  margin-bottom: 40px;
  font-weight: bold;
`;
export default Footer;
