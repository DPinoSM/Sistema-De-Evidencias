import {Request, Response} from 'express';
import { Facultad } from '../models/facultad';
import { Op } from 'sequelize';

export const getFacultades = async(req: Request, res: Response) =>{  
    const listFacultad = await Facultad.findAll({attributes:['id_facultad','nombre_facultad']});
    res.json(listFacultad)
}
export const newFacultad = async(req: Request, res: Response) =>{
    const {nombre_facultad} =  req.body;
    const idFacultad = await Facultad.findOne({where: {nombre_facultad: nombre_facultad}})
    if(idFacultad) {
        return res.status(400).json({
            msg: 'Ya existe una facultad con ese nombre'
        })
    }
    try{
         await Facultad.create({
            "nombre_facultad": nombre_facultad
        })
        return res.json({
            msg: 'Facultad creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const updateFacultad = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {nombre_facultad} = req.body;
    const idFacultad = await Facultad.findOne({where: {id_facultad: id}})
    if (!idFacultad) {
        return res.status(400).json({
            msg: "El id de la facultad no existe"
        })
    }
    try{
        await Facultad.update({
            nombre_facultad: nombre_facultad
            },
            {where: {id_facultad: id}}
        )
        return res.json({
            msg:'Facultad ' + id + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el facultad: '+id,
                error
            })

        }
}
export const getFacultad = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idFacultad = await Facultad.findOne({where: {id_facultad: id}})
    if (!idFacultad) {
        return res.status(400).json({
            msg: "El id: " + id + " de facultad no existe"
        })
    }
    try{

        const idFacultad = await Facultad.findOne({where: {id_facultad: id}})
        res.json(idFacultad)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar la facultad: '+id,
                error
            })

        }
}
export const deleteFacultad = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idFacultad = await Facultad.findOne({where: {id_facultad: id}})
    if (!idFacultad) {
        return res.status(400).json({
            msg: "El id: " + id + " del facultad no existe"
        })
    }
    try{
        await Facultad.destroy({where: {id_facultad: id}}
        )
        return res.json({
            msg:'Facultad ' + id + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar la facultad: '+id,
                error
            })
        }
}

//FILTRO DE BUSQUEDA
export const buscarFacultad = async (req: Request, res: Response) => {
    const { searchTerm } = req.query; 
  
    if (!searchTerm) {
      return res.status(400).json({
        msg: 'El término de búsqueda no se proporcionó',
      });
    }
  
    try {
      const facultades = await Facultad.findAll({
        attributes: ['id_facultad', 'nombre_facultad'],
        where: {
          [Op.or]: [
            { id_facultad: { [Op.like]: `%${searchTerm}%` } },
            { nombre_facultad: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
      });
  
      return res.json(facultades);
    } catch (error) {
      return res.status(500).json({
        msg: 'Ocurrió un error al buscar Facultad',
        error,
      });
    }
  };
  