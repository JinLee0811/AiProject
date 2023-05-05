import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



function NCategory1() {
  const [users, setUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  return (
    <>
      <Form>
        <Box>
          <NutritionImage src='https://cdn-pro-web-211-225.cdn-nhncommerce.com/ecotech1004_godomall_com/data/goods/19/08/33/1000001106/1000001106_detail_0100.jpg' alt='asd' />
          <StyledLink to='/nutritionpage1'>
            <H1>🌱엽록소 향상 광합성촉진제</H1>
          </StyledLink>
          <H3>
          ✔️미국의 Grow More Inc.에서 수입한 광합성 촉진<br/>
          ✔️잎의 엽록소 형성향상과 광합성 작용을 활성화<br/>
          ✔️수정 후의 발육향상과 조기낙과를 감소<br/>
          </H3>
        </Box>
        <Box>
          <NutritionImage src='https://cdn-pro-web-211-225.cdn-nhncommerce.com/ecotech1004_godomall_com/data/goods/20/06/26/1000002305/1000002305_detail_048.png' alt='asd' />
          <StyledLink to='/nutritionpage1'>
            <H1>🌿누보 그린라이트</H1>
          </StyledLink>
          <H3>
            ✔️가리,고토 성분 함유<br/>
            ✔️100% 수용성으로 불순물이 없어 높은 용해력<br/>
            ✔️광흡수를 향상시켜 고품질 농산물 생산 가능<br/>
          </H3>
        </Box>
        <Box>
          <NutritionImage src='https://cdn-pro-web-211-225.cdn-nhncommerce.com/ecotech1004_godomall_com/data/goods/20/12/50/1000002950/1000002950_detail_051.jpg' alt='asd' />
          <StyledLink to='/nutritionpage1'>
            <H1>🌞썬모아플러스</H1>
          </StyledLink>
          <H3>
            ✔️나노기술로 개발하여 인체에 무해한 친환경<br/>
            ✔️잎은 균형있고 화사하게 성장할 수 있도록 도움<br/>
            ✔️식물의 엽색과 햇빛을 동시에 공급<br/>
          </H3>
        </Box>
        <Box>
          <NutritionImage src='https://cdn-pro-web-211-225.cdn-nhncommerce.com/ecotech1004_godomall_com/data/goods/20/12/52/1000003184/1000003184_detail_058.png' alt='asd' />
          <StyledLink to='/nutritionpage1'>
            <H1>💪대유 잎짱짱</H1>
          </StyledLink>
          <H3>
            ✔️잎을 두껍고 튼튼해하게 만드는 친황경적 제품<br/>
            ✔️광합성능력 획기적 증대, 각종 생리장해 예방<br/>
            ✔️잎의 탄수화물 생산량을 증대시며 품질 향상<br/> 
          </H3>
        </Box>
      </Form>
    </>
  );
};

const Form = styled.div`
  float: center;
  align-items: center;
  margin: -20px 60px;
`;

const Box = styled.div`
  font-size: 15px;
  display: inlin-block;
  float: left;
  border: 1px solid #d9d9d9;
  width: 350px;
  height: 360px;
  padding: 6px;
  margin: 100px 70px;
  margin-top: 0px;
  margin-bottom: 20px;
`;

const H1 = styled.h1`
  font-size: 20px;
  margin: 5px 20px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const H3 = styled.div`
  font-size: 15px;
  margin: 15px 20px;
`;

const NutritionImage = styled.img`
  height: 200px;
  width: 200px;
  margin: 5px 80px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default NCategory1;
