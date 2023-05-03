import { useQuery } from 'react-query';
import axios from 'axios';

export const useBoardListQuery = () => {
  //전체 게시물 조회
  return useQuery(
    ['BoardList'], //query-key
    async () => await axios('/api', 'get'),
    {}
  );
};
