import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Services from './components/Services.jsx';
import Gallery from './components/Gallery.jsx';
import Footer from './components/Footer.jsx';
import Citas from './components/Citas.jsx';
import Contacto from './components/Contacto.jsx';
import CalendarAdmin from './components/Calendar/CalendarAdmin.jsx';
import AdminGallery from './components/Calendar/AdminGallery';
import GalleryPublic from './components/GalleryPublic';


function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={
          <>
            <Main />
            <Services />
            <Gallery />
            <Footer />
          </>
        } />

        {/* Página NUEVA de citas */}
        <Route path="/citas" element={<Citas />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<GalleryPublic />} />

        <Route path="/admin2025" element={<CalendarAdmin />} />
        <Route path="/galeria-admin" element={<AdminGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
