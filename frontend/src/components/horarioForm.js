// frontend/src/components/HorarioForm.js

import React, { useState, useEffect } from 'react';

function HorarioForm({ asignaturas, onAddHorario, editingHorario, onUpdateHorario, onCancelEdit }) {
    const initialState = {
        nombreEvento: '', asignatura: '', tipo: '', diaSemana: '', horaInicio: '', horaFin: '', ubicacion: ''
    };
    const [horario, setHorario] = useState(initialState);

    useEffect(() => {
        if (editingHorario) {
            setHorario({
                ...editingHorario,
                asignatura: editingHorario.asignatura ? editingHorario.asignatura._id : ''
            });
        } else {
            setHorario(initialState);
        }
    }, [editingHorario]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingHorario) {
            onUpdateHorario(horario);
        } else {
            onAddHorario(horario);
        }
        setHorario(initialState);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>{editingHorario ? '📝 Editar Horario/Evento' : '📅 Añadir Nuevo Horario/Evento'}</h2>
            <div className="form-group">
                <label htmlFor="nombreEvento">Nombre del Evento:</label>
                <input
                    type="text"
                    id="nombreEvento"
                    placeholder="Ej: Clase de Cálculo I"
                    value={horario.nombreEvento}
                    onChange={(e) => setHorario({ ...horario, nombreEvento: e.target.value })}
                    required
                />
                <p className="explanation">Dale un nombre descriptivo a tu evento (ej., 'Clase de Álgebra', 'Examen Final').</p>
            </div>
            <div className="form-group">
                <label htmlFor="asignaturaRelacionada">Asignatura Relacionada (Opcional):</label>
                <select
                    id="asignaturaRelacionada"
                    value={horario.asignatura}
                    onChange={(e) => setHorario({ ...horario, asignatura: e.target.value })}
                >
                    <option value="">-- Seleccionar Asignatura --</option>
                    {asignaturas.map(a => (
                        <option key={a._id} value={a._id}>{a.nombre} ({a.codigo})</option>
                    ))}
                </select>
                <p className="explanation">Asocia este evento a una asignatura específica (opcional).</p>
            </div>
            <div className="form-group">
                <label htmlFor="tipoEvento">Tipo de Evento:</label>
                <select
                    id="tipoEvento"
                    value={horario.tipo}
                    onChange={(e) => setHorario({ ...horario, tipo: e.target.value })}
                    required
                >
                    <option value="">Seleccionar Tipo</option>
                    <option value="Clase">Clase</option>
                    <option value="Laboratorio">Laboratorio</option>
                    <option value="Examen">Examen</option>
                    <option value="Evento">Evento General</option>
                </select>
                <p className="explanation">Define si es una clase regular, un laboratorio, un examen o un evento general.</p>
            </div>
            <div className="form-group">
                <label htmlFor="diaSemana">Día de la Semana:</label>
                <select
                    id="diaSemana"
                    value={horario.diaSemana}
                    onChange={(e) => setHorario({ ...horario, diaSemana: e.target.value })}
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
                <p className="explanation">El día de la semana en que ocurre este evento.</p>
            </div>
            <div className="form-group">
                <label htmlFor="horaInicio">Hora de Inicio:</label>
                <input
                    type="time"
                    id="horaInicio"
                    value={horario.horaInicio}
                    onChange={(e) => setHorario({ ...horario, horaInicio: e.target.value })}
                    required
                />
                <p className="explanation">Hora de inicio del evento (ej., '08:00', '14:30').</p>
            </div>
            <div className="form-group">
                <label htmlFor="horaFin">Hora de Fin:</label>
                <input
                    type="time"
                    id="horaFin"
                    value={horario.horaFin}
                    onChange={(e) => setHorario({ ...horario, horaFin: e.target.value })}
                    required
                />
                <p className="explanation">Hora de finalización del evento.</p>
            </div>
            <div className="form-group">
                <label htmlFor="ubicacion">Ubicación (Aula/Online):</label>
                <input
                    type="text"
                    id="ubicacion"
                    placeholder="Ej: Sala B201 / Zoom Link"
                    value={horario.ubicacion}
                    onChange={(e) => setHorario({ ...horario, ubicacion: e.target.value })}
                />
                <p className="explanation">Dónde se realizará el evento (ej., 'Aula 305', 'Laboratorio de Informática', 'Zoom').</p>
            </div>
            <div className="form-actions">
                <button type="submit">
                    {editingHorario ? '✅ Actualizar Horario' : '💾 Guardar Horario'}
                </button>
                {editingHorario && (
                    <button type="button" onClick={onCancelEdit} className="cancel-btn">
                        ❌ Cancelar Edición
                    </button>
                )}
            </div>
        </form>
    );
}

export default HorarioForm;