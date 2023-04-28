import { atom, useAtom } from 'jotai';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

const loadingAtom = atom(false);

const ApiRequest = () => {
  const [isLoading, setLoading] = useAtom(loadingAtom);

  const queryClient = useQueryClient();

  const sendRequest = useMutation(
    async ({ url, method = 'get', body = null }) => {
      const serverUrl = process.env.REACT_APP_API_URL;

      try {
        const response = await axios({
          method,
          url: serverUrl + url,
          data: body,
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    {
      onMutate: () => {
        setLoading(true);
      },
      onError: (err, variables, context) => {
        setLoading(false);
      },
      onSettled: () => {
        setLoading(false);
      },
      onSuccess: (data, variables, context) => {
        // 필요시 데이터 추가
      },
    }
  );

  return isLoading;
};

export default ApiRequest;
