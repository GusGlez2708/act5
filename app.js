const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config.db');
const { setupDatabase } = require('./setup-database');
const { requestLogger } = require('./middlewares/requestLogger.middleware');
const { seedDatabase } = require('./seedDatabase');
const { PORT } = require('./config');

// Importar rutas
const authRoutes = require('./routes/AuthRoute');
const usersRoutes = require('./routes/users.routes');
const navesRoutes = require('./routes/naves.routes');
const emperadoresRoutes = require('./routes/emperadores.routes');
const misionesRoutes = require('./routes/misiones.routes');

// Importar todos los modelos para asegurar que las relaciones se establezcan
require('./models');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/naves', navesRoutes);
app.use('/api/emperadores', emperadoresRoutes);
app.use('/api/misiones', misionesRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🌌 API Imperial del Backend - Servidor activo',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            naves: '/api/naves',
            emperadores: '/api/emperadores',
            misiones: '/api/misiones'
        }
    });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
        available_routes: {
            auth: '/api/auth',
            users: '/api/users',
            naves: '/api/naves',
            emperadores: '/api/emperadores',
            misiones: '/api/misiones'
        }
    });
});

// Middleware global de manejo de errores
app.use((error, req, res, next) => {
    console.error('❌ Error no manejado:', error);
    
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
});

// Función para inicializar el servidor
const startServer = async () => {
    try {
        // Configurar base de datos (crear si no existe)
        await setupDatabase();
        
        // Conectar a la base de datos
        await connectToDatabase();
        
        // Poblar la base de datos con datos iniciales
        await seedDatabase();
        
        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log('🚀 ==========================================');
            console.log(`🌌 API Imperial - Servidor iniciado`);
            console.log(`📡 Puerto: ${PORT}`);
            console.log(`🌐 URL: http://localhost:${PORT}`);
            console.log('🚀 ==========================================');
            console.log('');
            console.log('📋 Endpoints disponibles:');
            console.log(`   /api/auth`);
            console.log(`   /api/users`);
            console.log(`   /api/naves`);
            console.log(`   /api/emperadores`);
            console.log(`   /api/misiones`);
            console.log('');
        });
        
    } catch (error) {
        console.error('❌ Error al inicializar el servidor:', error);
        process.exit(1);
    }
};

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    console.error('❌ Error no capturado:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada no manejada:', reason);
    process.exit(1);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
    console.log('🛑 Señal SIGTERM recibida, cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Señal SIGINT recibida, cerrando servidor...');
    process.exit(0);
});

// Inicializar el servidor
startServer();

module.exports = app;