import { useQuery } from 'react-query';
import axios from 'axios';

const useMyBoardListQuery = (userId) => {
  //내 게시물 조회
  return useQuery(
    ['myBoardList', userId], //query-key
    async () => await axios('/api/board-list/${userId}', 'get'), // myList 만 가져올거라 :id
    {}
  );
};
export default useMyBoardListQuery;
