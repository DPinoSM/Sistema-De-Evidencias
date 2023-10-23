import {Request, Response} from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from 'sequelize/types/sequelize';
import { QueryTypes } from 'sequelize';

export const newUser = async(req: Request, res: Response) =>{
    const { rut_usuario, nombre_usuario, apellido1_usuario, apellido2_usuario, clave_usuario, correo_usuario, estado_usuario} =  req.body;
    const hashedPassword = await bcrypt.hash(clave_usuario, 10);
    const rutUsuario = await User.findOne({where: {rut_usuario: rut_usuario}})
    if(rutUsuario) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con ese rut'
        })
    }
    try{
         await User.create({
            "rut_usuario": rut_usuario,
            "nombre_usuario": nombre_usuario,
            "apellido1_usuario": apellido1_usuario,
            "apellido2_usuario": apellido2_usuario,
            "clave_usuario": hashedPassword,
            "correo_usuario": correo_usuario,
            "estado_usuario": estado_usuario
        })
        return res.json({
            msg: 'Usuario creado correctamentee'      
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const getUsers = async(req: Request, res: Response) =>{   
    const listUsers = await User.findAll({attributes:['rut_usuario','nombre_usuario','correo_usuario','estado_usuario','id_rol','id_unidad']});
    res.json(listUsers)
}
export const loginUser = async(req: Request, res: Response) =>{
    const { rut_usuario, clave_usuario } = req.body;
    // validacion de usuario
    const usuario: any = await User.findOne({where: {rut_usuario: rut_usuario}})
    if(!usuario) {
        return res.status(400).json({
            msg: 'El rut ingresado no es valido'
        })
    }
    //validacion del password
    const passwordValida = await bcrypt.compare(clave_usuario, usuario.clave_usuario)
    if(!passwordValida) {
        return res.status(400).json({
            msg: 'Contraseña Incorrecta'
        })
    }else {
    // generar token
    const token = jwt.sign({
       rut_usuario: rut_usuario
    }, process.env.SECRET_KEY || 'PRUEBA1'); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token
    res.json({token, rol: usuario.Rol.id_rol});
} 
}

export const getUser = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const idUser = await User.findOne({where:{id_usuario: id}})

    if(!idUser) {
        return res.status(400).json({
            msg: "El usuario indicado no existe"
        })
    }
    try{
        res.json(idUser)
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })

    }
}

export const deleteUser = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const idUser = await User.findOne({where: {id_usuario: id}})

    if(!idUser) {
        return res.status(400).json({
            msg: "El usuario "+id+ " no existe"
        })
    }
    try{
        await User.destroy({where: {id_usuario: id}})
        res.json({
            msg: "Se ha eliminado al usuario: "+id
        })
    }catch (error){
        res.status(400).json({
            msg: "No se ha podido eliminar el usuario "+id,
            error
        })
    }
}

export const updateUser = async(req: Request, res: Response)=>{
    const {id} = req.params;
    
    const idUser = await User.findOne({where: {id_usuario: id}})

    if(!idUser) {
        return res.status(400).json({
            msg: "El id "+id+ " de usuario no existe"
        })
    }
    try{
        const {nombre_usuario,apellido1_usuario,apellido2_usuario,clave_usuario,correo_usuario,estado_usuario} = req.body;
        await User.update({
            nombre_usuario: nombre_usuario,
            apellido1_usuario: apellido1_usuario,
            apellido2_usuario: apellido2_usuario,
            clave_usuario:clave_usuario,
            correo_usuario: correo_usuario,
            estado_usuario: estado_usuario

        },{where: {id_usuario: id}
    })
        res.json({
            msg: "Se ha actualizado al usuario: "+id
        })
    }catch (error){
        res.status(400).json({
            msg: "No se ha podido actualizar el usuario con rut: "+id,
            error
        })
    }
}