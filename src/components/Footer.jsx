import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Sección superior: Redes sociales */}
      <div className="footer-container">
        <div className="social-section">
          <h2>SÍGUENOS</h2>
          <div className="social-icons-large">
            <a
              href="https://www.facebook.com/aaron.zunigatelles"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://instagram.com/aaronzuniga.3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            {/* WhatsApp con enlace directo */}
            <a
              href="https://wa.me/523411617881?text=¡Hola!%20Me%20gustaría%20agendar%20una%20cita%20en%20Barbería%20Zuñiga"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="whatsapp-icon"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Sección inferior: Contacto + Mapa */}
      <div className="footer-bottom">
        <div className="contact-info">
          <h4>Barber Bro</h4>
          <p>
            <strong>Dirección:</strong> Ramón Corona #130, Zapotlán el Grande, Cd. Guzmán, Jalisco
          </p>
          <p>
            <strong>Teléfono:</strong>{" "}
            <a href="tel:+523411617881">341 161 7881</a>
          </p>
          <p>
            <strong>Instagram:</strong>{" "}
            <a
              href="https://instagram.com/aaronzuniga.3"
              target="_blank"
              rel="noopener noreferrer"
            >
              @aaronzuniga.3
            </a>
          </p>
        </div>

        <div className="map-container">
                <iframe
            title="Ubicación de Barbería Zuñiga"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.482221094297!2d-103.463879!3d19.702222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f414b8f5e5b8d%3A0x9f8e9d9e9e9e9e9e!2sRam%C3%B3n%20Corona%20130%2C%20Centro%2C%2049000%20Cd%20Guzm%C3%A1n%2C%20Jal.%2C%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1735689000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copy">
        <p>© 2025 Barber bro. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;