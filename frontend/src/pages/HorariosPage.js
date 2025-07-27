// frontend/src/pages/HorariosPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HorarioForm from '../components/horarioForm';
import HorarioList from '../components/horarioList';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function HorariosPage() {
    const [horarios, setHorarios] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]); // Necesitamos las asignaturas para el select en el formulario de horario
    const [editingHorario, setEditingHorario] = useState(null);

    useEffect(() => {
        fetchHorarios();
        fetchAsignaturasForSelect(); // Cargar asignaturas para el dropdown
    }, []);

    const fetchHorarios = async () => {
        try {
            const response = await axios.get(`${API_URL}/horarios`);
            setHorarios(response.data);
        } catch (error) {
            console.error('Error al obtener horarios:', error);
        }
    };

    const fetchAsignaturasForSelect = async () => {
        try {
            const response = await axios.get(`${API_URL}/asignaturas`);
            setAsignaturas(response.data);
        } catch (error) {
            console.error('Error al obtener asignaturas para el selector:', error);
        }
    };

    const handleAddHorario = async (newHorarioData) => {
        try {
            const dataToSend = { ...newHorarioData };
            if (dataToSend.asignatura === '') {
                delete dataToSend.asignatura;
            }
            await axios.post(`${API_URL}/horarios`, dataToSend);
            fetchHorarios();
        } catch (error) {
            console.error('Error al agregar horario:', error);
            alert(`Error al agregar horario. Detalles: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const handleUpdateHorario = async (updatedHorarioData) => {
        try {
            const dataToSend = { ...updatedHorarioData };
            if (dataToSend.asignatura === '') {
                delete dataToSend.asignatura;
            }
            await axios.put(`${API_URL}/horarios/${updatedHorarioData._id}`, dataToSend);
            setEditingHorario(null);
            fetchHorarios();
        } catch (error) {
            console.error('Error al actualizar horario:', error);
            alert(`Error al actualizar horario. Detalles: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const handleDeleteHorario = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este horario?')) {
            try {
                await axios.delete(`${API_URL}/horarios/${id}`);
                fetchHorarios();
            } catch (error) {
                console.error('Error al eliminar horario:', error);
                alert(`Error al eliminar horario. Detalles: ${error.response ? error.response.data.message : error.message}`);
            }
        }
    };

    const handleEditClick = (horario) => {
        setEditingHorario(horario);
    };

    const handleCancelEdit = () => {
        setEditingHorario(null);
    };

    return (
        <div className="page-container">
            <header className="App-header page-header">
                <h1>🗓️ Gestión de Horarios y Eventos</h1>
                <Link to="/" className="back-button">← Volver al Inicio</Link>
            </header>
            <main className="main-content-single">
                <section>
                    <HorarioForm
                        asignaturas={asignaturas}
                        onAddHorario={handleAddHorario}
                        editingHorario={editingHorario}
                        onUpdateHorario={handleUpdateHorario}
                        onCancelEdit={handleCancelEdit}
                    />
                </section>
                <section>
                    <HorarioList
                        horarios={horarios}
                        onEditHorario={handleEditClick}
                        onDeleteHorario={handleDeleteHorario}
                    />
                </section>
            </main>
        </div>
    );
}

export default HorariosPage;