# 🧪 Ejemplos de Peticiones HTTP para la API de Noticias

Esta guía contiene ejemplos prácticos de cómo utilizar cada endpoint de la API.

## 🏷️ PERFILES

### Obtener todos los perfiles
```http
GET http://localhost:3000/api/profiles
```

### Obtener perfil por ID
```http
GET http://localhost:3000/api/profiles/1
```

### Crear nuevo perfil
```http
POST http://localhost:3000/api/profiles
Content-Type: application/json

{
    "nombre": "Editor"
}
```

### Actualizar perfil
```http
PUT http://localhost:3000/api/profiles/1
Content-Type: application/json

{
    "nombre": "Super Administrador"
}
```

### Eliminar perfil
```http
DELETE http://localhost:3000/api/profiles/3
```

---

## 🗺️ ESTADOS

### Obtener todos los estados
```http
GET http://localhost:3000/api/states
```

### Obtener estado por ID
```http
GET http://localhost:3000/api/states/1
```

### Crear nuevo estado
```http
POST http://localhost:3000/api/states
Content-Type: application/json

{
    "nombre": "Ciudad de México",
    "abreviacion": "CDMX"
}
```

### Actualizar estado
```http
PUT http://localhost:3000/api/states/1
Content-Type: application/json

{
    "nombre": "Yucatán Actualizado",
    "abreviacion": "YUC",
    "UserMod": "Admin"
}
```

### Eliminar estado (soft delete)
```http
DELETE http://localhost:3000/api/states/6
```

---

## 📂 CATEGORÍAS

### Obtener todas las categorías
```http
GET http://localhost:3000/api/categories
```

### Obtener categoría por ID
```http
GET http://localhost:3000/api/categories/1
```

### Crear nueva categoría
```http
POST http://localhost:3000/api/categories
Content-Type: application/json

{
    "nombre": "Tecnología",
    "descripcion": "Noticias sobre avances tecnológicos y gadgets"
}
```

### Actualizar categoría
```http
PUT http://localhost:3000/api/categories/1
Content-Type: application/json

{
    "nombre": "Salud y Medicina",
    "descripcion": "Noticias actualizadas sobre salud, medicina y bienestar",
    "UserMod": "Admin"
}
```

### Eliminar categoría (soft delete)
```http
DELETE http://localhost:3000/api/categories/3
```

---

## 👥 USUARIOS

### Obtener todos los usuarios
```http
GET http://localhost:3000/api/users
```

### Obtener usuario por ID
```http
GET http://localhost:3000/api/users/1
```

### Obtener usuario por email
```http
GET http://localhost:3000/api/users/email/admin@gmail.com
```

### Crear nuevo usuario
```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
    "perfil_id": 2,
    "nombre": "María",
    "apellidos": "González López",
    "nick": "mariagonzalez",
    "correo": "maria@example.com",
    "contraseña": "password123"
}
```

### Actualizar usuario
```http
PUT http://localhost:3000/api/users/1
Content-Type: application/json

{
    "perfil_id": 1,
    "nombre": "Administrador Principal",
    "apellidos": "Sistema",
    "nick": "SuperAdmin",
    "correo": "superadmin@gmail.com",
    "contraseña": "nuevapassword",
    "UserMod": "Sistema"
}
```

### Eliminar usuario (soft delete)
```http
DELETE http://localhost:3000/api/users/3
```

---

## 📰 NOTICIAS

### Obtener todas las noticias
```http
GET http://localhost:3000/api/news
```

### Obtener noticia por ID
```http
GET http://localhost:3000/api/news/1
```

### Obtener noticias por categoría
```http
GET http://localhost:3000/api/news/category/1
```

### Obtener noticias por estado
```http
GET http://localhost:3000/api/news/state/1
```

### Crear nueva noticia
```http
POST http://localhost:3000/api/news
Content-Type: application/json

{
    "categoria_id": 1,
    "estado_id": 1,
    "usuario_id": 1,
    "titulo": "Nuevo descubrimiento médico en Yucatán",
    "fecha_publicacion": "2024-01-15T10:00:00.000Z",
    "descripcion": "Investigadores de la Universidad Autónoma de Yucatán han realizado un importante descubrimiento en el tratamiento de enfermedades tropicales que podría revolucionar la medicina preventiva en la región.",
    "imagen": "descubrimiento-medico-yucatan.jpg"
}
```

### Crear noticia de tecnología
```http
POST http://localhost:3000/api/news
Content-Type: application/json

{
    "categoria_id": 3,
    "estado_id": 2,
    "usuario_id": 2,
    "titulo": "Startup mexicana desarrolla IA innovadora",
    "fecha_publicacion": "2024-01-16T14:30:00.000Z",
    "descripcion": "Una empresa emergente de Baja California ha desarrollado una inteligencia artificial capaz de predecir patrones climáticos con una precisión del 95%, lo que podría tener un impacto significativo en la agricultura regional.",
    "imagen": "startup-ia-baja-california.jpg"
}
```

### Actualizar noticia
```http
PUT http://localhost:3000/api/news/1
Content-Type: application/json

{
    "categoria_id": 1,
    "estado_id": 1,
    "usuario_id": 1,
    "titulo": "Descubren nueva especie de mariposa ACTUALIZADO",
    "fecha_publicacion": "2023-08-14T12:00:00.000Z",
    "descripcion": "Científicos han anunciado el descubrimiento de una nueva especie de mariposa en una expedición a la selva amazónica. La especie, llamada 'Morpho amazonica', posee colores y patrones únicos en sus alas. ACTUALIZACIÓN: Se han encontrado 3 especímenes adicionales.",
    "imagen": "imagen-actualizada.png",
    "UserMod": "Admin"
}
```

### Eliminar noticia (soft delete)
```http
DELETE http://localhost:3000/api/news/6
```

---

## 🔍 CONSULTAS ESPECIALES

### Información de la API
```http
GET http://localhost:3000/api
```

### Estado del servidor
```http
GET http://localhost:3000/
```

---

## 📋 Respuestas de Ejemplo

### Respuesta exitosa (GET)
```json
{
    "success": true,
    "message": "Noticias obtenidas correctamente",
    "data": [
        {
            "id": 1,
            "titulo": "Descubren nueva especie de mariposa",
            "descripcion": "Científicos han anunciado el descubrimiento...",
            "fecha_publicacion": "2023-08-14T12:00:00.000Z",
            "categoria": {
                "id": 2,
                "nombre": "Ecología y fauna",
                "descripcion": "Todo lo importante acerca de los seres vivos"
            },
            "estado": {
                "id": 1,
                "nombre": "Yucatán",
                "abreviacion": "YUC"
            },
            "usuario": {
                "id": 1,
                "nombre": "Administrador",
                "apellidos": "General",
                "nick": "Admin",
                "perfil": {
                    "id": 1,
                    "nombre": "Administrador"
                }
            },
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
        }
    ]
}
```

### Respuesta de error (400)
```json
{
    "success": false,
    "message": "El nombre de la categoría es obligatorio"
}
```

### Respuesta de error (404)
```json
{
    "success": false,
    "message": "Usuario no encontrado"
}
```

---

## 💡 Consejos para Pruebas

1. **Usar Postman o Thunder Client** para facilitar las pruebas
2. **Guardar las peticiones** en una colección para reutilizar
3. **Verificar el Content-Type** en peticiones POST/PUT
4. **Usar IDs válidos** obtenidos de las consultas GET
5. **Revisar los logs** del servidor para debugging

## 🔧 Variables de Entorno para Postman

Puedes crear una variable de entorno en Postman:
- **Variable:** `base_url`
- **Valor:** `http://localhost:3000`

Entonces usar: `{{base_url}}/api/profiles` en lugar de escribir la URL completa.