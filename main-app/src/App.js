import { Outlet, useLocation } from 'react-router-dom';
import Nav from './components/common/NavBar';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'jotai';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  // Nav 컴포넌트가 있는 라우트와 다른 라우트에 대한 조건 처리
  const isNavVisible = !(
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/signup')
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <AllDiv className='App'>
            {isNavVisible && <Nav />}
            <Outlet />
          </AllDiv>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

const AllDiv = styled.div`
  padding: 0px;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default App;
