import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SolutionsForm = () => {
  // const [solutionList, setSolutionList] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     // 서버에서 진단 내역 리스트를 불러오는 API 호출
  //     const response = await axios.get('/api/diagnosis');
  //     setSolutionList(response.data);
  //   }
  //   fetchData();
  // }, []);

  return (
    <Wrapper>
      {/* <Title>나의 작물 진단 내역</Title>
      {solutionList.length > 0 ? (
        <DiagnosisList>
          {solutionList.map((solution) => (
            <DiagnosisItem key={solution.id}>
              <img src={solution.plantImage} alt='solution plant' />
              <p>{solution.result}</p>
            </DiagnosisItem>
          ))}
        </DiagnosisList>
      ) : (
        <p>진단 내역이 없습니다.</p>
      )} */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const DiagnosisList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DiagnosisItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }
`;

export default SolutionsForm;
