import React from 'react';
import BoardDetail from '../../components/Board/BoardDetail';
import BoardDetailComment from '../../components/Board/BoardDetailComment';
import { useNavigate } from 'react-router-dom';

const BoardDetailPage = () => {
  const navigate = useNavigate();

  const handlePageChange = (path) => {
    navigate(path);
  };
  return <BoardDetail onPageChange={handlePageChange} />;
};

export default BoardDetailPage;
