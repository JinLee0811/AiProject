import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

const MainPage = () => {
  const [ref1, inView1] = useInView({
    threshold: 0.5,
  });

  const [ref2, inView2] = useInView({
    threshold: 0.5,
  });

  const [ref3, inView3] = useInView({
    threshold: 0.5,
  });
  return (
    <>
      {/* <Carousel /> */}
      <Section ref={ref1} inView={inView1}>
        <Image src='https://post-phinf.pstatic.net/MjAyMDEwMTJfMjE1/MDAxNjAyNDg4NDcxMjU0.tP5xJjijMM6f34AlMu9cNxJMoCtY0988OsBiP1Q2LlAg.tYlm1RnALI28XqQeLgDBws_3jxatRtGA-McadL3VDUYg.PNG/image.png?type=w1200' />
        <ContentsBox>
          <Title>작물진단 서비스</Title>
          <Contents>여러분의 작물을 진단하고</Contents>
          <Contents>처방전을 제공합니다.</Contents>
          <StyledLink to={'/service'}>
            <Button>진단하러 가기 👉 </Button>
          </StyledLink>
        </ContentsBox>
      </Section>
      <Section ref={ref2} inView={inView2}>
        <ContentsBox>
          <Title>성장일지 서비스</Title>
          <Contents>여러분들의 작물의</Contents>
          <Contents>성장 모습을 기록하세요.</Contents>
          <StyledLink to={'/board'}>
            <Button>작성하러 가기 📝</Button>
          </StyledLink>
        </ContentsBox>
        <Image src='https://openimage.interpark.com/goods_image_big/2/1/8/3/10217262183_l.jpg' />
      </Section>
      <Section ref={ref3} inView={inView3}>
        <Image src='https://blog.kakaocdn.net/dn/bEL0oC/btrzhri7dB6/0zszgyJjmWuPfh5nAZRqj1/img.jpg' />
        <ContentsBox>
          <Title>영양제 소개 서비스</Title>
          <Contents>여러분의 작물 상태에 알맞은</Contents>
          <Contents>영양제를 추천합니다.</Contents>
          <StyledLink to={'/service'}>
            <Button>구경하러 가기 🔎</Button>
          </StyledLink>
        </ContentsBox>
      </Section>
    </>
  );
};
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const Button = styled.button`
  background-color: #759683;
  width: 200px;
  height: 40px;
  font-weight: 700;
  font-size: 17px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px;
  border-radius: 100px;
  color: white;
  :hover {
    background-color: green;
    color: white;
    cursor: pointer;
  }
`;
const Section = styled.div`
  position: relative;
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.inView ? '1' : '0')};
  transition: opacity 0.9s ease-in-out;
`;
const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px;
`;
const Title = styled.h2`
  color: green;
  font-size: 50px;
  margin: 10px;
`;
const Contents = styled.p`
  font-size: 30px;
  margin: 0px;
`;

const Image = styled.img`
  width: 500px;
  height: 500px;
  border-radius: 22px;
`;

export default MainPage;
