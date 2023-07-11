import { useEffect } from 'react';
import './App.css';
import UserTable from './components/UserTable';

function App() {
  useEffect(() => {
    document.title = 'GRAPHQL SERVER';
  }, []);
  return (
    <div className="App conatiner-fluid px-5">
        <h1 className='text-center'>User Created using GraphQL </h1>
       <UserTable/>
    </div>
  );
}

export default App;
