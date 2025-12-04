// src/components/Calendar/CalendarAdmin.jsx
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const PASSWORD = "aron2025"; // ← cámbiala cuando quieras

export default function CalendarAdmin() {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (autenticado) cargarCitas();
  }, [autenticado]);

  const cargarCitas = async () => {
    const snap = await getDocs(collection(db, "horarios"));
    const lista = snap.docs.map(d => {
      const data = d.data();
      let title = data.estado === "ocupado" ? (data.cliente || "OCUPADO") : "LIBRE";
      let color = data.estado === "ocupado" ? "#ef4444" : "#22c55e";

      if (data.cliente?.toUpperCase().includes("DESCANSO") || data.cliente?.toUpperCase().includes("CERRADO")) {
        color = "#6b7280"; // gris
      }

      return {
        id: d.id,
        title,
        start: `${data.fecha}T${data.hora}:00`,
        backgroundColor: color,
        borderColor: color,
        textColor: "white"
      };
    });

    setEvents(lista);
  };

  const handleSelect = async (info) => {
    const eleccion = prompt(
      "¿Qué quieres hacer?\n\n1 → Cita con cliente\n2 → Marcar DESCANSO\n3 → Cancelar",
      "1"
    );

    if (eleccion === "3" || !eleccion) return;

    const fecha = info.startStr.slice(0, 10);
    const hora = info.startStr.slice(11, 16);

    if (eleccion === "2") {
      await addDoc(collection(db, "horarios"), {
        fecha, hora, estado: "ocupado", cliente: "DESCANSO"
      });
    } else if (eleccion === "1") {
      const nombre = prompt("Nombre del cliente:");
      if (!nombre?.trim()) return;

      await addDoc(collection(db, "horarios"), {
        fecha, hora, estado: "ocupado", cliente: nombre.trim()
      });
    }

    cargarCitas();
  };

  const handleEventClick = async (info) => {
    if (info.event.title === "LIBRE") return;

    const accion = prompt(
      `Cita: ${info.event.title}\n\n1 → Liberar horario\n2 → Borrar para siempre\n3 → Cancelar`,
      "1"
    );

    if (accion === "3" || !accion) return;

    if (accion === "1") {
      await updateDoc(doc(db, "horarios", info.event.id), {
        estado: "libre",
        cliente: ""
      });
    } else if (accion === "2") {
      if (window.confirm("¿Borrar esta cita para siempre?")) {
        await deleteDoc(doc(db, "horarios", info.event.id));
      }
    }

    cargarCitas();
  };

  if (!autenticado) {
    return (
      <div style={{
        height: "100vh", background: "#000", color: "white",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
      }}>
        <h1 style={{ fontSize: "2.5rem", color: "#c19b76" }}>Panel del Barbero</h1>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && password === PASSWORD && setAutenticado(true)}
          style={{ padding: "18px", fontSize: "1.4rem", margin: "20px 0", borderRadius: "14px", width: "85%", maxWidth: "320px", textAlign: "center" }}
        />
        <button
          onClick={() => password === PASSWORD && setAutenticado(true)}
          style={{ padding: "18px 50px", background: "#c19b76", border: "none", borderRadius: "14px", color: "white", fontSize: "1.3rem", fontWeight: "bold" }}
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", background: "#111", minHeight: "100vh", color: "white" }}>
      <h1 style={{ textAlign: "center", color: "#c19b76", marginBottom: "10px" }}>
        Panel Admin - Aron
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.1rem" }}>
        Toca un espacio → crear cita o descanso | Toca una cita → liberar o borrar
      </p>

      <button
        onClick={() => setAutenticado(false)}
        style={{ padding: "12px 24px", background: "#ef4444", border: "none", borderRadius: "10px", marginBottom: "20px" }}
      >
        Cerrar sesión
      </button>

      <div style={{ borderRadius: "20px", overflow: "hidden", background: "#1f2937" }}>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          locale={esLocale}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
          }}
          slotDuration="00:30:00"
          slotMinTime="09:00:00"
          slotMaxTime="24:00:00"
          selectable={true}
          selectMirror={true}
          longPressDelay={100}
          eventLongPressDelay={0}
          select={handleSelect}
          eventClick={handleEventClick}
          events={events}
          height="auto"
          nowIndicator={true}

          selectOverlap={false}
          eventOverlap={false}
          slotEventOverlap={false}
        />
      </div>

      {/* Fix táctil para celular */}
      <style jsx global>{`
        .fc-scroller-harness {
          touch-action: auto !important;
        }
      `}</style>

      {/* Estilo especial móvil */}
      <style jsx>{`
        .fc-timegrid-event {
          min-height: 70px !important;
          margin: 6px 8px !important;
          border-radius: 16px !important;
          font-weight: bold;
          font-size: 1rem;
          touch-action: manipulation;
        }
        @media (max-width: 768px) {
          .fc-timegrid-event {
            min-height: 90px !important;
            font-size: 1.1rem !important;
            padding: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
