import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  doc
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export default function CalendarAdmin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState([]);

  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) cargarCitas();
    });
    return () => unsub();
  }, []);

 
  const cargarCitas = async () => {
    const snap = await getDocs(collection(db, "horarios"));

    const lista = snap.docs.map((d) => {
      const data = d.data();

      let color = "#ef4444";
      if (data.cliente?.toUpperCase().includes("DESCANSO")) {
        color = "#6b7280";
      }

      return {
        id: d.id,
        title: data.cliente,
        start: `${data.fecha}T${data.hora}:00`,
        backgroundColor: color,
        borderColor: color,
        textColor: "white"
      };
    });

    setEvents(lista);
  };


  const handleSelect = async (info) => {
    if (!user) return;

    const eleccion = prompt(
      "¿Qué quieres hacer?\n\n1 → Cita con cliente\n2 → Marcar DESCANSO\n3 → Cancelar",
      "1"
    );
    if (!eleccion || eleccion === "3") return;

    const fecha = info.startStr.slice(0, 10);
    const hora = info.startStr.slice(11, 16);

    const q = query(
      collection(db, "horarios"),
      where("fecha", "==", fecha),
      where("hora", "==", hora)
    );
    const existe = await getDocs(q);
    if (!existe.empty) {
      alert("Ese horario ya está ocupado");
      return;
    }

    if (eleccion === "2") {
      await addDoc(collection(db, "horarios"), {
        fecha,
        hora,
        cliente: "DESCANSO",
        estado: "ocupado"
      });
    }

    if (eleccion === "1") {
      const nombre = prompt("Nombre del cliente:");
      if (!nombre?.trim()) return;

      await addDoc(collection(db, "horarios"), {
        fecha,
        hora,
        cliente: nombre.trim(),
        estado: "ocupado"
      });
    }

    cargarCitas();
  };

  
  const handleEventClick = async (info) => {
    if (!user) return;

    const accion = prompt(
      `Cita: ${info.event.title}\n\n1 → Liberar horario\n2 → Borrar para siempre\n3 → Cancelar`,
      "1"
    );
    if (!accion || accion === "3") return;

    if (accion === "1" || accion === "2") {
      if (accion === "2" && !window.confirm("¿Borrar definitivamente?")) return;
      await deleteDoc(doc(db, "horarios", info.event.id));
      cargarCitas();
    }
  };

 
  if (!user) {
    return (
      <div style={{
        height: "100vh",
        background: "#000",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <h1 style={{ color: "#c19b76", fontSize: "2.3rem" }}>
          Panel Admin
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 14, marginTop: 20, width: 280 }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 14, marginTop: 10, width: 280 }}
        />

        <button
          onClick={() =>
            signInWithEmailAndPassword(auth, email, password)
              .catch(() => alert("Credenciales incorrectas"))
          }
          style={{
            marginTop: 20,
            padding: 14,
            width: 280,
            background: "#c19b76",
            border: "none",
            color: "white",
            fontWeight: "bold"
          }}
        >
          Entrar
        </button>
      </div>
    );
  }


  return (
    <div style={{ padding: 20, background: "#111", minHeight: "100vh", color: "white" }}>
      <button
        onClick={() => signOut(auth)}
        style={{
          background: "#ef4444",
          padding: "10px 20px",
          border: "none",
          borderRadius: 8,
          color: "white"
        }}
      >
        Cerrar sesión
      </button>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={esLocale}
        selectable
        select={handleSelect}
        eventClick={handleEventClick}
        events={events}
        slotDuration="00:30:00"
        slotMinTime="09:00:00"
        slotMaxTime="24:00:00"
        nowIndicator
        eventOverlap={false}
        selectOverlap={false}
        height="auto"
      />
    </div>
  );
}
