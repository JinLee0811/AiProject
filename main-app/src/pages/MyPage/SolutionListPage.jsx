import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGetSolutions, useDeleteSolution } from '../../API/MainServiceApi';
import { useNavigate } from 'react-router-dom';

const SolutionsForm = () => {
  const [solutionList, setSolutionList] = useState([]);

  const { data: fetchedSolutionList } = useGetSolutions({
    onError: (error) => console.log(error.message),
  }); // 데이터 get

  const { mutate: deleteSolution } = useDeleteSolution(); //데이터 delete
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedSolutionList) {
      setSolutionList(fetchedSolutionList);
    }
  }, [fetchedSolutionList, setSolutionList]);

  // 삭제 버튼 클릭시 로직
  const handleDelete = async (id) => {
    try {
      const response = await deleteSolution(id);
      setSolutionList((prevSolution) =>
        prevSolution.map((solution) => {
          if (solution.id === id) {
            return {
              ...solution,
              deletedAt: new Date(),
            };
          }
          return solution;
        })
      );
      alert(response.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };
  // 상세보기
  const handleDetail = (id) => {
    navigate(`/mypage/solutionDetail/${id}`);
  };
  if (!solutionList || solutionList.length === 0) {
    return (
      <>
        <NoResult>진단 결과가 없습니다</NoResult>
      </>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>진단일</TableHeader>
          <TableHeader>진단 이미지</TableHeader>
          <TableHeader>작물 이름</TableHeader>
          <TableHeader>질병 이름</TableHeader>
          <TableHeader>관리</TableHeader>
        </tr>
      </thead>
      <tbody>
        {solutionList &&
          solutionList.map((solution) => (
            <tr key={solution.id}>
              <TableData style={{ width: '8%' }}>
                {new Date(solution.created_at).toLocaleDateString()}
              </TableData>
              <TableData style={{ width: '7%' }}>
                <SmallImage src={solution.image} />
              </TableData>
              <TableData style={{ width: '6%' }}>
                {solution.solution.crop_name}
              </TableData>
              <TableData>{solution.solution.disease_name}</TableData>
              <TableData style={{ width: '8%' }}>
                <StatusButton onClick={() => handleDetail(solution.id)}>
                  상세보기
                </StatusButton>
                <StatusButton onClick={() => handleDelete(solution.id)}>
                  삭제
                </StatusButton>
              </TableData>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
const NoResult = styled.div`
  display: flex;
  font-weight: bold;
`;

const Table = styled.table`
  margin-left: 50px;
  width: 900px;
  font-size: 1rem;
  border-collapse: collapse;
  @media (max-width: 998px) {
  }
`;
const SmallImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
`;

const TableHeader = styled.th`
  background-color: white;
  padding: 0.5rem 0.5px;
  text-align: left;
  font-weight: bold;
`;

const TableData = styled.td`
  border-bottom: 1px solid #ddd;
  height: 2rem;
  width: 10%;
`;

const StatusButton = styled.button`
  background-color: #759683;
  border: none;
  color: #fff;
  padding: 0.5rem;
  margin: 0.5rem 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 0.6rem;
  :hover {
    background-color: green;
  }
`;
const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
`;

const DeleteMessage = styled.div`
  padding: 1rem;
  font-size: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  ul {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    a {
      padding: 1rem;
    }
  }
  .active {
    font-family: 'NanumSquareNeoExtraBold';
    a {
      color: #33a23d;
    }
  }
`;

export default SolutionsForm;
