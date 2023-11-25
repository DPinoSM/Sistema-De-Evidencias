import {Request, Response} from 'express';
import { Detalle_Comite } from '../models/detalle_comite';

export const getDetalle_Comite = async(req: Request, res: Response) =>{  
    const listDetalle_Comite = await Detalle_Comite.findAll({attributes:['id_detalle_comite','revisado_comite','estado_comite','comentario_comite']});
    res.json(listDetalle_Comite)
}
export const newDetalle_Comite = async(req: Request, res: Response) =>{
    const  {revisado_comite,estado_comite, comentario_comite} =  req.body;
    const id_Detalle_Comite = await Detalle_Comite.findOne({where: {revisado_comite: revisado_comite}})
    if(id_Detalle_Comite) {
        return res.status(400).json({
            msg: 'Ya existe una revisión del Comité con este valor' 
        })
    }
    try{
         await Detalle_Comite.create({
            "revisado_comite": revisado_comite,
            "estado_comite": estado_comite,
            "comentario_comite": comentario_comite
        })
        return res.json({
            msg: 'Detalle Comite creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el detalle Comite',
            error
        })
    }
}
export const updateDetalle_Comite = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {revisado_comite, estado_comite, comentario_comite} = req.body;
    const id_Detalle_Comite = await Detalle_Comite.findOne({where: {id_detalle_comite: id}})
    if (!id_Detalle_Comite) {
        return res.status(400).json({
            msg: "La ID de detalle Comite no existe"
        })
    }
    try{
        await Detalle_Comite.update({
            revisado_comite: revisado_comite,
            estado_comite: estado_comite,
            comentario_comite: comentario_comite
            },
            {where: {id_detalle_comite: id}}
        )
        return res.json({
            msg:'El detalle Comite con ID:' + id + ' se ha actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el detalle Comite: '+id,
                error
            })

        }
}
export const getOneDetalle_Comite = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const id_Detalle_Comite= await Detalle_Comite.findOne({where: {id_detalle_comite: id}})
    if (!id_Detalle_Comite) {
        return res.status(400).json({
            msg: "El ID: " + id + " del detalle Comite no existe dentro de la base de datos"
        })
    }
    try{
        const Detalle_ComiteOne = await Detalle_Comite.findOne({where: {id_detalle_comite: id}})
        res.json(Detalle_ComiteOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el detalle Comite: '+id,
                error
            })
        }
}
export const deleteDetalle_Comite = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const id_Detalle_Comite = await Detalle_Comite.findOne({where: {id_detalle_comite: id}})
    if (!id_Detalle_Comite) {
        return res.status(400).json({
            msg: "El ID: " + id + " del detalle Comite no existe"
        })
    }
    try{
        await Detalle_Comite.destroy({where: {id_detalle_comite: id}}
        )
        return res.json({
            msg:'El detalle Comite con ID: ' + id + ' ha sido borrada exitosamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el detalle Comite: '+id,
                error
            })

        }
}