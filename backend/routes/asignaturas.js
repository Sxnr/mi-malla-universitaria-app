const express = require('express');
const router = express.Router();
const Asignatura = require('../models/asignatura');

// Obtener todas las asignaturas
router.get('/', async (req, res) => {
    try {
        const asignaturas = await Asignatura.find().populate('prerrequisitos');
        res.json(asignaturas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener una asignatura por ID
router.get('/:id', async (req, res) => {
    try {
        const asignatura = await Asignatura.findById(req.params.id).populate('prerrequisitos');
        if (!asignatura) return res.status(404).json({ message: 'Asignatura no encontrada' });
        res.json(asignatura);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nueva asignatura
router.post('/', async (req, res) => {
    const asignatura = new Asignatura({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        creditos: req.body.creditos,
        semestre: req.body.semestre,
        aprobada: req.body.aprobada || false,
        prerrequisitos: req.body.prerrequisitos || [],
        notas: req.body.notas || null
    });
    try {
        const newAsignatura = await asignatura.save();
        res.status(201).json(newAsignatura);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar una asignatura
router.put('/:id', async (req, res) => {
    try {
        const updatedAsignatura = await Asignatura.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // new: true devuelve el documento actualizado; runValidators: true ejecuta las validaciones del schema
        );
        if (!updatedAsignatura) return res.status(404).json({ message: 'Asignatura no encontrada' });
        res.json(updatedAsignatura);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar una asignatura
router.delete('/:id', async (req, res) => {
    try {
        const deletedAsignatura = await Asignatura.findByIdAndDelete(req.params.id);
        if (!deletedAsignatura) return res.status(404).json({ message: 'Asignatura no encontrada' });
        res.json({ message: 'Asignatura eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;