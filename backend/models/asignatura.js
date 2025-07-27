const mongoose = require('mongoose');

const AsignaturaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    creditos: { type: Number, required: true },
    semestre: { type: Number, required: true },
    aprobada: { type: Boolean, default: false },
    prerrequisitos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asignatura' }],
    notas: { type: Number, default: null } // Podría ser un array de objetos si hay varias notas
});

module.exports = mongoose.models.Asignatura || mongoose.model('asignatura', AsignaturaSchema);