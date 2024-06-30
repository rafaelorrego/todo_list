import './App.css';
import TodoContainer from './components/TodoContainer';
import { Route, Routes, Link } from 'react-router-dom';
import Home from '../src/pages/Home';
import Done from '../src/pages/Done';

function App() {
  return (
    <div className="min-h-96 flex flex-col">
      {/* <header className="">
        { <TodoContainer /> }
      </header> */}
      <nav>
        <ul className="flex">
          <li className="flex-1 mr-2">
            <Link to="/home" className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">Inicio</Link>
          </li>
          <li className="flex-1 mr-2">
            <Link to="/done" className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4">Tareas terminadas</Link>
          </li>
          <li className="text-center flex-1">
            <Link to="/proximamente" className='block py-2 px-4 text-gray-400 cursor-not-allowed'>Próximamente</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' exact Component={Home} />
        <Route path='/home' Component={Home} />
        <Route path='/done' Component={Done} />
      </Routes>
    </div>
  );
}

export default App;
