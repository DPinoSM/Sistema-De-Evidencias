import {Request, Response} from 'express';
import { Impacto } from '../models/impacto';
import { where } from 'sequelize';
export const getImpácto = async(req: Request, res: Response) =>{  
    const listImpacto = await Impacto.findAll({attributes:['id_impacto','interno_externo']});
    res.json(listImpacto)
}
export const newImpacto = async(req: Request, res: Response) =>{
    const { interno_externo} =  req.body;
    const idImpacto = await Impacto.findOne({where: {interno_externo: interno_externo}})
    if(idImpacto) {
        return res.status(400).json({
            msg: 'Ya existe un impacto con ese valor'
        })
    }
    try{
         await Impacto.create({
            "interno_externo": interno_externo
        })
        return res.json({
            msg: 'Impacto creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const updateImpacto = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {interno_externo} = req.body;
    const idImpacto = await Impacto.findOne({where: {id_impacto: id}})
    if (!idImpacto) {
        return res.status(400).json({
            msg: "El id del impacto no existe"
        })
    }
    try{
        await Impacto.update({
            interno_externo: interno_externo
            },
            {where: {id_impacto: id}}
        )
        return res.json({
            msg:'Impacto ' + id + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el impacto: '+id,
                error
            })

        }
}
export const getOneImpacto = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idImpacto = await Impacto.findOne({where: {id_impacto: id}})
    if (!idImpacto) {
        return res.status(400).json({
            msg: "El id: " + id + " del impacto no existes"
        })
    }
    try{

        const impactoOne = await Impacto.findOne({where: {id_impacto: id}})
        res.json(impactoOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el impacto: '+id,
                error
            })

        }
}
export const deleteImpacto = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idImpacto = await Impacto.findOne({where: {id_impacto: id}})
    if (!idImpacto) {
        return res.status(400).json({
            msg: "El id: " + id + " del impacto no existe"
        })
    }
    try{
        await Impacto.destroy({where: {id_impacto: id}}
        )
        return res.json({
            msg:'Impacto de ' + id + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el rol: '+id,
                error
            })

        }
}