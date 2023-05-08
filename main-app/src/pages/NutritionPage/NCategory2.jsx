import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



function NCategory2() {
  const [users, setUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  return (
    <>
      <Form>
      <Box>
          <NutritionImage src='https://plantprotector.co.kr/shopimages/lycotoma/0260670000412.jpg?1656449084' alt='asd' />
          <StyledLink to='/nutritionpage1'>
            <H1>🌱대유비타겔</H1>
          </StyledLink>
          <H3>
          ✔️생장시기별 미량요소가 작용해 생리적 낙화 예방<br/>
          ✔️양분 결핍에서 온는 생리장해 예방<br/>
          ✔️비타민과 미량요소 작용으로 식물의 면역령 상승<br/>
          </H3>
        </Box>
        <Box>
          <NutritionImage src='https://cdn-pro-web-211-225.cdn-nhncommerce.com/ecotech1004_godomall_com/data/goods/22/08/35/1000005128/1000005128_detail_023.jpg' alt='asd' />
          <StyledLink to='/nutritionpage1'>
            <H1>🌿도프 뿌리나칼</H1>
          </StyledLink>
          <H3>
            ✔️천연 물질과 영양분인 칼슘을 동시에 공급<br/>
            ✔️코르크화를 막아 희고 가는 잔뿌리가 왕성<br/>
            ✔️광생장점 기형, 어깨 빠짐 등을 예방하고 해소<br/>
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

export default NCategory2;
