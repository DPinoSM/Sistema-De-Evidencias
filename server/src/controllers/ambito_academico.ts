import {Request, Response} from 'express';
import { AmbitoAcademico } from '../models/ambito_academico'; 
import { Op } from 'sequelize';

export const newAmbitoAcademico = async(req: Request, res: Response) =>{
    const { nombre_ambito_academico, estado_ambito_academico} =  req.body;
    const nomAmbito = await AmbitoAcademico.findOne({where: {nombre_ambito_academico: nombre_ambito_academico}})
    if(nomAmbito) {
        return res.status(400).json({
            msg: 'Ya existe un ambito academico con ese nombre'
        })
    }
    try{
         await AmbitoAcademico.create({
            "nombre_ambito_academico": nombre_ambito_academico,
            "estado_ambito_academico": estado_ambito_academico
        })
        return res.json({
            msg: 'Ambito academico creado correctamente'      
        })
    } catch (error){
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
}
export const getAmbitosAcademicos = async(req: Request, res: Response) =>{   
    const listAmbitos = await AmbitoAcademico.findAll({attributes:['id_ambito_academico','nombre_ambito_academico','estado_ambito_academico']});
    res.json(listAmbitos)
}
export const getAmbitoAcademico = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const idAmbitoAcademico = await AmbitoAcademico.findOne({attributes: ['id_ambito_academico','nombre_ambito_academico','estado_ambito_academico'],where: {id_ambito_academico: id}});
    if(!idAmbitoAcademico) {
        return res.status(400).json({
            msg: "El ambito academico indicado no existe"
        })
    }
    try{
        res.json(idAmbitoAcademico)
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}
export const deleteAmbitoAcademico = async(req: Request, res: Response) =>{
    const {id} = req.params;
    const idAmbitoAcademico = await AmbitoAcademico.findOne({where: {id_ambito_academico: id}})

    if(!idAmbitoAcademico) {
        return res.status(400).json({
            msg: "El ambito academico no existe"
        })
    }
    try{
        await AmbitoAcademico.destroy({where: {id_ambito_academico: id}})
        res.json({
            msg: "Se ha eliminado el ambito academico: "
        })
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}
export const updateAmbitoAcademico = async(req: Request, res: Response)=>{
    const {id} = req.params;
    const idAmbitoAcademico = await AmbitoAcademico.findOne({where: {id_ambito_academico: id}})
    if(!idAmbitoAcademico) {
        return res.status(400).json({
            msg: "El ambito academico no existe"
        })
    }
    try{
        const {nombre_ambito_academico,estado_ambito_academico} = req.body;
        await AmbitoAcademico.update({
            nombre_ambito_academico: nombre_ambito_academico,
            estado_ambito_academico: estado_ambito_academico

        },{where: {id_ambito_academico: id}
    })
        res.json({
            msg: "Se ha actualizado el ambito academico: "
        })
    }catch (error){
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        })
    }
}

//FILTRO DE BUSQUEDA
export const buscarAmbAca = async (req: Request, res: Response) => {
    const { searchTerm } = req.query; 
  
    if (!searchTerm) {
      return res.status(400).json({
        msg: 'El término de búsqueda no se proporcionó',
      });
    }
  
    try {
      const ambitosAcademicos = await AmbitoAcademico.findAll({
        attributes: ['id_ambito_academico','nombre_ambito_academico'],
        where: {
          [Op.or]: [
            { id_ambito_academico: { [Op.like]: `%${searchTerm}%` } },
            { nombre_ambito_academico: { [Op.like]: `%${searchTerm}%` } },
          ],
        } as unknown as Record<string,any>,
      });
  
      return res.json(ambitosAcademicos);
    } catch (error) {
      return res.status(500).json({
        msg: 'Ocurrió un error al buscar Ambitos academicos',
        error,
      });
    }
  };