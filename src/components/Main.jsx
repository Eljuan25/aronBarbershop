import React from "react";
import logo from "../assets/aron.png";

function Main() {
 

  return (
    <main id="home" className="main">
      <div className="main-content">
        <h2>BRO BARBER</h2>
        <p>
          Donde cada corte cuenta una historia. Atención personalizada, estilo moderno
          y la experiencia clásica de una barbería tradicional.
        </p>
        <a href="contacto" className="agendar">
          Agendar cita
        </a>
      </div>

      <img src={logo} alt="Barbero trabajando" className="main-image" />
    </main>
  );
}

export default Main;