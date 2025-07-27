// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AsignaturasPage from './pages/AsignaturasPage';
import HorariosPage from './pages/HorariosPage';
import CalendarPage from './pages/CalendarPage'; // Importar la nueva página
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/asignaturas" element={<AsignaturasPage />} />
          <Route path="/horarios" element={<HorariosPage />} />
          <Route path="/calendario" element={<CalendarPage />} /> {/* Nueva ruta */}
          {/* Puedes añadir más rutas aquí en el futuro */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;