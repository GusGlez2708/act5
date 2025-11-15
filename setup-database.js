const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('./config.js');
const { seedDatabase } = require('./seedDatabase.js');

const setupDatabase = async () => {
    console.log('🔧 Configurando la base de datos...');

    try {
        // Crear conexión sin especificar base de datos
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT
        });

        console.log('✅ Conexión establecida con MySQL');

        // Crear la base de datos si no existe
        await connection.execute(`CREATE DATABASE IF NOT EXISTS 
${DB_NAME}
 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
        console.log(`✅ Base de datos '${DB_NAME}' creada o ya existe`);

        // Cerrar conexión
        await connection.end();
        console.log('✅ Configuración de base de datos completada');

        // Poblar la base de datos
        await seedDatabase();
        
    } catch (error) {
        console.error('❌ Error al configurar la base de datos:', error.message);
        console.error('💡 Verifica que:');
        console.error('   - XAMPP esté ejecutándose');
        console.error('   - MySQL esté activo en XAMPP');
        console.error('   - Las credenciales sean correctas');
        console.error('   - El puerto sea el correcto (3306)');
        process.exit(1);
    }
};

// Ejecutar si es llamado directamente
if (require.main === module) {
    setupDatabase();
}

module.exports = { setupDatabase };
