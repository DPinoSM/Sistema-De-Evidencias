import {Request, Response} from 'express';
import { Proceso } from '../models/proceso';
import { Op, where } from 'sequelize'; 

export const newProceso = async(req: Request, res: Response) =>{
    const { nombre_procesos, codigo_procesos, estado_procesos} =  req.body;
    const codProcesos = await Proceso.findOne({where: {codigo_procesos: codigo_procesos}})
    const nomProcesos = await Proceso.findOne({where: {nombre_procesos: nombre_procesos}})

    if(codProcesos) {
        return res.status(400).json({
            msg: 'Ya existe un proceso con ese codigo'
        })
    }
    if(nomProcesos) {
        return res.status(400).json({
            msg: 'Ya existe un proceso con ese nombre'
        })
    }
    try{
         await Proceso.create({
            "nombre_procesos": nombre_procesos,
            "codigo_procesos": codigo_procesos,
            "estado_procesos": estado_procesos
        })
        return res.json({
            msg: 'Proceso creado correctamente'      
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const getProcesos = async(req: Request, res: Response) =>{   
    const listProcesos = await Proceso.findAll({attributes:['id_procesos','codigo_procesos','nombre_procesos','estado_procesos']});
    res.json(listProcesos)
}
export const getProceso = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const idProcesos = await Proceso.findOne({where: {id_procesos: id}});
    if(!idProcesos) {
        return res.status(400).json({
            msg: "El id: " + id + "del proceso no existe"
        })
    }
    try{

        const idProcesos = await Proceso.findOne({where: {id_procesos: id}});
        res.json(idProcesos)
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })

    }
}

export const deleteProceso = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const idProceso = await Proceso.findOne({where: {id_procesos: id}})

    if(!idProceso) {
        return res.status(400).json({
            msg: "El id: " + id + "del proceso no existe"
        })
    }
    try{
        await Proceso.destroy({where: {id_procesos: id}})
        
        return res.json({
            msg: "Proceso " + id + "borrado correctamente"
        })
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}

export const updateProceso = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const {codigo_procesos, nombre_procesos, estado_procesos} = req.body;
    const idProceso = await Proceso.findOne({where: {id_procesos: id}})

    if(!idProceso) {
        return res.status(400).json({
            msg: "El proceso no existe"
        })
    }
    try{
        await Proceso.update({
            nombre_procesos: nombre_procesos,
            codigo_procesos: codigo_procesos,
            estado_procesos: estado_procesos
            },
            {where: {id_procesos: id}
    })
    return res.json({
            msg: 'Proceso ' + id + ' actualizado correctamente'
        })
    }catch (error){
        return res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}