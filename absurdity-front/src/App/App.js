import './App.scss';
import LogPage from '../Components/LogPage/LogPage';
import Header from '../Components/Header/Header';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <main className="App">
      
        <Header/>
        <Routes>
          
          <Route path='/login' element={<LogPage />} />
        
      </Routes>
    </main>
  );
}

export default App;
