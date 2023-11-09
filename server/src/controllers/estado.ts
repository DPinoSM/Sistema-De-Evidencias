import {Request, Response} from 'express';
import { Estado } from '../models/estado';

export const getEstado = async(req: Request, res: Response) =>{  
    const listEstado = await Estado.findAll({attributes:['id_estado','online_presencial']});
    res.json(listEstado)
}
export const newEstado = async(req: Request, res: Response) =>{
    const { online_presencial} =  req.body;
    const idEstado= await Estado.findOne({where: {online_presencial: online_presencial}})
    if(idEstado) {
        return res.status(400).json({
            msg: 'Ya existe un estado con ese valor'
        })
    }
    try{
         await Estado.create({
            "online_presencial": online_presencial
        })
        return res.json({
            msg: 'Estado creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const updateEstado = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {online_presencial} = req.body;
    const idEstado = await Estado.findOne({where: {id_estado: id}})
    if (!idEstado) {
        return res.status(400).json({
            msg: "El id del estado no existe"
        })
    }
    try{
        await Estado.update({
            online_presencial: online_presencial
            },
            {where: {id_estado: id}}
        )
        return res.json({
            msg:'Estado ' + id + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el estado: '+id,
                error
            })

        }
}
export const getOneEstado = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idEstado = await Estado.findOne({where: {id_estado: id}})
    if (!idEstado) {
        return res.status(400).json({
            msg: "El id: " + id + " del estado no existes"
        })
    }
    try{

        const estadoOne = await Estado.findOne({where: {id_estado: id}})
        res.json(estadoOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el estado: '+id,
                error
            })

        }
}
export const deleteEstado = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idEstado = await Estado.findOne({where: {id_estado: id}})
    if (!idEstado) {
        return res.status(400).json({
            msg: "El id: " + id + " del estado no existe"
        })
    }
    try{
        await Estado.destroy({where: {id_estado: id}}
        )
        return res.json({
            msg:'Estado de ' + id + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el estado: '+id,
                error
            })

        }
}