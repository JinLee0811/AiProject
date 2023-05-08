import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



function NCategory3() {
  const [users, setUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  return (
    <>
      <Form>
        <Box>
          <NutritionImage src='https://cdn-pro-web-211-225.cdn-nhncommerce.com/ecotech1004_godomall_com/data/goods/22/08/33/1000005001/1000005001_detail_055.jpg' alt='asd' />
          <StyledLink to='/nutritionpage1'>
            <H1>🍏도프럭스</H1>
          </StyledLink>
          <H3>
          ✔️단백질 합성으로 식물의 안정적 성장에 도움<br/>
          ✔️광합성 합성을 촉진하고 신진대사 촉진<br/>
          ✔️킬레이트 작용으로 양분의 유실을 막고, 흡수 촉진<br/>
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

export default NCategory3;
