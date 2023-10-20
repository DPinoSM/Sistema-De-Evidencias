import {Request, Response} from 'express';
import { Registro } from '../models/registro';
import { where } from 'sequelize';
export const getRegistro = async(req: Request, res: Response) =>{  
    const listRegistro = await Registro.findAll({attributes:['id_registro','datos_registro','contenido_registro']});
    res.json(listRegistro)
}
export const newRegistro = async(req: Request, res: Response) =>{
    const { id_registro, datos_registro, contenido_registro} =  req.body;
    const idRegistro = await Registro.findOne({where: {id_registro: id_registro}})
    if(idRegistro) {
        return res.status(400).json({
            msg: 'Ya existe un Registro con esa ID'
        })
    }
    try{
         await Registro.create({
            "datos_registro": datos_registro,
            "contenido_registro":contenido_registro
        })
        return res.json({
            msg: 'Registro creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const updateRegistro = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {datos_registro, contenido_registro} = req.body;
    const idRegistro = await Registro.findOne({where: {id_registro: id}})
    if (!idRegistro) {
        return res.status(400).json({
            msg: "El id del registro no existe"
        })
    }
    try{
        await Registro.update({
            datos_registro: datos_registro,
            contenido_registro: contenido_registro
            },
            {where: {id_registro: id}}
        )
        return res.json({
            msg:'Registro ' + id + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el registro: '+id,
                error
            })

        }
}
export const getOneRegistro = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idRegistro = await Registro.findOne({where: {id_registro: id}})
    if (!idRegistro) {
        return res.status(400).json({
            msg: "El id: " + id + " del registro no existes"
        })
    }
    try{

        const registroOne = await Registro.findOne({where: {id_registro: id}})
        res.json(registroOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el registro: '+id,
                error
            })

        }
}
export const deleteRegistro = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idRegistro = await Registro.findOne({where: {id_registro: id}})
    if (!idRegistro) {
        return res.status(400).json({
            msg: "El id: " + id + " del registro no existe"
        })
    }
    try{
        await Registro.destroy({where: {id_registro: id}}
        )
        return res.json({
            msg:'Registro de ' + id + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el registro: '+id,
                error
            })

        }
}