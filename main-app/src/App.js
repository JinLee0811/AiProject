import { Outlet } from 'react-router-dom';
import Nav from './components/common/NavBar';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AllDiv className='App'>
          <Nav />
          <Outlet />
        </AllDiv>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

const AllDiv = styled.div`
  /* 반응형 스타일 */

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default App;
