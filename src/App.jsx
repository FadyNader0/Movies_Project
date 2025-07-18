import { Routes, Route } from 'react-router-dom';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Movies_page from './pages/Movies-page/Movies-page';
import Favorites_page from './pages/Favourites-page/Favourites-page';
import CreateLocalStorage from './components/Create-Localstorage/Create-Localstorage';
import Footer from './components/Footer/Footer';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <>
      <CreateLocalStorage />
      <Nav />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies-page" element={<Movies_page />} />
          <Route path="/favorites-page" element={<Favorites_page />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
