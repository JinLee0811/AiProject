import React from 'react';
import BoardList from '../../components/Board/BoardList';
import { useNavigate } from 'react-router-dom';

const BoardListPage = () => {
  const navigate = useNavigate();

  const handlePageChange = (path) => {
    navigate(path);
  };
  return <BoardList onPageChange={handlePageChange} />;
};
export default BoardListPage;
