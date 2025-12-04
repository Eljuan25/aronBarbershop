// src/components/Calendar/CalendarPublic.jsx
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";

export default function CalendarPublic() {
  const [events, setEvents] = useState([]);
  const [eventoActivo, setEventoActivo] = useState(null);

  useEffect(() => {
    cargarHorarios();
  }, []);

  const cargarHorarios = async () => {
    const snap = await getDocs(collection(db, "horarios"));
    const lista = snap.docs.map(d => {
      const data = d.data();
      return {
        id: d.id,
        title: data.estado === "ocupado" ? "OCUPADO" : "LIBRE",
        start: `${data.fecha}T${data.hora}:00`,
        backgroundColor: data.estado === "ocupado" ? "#ef4444" : "#22c55e",
        borderColor: data.estado === "ocupado" ? "#ef4444" : "#22c55e",
        textColor: "white"
      };
    });
    setEvents(lista);
  };

  // Solo para resaltar al hacer click (opcional, queda bonito)
  const handleEventClick = (info) => {
    if (info.event.title === "OCUPADO") {
      setEventoActivo(eventoActivo === info.event.id ? null : info.event.id);
    }
  };

  return (
    <div className="p-4 md:p-10 bg-black text-white min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-500">
        Agenda de Citas
      </h2>
      
      {/* Mensaje claro para el público */}
      <div className="text-center mb-6 text-lg opacity-90">
        <p>Las citas solo las agenda el administrador</p>
        <p className="text-yellow-400 mt-2">¡Contáctame por WhatsApp para agendar la tuya!</p>
        <a 
          href="https://wa.me/523411617881" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 bg-green-600 rounded-full font-bold hover:bg-green-700 transition"
        >
          Escribir por WhatsApp
        </a>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-4 shadow-2xl">
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
          height="auto"
          nowIndicator={true}
          events={events}

          // ← AQUÍ ESTÁ EL CAMBIO CLAVE:
          selectable={false}           // Nadie puede seleccionar
          select={undefined}           // Quitamos la función
          selectAllow={() => false}     // Por si acaso

          eventClick={handleEventClick}
          eventClassNames={(arg) => eventoActivo === arg.event.id ? ["evento-activo"] : []}

          // Para que no se pueda hacer nada con touch/drag
          selectOverlap={false}
          eventOverlap={false}
          slotEventOverlap={false}
          editable={false}
          eventStartEditable={false}
          eventDurationEditable={false}
        />
      </div>

      <style jsx>{`
        .fc-timegrid-event {
          min-height: 60px !important;
          margin: 4px 6px !important;
          border-radius: 16px !important;
          font-weight: bold;
          touch-action: manipulation;
          cursor: default !important;
        }
        .evento-activo {
          transform: scale(1.4) !important;
          z-index: 999 !important;
          box-shadow: 0 0 30px rgba(255,255,255,0.6) !important;
        }
        @media (max-width: 768px) {
          .fc-timegrid-event { 
            min-height: 80px !important; 
            font-size: 1rem !important; 
          }
          .evento-activo { 
            transform: scale(1.8) !important; 
          }
        }
      `}</style>
    </div>
  );
}