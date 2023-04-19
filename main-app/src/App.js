import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      헤더
      <Outlet />
    </div>
  );
}

export default App;
