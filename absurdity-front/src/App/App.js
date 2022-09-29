import './App.scss';
import LogPage from '../Components/LogPage/LogPage';
import Header from '../Components/Header/Header';
import About from '../Components/About/About';
import ErrorPage from '../Components/404/404';
import Terms from '../Components/Terms/Terms';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <main className="App">
        <Routes>
          <Route path="/" element={<><Header/></>} />
          <Route path="/login" element={<><Header /> <LogPage /></>} />
          <Route path="/*" element={<><Header /> <ErrorPage /></>} />
          <Route path="/about" element={<><Header />  <About/></>} />
          <Route path="/cgu" element={<><Header />  <Terms/></>} />
      </Routes>
    </main>
  );
}

export default App;
