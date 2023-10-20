import {Request, Response} from 'express';
import { Unidad } from '../models/unidad';
import { where } from 'sequelize';
export const getUnidad = async(req: Request, res: Response) =>{  
    const listUnidad = await Unidad.findAll({attributes:['id_unidad','nombre_unidad','unidad_defecto']});
    res.json(listUnidad)
}
export const newUnidad = async(req: Request, res: Response) =>{
    const { nombre_unidad, unidad_defecto} =  req.body;
    const idUnidad = await Unidad.findOne({where: {nombre_unidad: nombre_unidad}})
    if(idUnidad) {
        return res.status(400).json({
            msg: 'Ya existe una Unidad con ese nombre'
        })
    }
    try{
         await Unidad.create({
            "nombre_unidad": nombre_unidad,
            "unidad_defecto":unidad_defecto
        })
        return res.json({
            msg: 'Unidad creada correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const updateUnidad = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {nombre_unidad, unidad_defecto} = req.body;
    const idUnidad = await Unidad.findOne({where: {id_unidad: id}})
    if (!idUnidad) {
        return res.status(400).json({
            msg: "El id de la unidad no existe"
        })
    }
    try{
        await Unidad.update({
            nombre_unidad: nombre_unidad,
            unidad_defecto: unidad_defecto
            },
            {where: {id_unidad: id}}
        )
        return res.json({
            msg:'Unidad ' + id + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la unidad: '+id,
                error
            })

        }
}
export const getOneUnidad = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idUnidad = await Unidad.findOne({where: {id_unidad: id}})
    if (!idUnidad) {
        return res.status(400).json({
            msg: "El id: " + id + " de la unidad no existes"
        })
    }
    try{

        const unidadOne = await Unidad.findOne({where: {id_unidad: id}})
        res.json(unidadOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar la unidad: '+id,
                error
            })

        }
}
export const deleteUnidad = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idUnidad = await Unidad.findOne({where: {id_unidad: id}})
    if (!idUnidad) {
        return res.status(400).json({
            msg: "El id: " + id + " de la unidad no existe"
        })
    }
    try{
        await Unidad.destroy({where: {id_unidad: id}}
        )
        return res.json({
            msg:'Unidad de ' + id + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la unidad: '+id,
                error
            })

        }
}