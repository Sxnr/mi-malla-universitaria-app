// frontend/src/components/HorarioList.js

import React from 'react';

function HorarioList({ horarios, onEditHorario, onDeleteHorario }) {
    return (
        <div className="list-container">
            <h2>🗓️ Mis Horarios y Eventos</h2>
            {horarios.length === 0 ? (
                <p className="text-center">Aún no hay horarios o eventos añadidos.</p>
            ) : (
                <ul>
                    {horarios.map((horario) => (
                        <li key={horario._id} className="list-item">
                            <h4>{horario.nombreEvento} ({horario.tipo})</h4>
                            {horario.asignatura && horario.asignatura.nombre && (
                                <p><strong>Asignatura:</strong> {horario.asignatura.nombre} ({horario.asignatura.codigo})</p>
                            )}
                            <p><strong>Cuándo:</strong> {horario.diaSemana} de {horario.horaInicio} a {horario.horaFin}</p>
                            {horario.ubicacion && <p><strong>Dónde:</strong> {horario.ubicacion}</p>}
                            <div className="actions">
                                <button className="edit-btn" onClick={() => onEditHorario(horario)}>
                                    Editar
                                </button>
                                <button className="delete-btn" onClick={() => onDeleteHorario(horario._id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default HorarioList;