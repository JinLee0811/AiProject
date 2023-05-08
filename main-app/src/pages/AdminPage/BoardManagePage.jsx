import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAtom, useSetAtom } from 'jotai';
import { boardsAtom } from '../../Atoms/BoardAtom';
import { useGetBoard, useDeleteBoard } from '../../API/BoardAPi';

function BoardManage() {
  const [Boards, setBoards] = useAtom(boardsAtom);

  const {
    isLoading,
    error,
    data: fetchedBoards,
  } = useGetBoard({
    onError: (error) => console.log(error.message),
  }); // 데이터 get

  const { mutate: deleteBoard } = useDeleteBoard(); //데이터 delete

  useEffect(() => {
    if (fetchedBoards) {
      setBoards(fetchedBoards);
    }
  }, [fetchedBoards, setBoards]);

  // 삭제 버튼 클릭시 로직
  const handleDelete = async (id) => {
    try {
      const response = await deleteBoard(id);
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
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
          <TableHeader>작성일자</TableHeader>
          <TableHeader>작성자ID</TableHeader>
          <TableHeader>제목</TableHeader>
          <TableHeader>공개/비공개</TableHeader>
          <TableHeader>좋아요</TableHeader>
          <TableHeader>조회수</TableHeader>
          <TableHeader>관리</TableHeader>
        </tr>
      </thead>
      <tbody>
        {Boards &&
          Boards.map((Board) => (
            <tr key={Board.id}>
              <TableData>{Board.createdAt}</TableData>
              <TableData>{Board.user_id}</TableData>
              <TableData>{Board.board_title}</TableData>
              <TableData>{Board.status}</TableData>
              <TableData>{Board.like_number}</TableData>
              <TableData>{Board.view_number}</TableData>
              <TableData>
                <DeleteButton
                  key={Board.id}
                  onClick={() => handleDelete(Board.id)}>
                  삭제
                </DeleteButton>
              </TableData>
            </tr>
          ))}
      </tbody>
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
  padding: 5px;
  text-align: left;
  font-weight: bold;
`;

const TableData = styled.td`
  border-bottom: 1px solid #ddd;
  height: 2rem;
  width: 15%;
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

export default BoardManage;
