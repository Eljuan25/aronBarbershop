import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

export default function CalendarAdmin() {
  const [citas, setCitas] = useState([
    { title: "CLIENTE - Juan", start: "2025-11-20T10:00:00", color: "red" },
    { title: "DESCANSO", start: "2025-11-20T13:00:00", color: "gray" },
  ]);

  const crearCita = (info) => {
    const nombre = prompt("Nombre del cliente:");
    if (!nombre) return;

    const nueva = {
      title: nombre,
      start: info.startStr,
      color: "red"
    };

    setCitas([...citas, nueva]);
  };

  const eliminarCita = (info) => {
    if (window.confirm("¿Eliminar esta cita?")) {
      setCitas(citas.filter(c => c.start !== info.event.startStr));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Panel del Barbero</h2>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={esLocale}
        selectable={true}
        slotDuration="00:30:00"
        slotMinTime="09:00:00"
        slotMaxTime="20:00:00"
        events={citas}
        select={crearCita}
        eventClick={eliminarCita}
      />
    </div>
  );
}
