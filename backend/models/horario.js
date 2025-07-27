const mongoose = require('mongoose');

const HorarioSchema = new mongoose.Schema({
    nombreEvento: { type: String, required: true },
    asignatura: { type: mongoose.Schema.Types.ObjectId, ref: 'Asignatura', default: null }, // Opcional
    tipo: { type: String, enum: ['Clase', 'Laboratorio', 'Examen', 'Evento'], required: true },
    diaSemana: { type: String, enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], required: true },
    horaInicio: { type: String, required: true }, // Formato 'HH:MM'
    horaFin: { type: String, required: true },   // Formato 'HH:MM'
    ubicacion: { type: String },
    fecha: { type: Date } // Para eventos específicos como exámenes
});

module.exports = mongoose.models.Horario || mongoose.model('horario', HorarioSchema);