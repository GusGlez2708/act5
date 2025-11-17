# INSTRUCCIÓN MAESTRA: Reparar una Falla de Inyección de Dependencias en el Módulo 'naves'

Contexto del Problema:

El despliegue en Render está fallando con el error: Error: Route.get() requires a callback function but got a [object Undefined] en routes/naves.routes.js:7.

Análisis de Causa Raíz (¡Importante!):

Este error es un SÍNTOMA. La causa real es una falla en la cadena de importación (require).

1. `routes/naves.routes.js` falla porque `navesController.getAllNaves` es `undefined`.
2. `navesController` (en `controllers/naves.controller.js`) está fallando al importar `navesService` desde `services/naves.service.js`.
3. `navesService` está fallando al importar el modelo `NaveImperial` desde `models/index.js`.
4. El problema central es un **desajuste de patrones** entre cómo `models/index.js` exporta los modelos y cómo los servicios (como `services/naves.service.js`) intentan importarlos.

Patrón Correcto del Proyecto (Detectado de otros archivos):

Al analizar services/categories.service.js y services/news.service.js, el patrón de importación de modelos en este proyecto es:

1. Los servicios importan un objeto `db` centralizado: `const db = require('../models');`
2. Los servicios acceden a los modelos a través de ese objeto: `await db.Category.findAll();` o `await db.New.findAll();`.

**Archivos que SÍ tienen el patrón correcto (No tocar):**

* `controllers/naves.controller.js` (Importa `navesService` y se exporta bien).
* `routes/naves.routes.js` (Importa `navesController` y se exporta bien).
* `validators/NaveValidator.js` (Debe exportar un array `validateNave`, que parece estar bien).

**Archivos que DEBEN ser reparados (El Origen del Error):**

1. `models/index.js`
2. `models/NaveImperialModel.js`
3. `services/naves.service.js`

### ÓRDENES DE REPARACIÓN DETALLADAS:

**1. Reparar `models/index.js`:**

* **Acción:** Este archivo DEBE ser el "cerebro" que inicializa Sequelize y exporta el objeto `db` completo. Su contenido actual (que solo re-exporta modelos) es **incorrecto** y es la causa raíz de la falla.
* **Instrucciones:**
  1. Reemplaza el contenido completo de `models/index.js`.
  2. El nuevo contenido debe:
     * Importar `Sequelize`, `DataTypes` y la `connection` desde `../config.db`.
     * Crear un objeto `db = {}`.
     * Importar **CADA** archivo de modelo (`ProfileModel`, `StateModel`, `CategoryModel`, `UserModel`, `NewModel`, y el nuevo `NaveImperialModel`) como una  **función** .
     * Ejecutar cada función de modelo, pasando `(connection, DataTypes)` y asignando el resultado a `db`. Ejemplo: `db.User = require('./UserModel')(connection, DataTypes);`.
     * **Crucial:** Añadir la línea para el nuevo modelo: `db.NaveImperial = require('./NaveImperialModel')(connection, DataTypes);`.
     * Iterar sobre `Object.keys(db)` y ejecutar `db[modelName].associate(db)` para cada modelo que tenga una función `associate`.
     * Asignar `db.sequelize = connection` y `db.Sequelize = Sequelize`.
     * Exportar el objeto `db` completo: `module.exports = db;`.

**2. Reparar `models/NaveImperialModel.js`:**

* **Acción:** Este archivo debe conformarse al patrón "cerebro" de `models/index.js`. Debe exportar una función, no un objeto.
* **Instrucciones:**

  1. Modifica `models/NaveImperialModel.js`.
  2. En lugar de importar `connection` y exportar `{ NaveImperial }`, el archivo debe exportar una **función** que reciba `(sequelize, DataTypes)`.
  3. La función debe definir el modelo `NaveImperial` usando el `sequelize` y `DataTypes` recibidos.
  4. Añade una función (incluso vacía) `NaveImperial.associate = function(models) { // Asignar relaciones aquí si es necesario };`.
  5. La función debe retornar el modelo `NaveImperial`.

  * **Ejemplo de la estructura que debe tener:**
    ```
    module.exports = (sequelize, DataTypes) => {
      const NaveImperial = sequelize.define('NaveImperial', {
        // ... todos los campos (id, nombre, clase, etc) ...
      }, {
        tableName: 'naves_imperiales',
        timestamps: true
      });

      NaveImperial.associate = function(models) {
        // Ejemplo: NaveImperial.belongsTo(models.User, { ... });
      };

      return NaveImperial;
    };

    ```

**3. Reparar `services/naves.service.js`:**

* **Acción:** Este servicio debe importar el modelo `NaveImperial` usando el patrón de servicio correcto del proyecto.
* **Instrucciones:**
  1. Modifica `services/naves.service.js`.
  2. La importación del modelo en la parte superior **DEBE** ser: `const db = require('../models');`.
  3. Todas las funciones dentro del servicio (`getAllNaves`, `getNaveById`, etc.) deben usar `db.NaveImperial` para acceder al modelo (ej: `return await db.NaveImperial.findAll();`).
  4. **No** uses `const { NaveImperial } = require('../models');`. Eso es incorrecto para este proyecto.

Resumen:

El objetivo es que models/index.js vuelva a ser el "cerebro" que exporta db, y que tanto models/NaveImperialModel.js como services/naves.service.js se ajusten a ese patrón, que es el que usa el resto del proyecto.
