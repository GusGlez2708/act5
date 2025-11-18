const bcrypt = require('bcrypt');
// Importa SOLO los modelos que existen en tu models/index.js
const { User, Profile } = require('./models'); 

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando poblado de la base de datos...');

    // 1. Verificar si ya existen perfiles
    const profileCount = await Profile.count();
    if (profileCount > 0) {
      console.log('📊 La base de datos ya contiene perfiles, omitiendo poblado inicial.');
      return;
    }

    // 2. Crear Perfiles
    console.log('📝 Creando perfiles...');
    const profiles = await Profile.bulkCreate([
      { id: 1, nombre_perfil: 'Admin' }, // Usamos el nombre de columna del SQL
      { id: 2, nombre_perfil: 'Editor' } // Usamos el nombre de columna del SQL
    ]);

    // 3. Crear Usuarios
    console.log('👥 Creando usuarios...');
    const adminPassword = await bcrypt.hash('cursoexpressjs', 10); // O la contraseña que quieras
    const userPassword = await bcrypt.hash('123456', 10);

    await User.bulkCreate([
      {
        profile_id: profiles[0].id, // Administrador
        nombre: 'Administrador',
        apellidos: 'General',
        nick: 'Admin',
        email: 'admin@gmail.com', // 'email' en lugar de 'correo'
        password: adminPassword, // 'password' en lugar de 'contraseña'
        // UserAlta, Fechas, etc., se llenan con defaults o se omiten si tu modelo lo permite
      },
      {
        profile_id: profiles[1].id, // Editor
        nombre: 'Jhon',
        apellidos: 'Boston',
        nick: 'jhonBoston1',
        email: 'jhon@gmail.com',
        password: userPassword,
      }
    ]);

    console.log('✅ Base de datos poblada exitosamente con Perfiles y Usuarios.');
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    throw error;
  }
};

module.exports = { seedDatabase };