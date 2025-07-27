// frontend/src/pages/AsignaturasPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsignaturaForm from '../components/asignaturaForm';
import AsignaturaList from '../components/asignaturaList';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

function AsignaturasPage() {
    const [asignaturas, setAsignaturas] = useState([]);
    const [editingAsignatura, setEditingAsignatura] = useState(null); // Para guardar la asignatura que se está editando

    useEffect(() => {
        fetchAsignaturas();
    }, []);

    const fetchAsignaturas = async () => {
        try {
            const response = await axios.get(`${API_URL}/asignaturas`);
            setAsignaturas(response.data);
        } catch (error) {
            console.error('Error al obtener asignaturas:', error);
        }
    };

    const handleAddAsignatura = async (newAsignaturaData) => {
        try {
            await axios.post(`${API_URL}/asignaturas`, {
                ...newAsignaturaData,
                creditos: Number(newAsignaturaData.creditos),
                semestre: Number(newAsignaturaData.semestre),
                notas: newAsignaturaData.notas !== '' ? Number(newAsignaturaData.notas) : null
            });
            fetchAsignaturas(); // Recargar la lista
        } catch (error) {
            console.error('Error al agregar asignatura:', error);
            alert(`Error al agregar asignatura. Detalles: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const handleUpdateAsignatura = async (updatedAsignaturaData) => {
        try {
            await axios.put(`${API_URL}/asignaturas/${updatedAsignaturaData._id}`, {
                ...updatedAsignaturaData,
                creditos: Number(updatedAsignaturaData.creditos),
                semestre: Number(updatedAsignaturaData.semestre),
                notas: updatedAsignaturaData.notas !== '' ? Number(updatedAsignaturaData.notas) : null
            });
            setEditingAsignatura(null); // Salir del modo edición
            fetchAsignaturas(); // Recargar la lista
        } catch (error) {
            console.error('Error al actualizar asignatura:', error);
            alert(`Error al actualizar asignatura. Detalles: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const handleDeleteAsignatura = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta asignatura?')) {
            try {
                await axios.delete(`${API_URL}/asignaturas/${id}`);
                fetchAsignaturas();
            } catch (error) {
                console.error('Error al eliminar asignatura:', error);
                alert(`Error al eliminar asignatura. Detalles: ${error.response ? error.response.data.message : error.message}`);
            }
        }
    };

    const handleToggleAprobada = async (id, currentStatus) => {
        try {
            await axios.put(`${API_URL}/asignaturas/${id}`, { aprobada: !currentStatus });
            fetchAsignaturas();
        } catch (error) {
            console.error('Error al actualizar estado de asignatura:', error);
            alert(`Error al actualizar estado de asignatura. Detalles: ${error.response ? error.response.data.message : error.message}`);
        }
    };

    const handleEditClick = (asignatura) => {
        setEditingAsignatura(asignatura);
    };

    const handleCancelEdit = () => {
        setEditingAsignatura(null);
    };

    return (
        <div className="page-container">
            <header className="App-header page-header">
        <h1>📚 Gestión de Asignaturas</h1> {/* O Gestión de Horarios */}
        <Link to="/" className="back-button">← Volver al Inicio</Link>
        </header>
            <main className="main-content-single">
                <section>
                    <AsignaturaForm
                        onAddAsignatura={handleAddAsignatura}
                        editingAsignatura={editingAsignatura}
                        onUpdateAsignatura={handleUpdateAsignatura}
                        onCancelEdit={handleCancelEdit}
                    />
                </section>
                <section>
                    <AsignaturaList
                        asignaturas={asignaturas}
                        onEditAsignatura={handleEditClick}
                        onDeleteAsignatura={handleDeleteAsignatura}
                        onToggleAprobada={handleToggleAprobada}
                    />
                </section>
            </main>
        </div>
    );
}

export default AsignaturasPage;