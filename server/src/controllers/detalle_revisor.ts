//JONATHAN MOLINA 
//CONTROLLERS DETALLE REVISOR
import {Request, Response} from 'express';
import { Detalle_Revisor } from '../models/detalle_revisor';

export const getDetalle_Revisor = async(req: Request, res: Response) =>{  
    const listDetalle_Revisor = await Detalle_Revisor.findAll({attributes:['id_detalle_revisor','revisado_revisor','estado_revisor','comentario_revisor']});
    res.json(listDetalle_Revisor)
}
export const newDetalle_Revisor = async(req: Request, res: Response) =>{
    const {revisado_revisor, estado_revisor, comentario_revisor} =  req.body;
    const idDetalle_Revisor = await Detalle_Revisor.findOne({where: {revisado_revisor: revisado_revisor}})
    if(idDetalle_Revisor) {
        return res.status(400).json({
            msg: 'Ya existe un Detalle de revisor creado con este valor' 
        })
    }
    try{
         await Detalle_Revisor.create({
            "revisado_revisor": revisado_revisor,
            "estado_revisor": estado_revisor,
            "comentario_Revisor": comentario_revisor
        })
        return res.json({
            msg: 'Detalle del revisor creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear al Detalle del revisor',
            error
        })
    }
}
export const updateDetalle_Revisor = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {revisado_revisor, estado_revisor, comentario_revisor} = req.body;
    const idDetalle_Revisor = await Detalle_Revisor.findOne({where: {id_detalle_revisor: id}})
    if (!idDetalle_Revisor) {
        return res.status(400).json({
            msg: "El id del detalle revisor no existe"
        })
    }
    try{
        await Detalle_Revisor.update({
            revisado_revisor: revisado_revisor,
            estado_revisor: estado_revisor,
            comentario_revisor: comentario_revisor
            },
            {where: {id_detalle_revisor: id}}
        )
        return res.json({
            msg:'El Detalle del Revisor' + id + ' se ha actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el Detalle Revisor: '+id,
                error
            })

        }
}
export const getOneDetalle_Revisor = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idDetalle_Revisor = await Detalle_Revisor.findOne({where: {id_detalle_revisor: id}})
    if (!idDetalle_Revisor) {
        return res.status(400).json({
            msg: "El ID: " + id + " del Detalle Revisor no existe dentro de la BD"
        })
    }
    try{
        const Detalle_RevisorOne = await Detalle_Revisor.findOne({where: {id_detalle_Revisor: id}})
        res.json(Detalle_RevisorOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el Detalle Revuisor: '+id,
                error
            })
        }
}
export const deleteDetalle_Revisor = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idDetalle_Revisor = await Detalle_Revisor.findOne({where: {id_detalle_revisor: id}})
    if (!idDetalle_Revisor) {
        return res.status(400).json({
            msg: "El id: " + id + " del detalle revisor no existe"
        })
    }
    try{
        await Detalle_Revisor.destroy({where: {id_detalle_revisor: id}}
        )
        return res.json({
            msg:'Detalle revisor ' + id + ' borrado exitosamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el detalle del revisor: '+id,
                error
            })

        }
}

//FIN