import React from 'react';
import BoardForm from '../../components/Board/BoardForm';
import { useNavigate } from 'react-router-dom';

const BoardFormPage = () => {
  const navigate = useNavigate();

  const handlePageChange = (path) => {
    navigate(path);
  };
  return <BoardForm onPageChange={handlePageChange} />;
};

export default BoardFormPage;
