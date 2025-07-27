// frontend/src/pages/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Asegúrate de importar tu CSS

function HomePage() {
    return (
        <div className="home-page">
            {/* Quitamos el <header className="App-header"> de aquí */}
            <main className="home-main">
                {/* Ahora el encabezado está dentro del main, que ya tiene max-width y se centra */}
                <header className="home-header-content"> {/* Nuevo div para el contenido del encabezado */}
                    <h1>📚 ¡Bienvenido a tu Organizador Universitario! 🗓️</h1>
                    <p>Gestiona tu malla curricular y tus horarios de forma sencilla.</p>
                </header>

                <section className="home-section">
                    <h2>¿Qué quieres hacer hoy?</h2>
                    <div className="button-grid">
                        <Link to="/asignaturas" className="home-button">
                            <span role="img" aria-label="Book Icon">📖</span>
                            Gestionar Asignaturas
                            <p>Añade, edita y revisa tus cursos.</p>
                        </Link>
                        <Link to="/horarios" className="home-button">
                            <span role="img" aria-label="Calendar Icon">⏰</span>
                            Gestionar Horarios
                            <p>Organiza tus clases, exámenes y eventos.</p>
                        </Link>
                        {/* Puedes añadir más enlaces aquí en el futuro */}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;