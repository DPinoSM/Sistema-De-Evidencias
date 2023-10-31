import {Request, Response} from 'express';
import { Proceso } from '../models/proceso'; 

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
    const idProcesos = await Proceso.findOne({attributes: ['codigo_procesos','nombre_procesos'],where: {id_procesos: id}});
    if(!idProcesos) {
        return res.status(400).json({
            msg: "El proceso indicado no existe"
        })
    }
    try{
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
            msg: "El proceso no existe"
        })
    }
    try{
        await Proceso.destroy({where: {id_procesos: id}})
        res.json({
            msg: "Se ha eliminado el proceso: "
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
    
    const idProceso = await Proceso.findOne({where: {id_procesos: id}})

    if(!idProceso) {
        return res.status(400).json({
            msg: "El proceso no existe"
        })
    }
    try{
        const {codigo_procesos,nombre_procesos,estado_procesos} = req.body;
        await Proceso.update({
            nombre_procesos: nombre_procesos,
            codigo_procesos: codigo_procesos,
            estado_procesos: estado_procesos

        },{where: {id_procesos: id}
    })
        res.json({
            msg: "Se ha actualizado el proceso: "
        })
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}