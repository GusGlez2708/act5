
**# INSTRUCCIÓN MAESTRA: Modificar el proyecto Backend (act5)

Proyecto: Sistema de Gestión de Flota Imperial (Temática Star Wars).

Objetivo: Crear un nuevo módulo CRUD completo dentro de la arquitectura de microservicios existente. El sistema debe estar listo para producción, usando variables de entorno para la configuración de la base de datos, sin hardcodear 'localhost'.

## PARTE 1: Backend (API Node.js/Express/Sequelize)

Arquitectura Base: El proyecto backend sigue un patrón de carpetas estricto: models, services, controllers, routes, validators, y middlewares. Debes adherirte a este patrón para todos los archivos nuevos.

### 1.1. Base de Datos (Modelo Sequelize para MySQL)

1. Crear Nuevo Modelo:

* Archivo: models/NaveImperialModel.js
* Definición: Define un modelo de Sequelize llamado NaveImperial (nombre de tabla: naves_imperiales).
* Campos:
* id: DataTypes.INTEGER, primaryKey: true, autoIncrement: true.
* nombre: DataTypes.STRING(100), allowNull: false (Ej: "Devastator", "Ejecutor").
* clase: DataTypes.STRING(100), allowNull: false (Ej: "Destructor Estelar clase Imperial-I", "Caza TIE/LN").
* tripulacion: DataTypes.INTEGER, allowNull: false (Ej: 37085).
* estado_operativo: DataTypes.ENUM('activo', 'en_reparacion', 'destruido'), allowNull: false, defaultValue: 'activo'.
* Timestamps: timestamps: true (para createdAt y updatedAt).

2. Actualizar Índice de Modelos:

* Archivo: models/index.js
* Acción: Importa NaveImperialModel.js y agrégalo al objeto db. Asegúrate de que se inicialice y se asocie correctamente si existe una función associate. (Ej: db.NaveImperial = require('./NaveImperialModel.js')(sequelize, Sequelize);).

### 1.2. Lógica de Negocio (Servicio)

1. Crear Nuevo Servicio:

* Archivo: services/naves.service.js
* Lógica: Debe contener la lógica de negocio pura para interactuar con el modelo NaveImperial. Importa db desde ../models.
* Funciones (todas async):
* getAllNaves(): Retorna db.NaveImperial.findAll().
* getNaveById(id): Retorna db.NaveImperial.findByPk(id).
* createNave(naveData): Retorna db.NaveImperial.create(naveData). naveData será un objeto con { nombre, clase, tripulacion, estado_operativo }.
* updateNave(id, naveData): Busca la nave por id. Si existe, la actualiza (nave.update(naveData)) y retorna la nave actualizada. Si no, retorna null.
* deleteNave(id): Busca la nave por id. Si existe, la destruye (nave.destroy()) y retorna true. Si no, retorna false.

### 1.3. Validaciones (Validator)

1. Crear Nuevo Validador:

* Archivo: validators/NaveValidator.js
* Lógica: Usa express-validator para crear reglas de validación.
* Exportar validateNave: Un array de middlewares de validación que se usará en las rutas POST y PUT.
* Reglas (body()):
* nombre: notEmpty().withMessage('El nombre es requerido').isString().isLength({ max: 100 }).
* clase: notEmpty().withMessage('La clase es requerida').isString().isLength({ max: 100 }).
* tripulacion: notEmpty().withMessage('La tripulación es requerida').isInt({ min: 0 }).withMessage('La tripulación debe ser un número entero positivo').
* estado_operativo: optional().isIn(['activo', 'en_reparacion', 'destruido']).withMessage('Estado no válido').

### 1.4. Controlador (Controller)

1. Crear Nuevo Controlador:

* Archivo: controllers/naves.controller.js
* Lógica: Maneja req y res. Llama al naves.service.js y maneja la validación de express-validator. Importa validationResult.
* Funciones (todas async):
* getAllNaves(req, res): Llama a navesService.getAllNaves(). Retorna 200 con la lista de naves o 500 si hay error.
* getNaveById(req, res): Llama a navesService.getNaveById(req.params.id). Retorna 200 con la nave si se encuentra, 404 si no, o 500 si hay error.
* createNave(req, res):
* Revisa validationResult(req). Si hay errores, retorna 400.
* Extrae { nombre, clase, tripulacion, estado_operativo } de req.body.
* Llama a navesService.createNave(naveData).
* Retorna 201 con la nueva nave creada o 500 si hay error.
* updateNave(req, res):
* Revisa validationResult(req). Si hay errores, retorna 400.
* Extrae naveData de req.body y id de req.params.
* Llama a navesService.updateNave(id, naveData).
* Retorna 200 con la nave actualizada, 404 si no se encontró, o 500 si hay error.
* deleteNave(req, res):
* Llama a navesService.deleteNave(req.params.id).
* Retorna 200 con { message: 'Nave eliminada' }, 404 si no se encontró, o 500 si hay error.

### 1.5. Rutas (Routes)

1. Crear Nuevo Archivo de Rutas:

* Archivo: routes/naves.routes.js
* Lógica: Define los endpoints de la API, importa el controlador, el validador y el middleware de autenticación.
* Middleware de Autenticación: Importa checkJwt desde ../middlewares/jwt.js.
* Endpoints:
* router.get('/', [checkJwt], navesController.getAllNaves)
* router.get('/:id', [checkJwt], navesController.getNaveById)
* router.post('/', [checkJwt, validateNave], navesController.createNave)
* router.put('/:id', [checkJwt, validateNave], navesController.updateNave)
* router.delete('/:id', [checkJwt], navesController.deleteNave)

### 1.6. Configuración Principal y Despliegue (¡MUY IMPORTANTE!)

1. Actualizar app.js:

* Archivo: app.js
* Acción: Importa routes/naves.routes.js y regístralo con la ruta base.
* Código a agregar:
  const navesRoutes = require('./routes/naves.routes');
  // ... (cerca de donde se registran otras rutas)
  app.use('/api/naves', navesRoutes);
* Puerto del Servidor: Asegúrate de que el puerto se toma de las variables de entorno para Render.
* Código (verificar/reemplazar): const PORT = process.env.PORT || 3000;

2. Modificar Configuración de Base de Datos para Producción (Clever Cloud):

* Archivo: config/config.db.js
* Lógica: Este archivo debe ser modificado para soportar tanto variables de entorno locales (.env) como la variable DATABASE_URL que será proveída por Clever Cloud. La DATABASE_URL de Clever Cloud es una URL de conexión completa. Sequelize v6 puede parsear esta URL directamente.
* Instrucción: Modifica el objeto development y añade un objeto production.
* Ejemplo de Lógica a implementar:
  require('dotenv').config(); // Asegura que dotenv esté al inicio

  // Objeto base de configuración
  const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
  ssl: {
  require: true,
  rejectUnauthorized: false // Necesario para algunas nubes de DB
  }
  }
  };

  module.exports = {
  development: {
  ...config,
  // Sobrescribir dialectOptions para desarrollo local si no usas SSL
  dialectOptions: {}
  },
  production: {
  // Clever Cloud (y Render) proveen una URL de conexión
  use_env_variable: 'DATABASE_URL',
  dialect: 'mysql',
  dialectOptions: {
  ssl: {
  require: true,
  rejectUnauthorized: false // O ajusta según el proveedor
  }
  }
  }
  };
* Nota: El models/index.js existente que usa config/config.db.js debe manejar automáticamente la clave use_env_variable para producción.

3. Actualizar .env.example:

* Archivo: .env.example
* Acción: Añade la variable de la base de datos de producción (aunque su valor real estará en Clever Cloud).
* Línea a agregar: DATABASE_URL="mysql://user:pass@host:port/dbname"

**
