import {Request, Response} from 'express';
import { Criterio } from '../models/criterio';
import { Op, where } from 'sequelize';
export const getCriterio = async(req: Request, res: Response) =>{  
    const listCriterio = await Criterio.findAll({attributes:['id_criterios','nombre_criterios','codigo_criterios','descripcion_criterios','estado_criterios']});
    res.json(listCriterio)
}
export const newCriterio = async(req: Request, res: Response) =>{
    const {nombre_criterios, codigo_criterios, descripcion_criterios, estado_criterios} =  req.body;
    const idCriterio = await Criterio.findOne({where: {nombre_criterios: nombre_criterios}})
    if(idCriterio) {
        return res.status(400).json({
            msg: 'Ya existe un Criterio con ese nombre'
        })
    }
    try{
         await Criterio.create({
            "nombre_criterios": nombre_criterios,
            "codigo_criterios":codigo_criterios,
            "descripcion_criterios": descripcion_criterios,
            "estado_criterios": estado_criterios
        })
        return res.json({
            msg: 'Criterio creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const updateCriterio = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {nombre_criterios, codigo_criterios, descripcion_criterios, estado_criterios} = req.body;
    const idCriterio = await Criterio.findOne({where: {id_criterios: id}})
    if (!idCriterio) {
        return res.status(400).json({
            msg: "El id del criterio no existe"
        })
    }
    try{
        await Criterio.update({
            nombre_criterios: nombre_criterios,
            codigo_criterios: codigo_criterios,
            descripcion_criterios: descripcion_criterios,
            estado_criterios: estado_criterios
            },
            {where: {id_criterios: id}}
        )
        return res.json({
            msg:'Criterio ' + id + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el criterio: '+id,
                error
            })

        }
}
export const getOneCriterio = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idCriterio = await Criterio.findOne({where: {id_criterios: id}})
    if (!idCriterio) {
        return res.status(400).json({
            msg: "El id: " + id + " del criterio no existes"
        })
    }
    try{

        const criterioOne = await Criterio.findOne({where: {id_criterios: id}})
        res.json(criterioOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el criterio: '+id,
                error
            })

        }
}
export const deleteCriterio = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idCriterio = await Criterio.findOne({where: {id_criterios: id}})
    if (!idCriterio) {
        return res.status(400).json({
            msg: "El id: " + id + " del criterio no existe"
        })
    }
    try{
        await Criterio.destroy({where: {id_criterios: id}}
        )
        return res.json({
            msg:'Criterio ' + id + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el criterio: '+id,
                error
            })

        }
}

//FILTRO DE BUSQUEDA
export const buscarCriterio = async (req: Request, res: Response) => {
    const { searchTerm } = req.query; 
  
    if (!searchTerm) {
      return res.status(400).json({
        msg: 'El término de búsqueda no se proporcionó',
      });
    }
  
    try {
      const criterios = await Criterio.findAll({
        attributes: ['id_criterios', 'nombre_criterios'],
        where: {
          [Op.or]: [
            { id_criterios: { [Op.like]: `%${searchTerm}%` } },
            { nombre_criterios: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
      });
  
      return res.json(criterios);
    } catch (error) {
      return res.status(500).json({
        msg: 'Ocurrió un error al buscar roles',
        error,
      });
    }
  };
  