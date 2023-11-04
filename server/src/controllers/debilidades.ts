//JONATHAN MOLINA 
//CONTROLLERS DEBILIDADES
import {Request, Response} from 'express';
import { Debilidades } from '../models/debilidades';

export const getDebilidades = async(req: Request, res: Response) =>{  
    const listDebilidades = await Debilidades.findAll({attributes:['id_debilidades','descripcion_debilidades','estado_debilidades','id_criterios']});
    res.json(listDebilidades)
}
export const newDebilidades = async(req: Request, res: Response) =>{
    const  {descripcion_debilidades,estado_debilidades, id_criterios} =  req.body;
    const id_Debilidades = await Debilidades.findOne({where: {descripcion_debilidades: descripcion_debilidades}})
    if(id_Debilidades) {
        return res.status(400).json({
            msg: 'Ya existe una descripcion de debilidad creado con este valor' 
        })
    }
    try{
         await Debilidades.create({
            "descripcion_debilidades": descripcion_debilidades,
            "estado_debilidades": estado_debilidades,
            "id_criterios": id_criterios
        })
        return res.json({
            msg: 'Descripción de la debilidad creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error al crear la descripción de la debilidad',
            error
        })
    }
}
export const updateDebilidades = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {descripcion_debilidades, estado_debilidades, id_criterios} = req.body;
    const id_Debilidades = await Debilidades.findOne({where: {id_debilidades: id}})
    if (!id_Debilidades) {
        return res.status(400).json({
            msg: "La ID de la debilidad no existe"
        })
    }
    try{
        await Debilidades.update({
            descripcion_debilidades: descripcion_debilidades,
            estado_debilidades: estado_debilidades,
            id_criterios: id_criterios
            },
            {where: {id_debilidades: id}}
        )
        return res.json({
            msg:'La debilidad con ID:' + id + ' se ha actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el Detalle Revisor: '+id,
                error
            })

        }
}
export const getOneDebilidades = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const id_Debilidades= await Debilidades.findOne({where: {id_debilidades: id}})
    if (!id_Debilidades) {
        return res.status(400).json({
            msg: "El ID: " + id + " de la debilidad no existe dentro de la BD"
        })
    }
    try{
        const DebilidadesOne = await Debilidades.findOne({where: {id_debilidades: id}})
        res.json(DebilidadesOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar la debilidad: '+id,
                error
            })
        }
}
export const deleteDebilidades = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const id_Debilidades = await Debilidades.findOne({where: {id_debilidades: id}})
    if (!id_Debilidades) {
        return res.status(400).json({
            msg: "El Id: " + id + " de la debilidad no existe"
        })
    }
    try{
        await Debilidades.destroy({where: {id_debilidades: id}}
        )
        return res.json({
            msg:'La debilidd con ID: ' + id + ' ha sido borrada exitosamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la debilidad: '+id,
                error
            })

        }
}
//FIN