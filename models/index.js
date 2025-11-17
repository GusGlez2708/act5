/**
 * CORRECCIÓN 2:
 * Se restaura el 'models/index.js' a su rol original de "agregador".
 * Simplemente importa todos los modelos y los vuelve a exportar.
 */

// Importar todos los modelos existentes
const { Profile } = require('./ProfileModel');
const { State } = require('./StateModel');
const { Category } = require('./CategoryModel');
const { User } = require('./UserModel');
const { New } = require('./NewModel');

// --- AÑADIR ESTA LÍNEA PARA EL NUEVO MODELO ---
const { NaveImperial } = require('./NaveImperialModel');
// ------------------------------------------

// Exportar todos los modelos como un solo objeto
module.exports = {
    Profile,
    State,
    Category,
    User,
    New,
    NaveImperial // Añadir el nuevo modelo a la exportación
};