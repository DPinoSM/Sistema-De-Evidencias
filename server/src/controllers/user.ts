import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Rol } from '../models/rol';
import { Unidad } from '../models/unidad';
import { Op } from 'sequelize';

export const newUser = async (req: Request, res: Response) => {
    try {
        const {
            rut_usuario,
            nombre_usuario,
            apellido1_usuario,
            apellido2_usuario,
            clave_usuario,
            correo_usuario,
            estado_usuario,
            id_rol,
            id_unidad,
        } = req.body;

        const hashedPassword = await bcrypt.hash(clave_usuario, 10);

        const rutUsuario = await User.findOne({ where: { rut_usuario } });

        if (rutUsuario) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese RUT',
            });
        }

        const newUser = await User.create({
            rut_usuario,
            nombre_usuario,
            apellido1_usuario,
            apellido2_usuario,
            clave_usuario: hashedPassword,
            correo_usuario,
            estado_usuario,
            id_rol,
            id_unidad,
        });

        const usuarioConRelaciones = await newUser.reload();

        return res.json({
            msg: 'Usuario creado correctamente',
            usuario: usuarioConRelaciones, 
        });
    } catch (error) {
        console.error('Error en el controlador newUser:', error);
        res.status(400).json({
            msg: 'Ocurrió un error',
            error,
        });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const listUsers = await User.findAll({
            attributes: [
                'id_usuario',
                'rut_usuario',
                'nombre_usuario',
                'apellido1_usuario',
                'apellido2_usuario',
                'clave_usuario',
                'correo_usuario',
                'estado_usuario',
            ],
            include: [
                { model: Rol, attributes: ['nombre_rol'] },
                { model: Unidad, attributes: ['nombre_unidad'] },
            ],
        });

        res.json(listUsers);
    } catch (error) {
        console.error('Error en el controlador getUsers:', error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor',
            error,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { rut_usuario, clave_usuario } = req.body;

    try {
        // Validación de usuario
        const usuario: any = await User.findOne({ where: { rut_usuario } });

        if (!usuario) {
            return res.status(400).json({
                msg: 'El RUT ingresado no es válido',
            });
        }

        // Validación de contraseña
        const passwordValida = await bcrypt.compare(clave_usuario, usuario.clave_usuario);

        if (!passwordValida) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta',
            });
        }

        // Obtener el correo del usuario
        const correo_usuario = usuario.correo_usuario;
        const id_usuario = usuario.id_usuario;

        // Generar token JWT con el rol del usuario
        const token = jwt.sign(
            {
                rut_usuario,
                role: usuario.id_rol,
            },
            process.env.SECRET_KEY || 'HS384',
            { expiresIn: '120m' }
        );

        // Enviar el token, el rol y el correo como parte de la respuesta JSON
        res.json({ token, rol: usuario.id_rol, rut_usuario, id_usuario:id_usuario, correo_usuario: correo_usuario || '' });
    } catch (error) {
        console.error('Error en el controlador loginUser:', error);
        res.status(500).json({
            msg: 'Error en el servidor',
            error,
        });
    }
};



export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const idUser = await User.findOne({ where: { id_usuario: id } });

        if (!idUser) {
            return res.status(400).json({
                msg: 'El usuario indicado no existe',
            });
        }

        res.json(idUser);
    } catch (error) {
        console.error('Error en el controlador getUser:', error);
        res.status(400).json({
            msg: 'Ha ocurrido un error',
            error,
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const idUser = await User.findOne({ where: { id_usuario: id } });

        if (!idUser) {
            return res.status(400).json({
                msg: `El usuario ${id} no existe`,
            });
        }

        await User.destroy({ where: { id_usuario: id } });

        res.json({
            msg: `Se ha eliminado al usuario: ${id}`,
        });
    } catch (error) {
        console.error('Error en el controlador deleteUser:', error);
        res.status(400).json({
            msg: `No se ha podido eliminar el usuario ${id}`,
            error,
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const {
            rut_usuario,
            nombre_usuario,
            apellido1_usuario,
            apellido2_usuario,
            clave_usuario,
            correo_usuario,
            estado_usuario,
            id_rol,
            id_unidad,
        } = req.body;

        const idUser = await User.findOne({ where: { id_usuario: id } });

        const hashedPassword = await bcrypt.hash(clave_usuario, 10);

        if (!idUser) {
            return res.status(400).json({
                msg: `El id ${id} de usuario no existe`,
            });
        }

        await User.update(
            {
                rut_usuario,
                nombre_usuario,
                apellido1_usuario,
                apellido2_usuario,
                clave_usuario: hashedPassword,
                correo_usuario,
                estado_usuario,
                id_rol,
                id_unidad,
            },
            { where: { id_usuario: id } }
        );

        res.json({
            msg: `Se ha actualizado al usuario: ${id}`,
        });
    } catch (error) {
        console.error('Error en el controlador updateUser:', error);
        res.status(400).json({
            msg: `No se ha podido actualizar el usuario con rut: ${id}`,
            error,
        });
    }
}

export const buscarUsuario = async (req: Request, res: Response) =>{
    const { searchTerm } = req.query;

    if (!searchTerm){
        return res.status(400).json({
            msg: 'El termino de busqueda no se proporcionó',
        });
    }

    try {
        const users = await User.findAll({
            attributes: ['id_usuario', 'nombre_usuario'],
            where: {
                [Op.or]: [
                    { 'id_usuario': { [Op.like]: `%${searchTerm}%` } },
                    { 'nombre_usuario': { [Op.like]: `%${searchTerm}%` } },
                ],
            } as unknown as Record<string,any>,
        });
        return res.json(users);
    }   catch (error){
        return res.status(500).json({
            msg:'Ocurrió un error al buscar Usuarios',
        });
    }
};


