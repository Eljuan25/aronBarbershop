import React from 'react';
import CalendarPublic from './Calendar/CalendarPublic';

function Citas() {
  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ textAlign: 'center',  fontSize: '500%' }}>Agenda tu cita</h1>
      <CalendarPublic />
    </div>
  );
}

export default Citas;
