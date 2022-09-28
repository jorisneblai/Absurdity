import './App.scss';
import LogPage from '../Components/LogPage/LogPage';
import Header from '../Components/Header/Header';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <main className="App">
      
        
        <Routes>
          <Route path="/" element={<Header/>} />
          <Route path="/login" element={<><Header /> <LogPage /></>} />
        
      </Routes>
    </main>
  );
}

export default App;
