// src/components/Gallery.jsx
import React from "react";

import photo1 from "../assets/gallery/photo1.jpg";
import photo2 from "../assets/gallery/photo2.jpg";
import photo3 from "../assets/gallery/photo3.jpg";
import photo4 from "../assets/gallery/photo4.jpg";
import photo5 from "../assets/gallery/photo5.jpg";


const photos = [
  photo1, photo2, photo3, photo4, photo5
];

const Gallery = () => {
  return (
    <section className="gallery-section" id="galeria">
      <div className="gallery-container">
        <p className="gallery-subtitle">Mira nuestro trabajo</p>
        <h2 className="gallery-title">Galería</h2>

        <div className="gallery-grid">
       {photos.map((photo, index) => (
            <div
              key={index}
              className={`gallery-item ${index === 2 ? "featured-item" : ""}`}  
            >
              <img
                src={photo}
                alt={`Corte ${index + 1}`}
                className="gallery-photo"
                loading="lazy"
              />
         <div className="gallery-item-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 24 24" fill="white">
             <path d="M9.5 19L3 12.5L6.5 9L9.5 12L14.5 7L18 10.5L9.5 19z"/>
              <path d="M15.5 12L18 9.5L21.5 13L18 16.5L15.5 12z"/>
             <path d="M2.5 13L6 16.5L8.5 14L5 10.5L2.5 13z"/>
            </svg>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;