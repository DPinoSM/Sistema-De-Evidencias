import {Request, Response} from 'express';
import { Impacto } from '../models/impacto';
import { where } from 'sequelize';

export const getImpácto = async(req: Request, res: Response) =>{  
    try {
        const listImpacto = await Impacto.findAll({attributes:['id_impacto','interno_externo']});
        res.json(listImpacto);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al obtener impactos',
            error
        });
    }
}

export const newImpacto = async(req: Request, res: Response) =>{
    const { interno_externo } =  req.body;

    try {
        const idImpacto = await Impacto.findOne({ where: { interno_externo: interno_externo } });

        if (idImpacto) {
            return res.status(400).json({
                msg: 'Ya existe un impacto con ese valor'
            });
        }

        await Impacto.create({
            interno_externo: interno_externo
        });

        return res.json({
            msg: 'Impacto creado correctamente'       
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrió un error',
            error
        });
    }
}

export const updateImpacto = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { interno_externo } = req.body;

    try {
        const idImpacto = await Impacto.findOne({ where: { id_impacto: id } });

        if (!idImpacto) {
            return res.status(400).json({
                msg: "El id del impacto no existe"
            });
        }

        await Impacto.update(
            { interno_externo: interno_externo },
            { where: { id_impacto: id } }
        );

        return res.json({
            msg: `Impacto ${id} actualizado correctamente`
        });
    } catch (error) {
        return res.status(400).json({
            msg: `Ha ocurrido un error al actualizar el impacto: ${id}`,
            error
        });
    }
}

export const getOneImpacto = async(req: Request, res: Response) =>{
    const { id } =  req.params;

    try {
        const impactoOne = await Impacto.findOne({ where: { id_impacto: id } });

        if (!impactoOne) {
            return res.status(400).json({
                msg: `El id: ${id} del impacto no existe`
            });
        }

        res.json(impactoOne);
    } catch (error) {
        return res.status(400).json({
            msg: `Ha ocurrido un error al encontrar el impacto: ${id}`,
            error
        });
    }
}

export const deleteImpacto = async(req: Request, res: Response) =>{
    const { id } =  req.params;

    try {
        const idImpacto = await Impacto.findOne({ where: { id_impacto: id } });

        if (!idImpacto) {
            return res.status(400).json({
                msg: `El id: ${id} del impacto no existe`
            });
        }

        await Impacto.destroy({ where: { id_impacto: id } });

        return res.json({
            msg: `Impacto ${id} borrado correctamente`
        });
    } catch (error) {
        return res.status(400).json({
            msg: `Ha ocurrido un error al borrar el impacto: ${id}`,
            error
        });
    }
}