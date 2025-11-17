/**
 * ARCHIVO 2 (DE 3)
 * Este archivo es el "agregador".
 * Importa todos los modelos (incluyendo el nuevo) y los exporta como un solo objeto.
 * (Esta es la CORRECCIÓN 2, que es correcta).
 */

// Importar todos los modelos existentes
const { Profile } = require('./ProfileModel');
const { State } = require('./StateModel');
const { Category } = require('./CategoryModel');
const { User } = require('./UserModel');
const { New } = require('./NewModel');

// --- AÑADIR ESTA LÍNEA PARA EL NUEVO MODELO ---
const { NaveImperial } = require('./NaveImperialModel');

// Exportar todos los modelos como un solo objeto
module.exports = {
    Profile,
    State,
    Category,
    User,
    New,
    NaveImperial // <-- Añadir el nuevo modelo a la exportación
};