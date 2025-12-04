// src/components/Contacto.jsx
import React from "react";
import local1 from "../assets/local1.jpg";  // ← tus fotos reales
import local2 from "../assets/local2.jpg";
import local3 from "../assets/local3.jpg";
import local4 from "../assets/local4.jpg";

export default function Contacto() {
  return (
    <section id="contacto" className="contacto-section">
      <div className="contacto-container">

        {/* Título */}
        <h2 className="gallery-subtitle">CONTÁCTANOS</h2>
        <h3 className="gallery-title">Barber Bro</h3>

        <div className="contacto-grid">

          {/* Columna izquierda: Info + Mapa */}
          <div className="info-mapa">
            <div className="contacto-info">
              <h4>Visítanos o escríbenos</h4>
              <p><strong>Dirección:</strong> Ramón Corona #130, Centro<br />Zapotlán el Grande, Cd. Guzmán, Jalisco</p>
              <p><strong>Teléfono / WhatsApp:</strong><br />
                <a href="tel:+523411617881" className="telefono-link">341 161 7881</a>
              </p>
              <p><strong>Horario:</strong><br />Lunes a Sábado 9:00 AM - 8:00 PM</p>

              <div className="botones-accion">
                <a href="https://wa.me/523411617881" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  Escríbenos por WhatsApp
                </a>
                <a href="https://www.google.com/maps/dir/?api=1&destination=Ram%C3%B3n+Corona+130,+Centro,+Cd+Guzm%C3%A1n" target="_blank" rel="noopener noreferrer" className="btn-ruta">
                  Cómo llegar
                </a>
              </div>
            </div>

            <div className="mapa-container">
              <iframe
                title="Barber Bro - Ubicación"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.482221094297!2d-103.463879!3d19.702222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f414b8f5e5b8d%3A0x9f8e9d9e9e9e9e9e!2sRam%C3%B3n%20Corona%20130%2C%20Centro%2C%2049000%20Cd%20Guzm%C3%A1n%2C%20Jal.%2C%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1735689000000"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

          {/* Columna derecha: Fotos del local */}
          <div className="local-grid">
            <div className="gallery-item">
              <img src={local1} alt="Interior Barber Bro" className="gallery-photo" />
              <div className="gallery-item-overlay"><span className="gallery-icon">✂️</span></div>
            </div>
            <div className="gallery-item">
              <img src={local2} alt="Fachada" className="gallery-photo" />
              <div className="gallery-item-overlay"><span className="gallery-icon">📍</span></div>
            </div>
            <div className="gallery-item">
              <img src={local3} alt="Zona de espera" className="gallery-photo" />
              <div className="gallery-item-overlay"><span className="gallery-icon">💈</span></div>
            </div>
            <div className="gallery-item">
              <img src={local4} alt="Detalles del local" className="gallery-photo" />
              <div className="gallery-item-overlay"><span className="gallery-icon">✨</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}