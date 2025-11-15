# Contexto del Proyecto: API de Noticias

Este documento proporciona un contexto completo sobre la API de noticias, su estructura, tecnologías y funcionalidades para facilitar la colaboración y el desarrollo.

## 1. Resumen General

El proyecto es una API RESTful desarrollada en Node.js con Express, diseñada para gestionar un portal de noticias. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre las principales entidades del sistema: noticias, usuarios, categorías, estados y perfiles. Utiliza Sequelize como ORM para la interacción con una base de datos MySQL.

## 2. Estructura de Carpetas

```
C:\Users\canul\OneDrive\Desktop\apiexpres\ApiNews\ApiNews\
├───.env
├───app.js
├───config.db.js
├───config.js
├───EJEMPLOS_API.md
├───package-lock.json
├───package.json
├───README.md
├───seedDatabase.js
├───setup-database.js
├───controllers/
│   ├───categories.controller.js
│   ├───news.controller.js
│   ├───profiles.controller.js
│   ├───states.controller.js
│   └───users.controller.js
├───middlewares/
│   ├───requestLogger.middleware.js
│   └───validation.middleware.js
├───models/
│   ├───CategoryModel.js
│   ├───index.js
│   ├───NewModel.js
│   ├───ProfileModel.js
│   ├───StateModel.js
│   └───UserModel.js
├───routes/
│   ├───categories.routes.js
│   ├───index.js
│   ├───news.routes.js
│   ├───profiles.routes.js
│   ├───states.routes.js
│   └───users.routes.js
├───services/
│   ├───categories.service.js
│   ├───news.service.js
│   ├───profiles.service.js
│   ├───states.service.js
│   └───users.service.js
├───tools/
│   └───test-delete-state.js
└───validators/
    ├───CategoryValidator.js
    ├───NewValidator.js
    ├───ProfileValidator.js
    ├───StateValidator.js
    └───UserValidator.js
```

## 3. Tecnologías y Dependencias Clave

- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** MySQL
- **ORM:** Sequelize
- **Variables de Entorno:** `dotenv`
- **CORS:** `cors` para habilitar peticiones cruzadas.
- **Validación:** `express-validator` para validar los datos de entrada en las rutas.

## 4. Contexto de la API

La API sigue una arquitectura en capas (rutas, controladores, servicios, modelos) para separar responsabilidades.

### Modelos y Relaciones (Base de Datos)

- **ProfileModel:** Perfiles de usuario (Ej: "Administrador", "Editor").
- **StateModel:** Estados de la república (Ej: "Yucatán", "Jalisco").
- **CategoryModel:** Categorías para las noticias (Ej: "Deportes", "Tecnología").
- **UserModel:** Usuarios que gestionan o publican noticias.
  - `UserModel` pertenece a `ProfileModel` (un usuario tiene un perfil).
- **NewModel:** Las noticias.
  - `NewModel` pertenece a `CategoryModel` (una noticia tiene una categoría).
  - `NewModel` pertenece a `StateModel` (una noticia está asociada a un estado).
  - `NewModel` pertenece a `UserModel` (una noticia es publicada por un usuario).

### Flujo de una Petición

1.  **`app.js`**: El punto de entrada. Configura Express, middlewares globales (CORS, JSON parser, logger) y las rutas principales.
2.  **`routes/`**: Define los endpoints de la API. Cada archivo de ruta (ej: `news.routes.js`) agrupa los endpoints para un recurso. `routes/index.js` unifica todas las rutas bajo el prefijo `/api`.
3.  **`validators/`**: Antes de llegar al controlador, algunos endpoints pasan por un validador de `express-validator` para asegurar que los datos (ej: `req.body`) son correctos.
4.  **`controllers/`**: Recibe la petición, interactúa con el servicio correspondiente y formula la respuesta HTTP (éxito o error).
5.  **`services/`**: Contiene la lógica de negocio. Llama a los modelos de Sequelize para interactuar con la base de datos (consultar, crear, actualizar, etc.).
6.  **`models/`**: Define la estructura de las tablas de la base de datos y sus relaciones. Sequelize se encarga de ejecutar las consultas SQL.

### Endpoints Principales

La API expone endpoints CRUD para los siguientes recursos. Todos están bajo el prefijo `/api`.

- **`/profiles`**: Gestiona los perfiles de usuario.
- **`/states`**: Gestiona los estados.
- **`/categories`**: Gestiona las categorías de noticias.
- **`/users`**: Gestiona los usuarios.
- **`/news`**: Gestiona las noticias.

**Ejemplos de Endpoints:**

- `GET /api/news`: Obtiene todas las noticias.
- `GET /api/news/:id`: Obtiene una noticia por su ID.
- `POST /api/news`: Crea una nueva noticia.
- `PUT /api/news/:id`: Actualiza una noticia existente.
- `DELETE /api/news/:id`: Realiza un borrado lógico (soft delete) de una noticia.

Para ver ejemplos detallados de cada petición, consulta el archivo `EJEMPLOS_API.md`.

## 5. Cómo Empezar

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Configurar `.env`:** Asegurarse de que las credenciales de la base de datos en el archivo `.env` son correctas.
3.  **Ejecutar la aplicación:**
    ```bash
    npm run dev
    ```
El servidor se iniciará en `http://localhost:3000`. La base de datos y las tablas se crearán y poblarán automáticamente si no existen.
