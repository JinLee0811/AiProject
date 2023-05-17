import React from 'react';
import BoardMyList from '../../components/Board/BoardMyList';
import { useNavigate } from 'react-router-dom';

const BoardMyListPage = () => {
  const navigate = useNavigate();
  const handlePageChange = (path) => {
    navigate(path);
  };
  return <BoardMyList onPageChange={handlePageChange} />;
};

export default BoardMyListPage;
