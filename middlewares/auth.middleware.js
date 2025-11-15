// C:\Users\canul\OneDrive\Desktop\apiexpres\ApiNews\ApiNews\middlewares\auth.middleware.js

const jwt = require('jsonwebtoken');

// La clave secreta debe ser la misma que usaste en AuthController.js
// IMPORTANTE: En un proyecto real, se debe leer desde el archivo .env
const SECRET_KEY = 'mi_llave_secreta'; 

/**
 * Middleware para verificar si existe un token JWT válido en los headers
 * de la petición y proteger las rutas.
 */
const verifyToken = (request, response, next) => {
    // 1. Obtener el token del encabezado 'Authorization'
    // El formato esperado es: "Bearer [token]"
    const tokenHeader = request.headers['authorization'];
    
    if (!tokenHeader) {
        // No hay encabezado de autorización
        return response.status(401).json({ 
            message: 'Acceso denegado. No se proporcionó token.' 
        });
    }

    // Separar "Bearer" del token
    const token = tokenHeader.split(' ')[1];

    if (!token) {
        // No se encontró el token después de "Bearer"
        return response.status(401).json({ 
            message: 'Acceso denegado. Formato de token incorrecto.' 
        });
    }

    // 2. Verificar el token
    try {
        // jwt.verify() decodifica el token usando la clave secreta
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // El payload decodificado (que contiene el objeto 'usuario') se adjunta al objeto request
        request.user = decoded.usuario; 
        
        // Pasar al siguiente middleware o controlador
        next(); 

    } catch (error) {
        // El token es inválido, ha expirado o está alterado
        return response.status(401).json({ 
            message: 'Token inválido o expirado.', 
            error: error.message 
        });
    }
};

module.exports = {
    verifyToken
};