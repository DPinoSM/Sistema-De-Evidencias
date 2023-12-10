//JONATHAN MOLINA 
//CONTROLLERS DEBILIDADES
import e, {Request, Response} from 'express';
import { Debilidades } from '../models/debilidades';
import { Criterio } from '../models/criterio';

export const getDebilidades = async(req: Request, res: Response) =>{   
    try {
        const listDebilidades = await Debilidades.findAll({
            attributes:[
                'id_debilidades',
                'descripcion_debilidades',
                'estado_debilidades',
            ],
        });
    
        res.json(listDebilidades)
    } catch (error){
        console.error('Error en el controlador getDebilidades: ', error);
        res.status(500).json({
            msg: 'Ocurrio un error en el servidor',
            error,
        });
    }
};

export const newDebilidades = async(req: Request, res: Response) =>{
    try {
        const  {
            descripcion_debilidades,
            estado_debilidades, 
        } =  req.body;

        const id_Debilidades = await Debilidades.findOne({where: {descripcion_debilidades}});

        if(id_Debilidades) {
            return res.status(400).json({
                msg: 'Ya existe una descripcion de debilidad creado con este valor' 
            })
        }
        
        const newDebilidades = await Debilidades.create({
                descripcion_debilidades,
                estado_debilidades,
                
            });
            

        const debilidadesConRelaciones = await newDebilidades.reload();

        return res.json({
            msg: 'Descripción de la debilidad creado correctamente',
            debilidad: debilidadesConRelaciones,      
        })
    } catch (error){
        console.log('Error en el controlador newDebilidades', error);
        res.status(400).json({
            msg: 'Ocurrio un error al crear la descripción de la debilidad',
            error
        })
    }
}
export const updateDebilidades = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {descripcion_debilidades, estado_debilidades} = req.body;
    const id_Debilidades = await Debilidades.findOne({where: {id_debilidades: id}})
    if (!id_Debilidades) {
        return res.status(400).json({
            msg: "La ID de la debilidad no existe"
        })
    }
    try{
        await Debilidades.update({
            descripcion_debilidades,
            estado_debilidades,
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