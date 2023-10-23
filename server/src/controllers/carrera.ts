import {Request, Response} from 'express';
import { Carrera } from '../models/carrera';
export const getCarreras = async(req: Request, res: Response) =>{  
    const listCarrera = await Carrera.findAll({attributes:['id_carrera','nombre_carrera','area','cantidad_matriculados']});
    res.json(listCarrera)
}
export const newCarrera = async(req: Request, res: Response) =>{
    const {nombre_carrera, area, cantidad_matriculados} =  req.body;
    const idCarrera = await Carrera.findOne({where: {nombre_carrera: nombre_carrera}})
    if(idCarrera) {
        return res.status(400).json({
            msg: 'Ya existe una carrera con ese nombre'
        })
    }
    try{
         await Carrera.create({
            "nombre_carrera": nombre_carrera,
            "area": area,
            "cantidad_matriculados": cantidad_matriculados
        })
        return res.json({
            msg: 'Carrera creada correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const updateCarrera = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {nombre_carrera, area, cantidad_matriculados} = req.body;
    const idCarrera = await Carrera.findOne({where: {id_carrera: id}})
    if (!idCarrera) {
        return res.status(400).json({
            msg: "El id de la carrera no existe"
        })
    }
    try{
        await Carrera.update({
            nombre_carrera: nombre_carrera,
            area: area,
            cantidad_matriculados: cantidad_matriculados
            },
            {where: {id_carrera: id}}
        )
        return res.json({
            msg:'Carrera ' + id + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la carrera: '+id,
                error
            })

        }
}
export const getCarrera = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idCarrera = await Carrera.findOne({where: {id_carrera: id}})
    if (!idCarrera) {
        return res.status(400).json({
            msg: "El id: " + id + " de carrera no existe"
        })
    }
    try{

        const idCarrera = await Carrera.findOne({where: {id_carrera: id}})
        res.json(idCarrera)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar la carrera: '+id,
                error
            })

        }
}
export const deleteCarrera = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idCarrera = await Carrera.findOne({where: {id_carrera: id}})
    if (!idCarrera) {
        return res.status(400).json({
            msg: "El id: " + id + " de la carrera no existe"
        })
    }
    try{
        await Carrera.destroy({where: {id_carrera: id}}
        )
        return res.json({
            msg:'Carrera ' + id + ' borrada correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la carrera: '+id,
                error
            })
        }
}