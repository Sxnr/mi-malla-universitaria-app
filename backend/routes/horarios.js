const express = require('express');
const router = express.Router();
const Horario = require('../models/horario');

// Obtener todos los horarios
router.get('/', async (req, res) => {
    try {
        const horarios = await Horario.find().populate('asignatura');
        res.json(horarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un nuevo horario
router.post('/', async (req, res) => {
    const horario = new Horario({
        nombreEvento: req.body.nombreEvento,
        asignatura: req.body.asignatura,
        tipo: req.body.tipo,
        diaSemana: req.body.diaSemana,
        horaInicio: req.body.horaInicio,
        horaFin: req.body.horaFin,
        ubicacion: req.body.ubicacion,
        fecha: req.body.fecha
    });
    try {
        const newHorario = await horario.save();
        res.status(201).json(newHorario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un horario
router.put('/:id', async (req, res) => {
    try {
        const updatedHorario = await Horario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedHorario) return res.status(404).json({ message: 'Horario no encontrado' });
        res.json(updatedHorario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un horario
router.delete('/:id', async (req, res) => {
    try {
        const deletedHorario = await Horario.findByIdAndDelete(req.params.id);
        if (!deletedHorario) return res.status(404).json({ message: 'Horario no encontrado' });
        res.json({ message: 'Horario eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;