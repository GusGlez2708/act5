const bcrypt = require('bcrypt');
const { Profile, State, Category, User, New } = require('./models');

const seedDatabase = async () => {
    try {
        console.log('🌱 Iniciando poblado de la base de datos...');

        // Verificar si ya existen datos
        const profileCount = await Profile.count();
        const categoryCount = await Category.count();
        const newCount = await New.count();

        if (profileCount > 0) {
            console.log('📊 La base de datos ya contiene datos, omitiendo poblado inicial.');
            console.log(`📄 Resumen de datos existentes:
        - ${profileCount} perfiles
        - ${categoryCount} categorías
        - ${newCount} noticias`);
            return;
        }

        // Crear Perfiles
        console.log('📝 Creando perfiles...');
        const profiles = await Profile.bulkCreate([
            { nombre: 'Administrador' },
            { nombre: 'Contribuidor' }
        ]);

        // Crear Estados
        console.log('🗺️ Creando estados...');
        const states = await State.bulkCreate([
            {
                nombre: 'Yucatán',
                abreviacion: 'YUC',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                nombre: 'Baja California',
                abreviacion: 'BC',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                nombre: 'Campeche',
                abreviacion: 'CAM',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                nombre: 'Chiapas',
                abreviacion: 'CHI',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                nombre: 'Chihuahua',
                abreviacion: 'CHIH',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            }
        ]);

        // Crear Categorías
        console.log('📂 Creando categorías...');
        const categories = await Category.bulkCreate([
            {
                nombre: 'Salud Médica',
                descripcion: 'Noticias más importantes acerca de la salud',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                nombre: 'Ecología y fauna',
                descripcion: 'Todo lo importante acerca de los seres vivos en nuestro país',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            }
        ]);

        // Crear Usuarios
        console.log('👥 Creando usuarios...');
        const adminPassword = await bcrypt.hash('cursoexpressjs', 10);
        const userPassword = await bcrypt.hash('123456', 10);

        const users = await User.bulkCreate([
            {
                perfil_id: profiles[0].id, // Administrador
                nombre: 'Administrador',
                apellidos: 'General',
                nick: 'Admin',
                correo: 'admin@gmail.com',
                contraseña: adminPassword,
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                perfil_id: profiles[1].id, // Contribuidor
                nombre: 'Jhon',
                apellidos: 'Boston',
                nick: 'jhonBoston1',
                correo: 'jhon@gmail.com',
                contraseña: userPassword,
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            }
        ]);

        // Crear Noticias
        console.log('📰 Creando noticias...');
        await New.bulkCreate([
            {
                categoria_id: categories[1].id, // Ecología y fauna
                estado_id: states[0].id, // Yucatán
                usuario_id: users[0].id, // Admin
                titulo: 'Descubren nueva especie de mariposa',
                fecha_publicacion: new Date('2023-08-14 12:00:00'),
                descripcion: 'Científicos han anunciado el descubrimiento de una nueva especie de mariposa en una expedición a la selva amazónica. La especie, llamada "Morpho amazonica", posee colores y patrones únicos en sus alas.',
                imagen: 'imagen.png',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                categoria_id: categories[0].id, // Salud Médica
                estado_id: states[1].id, // Baja California
                usuario_id: users[1].id, // Jhon
                titulo: 'Avance médico: Terapia génica muestra promesa',
                fecha_publicacion: new Date('2023-08-15 12:00:00'),
                descripcion: 'Investigadores informan avances significativos en el uso de terapia génica para tratar enfermedades raras. En ensayos clínicos, pacientes con afecciones genéticas hereditarias han experimentado mejoras notables después del tratamiento.',
                imagen: 'imagen.png',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                categoria_id: categories[1].id, // Ecología y fauna
                estado_id: states[2].id, // Campeche
                usuario_id: users[0].id, // Admin
                titulo: 'Se registra aumento en la población de aves',
                fecha_publicacion: new Date('2023-08-16 12:00:00'),
                descripcion: 'Los esfuerzos de conservación están dando frutos mientras la población de pandas gigantes en su hábitat natural experimenta un aumento. Los expertos atribuyen este éxito a medidas de protección y programas de reproducción en cautiverio.',
                imagen: 'imagen.png',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                categoria_id: categories[0].id, // Salud Médica
                estado_id: states[3].id, // Chiapas
                usuario_id: users[1].id, // Jhon
                titulo: 'Nueva investigación revela datos sobre el sueño',
                fecha_publicacion: new Date('2023-08-17 12:00:00'),
                descripcion: 'Un estudio reciente sugiere que la calidad del sueño puede tener un impacto significativo en la salud cardiovascular. Los resultados muestran que patrones de sueño irregulares podrían aumentar el riesgo de enfermedades del corazón.',
                imagen: 'imagen.png',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            },
            {
                categoria_id: categories[1].id, // Ecología y fauna
                estado_id: states[4].id, // Chihuahua
                usuario_id: users[0].id, // Admin
                titulo: 'Avance en la lucha contra la contaminación',
                fecha_publicacion: new Date('2023-08-18 12:00:00'),
                descripcion: 'Científicos anuncian el desarrollo de un nuevo material biodegradable que podría ayudar a reducir la contaminación plástica en los océanos. Este avance prometedor ofrece esperanzas para abordar uno de los mayores desafíos ambientales de nuestro tiempo.',
                imagen: 'imagen.png',
                UserAlta: 'Admin',
                FechaAlta: new Date('1990-01-01'),
                FechaMod: new Date('1990-01-01'),
                FechaBaja: new Date('1990-01-01')
            }
        ]);

        console.log('✅ Base de datos poblada exitosamente con datos iniciales');
        console.log(`📊 Resumen:
        - ${profiles.length} perfiles creados
        - ${states.length} estados creados
        - ${categories.length} categorías creadas
        - ${users.length} usuarios creados
        - 5 noticias creadas`);

    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
        throw error;
    }
};

module.exports = { seedDatabase };