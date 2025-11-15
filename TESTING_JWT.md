# Guía para Probar Autenticación JWT en Postman

Esta guía describe cómo obtener un token de autenticación y cómo utilizarlo para acceder a rutas protegidas en esta API.

## Paso 1: Obtener el Token de Autenticación

Para obtener un token, debes enviar las credenciales de un usuario registrado al endpoint de login.

- **Método:** `POST`
- **URL:** `http://localhost:3000/api/auth/login` (ajusta el puerto si es necesario)
- **Body:** Selecciona `raw` y `JSON`.

**Ejemplo de Body:**
```json
{
    "correo": "usuario@ejemplo.com",
    "contraseña": "tu_contraseña_segura"
}
```

### Respuesta Exitosa

Si las credenciales son correctas, recibirás una respuesta similar a esta, la cual incluye el token:

```json
{
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiSm9obiIsImFwZWxsaWRvcyI6IkRvZSIsIm5pY2siOiJqb2huZG9lIiwiaWF0IjoxNzI5MDQyNjM0LCJleHAiOjE3MjkwNDk4MzR9.o-YJdG..."
    },
    "message": "Usuario logueado"
}
```

**Copia el valor del campo `token` para usarlo en el siguiente paso.**

---

## Paso 2: Acceder a una Ruta Protegida

Ahora, usaremos el token para realizar una acción en una ruta que requiera autenticación, como crear una nueva noticia.

- **Método:** `POST`
- **URL:** `http://localhost:3000/api/news/noticias` (asumiendo el prefijo `/api/news`)

### Configuración de la Autorización

1.  Ve a la pestaña **Authorization** en Postman.
2.  En el menú `Type`, selecciona **Bearer Token**.
3.  En el campo de la derecha (`Token`), pega el token que copiaste en el paso anterior.

![Configuración Bearer Token en Postman](https://i.imgur.com/7P4V2YF.png)

### Configuración del Body

Para crear la noticia, necesitas enviar los datos requeridos en el cuerpo de la solicitud.

- **Body:** Selecciona `raw` y `JSON`.

**Ejemplo de Body:**
```json
{
    "categoria_id": 1,
    "usuario_id": 1,
    "estado_id": 1,
    "titulo": "Este es el título de la noticia",
    "descripcion": "Esta es una descripción detallada de lo que trata la noticia.",
    "imagen": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
}
```
*Nota: Asegúrate de que los `id` de categoría, usuario y estado existan en tu base de datos. El campo `imagen` espera una cadena en formato Base64.*

### Resultados Esperados

- **Si el token es válido:** Recibirás una respuesta `201 Created` (o similar) confirmando que la noticia fue creada.
- **Si el token es inválido o no se proporciona:** Recibirás un error `401 Unauthorized` o `403 Forbidden`, indicando que no tienes permiso para realizar la acción.
