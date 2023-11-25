import {Request, Response} from 'express';
import { Detalle_DAC } from '../models/detalle_dac';

export const getDetalle_DAC = async(req: Request, res: Response) =>{  
    const listDetalle_DAC = await Detalle_DAC.findAll({attributes:['id_detalle_dac','revisado_dac','estado_dac','comentario_dac']});
    res.json(listDetalle_DAC)
}
export const newDetalle_DAC = async(req: Request, res: Response) =>{
    const  {revisado_dac,estado_dac, comentario_dac} =  req.body;
    const id_Detalle_DAC = await Detalle_DAC.findOne({where: {revisado_dac: revisado_dac}})
    if(id_Detalle_DAC) {
        return res.status(400).json({
            msg: 'Ya existe una revisión del DAC con este valor' 
        })
    }
    try{
         await Detalle_DAC.create({
            "revisado_dac": revisado_dac,
            "estado_dac": estado_dac,
            "comentario_dac": comentario_dac
        })
        return res.json({
            msg: 'Detalle DAC creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear el detalle DAC',
            error
        })
    }
}
export const updateDetalle_DAC = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {revisado_dac, estado_dac, comentario_dac} = req.body;
    const id_Detalle_DAC = await Detalle_DAC.findOne({where: {id_detalle_dac: id}})
    if (!id_Detalle_DAC) {
        return res.status(400).json({
            msg: "La ID de detalle DAC no existe"
        })
    }
    try{
        await Detalle_DAC.update({
            revisado_dac: revisado_dac,
            estado_dac: estado_dac,
            comentario_dac: comentario_dac
            },
            {where: {id_detalle_dac: id}}
        )
        return res.json({
            msg:'El detalle DAC con ID:' + id + ' se ha actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el detalle DAC: '+id,
                error
            })

        }
}
export const getOneDetalle_DAC = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const id_Detalle_DAC= await Detalle_DAC.findOne({where: {id_detalle_dac: id}})
    if (!id_Detalle_DAC) {
        return res.status(400).json({
            msg: "El ID: " + id + " del detalle DAC no existe dentro de la base de datos"
        })
    }
    try{
        const Detalle_DACOne = await Detalle_DAC.findOne({where: {id_detalle_dac: id}})
        res.json(Detalle_DACOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el detalle DAC: '+id,
                error
            })
        }
}
export const deleteDetalle_DAC = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const id_Detalle_DAC = await Detalle_DAC.findOne({where: {id_detalle_dac: id}})
    if (!id_Detalle_DAC) {
        return res.status(400).json({
            msg: "El ID: " + id + " del detalle DAC no existe"
        })
    }
    try{
        await Detalle_DAC.destroy({where: {id_detalle_dac: id}}
        )
        return res.json({
            msg:'El detalle DAC con ID: ' + id + ' ha sido borrada exitosamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el detalle DAC: '+id,
                error
            })

        }
}