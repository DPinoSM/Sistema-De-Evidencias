import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];
    console.log(headerToken)

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token
        try {
            const bearerToken = headerToken.slice(7);
            console.log(bearerToken)
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'HS384');
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'Token no válido',
            });
        }
    } else {
        res.status(401).json({
            msg: 'Acceso Denegado',
        });
    }
};

export default validateToken;
