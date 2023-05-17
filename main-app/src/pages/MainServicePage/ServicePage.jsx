import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { useGetReplyComment } from '../../API/CommentApi';

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
  const [ref4, inView4] = useInView({
    threshold: 0.5,
  });
  const [ref5, inView5] = useInView({
    threshold: 0.5,
  });

  return (
    <>
      <Background>
        <Section id='section1' ref={ref1} inView={inView1}>
          <ContentsBox>
            <Title>진단 사용 설명서</Title>
            <Contents>스크롤을 내려 설명을 참고하여</Contents>
            <Contents>정확한 진단을 받으세요!</Contents>
            <Contents1>이미 사용법을 아신다면 Click!</Contents1>
            <a href='/service/upload'>
              <Button>바로 진단하러 가기</Button>
            </a>
          </ContentsBox>
        </Section>
      </Background>

      {/* <ContentsBox>
        <Link to='section2' smooth={true} duration={500}>
          <Arrow>⬇</Arrow>
        </Link>
      </ContentsBox> */}

      <Section id='section2' ref={ref2} inView={inView2}>
        <ContentsBox>
          <Title>정확도 올리기👍</Title>
          <Contents>진단을 원하는 부분을</Contents>
          <Contents>예시와 같이 잘 보이게 찍어주세요.</Contents>
        </ContentsBox>
        <Image src='https://mblogthumb-phinf.pstatic.net/20140518_140/trade004_1400379779795lE3PW_JPEG/tomatoes1.jpg?type=w2' />
      </Section>
      {/* <ContentsBox>
        <Link to='section3' smooth={true} duration={500}>
          <Arrow>⬇</Arrow>
        </Link>
      </ContentsBox> */}
      <Section id='section3' ref={ref3} inView={inView3}>
        <Image src='https://mblogthumb-phinf.pstatic.net/MjAxODA3MDVfMTU0/MDAxNTMwNzk3NDA4OTg5._5PJ2i3oH9xQKZgLKvjd86GpgwxS4krCL5Y61iZ4sUEg.ZPcVQYEkQZq6Z1lNMLquEKfMvdAXp7N8CY7AfDClEc8g.JPEG.jaun000/DSC05573.JPG?type=w800' />
        <ContentsBox>
          <Title>너무 멀어요😭</Title>
          <Contents>예시의 이미지는 거리가 멀어서</Contents>
          <Contents>올바른 진단을 내리기 어려워요</Contents>
        </ContentsBox>
      </Section>
      {/* <ContentsBox>
        <Link to='section4' smooth={true} duration={500}>
          <Arrow>⬇</Arrow>
        </Link>
      </ContentsBox> */}
      <Section id='section4' ref={ref4} inView={inView4}>
        <ContentsBox>
          <Title>종류가 많아요👨‍🌾</Title>
          <Contents>너무 많은 종류의 작물은</Contents>
          <Contents>정확한 진단을 내리기 어려워요</Contents>
        </ContentsBox>
        <Image src='https://post-phinf.pstatic.net/MjAxOTAyMDdfMTcg/MDAxNTQ5NTE5OTk1Mzcz.j24HUHXSXxelS3zfMJCZvA2gP3rQomiecvDBveZsqoYg.PAfhZfA0XBFAhmcY-ZvUEZ33UIGnsD7Km60pgFwDSRog.JPEG/GettyImages-892204746.jpg?type=w1200' />
      </Section>
      {/* <ContentsBox>
        <Link to='section5' smooth={true} duration={500}>
          <Arrow>⬇</Arrow>
        </Link>
      </ContentsBox> */}
      <Section id='section5' ref={ref5} inView={inView5}>
        <ContentsBox>
          <Title>작물을 진단해 볼까요?</Title>
          <Contents>위의 설명을 참고하여</Contents>
          <Contents>올바른 방법으로 이미지를 업로드 하여 보세요!</Contents>
          <a href='/service/upload'>
            <Button1>진단하러 가기</Button1>
          </a>
        </ContentsBox>
      </Section>
    </>
  );
};
const Background = styled.div`
  margin-top: 0px;
  position: relative;
  height: 100vh;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Arrow = styled.button`
  display: block;
  margin-top: 0px;
  font-size: 80px;
  color: #a6d0a6a1;
  background-color: white;
  border: none;
  :hover {
    cursor: pointer;
    color: green;
  }
`;
const Button = styled.button`
  background-color: #759683;
  width: 200px;
  height: 40px;
  font-weight: 700;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: -0.6px;
  border: 2px;
  border-radius: 100px;
  color: white;
  :hover {
    background-color: green;
    color: white;
    cursor: pointer;
  }
`;
const Button1 = styled.button`
  background-color: #759683;
  width: 200px;
  height: 40px;
  font-weight: 700;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: none;
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
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.inView ? '1' : '0')};
  transition: opacity 0.9s ease-in-out;
  @media (max-width: 968px) {
    flex-direction: column;
  }
`;
const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px;

  a {
    text-decoration: none;
  }
`;

const Title = styled.h2`
  color: green;
  font-size: 50px;
  margin: 10px;
  @media (max-width: 968px) {
    font-size: 35px;
  }
`;
const Contents = styled.p`
  font-size: 30px;
  margin: 0px;
  @media (max-width: 968px) {
    font-size: 20px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;
const Contents1 = styled.p`
  font-size: 15px;
  margin-top: 20px;
  margin-bottom: 5px;
  color: red;
  @media (max-width: 968px) {
    font-size: 15px;
    margin-top: 20px;
    margin-bottom: 5px;
  }
`;

const Image = styled.img`
  display: flex;
  width: 500px;
  height: 500px;
  border-radius: 22px;
  @media (max-width: 968px) {
    width: 350px;
    height: 350px;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default MainPage;
