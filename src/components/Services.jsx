// src/components/Services.jsx
import React from "react";
import barberImg from "../assets/Aronks.jpg"; 


const Services = () => {
  const services = [
    { name: "Corte de cabello", price: "$150" },
    { name: "Corte de barba", price: "$80" },
    { name: "Corte y barba", price: "$200" },
    { name: "Arreglado de ceja", price: "$40" },
    { name: "Recortes", price: "$80" },
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        {/* Imagen de fondo */}
        <div className="services-image">
          <img src={barberImg} alt="Barbero trabajando" />
        </div>

        {/* Lista de precios */}
        <div className="services-content">
          <p className="services-subtitle">NUESTROS PRECIOS</p>
          <h2 className="services-title">LISTA DE PRECIOS</h2>

          <div className="price-list">
            {services.map((service, index) => (
              <div key={index} className="price-item">
                <span className="service-name">{service.name}</span>
                <span className="service-price">{service.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;