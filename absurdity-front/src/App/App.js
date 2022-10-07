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
import Footer from '../Components/Footer/Footer';

function App() {
  return (
    <main className="App">
        <Routes>
          <Route path="/" element={<><Header/> <Home /> <Footer /></>} />
          <Route path="/login" element={<><Header/> <LogPage /> <Footer /></>} />
          <Route path="/question/:id" element={<><Header/> <Question /> <Footer /></>} />
          <Route path="/about" element={<><Header />  <About/> <Footer /></>} />
          <Route path="/cgu" element={<><Header />  <Terms/> <Footer /></>} />
          <Route path="/profil" element={<><Header />  <Profil/> <Footer /></>} />
          <Route path="/admin" element={<><Header /> <Admin /> <Footer /></>} />
          <Route path="/*" element={<><Header /> <ErrorPage /> <Footer /></>} />
      </Routes>
    </main>
  );
}

export default App;
