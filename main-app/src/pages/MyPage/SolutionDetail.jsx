import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetDetailSolutions } from '../../API/MainServiceApi';

// 디테일 정보 받기
const SolutionDetail = () => {
  const { detailId } = useParams();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const { data: detailSoultion } = useGetDetailSolutions(detailId, {
    onError: (error) => console.log(error.message),
    onSuccess: () => setIsLoading(false), // 성공 시 로딩 상태 변경
  }); // 데이터 get

  return (
    <>
      {detailSoultion && (
        <RightBox>
          <ResultBox>
            <Result>
              <ResultTitle>진 단 서🔎</ResultTitle>
              <ResultImage src={detailSoultion.image} />

              <ResultContents>
                👉 당신의 작물은{' '}
                <ResultStrong>'{detailSoultion.probability}%'</ResultStrong> 의
                정확도로
                <ResultStrong>
                  '{detailSoultion.solution.crop_name}'
                </ResultStrong>
                이며, 크롭 닥터의 진단 결과 질병의 이름은{' '}
                <ResultStrong>
                  '{detailSoultion.solution.disease_name}'
                </ResultStrong>{' '}
                입니다.
              </ResultContents>
              <ResultSolution>
                <ResultStrong2>👨‍🌾아래의 해결방법을 참고하세요👨‍🌾</ResultStrong2>
                <ResultStrong3>
                  {detailSoultion.solution.disease_solution
                    .split('\n\n')
                    .map((item) => (
                      <div>{item}</div>
                    ))}
                </ResultStrong3>
              </ResultSolution>
            </Result>
          </ResultBox>
        </RightBox>
      )}
    </>
  );
};

const RightBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 1000px;
`;
const ResultBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 700px;
  height: 900px;
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
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 100%;
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
  width: 350px;
  height: 250px;
  border-radius: 10px;
  border: 3px solid white;
  margin: auto;
`;

export default SolutionDetail;
