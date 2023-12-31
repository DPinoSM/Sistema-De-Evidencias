import {Request, Response} from 'express';
import { AmbitoGeografico } from '../models/ambito_geografico'; 
import { Op } from 'sequelize';


export const newAmbitoGeografico = async(req: Request, res: Response) =>{
    const { nombre_ambito_geografico, estado_ambito_geografico} =  req.body;
    const nomAmbitoG = await AmbitoGeografico.findOne({where: {nombre_ambito_geografico: nombre_ambito_geografico}})
    if(nomAmbitoG) {
        return res.status(400).json({
            msg: 'Ya existe un ambito geografico con ese nombre'
        })
    }
    try{
         await AmbitoGeografico.create({
            "nombre_ambito_geografico": nombre_ambito_geografico,
            "estado_ambito_geografico": true
        })
        return res.json({
            msg: 'Ambito geografico creado correctamente'      
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const getAmbitosGeograficos = async(req: Request, res: Response) =>{   
    const listAmbitosG = await AmbitoGeografico.findAll({attributes:['id_ambito_geografico','nombre_ambito_geografico','estado_ambito_geografico']});
    res.json(listAmbitosG)
}
export const getAmbitoGeografico = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const idAmbitoGeografico = await AmbitoGeografico.findOne({attributes: ['id_ambito_geografico','nombre_ambito_geografico','estado_ambito_geografico'],where: {id_ambito_geografico: id}});
    if(!idAmbitoGeografico) {
        return res.status(400).json({
            msg: "El ambito geografico indicado no existe"
        })
    }
    try{
        res.json(idAmbitoGeografico)
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}
export const deleteAmbitoGeografico = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const idAmbitoGeografico = await AmbitoGeografico.findOne({where: {id_ambito_geografico: id}})

    if(!idAmbitoGeografico) {
        return res.status(400).json({
            msg: "El ambito geografico no existe"
        })
    }
    try{
        await AmbitoGeografico.destroy({where: {id_ambito_geografico: id}})
        res.json({
            msg: "Se ha eliminado el ambito geografico: "
        })
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}
export const updateAmbitoGeografico = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const idAmbitoGeografico = await AmbitoGeografico.findOne({where: {id_ambito_geografico: id}})
    if(!idAmbitoGeografico) {
        return res.status(400).json({
            msg: "El ambito geografico no existe"
        })
    }
    try{
        const {nombre_ambito_geografico,estado_ambito_geografico} = req.body;
        await AmbitoGeografico.update({
            nombre_ambito_geografico: nombre_ambito_geografico,
            estado_ambito_geografico: estado_ambito_geografico

        },{where: {id_ambito_geografico: id}
    })
        res.json({
            msg: "Se ha actualizado el ambito geografico: "
        })
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}

//FILTRO DE BUSQUEDA
export const buscarAmbGeo = async (req: Request, res: Response) => {
    const { searchTerm } = req.query; 
  
    if (!searchTerm) {
      return res.status(400).json({
        msg: 'El término de búsqueda no se proporcionó',
      });
    }
  
    try {
      const ambitosG = await AmbitoGeografico.findAll({
        attributes: ['id_ambito_geografico','nombre_ambito_geografico', 'estado_ambito_geografico'],
        where: {
          [Op.or]: [
            { id_ambito_geografico: { [Op.like]: `%${searchTerm}%` } },
            { nombre_ambito_geografico: { [Op.like]: `%${searchTerm}%` } },
          ],
        } as unknown as Record<string,any>,
      });
  
      return res.json(ambitosG);
    } catch (error) {
      return res.status(500).json({
        msg: 'Ocurrió un error al buscar Ambitos geograficos',
        error,
      });
    }
  };