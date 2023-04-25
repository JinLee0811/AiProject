import { Outlet } from 'react-router-dom';
import Nav from './components/common/NavBar';

function App() {
  return (
    <div className='App'>
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
