// Importar todos los modelos para establecer relaciones
const { Profile } = require('./ProfileModel');
const { State } = require('./StateModel');
const { Category } = require('./CategoryModel');
const { User } = require('./UserModel');
const { New } = require('./NewModel');

// Exportar todos los modelos
module.exports = {
    Profile,
    State,
    Category,
    User,
    New
};