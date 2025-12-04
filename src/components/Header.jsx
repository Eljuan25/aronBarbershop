import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>BRO BARBER</h1>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>

          <li><a href="/#Gallery">Galería</a></li>

          {/* AQUÍ está el cambio importante */}
          <li>
            <Link to="/citas">Citas</Link>
          </li>
              <li>
            <Link to="/contacto">Contacto</Link>
          </li>

          <li>
            <Link to="/services">Servicios</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
