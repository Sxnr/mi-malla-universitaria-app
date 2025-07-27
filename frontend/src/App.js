
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Si quieres mantener el CSS predeterminado o crear el tuyo

const API_URL = 'http://localhost:5000/api'; // URL de tu backend

function App() {
    const [asignaturas, setAsignaturas] = useState([]);
    const [nuevaAsignatura, setNuevaAsignatura] = useState({
        nombre: '', codigo: '', creditos: '', semestre: ''
    });
    const [horarios, setHorarios] = useState([]);
    const [nuevoHorario, setNuevoHorario] = useState({
        nombreEvento: '', tipo: '', diaSemana: '', horaInicio: '', horaFin: '', ubicacion: ''
    });

    // Cargar asignaturas al iniciar la app
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
            await axios.post(`${API_URL}/asignaturas`, nuevaAsignatura);
            setNuevaAsignatura({ nombre: '', codigo: '', creditos: '', semestre: '' });
            fetchAsignaturas(); // Recargar la lista
        } catch (error) {
            console.error('Error al agregar asignatura:', error);
        }
    };

    const handleAddHorario = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/horarios`, nuevoHorario);
            setNuevoHorario({ nombreEvento: '', tipo: '', diaSemana: '', horaInicio: '', horaFin: '', ubicacion: '' });
            fetchHorarios(); // Recargar la lista
        } catch (error) {
            console.error('Error al agregar horario:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Mi Malla Curricular y Horarios</h1>
            </header>

            <main>
                <section>
                    <h2>Asignaturas</h2>
                    <form onSubmit={handleAddAsignatura}>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nuevaAsignatura.nombre}
                            onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, nombre: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Código"
                            value={nuevaAsignatura.codigo}
                            onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, codigo: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Créditos"
                            value={nuevaAsignatura.creditos}
                            onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, creditos: Number(e.target.value) })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Semestre"
                            value={nuevaAsignatura.semestre}
                            onChange={(e) => setNuevaAsignatura({ ...nuevaAsignatura, semestre: Number(e.target.value) })}
                            required
                        />
                        <button type="submit">Agregar Asignatura</button>
                    </form>

                    <h3>Lista de Asignaturas</h3>
                    <ul>
                        {asignaturas.map((asignatura) => (
                            <li key={asignatura._id}>
                                {asignatura.nombre} ({asignatura.codigo}) - {asignatura.creditos} créditos, Semestre {asignatura.semestre}
                                {asignatura.aprobada && " (Aprobada)"}
                            </li>
                        ))}
                    </ul>
                </section>

                <hr />

                <section>
                    <h2>Horarios</h2>
                    <form onSubmit={handleAddHorario}>
                        <input
                            type="text"
                            placeholder="Nombre Evento"
                            value={nuevoHorario.nombreEvento}
                            onChange={(e) => setNuevoHorario({ ...nuevoHorario, nombreEvento: e.target.value })}
                            required
                        />
                        <select
                            value={nuevoHorario.tipo}
                            onChange={(e) => setNuevoHorario({ ...nuevoHorario, tipo: e.target.value })}
                            required
                        >
                            <option value="">Seleccionar Tipo</option>
                            <option value="Clase">Clase</option>
                            <option value="Laboratorio">Laboratorio</option>
                            <option value="Examen">Examen</option>
                            <option value="Evento">Evento</option>
                        </select>
                        <select
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
                        <input
                            type="time"
                            value={nuevoHorario.horaInicio}
                            onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaInicio: e.target.value })}
                            required
                        />
                        <input
                            type="time"
                            value={nuevoHorario.horaFin}
                            onChange={(e) => setNuevoHorario({ ...nuevoHorario, horaFin: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Ubicación (Aula/Online)"
                            value={nuevoHorario.ubicacion}
                            onChange={(e) => setNuevoHorario({ ...nuevoHorario, ubicacion: e.target.value })}
                        />
                        <button type="submit">Agregar Horario</button>
                    </form>

                    <h3>Lista de Horarios</h3>
                    <ul>
                        {horarios.map((horario) => (
                            <li key={horario._id}>
                                **{horario.nombreEvento}** ({horario.tipo}) - {horario.diaSemana} de {horario.horaInicio} a {horario.horaFin} en {horario.ubicacion}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default App;
