import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function NutritionMange() {
  const [users, setUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await sendRequest('/admin/users', 'get');
  //       setUsers(response);
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleDelete = async () => {
  //   try {
  //     const response = await sendRequest(
  //       `/admin/users/${userIdToDelete}`,
  //       'delete',
  //       {}
  //     );
  //     const newUsers = users.map((user) => {
  //       if (user.id === userIdToDelete) {
  //         return {
  //           ...user,
  //           deletedAt: new Date(),
  //         };
  //       }
  //       return user;
  //     });

  //     setUsers(newUsers);
  //     alert(response.message);
  //     setUserIdToDelete(null);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
      <thead>
        <tr>
          <TableData>사진</TableData>
          <TableData>살균제</TableData>
          <TableData>살균을 위한 약품입니다.</TableData>
          <TableData>긴설명 살균을 위한 약품입니다.</TableData>
          <TableData>2023.03.03</TableData>
          <TableData>
            <DeleteButton>수정</DeleteButton>
            <DeleteButton>삭제</DeleteButton>
          </TableData>
        </tr>
      </thead>
    </Table>
  );
}

const Select = styled.select`
  margin-bottom: 1rem;
`;
const Table = styled.table`
  width: 100%;
  font-size: 1rem;
  border-collapse: collapse;
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

const DeleteButton = styled.button`
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
