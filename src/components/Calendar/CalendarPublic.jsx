import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'

export default function CalendarPublic() {
  const [citas] = useState([
    {
      id: "1",
      title: "OCUPADO",
      start: "2025-11-20T10:00:00",
      end: "2025-11-20T10:30:00",
      backgroundColor: "#ef4444",
      borderColor: "#ef4444",
      textColor: "white"
    },
    {
      id: "2",
      title: "DISPONIBLE",
      start: "2025-11-20T11:00:00",
      end: "2025-11-20T11:30:00",
      backgroundColor: "#22c55e",
      borderColor: "#22c55e",
      textColor: "white"
    }
  ])

  const [eventoActivo, setEventoActivo] = useState(null)

  return (
    <div className="p-4 md:p-10 bg-black text-white min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Agenda de Citas
      </h2>

      <div className="bg-zinc-900 rounded-3xl p-4 md:p-6 shadow-2xl">
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          locale={esLocale}
          slotDuration="00:30:00"
          slotMinTime="09:00:00"
          slotMaxTime="20:00:00"
          height="auto"
          nowIndicator={true}
          events={citas}

          eventClick={(info) => {
            // Si vuelves a darle click, se quita
            setEventoActivo(
              eventoActivo === info.event.id ? null : info.event.id
            )
          }}

          eventClassNames={(arg) => {
            return eventoActivo === arg.event.id
              ? ["evento-activo"]
              : []
          }}
        />
      </div>

      {/* ESTILOS */}
      <style>
        {`
        .fc-timegrid-event {
          border-radius: 14px;
          padding: 4px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 700;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
        }

        /* 🔥 CUANDO SE SELECCIONA */
        .evento-activo {
          transform: scale(1.2) !important;
          z-index: 10;
          box-shadow: 0 0 20px rgba(255,255,255,0.4);
        }

        .fc-theme-standard td,
        .fc-theme-standard th {
          border: 1px solid #27272a;
        }

        .fc {
          background-color: transparent !important;
        }

        .fc-timegrid-slot-label {
          font-size: 1.1rem !important;
          font-weight: 700;
          color: #ffffff !important;
        }

        @media (max-width: 768px) {
          .evento-activo {
            transform: scale(1.7) !important;
          }
        }
        `}
      </style>
    </div>
  )
}
