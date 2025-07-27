// frontend/src/components/AsignaturaList.js

import React from 'react';

function AsignaturaList({ asignaturas, onEditAsignatura, onDeleteAsignatura, onToggleAprobada }) {
    return (
        <div className="list-container">
            <h2>📚 Mis Asignaturas</h2>
            {asignaturas.length === 0 ? (
                <p className="text-center">Aún no hay asignaturas añadidas. ¡Empieza a agregarlas!</p>
            ) : (
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
                                <button onClick={() => onToggleAprobada(asignatura._id, asignatura.aprobada)}>
                                    {asignatura.aprobada ? 'Marcar Pendiente' : 'Marcar Aprobada'}
                                </button>
                                <button className="edit-btn" onClick={() => onEditAsignatura(asignatura)}>
                                    Editar
                                </button>
                                <button className="delete-btn" onClick={() => onDeleteAsignatura(asignatura._id)}>
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

export default AsignaturaList;