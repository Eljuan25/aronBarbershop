// src/components/Calendar/AdminGallery.jsx
import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const PASSWORD = "aron2025"; // Cambia cuando quieras

export default function AdminGallery() {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [galeria, setGaleria] = useState([]);
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    if (autenticado) cargarGaleria();
  }, [autenticado]);

  const cargarGaleria = async () => {
    try {
      const snap = await getDocs(collection(db, "gallery"));
      const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setGaleria(lista.sort((a, b) => b.fecha.localeCompare(a.fecha)));
    } catch (err) {
      console.error(err);
    }
  };

  // COMPRESIÓN DE IMÁGENES (rápida y potente)
  const comprimirImagen = (file) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const MAX_WIDTH = 1400;
        const ratio = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * ratio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(resolve, "image/jpeg", 0.85);
      };
      img.src = URL.createObjectURL(file);
    });

  // FUNCIÓN PRINCIPAL DE SUBIDA (CORREGIDA Y ULTRA-RÁPIDA)
  const subirFotoVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert("Archivo muy grande. Máximo 25 MB");
      return;
    }

    setSubiendo(true);

    try {
      let archivoFinal = file;
      let nombreFinal = file.name;

      // Comprimir fotos grandes
      if (file.type.startsWith("image/") && file.size > 500000) {
        archivoFinal = await comprimirImagen(file);
        nombreFinal = `${Date.now()}.jpg`;
      }

      // Videos con nombre único
      if (file.type.startsWith("video/")) {
        nombreFinal = `${Date.now()}_${file.name}`;
      }

      const storageRef = ref(storage, `gallery/${nombreFinal}`);
      const uploadTask = uploadBytesResumable(storageRef, archivoFinal);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Subiendo: ${Math.round(progress)}%`);
        },
        (error) => {
          alert("Error al subir: " + error.message);
          setSubiendo(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const descripcion =
            prompt("Descripción (opcional):", "Bro Barber") || "Bro Barber";

          await addDoc(collection(db, "gallery"), {
            url,
            descripcion,
            tipo: file.type.startsWith("video") ? "video" : "foto",
            fecha: new Date().toISOString(),
          });

          alert("¡Subido en segundos! Ya aparece en la galería");
          cargarGaleria();
          setSubiendo(false);
          e.target.value = null;
        }
      );
    } catch (err) {
      alert("Error: " + err.message);
      setSubiendo(false);
    }
  };

  const borrarItem = async (id, url) => {
    if (!window.confirm("¿Borrar este elemento para siempre?")) return;

    try {
      await deleteObject(ref(storage, url));
      await deleteDoc(doc(db, "gallery", id));
      alert("Borrado con éxito");
      cargarGaleria();
    } catch (err) {
      alert("Error al borrar: " + err.message);
    }
  };

  // LOGIN
  if (!autenticado) {
    return (
      <div
        style={{
          height: "100vh",
          background: "#000",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        <h1 style={{ fontSize: "3.2rem", color: "#c19b76", fontWeight: "bold" }}>
          Galería Admin
        </h1>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && password === PASSWORD && setAutenticado(true)
          }
          style={{
            padding: "20px",
            fontSize: "1.7rem",
            borderRadius: "16px",
            width: "85%",
            maxWidth: "360px",
            textAlign: "center",
            border: "3px solid #c19b76",
          }}
        />
        <button
          onClick={() => password === PASSWORD && setAutenticado(true)}
          style={{
            padding: "20px 70px",
            background: "#c19b76",
            border: "none",
            borderRadius: "16px",
            color: "white",
            fontSize: "1.7rem",
            fontWeight: "bold",
          }}
        >
          ENTRAR
        </button>
      </div>
    );
  }

  // PANEL ADMIN
  return (
    <div style={{ padding: "20px", background: "#111", minHeight: "100vh", color: "white" }}>
      <h1 style={{ textAlign: "center", color: "#c19b76", fontSize: "2.8rem" }}>
        Galería Admin - Aron
      </h1>
      <button
        onClick={() => setAutenticado(false)}
        style={{
          padding: "12px 28px",
          background: "#ef4444",
          border: "none",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        Cerrar sesión
      </button>

      <div
        style={{
          background: "#222",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ color: "#c19b76", marginBottom: "15px" }}>
          Subir Foto o Video (máx 25 MB)
        </h2>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={subirFotoVideo}
          disabled={subiendo}
          style={{
            padding: "18px",
            fontSize: "1.3rem",
            width: "100%",
            background: "#333",
            borderRadius: "14px",
            border: "3px dashed #c19b76",
          }}
        />
      </div>

      {/* BARRA DE PROGRESO FLOTANTE */}
      {subiendo && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#c19b76",
            color: "white",
            padding: "18px 40px",
            borderRadius: "50px",
            fontWeight: "bold",
            fontSize: "1.4rem",
            zIndex: 9999,
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          Subiendo ultra-rápido...
        </div>
      )}

      <h2 style={{ color: "#c19b76", fontSize: "1.8rem" }}>
        Galería actual ({galeria.length} elementos)
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: "18px",
          marginTop: "20px",
        }}
      >
        {galeria.map((item) => (
          <div
            key={item.id}
            style={{
              position: "relative",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 8px 25px rgba(0,0,0,0.7)",
            }}
          >
            {item.tipo === "video" ? (
              <video
                src={item.url}
                controls
                style={{ width: "100%", height: "240px", objectFit: "cover" }}
              />
            ) : (
              <img
                src={item.url}
                alt={item.descripcion}
                style={{ width: "100%", height: "240px", objectFit: "cover" }}
              />
            )}
            <div
              style={{
                padding: "12px",
                background: "rgba(0,0,0,0.85)",
                textAlign: "center",
                fontSize: "0.95rem",
              }}
            >
              {item.descripcion}
            </div>
            <button
              onClick={() => borrarItem(item.id, item.url)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                fontSize: "1.6rem",
                fontWeight: "bold",
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}