import React, { useState, useEffect } from 'react';
import { useGetUsers, useDeleteUser } from '../../API/AdminUserApi';
import styled from 'styled-components';
import Loading from '../../components/common/Loading';

function UserManage() {
  const [users, setUsers] = useState([]);
  const { data: fetchedUsers, isLoading, error } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser();

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers, setUsers]);

  const handleDelete = async (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        await deleteUser(id); // 서버에서 데이터를 소프트 딜리트
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // 클라이언트에서 실제 데이터를 제거
        alert('삭제되었습니다.');
      } catch (err) {
        console.log(err.message);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>가입일</TableHeader>
          <TableHeader>이메일</TableHeader>
          <TableHeader>닉네임</TableHeader>
          <TableHeader>유형</TableHeader>
          <TableHeader>관리</TableHeader>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => (
            <tr key={user.id}>
              <TableData style={{ width: '13%' }}>
                {new Date(user.created_at).toISOString().substring(0, 10)}
              </TableData>
              <TableData>{user.email}</TableData>
              <TableData>{user.nickname}</TableData>
              <TableData>{user.is_admin === 1 ? '어드민' : '회원'}</TableData>
              <TableData>
                <DeleteButton
                  key={user.id}
                  onClick={() => handleDelete(user.id)}>
                  삭제
                </DeleteButton>
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

export default UserManage;
