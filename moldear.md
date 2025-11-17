# INSTRUCCIÓN MAESTRA: Reconstrucción Imperial del Backend

**Objetivo:** Eliminar toda la lógica de negocio "ApiNews" (Categorías, Noticias, Estados, Perfiles) y REEMPLAZARLA con tres nuevos módulos CRUD: `NavesImperiales`, `Emperadores`, y `Misiones`. Todos los nuevos módulos deben seguir el patrón de arquitectura existente (`models/index.js` como "cerebro").

### 1. ELIMINAR MÓDULOS OBSOLETOS

**Acción:** Elimina los siguientes archivos y carpetas del proyecto.

* **Controllers:**
  * `controllers/categories.controller.js`
  * `controllers/news.controller.js`
  * `controllers/profiles.controller.js`
  * `controllers/states.controller.js`
* **Services:**
  * `services/categories.service.js`
  * `services/news.service.js`
  * `services/profiles.service.js`
  * `services/states.service.js`
* **Routes:**
  * `routes/categories.routes.js`
  * `routes/news.routes.js`
  * `routes/profiles.routes.js`
  * `routes/states.routes.js`
* **Models:**
  * `models/CategoryModel.js`
  * `models/NewModel.js`
  * `models/ProfileModel.js`
  * `models/StateModel.js`
* **Validators:**
  * `validators/CategoryValidator.js`
  * `validators/NewValidator.js`
  * `validators/ProfileValidator.js`
  * `validators/StateValidator.js`

### 2. CONSTRUIR NUEVOS MÓDULOS IMPERIALES

**Instrucción Clave:** Todos los nuevos modelos (`.js`) deben exportar una **función** que reciba `(sequelize, DataTypes)` y retorne el modelo, y todos los servicios (`.js`) deben importar `const db = require('../models');` y usar `db.Modelo` para las consultas.

**Módulo 1: Naves Imperiales (Reparar)**

1. **Modelo (`models/NaveImperialModel.js`):**
   * **Acción:** Reemplaza el contenido.
   * **Contenido:**
     ```
     module.exports = (sequelize, DataTypes) => {
       const NaveImperial = sequelize.define('NaveImperial', {
         id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
         nombre: { type: DataTypes.STRING(100), allowNull: false },
         clase: { type: DataTypes.STRING(100), allowNull: false },
         tripulacion: { type: DataTypes.INTEGER, allowNull: false },
         estado_operativo: { type: DataTypes.ENUM('activo', 'en_reparacion', 'destruido'), allowNull: false, defaultValue: 'activo' }
       }, { tableName: 'naves_imperiales', timestamps: true });
       NaveImperial.associate = function(models) {
         // futuras asociaciones
       };
       return NaveImperial;
     };

     ```
2. **Servicio (`services/naves.service.js`):**
   * **Acción:** Reemplaza el contenido.
   * **Contenido:**
     ```
     const db = require('../models'); // Importar el 'cerebro' db

     module.exports = {
       getAllNaves: async () => await db.NaveImperial.findAll(),
       getNaveById: async (id) => await db.NaveImperial.findByPk(id),
       createNave: async (naveData) => await db.NaveImperial.create(naveData),
       updateNave: async (id, naveData) => {
         const nave = await db.NaveImperial.findByPk(id);
         if (nave) return await nave.update(naveData);
         return null;
       },
       deleteNave: async (id) => {
         const nave = await db.NaveImperial.findByPk(id);
         if (nave) {
           await nave.destroy();
           return true;
         }
         return false;
       }
     };

     ```
3. **Controlador (`controllers/naves.controller.js`):** (Este ya estaba bien, solo asegurar que exista).
4. **Rutas (`routes/naves.routes.js`):** (Este ya estaba bien, solo asegurar que exista).
5. **Validador (`validators/NaveValidator.js`):** (Este ya estaba bien, solo asegurar que exista).

**Módulo 2: Emperadores (Crear)**

1. **Modelo (`models/EmperadorModel.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     module.exports = (sequelize, DataTypes) => {
       const Emperador = sequelize.define('Emperador', {
         id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
         nombre: { type: DataTypes.STRING(100), allowNull: false, unique: true },
         titulo: { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'Lord Sith' },
         estado: { type: DataTypes.ENUM('vivo', 'muerto', 'clonado', 'desconocido'), allowNull: false, defaultValue: 'vivo' }
       }, { tableName: 'emperadores', timestamps: true });
       Emperador.associate = function(models) {};
       return Emperador;
     };

     ```
2. **Servicio (`services/emperadores.service.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     const db = require('../models');
     module.exports = {
       getAllEmperadores: async () => await db.Emperador.findAll(),
       getEmperadorById: async (id) => await db.Emperador.findByPk(id),
       createEmperador: async (data) => await db.Emperador.create(data),
       updateEmperador: async (id, data) => {
         const item = await db.Emperador.findByPk(id);
         if (item) return await item.update(data);
         return null;
       },
       deleteEmperador: async (id) => {
         const item = await db.Emperador.findByPk(id);
         if (item) {
           await item.destroy();
           return true;
         }
         return false;
       }
     };

     ```
3. **Controlador (`controllers/emperadores.controller.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     const { validationResult } = require('express-validator');
     const service = require('../services/emperadores.service');

     module.exports = {
       getAllEmperadores: async (req, res) => {
         try {
           const items = await service.getAllEmperadores();
           res.status(200).json(items);
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       },
       getEmperadorById: async (req, res) => {
         try {
           const item = await service.getEmperadorById(req.params.id);
           if (item) res.status(200).json(item);
           else res.status(404).json({ message: 'Emperador no encontrado' });
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       },
       createEmperador: async (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }
         try {
           const newItem = await service.createEmperador(req.body);
           res.status(201).json(newItem);
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       },
       updateEmperador: async (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }
         try {
           const updatedItem = await service.updateEmperador(req.params.id, req.body);
           if (updatedItem) res.status(200).json(updatedItem);
           else res.status(404).json({ message: 'Emperador no encontrado' });
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       },
       deleteEmperador: async (req, res) => {
         try {
           const result = await service.deleteEmperador(req.params.id);
           if (result) res.status(200).json({ message: 'Emperador eliminado' });
           else res.status(404).json({ message: 'Emperador no encontrado' });
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       }
     };

     ```
4. **Rutas (`routes/emperadores.routes.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     const express = require('express');
     const router = express.Router();
     const controller = require('../controllers/emperadores.controller');
     const { validateEmperador } = require('../validators/EmperadorValidator');
     const { checkJwt } = require('../middlewares/jwt');

     router.get('/', [checkJwt], controller.getAllEmperadores);
     router.get('/:id', [checkJwt], controller.getEmperadorById);
     router.post('/', [checkJwt, ...validateEmperador], controller.createEmperador);
     router.put('/:id', [checkJwt, ...validateEmperador], controller.updateEmperador);
     router.delete('/:id', [checkJwt], controller.deleteEmperador);

     module.exports = router;

     ```
5. **Validador (`validators/EmperadorValidator.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     const { body } = require('express-validator');
     const validateEmperador = [
       body('nombre').notEmpty().withMessage('El nombre es requerido').isString().isLength({ max: 100 }),
       body('titulo').optional().isString().isLength({ max: 100 }),
       body('estado').optional().isIn(['vivo', 'muerto', 'clonado', 'desconocido'])
     ];
     module.exports = { validateEmperador };

     ```

**Módulo 3: Misiones (Crear)**

1. **Modelo (`models/MisionModel.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     module.exports = (sequelize, DataTypes) => {
       const Mision = sequelize.define('Mision', {
         id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
         nombre_clave: { type: DataTypes.STRING(150), allowNull: false },
         descripcion: { type: DataTypes.TEXT, allowNull: true },
         planeta_objetivo: { type: DataTypes.STRING(100), allowNull: false },
         estado: { type: DataTypes.ENUM('planificada', 'en_curso', 'completada', 'fallida'), allowNull: false, defaultValue: 'planificada' }
       }, { tableName: 'misiones', timestamps: true });
       Mision.associate = function(models) {};
       return Mision;
     };

     ```
2. **Servicio (`services/misiones.service.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     const db = require('../models');
     module.exports = {
       getAllMisiones: async () => await db.Mision.findAll(),
       getMisionById: async (id) => await db.Mision.findByPk(id),
       createMision: async (data) => await db.Mision.create(data),
       updateMision: async (id, data) => {
         const item = await db.Mision.findByPk(id);
         if (item) return await item.update(data);
         return null;
       },
       deleteMision: async (id) => {
         const item = await db.Mision.findByPk(id);
         if (item) {
           await item.destroy();
           return true;
         }
         return false;
       }
     };

     ```
3. **Controlador (`controllers/misiones.controller.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     const { validationResult } = require('express-validator');
     const service = require('../services/misiones.service');

     module.exports = {
       getAllMisiones: async (req, res) => {
         try {
           const items = await service.getAllMisiones();
           res.status(200).json(items);
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       },
       getMisionById: async (req, res) => {
         try {
           const item = await service.getMisionById(req.params.id);
           if (item) res.status(200).json(item);
           else res.status(404).json({ message: 'Misión no encontrada' });
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       },
       createMision: async (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }
         try {
           const newItem = await service.createMision(req.body);
           res.status(201).json(newItem);
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       },
       updateMision: async (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }
         try {
           const updatedItem = await service.updateMision(req.params.id, req.body);
           if (updatedItem) res.status(200).json(updatedItem);
           else res.status(404).json({ message: 'Misión no encontrada' });
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       },
       deleteMision: async (req, res) => {
         try {
           const result = await service.deleteMision(req.params.id);
           if (result) res.status(200).json({ message: 'Misión eliminada' });
           else res.status(404).json({ message: 'Misión no encontrada' });
         } catch (error) {
           res.status(500).json({ error: error.message });
         }
       }
     };

     ```
4. **Rutas (`routes/misiones.routes.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     const express = require('express');
     const router = express.Router();
     const controller = require('../controllers/misiones.controller');
     const { validateMision } = require('../validators/MisionValidator');
     const { checkJwt } = require('../middlewares/jwt');

     router.get('/', [checkJwt], controller.getAllMisiones);
     router.get('/:id', [checkJwt], controller.getMisionById);
     router.post('/', [checkJwt, ...validateMision], controller.createMision);
     router.put('/:id', [checkJwt, ...validateMision], controller.updateMision);
     router.delete('/:id', [checkJwt], controller.deleteMision);

     module.exports = router;

     ```
5. **Validador (`validators/MisionValidator.js`):**
   * **Acción:** Crear archivo.
   * **Contenido:**
     ```
     const { body } = require('express-validator');
     const validateMision = [
       body('nombre_clave').notEmpty().withMessage('El nombre clave es requerido').isString(),
       body('planeta_objetivo').notEmpty().withMessage('El planeta es requerido').isString(),
       body('estado').optional().isIn(['planificada', 'en_curso', 'completada', 'fallida'])
     ];
     module.exports = { validateMision };

     ```

### 3. REPARAR ARCHIVOS CENTRALES

**3.1. Reparar `models/index.js` (¡El más importante!)**

* **Acción:** Reemplaza el contenido completo.
* **Contenido:**
  ```
  'use strict';
  const { Sequelize, DataTypes } = require('sequelize');
  const { connection } = require('../config.db'); // Importar la conexión configurada

  const db = {};

  // Cargar los únicos modelos que nos importan
  db.User = require('./UserModel')(connection, DataTypes);
  db.NaveImperial = require('./NaveImperialModel')(connection, DataTypes);
  db.Emperador = require('./EmperadorModel')(connection, DataTypes);
  db.Mision = require('./MisionModel')(connection, DataTypes);

  // Ejecutar asociaciones si existen
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = connection;
  db.Sequelize = Sequelize;

  module.exports = db;

  ```

**3.2. Limpiar `app.js`**

* **Acción:** Modifica `app.js` para eliminar las rutas viejas y añadir las nuevas.
* **Instrucción:**
  * **Elimina** todas las líneas que importen y usen rutas de `categories`, `news`, `states`, y `profiles`.
  * **Añade** las importaciones para las nuevas rutas:
    ```
    const navesRoutes = require('./routes/naves.routes');
    const emperadoresRoutes = require('./routes/emperadores.routes');
    const misionesRoutes = require('./routes/misiones.routes');

    ```
  * **Añade** el uso de las nuevas rutas (junto con `AuthRoute` y `users.routes` que se quedan):
    ```
    app.use('/api/naves', navesRoutes);
    app.use('/api/emperadores', emperadoresRoutes);
    app.use('/api/misiones', misionesRoutes);

    ```
