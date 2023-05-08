import React, { useEffect } from 'react';
import styled from 'styled-components';

// 이미지 url 받기
const SolutionDetail = () => {
  return (
    <>
      <RightBox>
        <ResultBox>
          <Result>
            <ResultTitle>진 단 서🔎</ResultTitle>
            <ResultImage src='https://www.newssc.co.kr/news/photo/202107/48405_32603_2018.jpg' />

            <ResultContents>
              👉 당신의 작물은 <ResultStrong>'고추'</ResultStrong>이며, 크롭
              닥터의 진단 결과 질병의 이름은
              <ResultStrong>'탄저병'</ResultStrong> 입니다.
            </ResultContents>
            <ResultSolution>
              <ResultStrong2>👨‍🌾아래의 해결방법을 참고하세요👨‍🌾</ResultStrong2>
              <ResultStrong3>
                "감염된 식물 부분은 즉시 제거하고 폐기해야 합니다.", "물을 뿌릴
                때 잎에 직접 물이 닿지 않도록 하고, 대신 뿌리 부근에 물을
                주세요.", "예방을 위해 식물을 심기 전에 씨앗을 잠시 물에
                담갔다가 건조시키는 방법이 효과적입니다."
              </ResultStrong3>
            </ResultSolution>
          </Result>
        </ResultBox>
      </RightBox>
    </>
  );
};
const RightBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const ResultBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 600px;
  margin-bottom: 20px;
  border: 2px solid #759783;
  border-radius: 5px;
  background-color: #759783;
`;
const ResultTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 30px;
`;
const ResultContents = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  padding: 20px;
  font-size: 18px;
  font-weight: 700;
`;
const ResultStrong = styled.div`
  display: inline;
  border-radius: 0px;
  padding: 1px;
  color: green;
`;
const ResultStrong2 = styled.div`
  display: block;
  border-radius: 0px;
  padding: 1px;
  color: black;
  margin-bottom: 3px;
`;
const ResultStrong3 = styled.div`
  display: block;
  border-radius: 0px;
  padding: 10px;
  color: black;
  margin-bottom: 3px;
  color: green;
  border: 1px solid black;
`;
const Result = styled.div`
  margin: 10px;
  height: 700px;
  padding: 15px;
  align-items: center;
  background-color: white;
  border: 1px solid black;
`;
const ResultSolution = styled.div`
  padding: 10px;
  font-size: 15px;
  font-weight: 700;
  color: green;
`;
const ResultImage = styled.img`
  margin-top: 5px;
  width: 250px;
  height: 150px;
  margin-left: 90px;
  border-radius: 10px;
  border: 3px solid white;
`;

export default SolutionDetail;
