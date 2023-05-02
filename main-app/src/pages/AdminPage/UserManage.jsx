import React from 'react';
import { useAtom } from 'jotai';
import { useGetUsers, useDeleteUser, usersAtom } from '../../API/AdminUserApi';
import styled from 'styled-components';

function UserManage() {
  const [users, setUsers] = useAtom(usersAtom);
  const { data: fetchedUsers, isLoading, error } = useGetUsers();
  const { mutate: deleteUser } = useDeleteUser();

  React.useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers, setUsers]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              deletedAt: new Date(),
            };
          }
          return user;
        })
      );
      alert(response.data.message);
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
          <TableHeader>Created At</TableHeader>
          <TableHeader>이메일</TableHeader>
          <TableHeader>이름</TableHeader>
          <TableHeader>닉네임</TableHeader>
          <TableHeader>유형</TableHeader>
          <TableHeader>관리</TableHeader>
        </tr>
      </thead>
      <thead>
        {users.map((user) => (
          <tr key={user.id}>
            <TableData>{user.createdAt}</TableData>
            <TableData>{user.email}</TableData>
            <TableData>{user.name}</TableData>
            <TableData>{user.nickname}</TableData>
            <TableData>{user.type}</TableData>
            <TableData>
              <DeleteButton onClick={() => handleDelete(user.id)}>
                삭제
              </DeleteButton>
            </TableData>
          </tr>
        ))}
      </thead>
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
