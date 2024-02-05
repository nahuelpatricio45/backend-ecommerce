import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/users.models.js';

export const authRequired = async (req, res, next) => {
  const { token } = req.cookies;
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: "No token, autorización denegada" });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;  // Establece el usuario completo en req
    next();
  } catch (err) {
   
    console.log('Error al verificar el token:', err);
    // Resto del código...
  
  
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado, autorización denegada' });
    } else {
      return res.status(401).json({ message: 'Token inválido, autorización denegada' });
    }
  }
};
