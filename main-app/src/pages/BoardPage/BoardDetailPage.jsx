import React from 'react';
import BoardDetail from '../../components/Board/BoardDetail';
import { useNavigate, useParams } from 'react-router-dom';

const BoardDetailPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams(); // URL 매개변수로부터 boardId를 가져옴

  const handlePageChange = (path) => {
    navigate(path);
  };

  return <BoardDetail boardId={boardId} onPageChange={handlePageChange} />;
};

export default BoardDetailPage;
