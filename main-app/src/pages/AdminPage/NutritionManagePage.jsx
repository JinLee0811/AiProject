import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGetNutrition, useDeleteNutrition } from '../../API/NutritionApi';
import { useAtom, useSetAtom } from 'jotai';
import {
  nutritionAtom,
  selectedNutritionAtom,
} from '../../Atoms/NutritionAtom';
import { useNavigate } from 'react-router-dom';

function NutritionMange() {
  const [nutritionList, setNutritionList] = useAtom(nutritionAtom);
  const setSelectedNutrition = useSetAtom(selectedNutritionAtom);
  const {
    isLoading,
    error,
    data: fetchedNutrition,
  } = useGetNutrition({
    onError: (error) => console.log(error.message),
  }); // 데이터 get

  const { mutate: deleteNutrition } = useDeleteNutrition(); //데이터 delete
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedNutrition) {
      setNutritionList(fetchedNutrition);
    }
  }, [fetchedNutrition, setNutritionList]);

  // 삭제 버튼 클릭시 로직
  const handleDelete = async (id) => {
    try {
      const response = await deleteNutrition(id);
      setNutritionList((prevNutritions) =>
        prevNutritions.map((nutrition) => {
          if (nutrition.id === id) {
            return {
              ...nutrition,
              deletedAt: new Date(),
            };
          }
          return nutrition;
        })
      );
      alert(response.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };
  // 수정 버튼을 클릭 시 setSelectedNutrition에 nutrition을 담아서 링크를 이동시킴.
  const handleEdit = (nutrition) => {
    setSelectedNutrition(nutrition);
    navigate('/admin/AddNutrition');
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
          <TableHeader>등록일</TableHeader>
          <TableHeader>이미지</TableHeader>
          <TableHeader>영양제 이름</TableHeader>
          <TableHeader>짧은 설명</TableHeader>
          <TableHeader>관리</TableHeader>
        </tr>
      </thead>
      <tbody>
        {nutritionList.map((nutrition) => (
          <tr key={nutrition.id}>
            <TableData style={{ width: '4%' }}>
              {new Date(nutrition.created_at).toLocaleDateString()}
            </TableData>
            <TableData style={{ width: '2%' }}>
              <SmallImage src={nutrition.image} alt={nutrition.name} />
            </TableData>
            <TableData>{nutrition.name}</TableData>
            <TableData>{nutrition.short_description}</TableData>
            <TableData style={{ width: '4%' }}>
              <StatusButton onClick={() => handleEdit(nutrition)}>
                수정
              </StatusButton>
              <StatusButton onClick={() => handleDelete(nutrition.id)}>
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
