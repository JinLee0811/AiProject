import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NutritionPage1 = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  
  return (
    <>
    <Form>
    <Box>
        <H2>광합성 촉진제</H2>
          <NutritionImage src='https://cdn-pro-web-211-225.cdn-nhncommerce.com/ecotech1004_godomall_com/data/goods/19/08/33/1000001106/1000001106_detail_0100.jpg' alt='asd' />
          <StyledLink to='/nutritionpage1'>
            </StyledLink>
        </Box>
        <Text>
          <H1>🌱엽록소 향상 광합성촉진제</H1>
            <H3>
            ✔️엽록소 향상, 광합성작용 최대화<br/>
            ✔️혜택가   :  18,180원<br/>
            ✔️브랜드   :  유일<br/>
            ✔️제조사   :  유일<br/>
            ✔️규격     :  500ml<br/>
            </H3>
          </Text>
      </Form>
   </>     
  );
};

const Form = styled.div`
  position : absolute;
  left : 55%;
  top : 50%;
  transform : translate(-50%, -50%);
`;

const Box = styled.div`
  font-size: 15px;
  display: inlin-block;
  border: 1px solid #d9d9d9;
  width: 350px;
  height: 360px;
  margin: -200px -230px;
  margin-top: 100px;
  margin-bottom: 0px;
`;

const Text = styled.div`
    margin: 0px -200px;

`;

const H1 = styled.h1`
  font-size: 20px;
  margin: 5px 20px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const H2 = styled.h1`
  font-size: 20px;
  margin: -50px 10px;
  margin-bottom: 30px;
`;
const H3 = styled.div`
  font-size: 15px;
  margin: 15px -20px;
`;

const NutritionImage = styled.img`
  height: 300px;
  width: 300px;
  margin: 30px 40px;
`;

  const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default NutritionPage1;