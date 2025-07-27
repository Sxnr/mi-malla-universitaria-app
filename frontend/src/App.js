

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importa el CSS mejorado

const API_URL = 'http://localhost:5000/api';

function App() {
    const [asignaturas, setAsignaturas] = useState([]);
    const [nuevaAsignatura, setNuevaAsignatura] = useState({
        nombre: '', codigo: '', creditos: '', semestre: '', aprobada: false, notas: ''
    });
    const [horarios, setHorarios] = useState([]);
    const [nuevoHorario, setNuevoHorario] = useState({
        nombreEvento: '', asignatura: '', tipo: '', diaSemana: '', horaInicio: '', horaFin: '', ubicacion: ''
    });

    // Cargar asignaturas y horarios al iniciar la app
    useEffect(() => {
        fetchAsignaturas();
        fetchHorarios();
    }, []);

    const fetchAsignaturas = async () => {
        try {
            const response = await axios.get(`${API_URL}/asignaturas`);
            setAsignaturas(response.data);
        } catch (error) {
            console.error('Error al obtener asignaturas:', error);
        }
    };

    const fetchHorarios = async () => {
        try {
            const response = await axios.get(`${API_URL}/horarios`);
            setHorarios(response.data);
        } catch (error) {
            console.error('Error al obtener horarios:', error);
        }
    };

    const handleAddAsignatura = async (e) => {
        e.preventDefault();
        try {
            // Asegurarse de que creditos y semestre sean números
            const dataToSend = {
                ...nuevaAsignatura,
                creditos: Number(nuevaAsignatura.creditos),
                semestre: Number(nuevaAsignatura.semestre),
                notas: nuevaAsignatura.notas !== '' ? Number(nuevaAsignatura.notas) : null // Convertir notas a número o null
            };
            await axios.post(`${API_URL}/asignaturas`, dataToSend);
            setNuevaAsignatura({ nombre: '', codigo: '', creditos: '', semestre: '', aprobada: false, notas: '' });
            fetchAsignaturas(); // Recargar la lista
        } catch (error) {
            console.error('Error al agregar asignatura:', error);
            alert('Error al agregar asignatura. Revisa la consola para más detalles. Asegúrate que el código sea único.');
        }
    };

    const handleToggleAprobada = async (id, currentStatus) => {
        try {
            await axios.put(`${API_URL}/asignaturas/${id}`, { aprobada: !currentStatus });
            fetchAsignaturas();
        } catch (error) {
            console.error('Error al actualizar estado de asignatura:', error);
            alert('Error al actualizar asignatura. Revisa la consola.');
        }
    };

    const handleDeleteAsignatura = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta asignatura?')) {
            try {
                await axios.delete(`${API_URL}/asignaturas/${id}`);
                fetchAsignaturas();
            } catch (error) {
                console.error('Error al eliminar asignatura:', error);
                alert('Error al eliminar asignatura. Revisa la consola.');
            }
        }
    };

    const handleAddHorario = async (e) => {
        e.preventDefault();
        try {
            // Asegurarse de que asignatura sea un ID de objeto válido si se seleccionó
            const dataToSend = { ...nuevoHorario };
            if (dataToSend.asignatura === '') {
                delete dataToSend.asignatura; // Si no se selecciona, no enviar el campo
            }

            await axios.post(`${API_URL}/horarios`, dataToSend);
            setNuevoHorario({ nombreEvento: '', asignatura: '', tipo: '', diaSemana: '', horaInicio: '', horaFin: '', ubicacion: '' });
            fetchHorarios(); // Recargar la lista
        } catch (error) {
            console.error('Error al agregar horario:', error);
            alert('Error al agregar horario. Revisa la consola para más detalles.');
        }
    };

    const handleDeleteHorario = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este horario?')) {
            try {
                await axios.delete(`${API_URL}/horarios/${id}`);
                fetchHorarios();
            } catch (error) {
                console.error('Error al eliminar horario:', error);
                alert('Error al eliminar horario. Revisa la consola.');
            }
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>📚 Mi Malla Curricular y Horarios 🗓️</h1>
                <p>Organiza tus asignaturas y eventos universitarios</p>
            </header>

            <main>
                <section>
                    <h2>➕ Añadir Nueva Asignatura</h2>
                    <form onSubmit={handleAddAsignatura} className="form-container">
                        <div className="form-group">
                            <label htmlFor="nombreAsignatura">Nombre de la Asignatura:</label>
                            <input
                                type="text"
                                id="nombreAsignatura"
                                placeholder="Cálculo I"
                                value={nuevaAsignatura.nombre}
                                onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, nombre: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="codigoAsignatura">Código:</label>
                            <input
                                type="text"
                                id="codigoAsignatura"
                                placeholder="MAT101"
                                value={nuevaAsignatura.codigo}
                                onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, codigo: e.target.value.toUpperCase() })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="creditosAsignatura">Créditos:</label>
                            <input
                                type="number"
                                id="creditosAsignatura"
                                placeholder="5"
                                value={nuevaAsignatura.creditos}
                                onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, creditos: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="semestreAsignatura">Semestre:</label>
                            <input
                                type="number"
                                id="semestreAsignatura"
                                placeholder="1"
                                value={nuevaAsignatura.semestre}
                                onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, semestre: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="notasAsignatura">Nota Final (Opcional):</label>
                            <input
                                type="number"
                                step="0.1"
                                id="notasAsignatura"
                                placeholder="Ej: 6.5"
                                value={nuevaAsignatura.notas}
                                onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, notas: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="aprobadaAsignatura">Aprobada:</label>
                            <input
                                type="checkbox"
                                id="aprobadaAsignatura"
                                checked={nuevaAsignatura.aprobada}
                                onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, aprobada: e.target.checked })}
                            />
                        </div>
                        <button type="submit">Guardar Asignatura</button>
                    </form>

                    <h2>📚 Mis Asignaturas</h2>
                    {asignaturas.length === 0 ? (
                        <p className="text-center">Aún no hay asignaturas añadidas. ¡Empieza a agregarlas!</p>
                    ) : (
                        <div className="list-container">
                            <ul>
                                {asignaturas.map((asignatura) => (
                                    <li key={asignatura._id} className="list-item">
                                        <h4>{asignatura.nombre} ({asignatura.codigo})</h4>
                                        <p><strong>Créditos:</strong> {asignatura.creditos}</p>
                                        <p><strong>Semestre:</strong> {asignatura.semestre}</p>
                                        <p>
                                            <strong>Estado: </strong>
                                            <span className="status-tag" style={{ backgroundColor: asignatura.aprobada ? 'var(--primary-dark)' : 'var(--error-color)' }}>
                                                {asignatura.aprobada ? 'Aprobada' : 'Pendiente'}
                                            </span>
                                            {asignatura.notas !== null && asignatura.notas !== undefined && asignatura.notas !== '' && (
                                                ` - Nota: ${asignatura.notas}`
                                            )}
                                        </p>
                                        {asignatura.prerrequisitos && asignatura.prerrequisitos.length > 0 && (
                                            <p><strong>Prerrequisitos:</strong> {asignatura.prerrequisitos.map(p => p.nombre).join(', ')}</p>
                                        )}
                                        <div className="actions">
                                            <button onClick={() => handleToggleAprobada(asignatura._id, asignatura.aprobada)}>
                                                {asignatura.aprobada ? 'Marcar Pendiente' : 'Marcar Aprobada'}
                                            </button>
                                            <button className="delete-btn" onClick={() => handleDeleteAsignatura(asignatura._id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>

                <section>
                    <h2>📅 Añadir Nuevo Horario/Evento</h2>
                    <form onSubmit={handleAddHorario} className="form-container">
                        <div className="form-group">
                            <label htmlFor="nombreEvento">Nombre del Evento:</label>
                            <input
                                type="text"
                                id="nombreEvento"
                                placeholder="Clase de Cálculo I / Examen Final"
                                value={nuevoHorario.nombreEvento}
                                onChange={(e) => setNuevoHorario({ ...nuevoHorario, nombreEvento: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="asignaturaRelacionada">Asignatura Relacionada (Opcional):</label>
                            <select
                                id="asignaturaRelacionada"
                                value={nuevoHorario.asignatura}
                                onChange={(e) => setNuevoHorario({ ...nuevoHorario, asignatura: e.target.value })}
                            >
                                <option value="">-- Seleccionar Asignatura --</option>
                                {asignaturas.map(a => (
                                    <option key={a._id} value={a._id}>{a.nombre} ({a.codigo})</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipoEvento">Tipo de Evento:</label>
                            <select
                                id="tipoEvento"
                                value={nuevoHorario.tipo}
                                onChange={(e) => setNuevoHorario({ ...nuevoHorario, tipo: e.target.value })}
                                required
                            >
                                <option value="">Seleccionar Tipo</option>
                                <option value="Clase">Clase</option>
                                <option value="Laboratorio">Laboratorio</option>
                                <option value="Examen">Examen</option>
                                <option value="Evento">Evento General</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="diaSemana">Día de la Semana:</label>
                            <select
                                id="diaSemana"
                                value={nuevoHorario.diaSemana}
                                onChange={(e) => setNuevoHorario({ ...nuevoHorario, diaSemana: e.target.value })}
                                required
                            >
                                <option value="">Seleccionar Día</option>
                                <option value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miércoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="horaInicio">Hora de Inicio:</label>
                            <input
                                type="time"
                                id="horaInicio"
                                value={nuevoHorario.horaInicio}
                                onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaInicio: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="horaFin">Hora de Fin:</label>
                            <input
                                type="time"
                                id="horaFin"
                                value={nuevoHorario.horaFin}
                                onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaFin: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ubicacion">Ubicación (Aula/Online):</label>
                            <input
                                type="text"
                                id="ubicacion"
                                placeholder="Sala B201 / Zoom Link"
                                value={nuevoHorario.ubicacion}
                                onChange={(e) => setNuevoHorario({ ...nuevoHorario, ubicacion: e.target.value })}
                            />
                        </div>
                        <button type="submit">Guardar Horario</button>
                    </form>

                    <h2>🗓️ Mis Horarios y Eventos</h2>
                    {horarios.length === 0 ? (
                        <p className="text-center">Aún no hay horarios o eventos añadidos.</p>
                    ) : (
                        <div className="list-container">
                            <ul>
                                {horarios.map((horario) => (
                                    <li key={horario._id} className="list-item">
                                        <h4>{horario.nombreEvento} ({horario.tipo})</h4>
                                        {horario.asignatura && <p><strong>Asignatura:</strong> {horario.asignatura.nombre}</p>}
                                        <p><strong>Cuándo:</strong> {horario.diaSemana} de {horario.horaInicio} a {horario.horaFin}</p>
                                        {horario.ubicacion && <p><strong>Dónde:</strong> {horario.ubicacion}</p>}
                                        <div className="actions">
                                            <button className="delete-btn" onClick={() => handleDeleteHorario(horario._id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;
