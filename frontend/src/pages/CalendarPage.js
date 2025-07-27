
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CalendarView from '../components/calendarview'; // Importar el componente del calendario

const API_URL = 'http://localhost:5000/api';

function CalendarPage() {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHorarios();
    }, []);

    const fetchHorarios = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/horarios`);
            setHorarios(response.data);
            setError(null);
        } catch (err) {
            console.error('Error al obtener horarios para el calendario:', err);
            setError('No se pudieron cargar los horarios. Intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <header className="App-header page-header">
                <h1>🗓️ Calendario Semanal</h1>
                <Link to="/" className="back-button">← Volver al Inicio</Link>
            </header>
            <main className="calendar-page-main">
                <section className="calendar-container">
                    {loading ? (
                        <p className="text-center">Cargando calendario...</p>
                    ) : error ? (
                        <p className="text-center" style={{ color: 'var(--error-color)' }}>{error}</p>
                    ) : (
                        <CalendarView horarios={horarios} />
                    )}
                </section>
            </main>
        </div>
    );
}

export default CalendarPage;