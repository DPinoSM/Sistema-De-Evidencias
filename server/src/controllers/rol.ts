import {Request, Response} from 'express';
import { Rol } from '../models/rol';
export const getRol = async(req: Request, res: Response) =>{  
    const listRol = await Rol.findAll({attributes:['id_rol','nombre_rol']});
    res.json(listRol)
}
export const newRol = async(req: Request, res: Response) =>{
    const { nombre_rol} =  req.body;
    const idRol = await Rol.findOne({where: {nombre_rol: nombre_rol}})
    if(idRol) {
        return res.status(400).json({
            msg: 'Ya existe un Rol con ese nombre'
        })
    }
    try{
         await Rol.create({
            "nombre_rol":nombre_rol
        })
        return res.json({
            msg: 'Rol creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const updateRol = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {nombre_rol} = req.body;
    const idRol = await Rol.findOne({where: {id_rol: id}})
    if (!idRol) {
        return res.status(400).json({
            msg: "El id del rol no existe"
        })
    }
    try{
        await Rol.update({
            nombre_rol: nombre_rol
            },
            {where: {id_rol: id}}
        )
        return res.json({
            msg:'Usuario ' + id + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el rol: '+id,
                error
            })

        }
}
export const getOneRol = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idRol = await Rol.findOne({where: {id_rol: id}})
    if (!idRol) {
        return res.status(400).json({
            msg: "El id: " + id + " del rol no existes"
        })
    }
    try{

        const rolOne = await Rol.findOne({where: {id_rol: id}})
        res.json(rolOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el rol: '+id,
                error
            })

        }
}
export const deleteRol = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idRol = await Rol.findOne({where: {id_rol: id}})
    if (!idRol) {
        return res.status(400).json({
            msg: "El id: " + id + " del rol no existe"
        })
    }
    try{
        await Rol.destroy({where: {id_rol: id}}
        )
        return res.json({
            msg:'Rol de ' + id + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el rol: '+id,
                error
            })

        }
}