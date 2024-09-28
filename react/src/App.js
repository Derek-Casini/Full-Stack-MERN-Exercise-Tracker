import './App.css';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import CreatePage from './pages/CreatePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className='App'>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
              <Route path='/edit' element={<EditPage exerciseToEdit={exerciseToEdit}/>}></Route>
              <Route path='/create' element={<CreatePage/>}></Route>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
