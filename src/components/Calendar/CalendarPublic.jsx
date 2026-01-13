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
      const startDate = new Date(`${data.fecha}T${data.hora}:00`);

      return {
        id: d.id,
        title: "OCUPADO",
        start: startDate, // ✅
        backgroundColor: "#ef4444",
        borderColor: "#ef4444",
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
        <div className="botones-accion">
        <a
            href="https://wa.me/523411617881?text=¡Hola Aron! Quiero agendar una cita"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-compacto"
        >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            WhatsApp
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

          selectable={false}           // Nadie puede seleccionar
          select={undefined}           
          selectAllow={() => false}     

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