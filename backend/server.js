const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite a Express parsear JSON en las peticiones

// Rutas
const asignaturasRoutes = require('./routes/asignaturas');
const horariosRoutes = require('./routes/horarios');

app.use('/api/asignaturas', asignaturasRoutes);
app.use('/api/horarios', horariosRoutes);


// Conexión a MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado con éxito!'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas (API Endpoints) - Aún no creadas, solo un ejemplo
app.get('/', (req, res) => {
    res.send('API de Malla Curricular y Horarios funcionando!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});