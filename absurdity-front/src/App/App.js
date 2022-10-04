import './App.scss';
import Home from '../Components/Home/Home';
import LogPage from '../Components/LogPage/LogPage';
import Question from '../Components/Question/Question';
import Header from '../Components/Header/Header';
import About from '../Components/About/About';
import ErrorPage from '../Components/404/404';
import Terms from '../Components/Terms/Terms';
import Profil from '../Components/Profil/Profil';
import Admin from '../Components/Admin/Admin';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <main className="App">
        <Routes>
          <Route path="/" element={<><Header/> <Home /></>} />
          <Route path="/login" element={<><Header/> <LogPage /></>} />
          <Route path="/question/:id" element={<><Header/> <Question /></>} />
          <Route path="/about" element={<><Header />  <About/></>} />
          <Route path="/cgu" element={<><Header />  <Terms/></>} />
          <Route path="/profil" element={<><Header />  <Profil/></>} />
          <Route path="/admin" element={<><Header /> <Admin /></>} />
          <Route path="/*" element={<><Header /> <ErrorPage /></>} />
      </Routes>
    </main>
  );
}

export default App;
