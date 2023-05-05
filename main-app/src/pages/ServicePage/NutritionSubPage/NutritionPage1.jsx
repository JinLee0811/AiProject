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
          <NutritionImage src='../components/image/Nutrition1.png' alt='asd' />
          <StyledLink to='/nutrition1'>
            <H1>그린이 친환경 식물영양제 </H1>
          </StyledLink>
          <H3>
            천연의 물질로 구성되어 있어 사용 후 완전 분해되기 때문에 사용후의
            수질, 토양환경 오염이 전무하며 인체 및 가축에 무해한 친환경 성분으로
            구성되어 있습니다.
          </H3>
        </Box>
      </Form>
    </>
  );
};

const Form = styled.div`
  position: absolute;
  display: block;
  float: center;
  align-items: center;
`;

const Box = styled.div`
  font-size: 15px;
  position: absolute;
  display: block;
  float: center;
  background-color: #d9d9d9;
  width: 300px;
  height: 300px;
  padding: 150px;
  margin: 0px 0px;
  margin-top: 0px;
  margin-bottom: 00px;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 20px;
  margin: 120px 20px;
`;

const H3 = styled.div`
  font-size: 15px;
  margin: -100px 20px;
`;

const NutritionImage = styled.img`
  height: 200px;
  width: 200px;
  margin-right: 0px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default NutritionPage1;
