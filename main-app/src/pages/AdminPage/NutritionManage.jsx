import React from 'react';
import styled from 'styled-components';
import {
  useGetNutrition,
  useDeleteNutrition,
  nutritionAtom,
} from '../../API/NutritionApi';
import { useAtom } from 'jotai';

function NutritionMange() {
  const [nutrition, setNutrition] = useAtom(nutritionAtom);
  const { data: fetchedNutrition, isLoading, error } = useGetNutrition();
  const deleteNutritionMutation = useDeleteNutrition();

  const handleDelete = async (id) => {
    try {
      await deleteNutritionMutation.mutateAsync(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>이미지</TableHeader>
          <TableHeader>영양제 이름</TableHeader>
          <TableHeader>짧은 설명</TableHeader>
          <TableHeader>긴 설명</TableHeader>
          <TableHeader>게시 날짜</TableHeader>
          <TableHeader>관리</TableHeader>
        </tr>
      </thead>
      <tbody>
        {fetchedNutrition.map((nut) => (
          <tr key={nut.id}>
            <TableData>
              <SmallImage src={nut.image} />
            </TableData>
            <TableData>{nut.name}</TableData>
            <TableData>{nut.shortDescription}</TableData>
            <TableData>{nut.longDescription}</TableData>
            <TableData>{nut.createdAt}</TableData>
            <TableData>
              <StatusButton onClick={() => handleDelete(nut.id)}>
                수정
              </StatusButton>
              <StatusButton onClick={() => handleDelete(nut.id)}>
                삭제
              </StatusButton>
            </TableData>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  width: 100%;
  font-size: 1rem;
  border-collapse: collapse;
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

export default NutritionMange;
