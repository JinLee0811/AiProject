import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function BoardMange() {
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
          <TableHeader>Created At</TableHeader>
          <TableHeader>이메일</TableHeader>
          <TableHeader>닉네임</TableHeader>
          <TableHeader>제목</TableHeader>
          <TableHeader>게시글 상태</TableHeader>
          <TableHeader>관리</TableHeader>
        </tr>
      </thead>
      <thead>
        <tr>
          <TableData>2023.04.04</TableData>
          <TableData>asd@asd.com</TableData>
          <TableData>에스파</TableData>
          <TableData>제 식물좀 봐주세요!</TableData>
          <TableData>공개</TableData>
          <TableData>
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
  margin: 0.5rem 0;
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

export default BoardMange;
