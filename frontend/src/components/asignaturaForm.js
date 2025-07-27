// frontend/src/components/AsignaturaForm.js

import React, { useState, useEffect } from 'react';

function AsignaturaForm({ onAddAsignatura, editingAsignatura, onUpdateAsignatura, onCancelEdit }) {
    const initialState = {
        nombre: '', codigo: '', creditos: '', semestre: '', aprobada: false, notas: ''
    };
    const [asignatura, setAsignatura] = useState(initialState);

    useEffect(() => {
        if (editingAsignatura) {
            setAsignatura({
                ...editingAsignatura,
                creditos: editingAsignatura.creditos.toString(),
                semestre: editingAsignatura.semestre.toString(),
                notas: editingAsignatura.notas !== null ? editingAsignatura.notas.toString() : ''
            });
        } else {
            setAsignatura(initialState);
        }
    }, [editingAsignatura]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingAsignatura) {
            onUpdateAsignatura(asignatura);
        } else {
            onAddAsignatura(asignatura);
        }
        setAsignatura(initialState);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>{editingAsignatura ? '📝 Editar Asignatura' : '➕ Añadir Nueva Asignatura'}</h2>
            <div className="form-group">
                <label htmlFor="nombreAsignatura">Nombre de la Asignatura:</label>
                <input
                    type="text"
                    id="nombreAsignatura"
                    placeholder="Ej: Cálculo I"
                    value={asignatura.nombre}
                    onChange={(e) => setAsignatura({ ...asignatura, nombre: e.target.value })}
                    required
                />
                <p className="explanation">Ingresa el nombre completo de la asignatura (ej., 'Introducción a la Programación').</p>
            </div>
            <div className="form-group">
                <label htmlFor="codigoAsignatura">Código:</label>
                <input
                    type="text"
                    id="codigoAsignatura"
                    placeholder="Ej: INF101 (Debe ser único)"
                    value={asignatura.codigo}
                    onChange={(e) => setAsignatura({ ...asignatura, codigo: e.target.value.toUpperCase() })}
                    required
                />
                <p className="explanation">Código único de la asignatura (ej., 'MAT101', 'FIS203'). Usa mayúsculas.</p>
            </div>
            <div className="form-group">
                <label htmlFor="creditosAsignatura">Créditos:</label>
                <input
                    type="number"
                    id="creditosAsignatura"
                    placeholder="Ej: 5"
                    value={asignatura.creditos}
                    onChange={(e) => setAsignatura({ ...asignatura, creditos: e.target.value })}
                    required
                />
                <p className="explanation">Número de créditos que otorga la asignatura.</p>
            </div>
            <div className="form-group">
                <label htmlFor="semestreAsignatura">Semestre:</label>
                <input
                    type="number"
                    id="semestreAsignatura"
                    placeholder="Ej: 1"
                    value={asignatura.semestre}
                    onChange={(e) => setAsignatura({ ...asignatura, semestre: e.target.value })}
                    required
                />
                <p className="explanation">El semestre de la carrera en que usualmente se cursa esta asignatura.</p>
            </div>
            <div className="form-group">
                <label htmlFor="notasAsignatura">Nota Final (Opcional):</label>
                <input
                    type="number"
                    step="0.1"
                    id="notasAsignatura"
                    placeholder="Ej: 6.5"
                    value={asignatura.notas}
                    onChange={(e) => setAsignatura({ ...asignatura, notas: e.target.value })}
                />
                <p className="explanation">Tu calificación final en esta asignatura (si ya la tomaste).</p>
            </div>
            <div className="form-group checkbox-group">
                <input
                    type="checkbox"
                    id="aprobadaAsignatura"
                    checked={asignatura.aprobada}
                    onChange={(e) => setAsignatura({ ...asignatura, aprobada: e.target.checked })}
                />
                <label htmlFor="aprobadaAsignatura">Aprobada</label>
                <p className="explanation">Marca si ya has aprobado esta asignatura.</p>
            </div>
            <div className="form-actions">
                <button type="submit">
                    {editingAsignatura ? '✅ Actualizar Asignatura' : '💾 Guardar Asignatura'}
                </button>
                {editingAsignatura && (
                    <button type="button" onClick={onCancelEdit} className="cancel-btn">
                        ❌ Cancelar Edición
                    </button>
                )}
            </div>
        </form>
    );
}

export default AsignaturaForm;  