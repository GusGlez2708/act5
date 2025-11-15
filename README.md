# 📰 API de Noticias

Una API REST completa para gestión de noticias construida con Node.js, Express y Sequelize, con persistencia en base de datos MySQL.

## 🚀 Características

- ✅ **CRUD completo** para todas las entidades (Perfiles, Estados, Categorías, Usuarios, Noticias)
- ✅ **ORM Sequelize** para la gestión de base de datos
- ✅ **Creación automática de tablas** mediante migraciones de Sequelize
- ✅ **Relaciones entre modelos** (Foreign Keys)
- ✅ **Configuración automática de base de datos** con XAMPP MySQL

## 🛠️ Configuración para XAMPP MySQL

### Prerequisitos
1. **XAMPP** instalado y funcionando
2. **MySQL** activo en el panel de control de XAMPP
3. **Node.js** v14 o superior

### Configuración de Base de Datos
El proyecto está configurado para trabajar con XAMPP MySQL usando estas credenciales:
- **Host**: 127.0.0.1
- **Puerto**: 3306
- **Usuario**: root
- **Contraseña**: G@spar2005
- **Base de datos**: db_news (se crea automáticamente)

### Instalación y Ejecución
```bash
# 1. Instalar dependencias
npm install

# 2. (Opcional) Configurar base de datos manualmente
npm run setup-db

# 3. Ejecutar la aplicación
npm start
```

La aplicación creará automáticamente la base de datos `db_news` si no existe.
- ✅ **Validaciones de datos** en middlewares
- ✅ **Manejo de errores** centralizado
- ✅ **Logging de requests** 
- ✅ **Soft delete** para mantener integridad referencial
- ✅ **Datos iniciales** (seeding) automático
- ✅ **Configuración fácil** de credenciales de base de datos

## 📋 Prerrequisitos

- **Node.js** (versión 14 o superior)
- **XAMPP** con MySQL activado
- **npm** o **yarn**

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
cd ApiNews
npm install
```

### 2. Configurar XAMPP

1. Abrir el **Panel de Control de XAMPP**
2. Iniciar los servicios de **Apache** y **MySQL**
3. Hacer clic en **"Admin"** del servicio MySQL para abrir phpMyAdmin

### 3. Crear la base de datos

En phpMyAdmin, ejecutar el siguiente SQL:

```sql
CREATE DATABASE db_news;
```

### 4. Configurar variables de entorno

El archivo `.env` ya está configurado con valores por defecto para XAMPP:

```env
# Variables de entorno para la base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_news
DB_PORT=3306

# Puerto del servidor
PORT=3000
```

**Importante:** Si tu configuración de MySQL es diferente, modifica estos valores:
- `DB_PASSWORD`: Si configuraste una contraseña para el usuario root
- `DB_USER`: Si usas un usuario diferente a root
- `DB_PORT`: Si MySQL corre en un puerto diferente al 3306

## 🏃‍♂️ Ejecución

### Modo desarrollo (con auto-reload)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

El servidor se iniciará en: **http://localhost:3000**

## 📊 Estructura de la Base de Datos

La API gestiona las siguientes entidades:

### 🏷️ Profiles (Perfiles)
- `id` - ID único
- `nombre` - Nombre del perfil
- `createdAt`, `updatedAt` - Timestamps automáticos

### 🗺️ States (Estados)
- `id` - ID único  
- `nombre` - Nombre del estado
- `abreviacion` - Abreviación del estado
- `activo` - Estado activo/inactivo
- Campos de auditoría: `UserAlta`, `FechaAlta`, `UserMod`, `FechaMod`, `UserBaja`, `FechaBaja`
- `createdAt`, `updatedAt` - Timestamps automáticos

### 📂 Categories (Categorías)
- `id` - ID único
- `nombre` - Nombre de la categoría
- `descripcion` - Descripción de la categoría
- `activo` - Estado activo/inactivo
- Campos de auditoría similares a States
- `createdAt`, `updatedAt` - Timestamps automáticos

### 👥 Users (Usuarios)
- `id` - ID único
- `perfil_id` - Foreign Key a Profiles
- `nombre`, `apellidos`, `nick` - Datos personales
- `correo` - Email único
- `contraseña` - Contraseña
- `activo` - Estado activo/inactivo
- Campos de auditoría similares a States
- `createdAt`, `updatedAt` - Timestamps automáticos

### 📰 News (Noticias)
- `id` - ID único
- `categoria_id` - Foreign Key a Categories
- `estado_id` - Foreign Key a States  
- `usuario_id` - Foreign Key a Users
- `titulo` - Título de la noticia
- `fecha_publicacion` - Fecha de publicación
- `descripcion` - Contenido de la noticia
- `imagen` - Ruta o datos de la imagen
- `activo` - Estado activo/inactivo
- Campos de auditoría similares a States
- `createdAt`, `updatedAt` - Timestamps automáticos

## 🔌 Endpoints de la API

### 📍 Información General
```
GET /                    - Información del servidor
GET /api                 - Información de la API y endpoints
```

### 🏷️ Perfiles
```
GET    /api/profiles     - Obtener todos los perfiles
GET    /api/profiles/:id - Obtener perfil por ID
POST   /api/profiles     - Crear nuevo perfil
PUT    /api/profiles/:id - Actualizar perfil
DELETE /api/profiles/:id - Eliminar perfil
```

### 🗺️ Estados
```
GET    /api/states       - Obtener todos los estados activos
GET    /api/states/:id   - Obtener estado por ID
POST   /api/states       - Crear nuevo estado
PUT    /api/states/:id   - Actualizar estado
DELETE /api/states/:id   - Eliminar estado (soft delete)
```

### 📂 Categorías
```
GET    /api/categories     - Obtener todas las categorías activas
GET    /api/categories/:id - Obtener categoría por ID
POST   /api/categories     - Crear nueva categoría
PUT    /api/categories/:id - Actualizar categoría
DELETE /api/categories/:id - Eliminar categoría (soft delete)
```

### 👥 Usuarios
```
GET    /api/users              - Obtener todos los usuarios activos
GET    /api/users/:id          - Obtener usuario por ID
GET    /api/users/email/:email - Obtener usuario por email
POST   /api/users              - Crear nuevo usuario
PUT    /api/users/:id          - Actualizar usuario
DELETE /api/users/:id          - Eliminar usuario (soft delete)
```

### 📰 Noticias
```
GET    /api/news                      - Obtener todas las noticias activas
GET    /api/news/:id                  - Obtener noticia por ID
GET    /api/news/category/:categoryId - Obtener noticias por categoría
GET    /api/news/state/:stateId       - Obtener noticias por estado
POST   /api/news                      - Crear nueva noticia
PUT    /api/news/:id                  - Actualizar noticia
DELETE /api/news/:id                  - Eliminar noticia (soft delete)
```

## 📝 Ejemplos de Uso

### Crear un nuevo perfil
```bash
POST /api/profiles
Content-Type: application/json

{
    "nombre": "Editor"
}
```

### Crear un nuevo estado
```bash
POST /api/states
Content-Type: application/json

{
    "nombre": "Ciudad de México",
    "abreviacion": "CDMX"
}
```

### Crear una nueva categoría
```bash
POST /api/categories
Content-Type: application/json

{
    "nombre": "Tecnología",
    "descripcion": "Noticias sobre avances tecnológicos"
}
```

### Crear un nuevo usuario
```bash
POST /api/users
Content-Type: application/json

{
    "perfil_id": 1,
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "nick": "juanperez",
    "correo": "juan@example.com",
    "contraseña": "mipassword123"
}
```

### Crear una nueva noticia
```bash
POST /api/news
Content-Type: application/json

{
    "categoria_id": 1,
    "estado_id": 1,
    "usuario_id": 1,
    "titulo": "Nueva tecnología revolucionaria",
    "fecha_publicacion": "2024-01-15T10:00:00.000Z",
    "descripcion": "Se ha desarrollado una nueva tecnología que cambiará el mundo...",
    "imagen": "imagen-noticia.jpg"
}
```

## 🗃️ Datos Iniciales

La API incluye datos de ejemplo que se crean automáticamente:

- **2 Perfiles:** Administrador, Contribuidor
- **5 Estados:** Yucatán, Baja California, Campeche, Chiapas, Chihuahua
- **2 Categorías:** Salud Médica, Ecología y fauna
- **2 Usuarios:** Admin y Jhon Boston
- **5 Noticias:** Ejemplos relacionados con salud y ecología

## 🔐 Validaciones

La API incluye validaciones automáticas:

- **Campos obligatorios** en todas las entidades
- **Formato de email** válido
- **Longitud máxima** de campos de texto
- **IDs numéricos** válidos
- **Referencias válidas** entre tablas (Foreign Keys)

## 🐛 Manejo de Errores

Respuestas consistentes con formato estándar:

```json
{
    "success": false,
    "message": "Descripción del error"
}
```

Códigos de estado HTTP apropiados:
- `200` - Operación exitosa
- `201` - Recurso creado exitosamente
- `400` - Error en los datos enviados
- `404` - Recurso no encontrado
- `500` - Error interno del servidor

## 🏗️ Arquitectura

```
ApiNews/
├── config.js                     # Configuración de variables de entorno
├── config.db.js                  # Configuración de base de datos
├── app.js                        # Aplicación principal de Express
├── seedDatabase.js               # Datos iniciales para la BD
├── models/                       # Modelos de Sequelize
│   ├── index.js
│   ├── ProfileModel.js
│   ├── StateModel.js
│   ├── CategoryModel.js
│   ├── UserModel.js
│   └── NewModel.js
├── controllers/                  # Controladores de las rutas
│   ├── profiles.controller.js
│   ├── states.controller.js
│   ├── categories.controller.js
│   ├── users.controller.js
│   └── news.controller.js
├── services/                     # Lógica de negocio
│   ├── profiles.service.js
│   ├── states.service.js
│   ├── categories.service.js
│   ├── users.service.js
│   └── news.service.js
├── routes/                       # Definición de rutas
│   ├── index.js
│   ├── profiles.routes.js
│   ├── states.routes.js
│   ├── categories.routes.js
│   ├── users.routes.js
│   └── news.routes.js
├── middlewares/                  # Middlewares personalizados
│   ├── requestLogger.middleware.js
│   └── validation.middleware.js
├── package.json
├── .env                          # Variables de entorno
└── README.md
```

## 🔧 Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para base de datos
- **MySQL** - Sistema de gestión de base de datos
- **dotenv** - Manejo de variables de entorno
- **cors** - Middleware para CORS

## 📚 Referencias

- [Documentación oficial de Sequelize](https://sequelize.org/)
- [Documentación de Express.js](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Desarrollado como parte del Curso de Express.js**