import {Request, Response} from 'express';
import { Registro } from '../models/registro';
import { Op, where } from 'sequelize';
export const getRegistro = async(req: Request, res: Response) =>{  
    const listRegistro = await Registro.findAll({attributes:['id_registro','datos_registro','contenido_registro']});
    res.json(listRegistro)
}
export const newRegistro = async(req: Request, res: Response) =>{
    const { datos_registro, contenido_registro} =  req.body;
    const idRegistro = await Registro.findOne({where: {datos_registro: datos_registro}})
    if(idRegistro) {
        return res.status(400).json({
            msg: 'Ya existe un Registro con esa ID'
        })
    }
    try{
         await Registro.create({
            "datos_registro": datos_registro,
            "contenido_registro":contenido_registro
        })
        return res.json({
            msg: 'Registro creado correctamente'       
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const updateRegistro = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {datos_registro, contenido_registro} = req.body;
    const idRegistro = await Registro.findOne({where: {id_registro: id}})
    if (!idRegistro) {
        return res.status(400).json({
            msg: "El id del registro no existe"
        })
    }
    try{
        await Registro.update({
            datos_registro: datos_registro,
            contenido_registro: contenido_registro
            },
            {where: {id_registro: id}}
        )
        return res.json({
            msg:'Registro ' + id + ' actualizado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el registro: '+id,
                error
            })

        }
}
export const getOneRegistro = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idRegistro = await Registro.findOne({where: {id_registro: id}})
    if (!idRegistro) {
        return res.status(400).json({
            msg: "El id: " + id + " del registro no existes"
        })
    }
    try{

        const registroOne = await Registro.findOne({where: {id_registro: id}})
        res.json(registroOne)
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al encontrar el registro: '+id,
                error
            })

        }
}
export const deleteRegistro = async(req: Request, res: Response) =>{
    const { id} =  req.params;
    const idRegistro = await Registro.findOne({where: {id_registro: id}})
    if (!idRegistro) {
        return res.status(400).json({
            msg: "El id: " + id + " del registro no existe"
        })
    }
    try{
        await Registro.destroy({where: {id_registro: id}}
        )
        return res.json({
            msg:'Registro de ' + id + ' borrado correctamente'
        })
        }catch (error){
            return res.status(400).json({
                msg: 'Ha ocurrido un error al actualizar el registro: '+id,
                error
            })

        }
}

//FILTRO DE BUSQUEDA
export const buscarRegistro = async (req: Request, res: Response) => {
    const { searchTerm } = req.query; 
  
    if (!searchTerm) {
      return res.status(400).json({
        msg: 'El término de búsqueda no se proporcionó',
      });
    }
  
    try {
      const registros = await Registro.findAll({
        attributes: ['id_registro', 'datos_registro'],
        where: {
          [Op.or]: [
            { id_registro: { [Op.like]: `%${searchTerm}%` } },
            { datos_registro: { [Op.like]: `%${searchTerm}%` } },
          ],
        } as unknown as Record<string,any>,
      });
  
      return res.json(registros);
    } catch (error) {
      return res.status(500).json({
        msg: 'Ocurrió un error al buscar registros',
        error,
      });
    }
  };
  