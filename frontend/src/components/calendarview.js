
import React, { useState, useEffect } from 'react';

// Función para convertir HH:MM a minutos desde la medianoche
const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Función para convertir minutos a HH:MM (para etiquetas de hora)
const minutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const CalendarView = ({ horarios }) => {
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const daysToShowInitial = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const [visibleDays, setVisibleDays] = useState(daysToShowInitial);

    // Rango de horas (en minutos desde medianoche)
    const START_HOUR = 8 * 60;  // 8:00 AM
    const END_HOUR = 20 * 60;    // 8:00 PM
    const TIME_SLOT_HEIGHT_PX = 50; // Altura en píxeles para 1 hora (o 2 slots de 30min)

    useEffect(() => {
        // Detectar si hay eventos en Sábado o Domingo
        const hasSaturday = horarios.some(h => h.diaSemana === 'Sábado');
        const hasSunday = horarios.some(h => h.diaSemana === 'Domingo');

        let newVisibleDays = [...daysToShowInitial];
        if (hasSaturday) {
            if (!newVisibleDays.includes('Sábado')) newVisibleDays.push('Sábado');
        }
        if (hasSunday) {
            if (!newVisibleDays.includes('Domingo')) newVisibleDays.push('Domingo');
        }
        // Asegurarse de que el orden sea correcto si se añaden
        newVisibleDays = daysOfWeek.filter(day => newVisibleDays.includes(day));
        setVisibleDays(newVisibleDays);

    }, [horarios]); // Recalcular días visibles cuando los horarios cambien

    // Generar las etiquetas de tiempo (ej. "08:00", "09:00", etc.)
    const timeLabels = [];
    for (let i = START_HOUR; i <= END_HOUR; i += 60) { // Incrementa de 60 en 60 minutos (cada hora)
        timeLabels.push(minutesToTime(i));
    }

    // Calcular la posición y altura de cada evento
    const getEventStyle = (horario) => {
        const startMinutes = timeToMinutes(horario.horaInicio);
        const endMinutes = timeToMinutes(horario.horaFin);
        const durationMinutes = endMinutes - startMinutes;

        // Calcular 'top' en píxeles: (minutos_desde_inicio_calendario / 60) * altura_por_hora_en_px
        const topPx = ((startMinutes - START_HOUR) / 60) * TIME_SLOT_HEIGHT_PX;

        // Calcular 'height' en píxeles: (duracion_minutos / 60) * altura_por_hora_en_px
        const heightPx = (durationMinutes / 60) * TIME_SLOT_HEIGHT_PX;

        return {
            top: `${topPx}px`,
            height: `${heightPx}px`,
            // Opcional: Para manejar solapamiento básico, puedes calcular 'left' y 'width'
            // basado en cuántos eventos se solapan en esa franja de tiempo
            // Esto es más avanzado y lo dejamos simple por ahora.
        };
    };

    return (
        <div className="calendar-grid" style={{ '--num-days': visibleDays.length }}>
            {/* Esquina superior izquierda vacía */}
            <div className="calendar-header-cell"></div>

            {/* Encabezados de los días */}
            {visibleDays.map(day => (
                <div key={day} className="calendar-header-cell">{day}</div>
            ))}

            {/* Bloques de tiempo y celdas de días */}
            {Array.from({ length: (END_HOUR - START_HOUR) / 30 }).map((_, timeIndex) => {
                const currentMinutes = START_HOUR + timeIndex * 30; // 30 minutos por slot
                const isFullHour = currentMinutes % 60 === 0;

                return (
                    <React.Fragment key={currentMinutes}>
                        {/* Etiqueta de la hora (solo en la hora completa) */}
                        {isFullHour && (
                            <div
                                className="time-slot-label"
                                style={{ gridRow: `span 2` }} /* Ocupa 2 celdas de 30min */
                            >
                                {minutesToTime(currentMinutes)}
                            </div>
                        )}

                        {/* Celdas para cada día */}
                        {visibleDays.map(day => (
                            <div key={`${day}-${currentMinutes}`} className="calendar-cell"></div>
                        ))}
                    </React.Fragment>
                );
            })}

            {/* Renderizar los eventos */}
            {visibleDays.map(day => (
                <div key={`column-${day}`} className="calendar-day-column"
                     style={{ gridColumn: visibleDays.indexOf(day) + 2, gridRow: `2 / span ${((END_HOUR - START_HOUR) / 30) * 2}` }}
                >
                    {horarios
                        .filter(h => h.diaSemana === day && timeToMinutes(h.horaFin) > START_HOUR && timeToMinutes(h.horaInicio) < END_HOUR) // Filtrar por día y rango de horas
                        .map(horario => (
                            <div
                                key={horario._id}
                                className={`calendar-event type-${horario.tipo}`}
                                style={getEventStyle(horario)}
                                title={`${horario.nombreEvento} (${horario.horaInicio}-${horario.horaFin})`}
                            >
                                <strong>{horario.nombreEvento}</strong>
                                {horario.asignatura && <div className="calendar-event-details">{horario.asignatura.codigo}</div>}
                                <div className="calendar-event-details">{horario.horaInicio} - {horario.horaFin}</div>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default CalendarView;