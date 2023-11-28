import { Request, Response } from 'express';
import { Evidencias } from '../models/evidencias';
import { Unidad } from '../models/unidad';
import { Op } from 'sequelize';
import { Detalle_Revisor } from '../models/detalle_revisor';
import { Detalle_DAC } from '../models/detalle_dac';
import { Detalle_Comite } from '../models/detalle_comite';
import { User } from '../models/user';
import { Debilidades } from '../models/debilidades';
import { Criterio } from '../models/criterio';
import { AmbitoGeografico } from '../models/ambito_geografico';
import { AmbitoAcademico } from '../models/ambito_academico';
import { Registro } from '../models/registro';
import { Carrera } from '../models/carrera';
import { Facultad } from '../models/facultad';
import { Proceso } from '../models/proceso';
import { Impacto } from '../models/impacto';
import { Estado } from '../models/estado';

export const newEvidencia = async (req: Request, res: Response) => {
    try {
        const {
            numero_folio,
            correo_usuario,
            rut_usuario,
            fecha_evidencia,
            numero_de_mejoras,
            descripcion,
            resultado,
            almacenamiento,
            unidades_personas_evidencias,
            palabra_clave,
            nombre_corto_evidencia,
            fecha_creacion,
            fecha_actualizacion,
            asistentes_internos_autoridades,
            asistentes_internos_administrativos,
            asistentes_internos_docentes,
            asistentes_internos_estudiantes,
            asistentes_externos_autoridades,
            asistentes_externos_administrativos,
            asistentes_externos_docentes,
            asistentes_externos_estudiantes,
            archivo_adjunto,
            id_detalle_revisor,
            id_detalle_dac,
            id_detalle_comite,
            id_usuario,
            id_debilidades,
            id_criterios,
            id_unidad,
            id_ambito_geografico,
            id_ambito_academico,
            id_registro,
            id_carrera,
            id_facultad,
            id_procesos,
            id_impacto,
            id_estado
        } = req.body;

        const numeroFolio = await Evidencias.findOne({ where: { numero_folio } });

        if (numeroFolio) {
            return res.status(400).json({
                msg: 'Ya existe una Evidencia con ese número de folio',
            });
        }

        const newEvidencia = await Evidencias.create({
            numero_folio,
            correo_usuario,
            rut_usuario,
            fecha_evidencia,
            numero_de_mejoras,
            descripcion,
            resultado,
            almacenamiento,
            unidades_personas_evidencias,
            palabra_clave,
            nombre_corto_evidencia,
            fecha_creacion,
            fecha_actualizacion,
            asistentes_internos_autoridades,
            asistentes_internos_administrativos,
            asistentes_internos_docentes,
            asistentes_internos_estudiantes,
            asistentes_externos_autoridades,
            asistentes_externos_administrativos,
            asistentes_externos_docentes,
            asistentes_externos_estudiantes,
            archivo_adjunto,
            id_detalle_revisor,
            id_detalle_dac,
            id_detalle_comite,
            id_usuario,
            id_debilidades,
            id_criterios,
            id_unidad,
            id_ambito_geografico,
            id_ambito_academico,
            id_registro,
            id_carrera,
            id_facultad,
            id_procesos,
            id_impacto,
            id_estado
        });

        const evidenciaConRelaciones = await newEvidencia.reload();

        return res.json({
            msg: 'Evidencia creada correctamente',
            evidencia: evidenciaConRelaciones, 
        });
    } catch (error) {
        console.error('Error en el controlador newEvidencia:', error);
        res.status(400).json({
            msg: 'Ocurrió un error',
            error,
        });
    }
};

export const getEvidencias = async (req: Request, res: Response) => {
    try {
        const listEvidencias = await Evidencias.findAll({
            attributes: [
                'id_evidencias',
                'numero_folio',
                'correo_usuario',
                'rut_usuario',
                'fecha_evidencia',
                'numero_de_mejoras',
                'descripcion',
                'resultado',
                'almacenamiento',
                'unidades_personas_evidencias',
                'palabra_clave',
                'nombre_corto_evidencia',
                'fecha_creacion',
                'fecha_actualizacion',
                'asistentes_internos_autoridades',
                'asistentes_internos_administrativos',
                'asistentes_internos_docentes',
                'asistentes_internos_estudiantes',
                'asistentes_externos_autoridades',
                'asistentes_externos_administrativos',
                'asistentes_externos_docentes',
                'asistentes_externos_estudiantes',
                'archivo_adjunto'
            ],
            include: [
                { model: Detalle_Revisor, attributes: ['revisado_revisor','comentario_revisor'] },
                { model: Detalle_DAC, attributes: ['revisado_dac','comentario_dac'] },
                { model: Detalle_Comite, attributes: ['revisado_comite','comentario_comite'] },
                { model: User, attributes: ['nombre_usuario'] },
                { model: Debilidades, attributes: ['descripcion_debilidades'] },
                { model: Criterio, attributes: ['nombre_criterios'] },
                { model: Unidad, attributes: ['nombre_unidad'] },
                { model: AmbitoGeografico, attributes: ['nombre_ambito_geografico']},
                { model: AmbitoAcademico, attributes: ['nombre_ambito_academico']},
                { model: Registro, attributes: ['datos_registro','contenido_registro']},
                { model: Carrera, attributes: ['nombre_carrera']},
                { model: Facultad, attributes: ['nombre_facultad']},
                { model: Proceso, attributes: ['nombre_procesos'] },
                { model: Impacto, attributes: ['interno_externo']},
                { model: Estado, attributes: ['online_presencial']}
            ],
        });

        res.json(listEvidencias);
    } catch (error) {
        console.error('Error en el controlador getEvidencias:', error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor',
            error,
        });
    }
};

export const getEvidencia = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const idUEvidencia = await Evidencias.findOne({ where: { id_evidencias: id } });

        if (!idUEvidencia) {
            return res.status(400).json({
                msg: 'La evidencia indicada no existe',
            });
        }

        res.json(idUEvidencia);
    } catch (error) {
        console.error('Error en el controlador getEvidencia:', error);
        res.status(400).json({
            msg: 'Ha ocurrido un error',
            error,
        });
    }
};

export const deleteEvidencia = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const idUEvidencia = await Evidencias.findOne({ where: { id_evidencias: id } });

        if (!idUEvidencia) {
            return res.status(400).json({
                msg: `La evidencia ${id} no existe`,
            });
        }

        await Evidencias.destroy({ where: { id_evidencias: id } });

        res.json({
            msg: `Se ha eliminado la evidencia: ${id}`,
        });
    } catch (error) {
        console.error('Error en el controlador deleteEvidencia:', error);
        res.status(400).json({
            msg: `No se ha podido eliminar la evidencia ${id}`,
            error,
        });
    }
};

export const updateEvidencia = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const {
            numero_folio,
            correo_usuario,
            rut_usuario,
            fecha_evidencia,
            numero_de_mejoras,
            descripcion,
            resultado,
            almacenamiento,
            unidades_personas_evidencias,
            palabra_clave,
            nombre_corto_evidencia,
            fecha_creacion,
            fecha_actualizacion,
            asistentes_internos_autoridades,
            asistentes_internos_administrativos,
            asistentes_internos_docentes,
            asistentes_internos_estudiantes,
            asistentes_externos_autoridades,
            asistentes_externos_administrativos,
            asistentes_externos_docentes,
            asistentes_externos_estudiantes,
            archivo_adjunto,
            id_detalle_revisor,
            id_detalle_dac,
            id_detalle_comite,
            id_usuario,
            id_debilidades,
            id_criterios,
            id_unidad,
            id_ambito_geografico,
            id_ambito_academico,
            id_registro,
            id_carrera,
            id_facultad,
            id_procesos,
            id_impacto,
            id_estado
        } = req.body;

        const idEvidencia = await Evidencias.findOne({ where: { id_evidencias: id } });

        if (!idEvidencia) {
            return res.status(400).json({
                msg: `El id ${id} de la evidencia no existe`,
            });
        }

        await Evidencias.update(
            {
                numero_folio,
                correo_usuario,
                rut_usuario,
                fecha_evidencia,
                numero_de_mejoras,
                descripcion,
                resultado,
                almacenamiento,
                unidades_personas_evidencias,
                palabra_clave,
                nombre_corto_evidencia,
                fecha_creacion,
                fecha_actualizacion,
                asistentes_internos_autoridades,
                asistentes_internos_administrativos,
                asistentes_internos_docentes,
                asistentes_internos_estudiantes,
                asistentes_externos_autoridades,
                asistentes_externos_administrativos,
                asistentes_externos_docentes,
                asistentes_externos_estudiantes,
                archivo_adjunto,
                id_detalle_revisor,
                id_detalle_dac,
                id_detalle_comite,
                id_usuario,
                id_debilidades,
                id_criterios,
                id_unidad,
                id_ambito_geografico,
                id_ambito_academico,
                id_registro,
                id_carrera,
                id_facultad,
                id_procesos,
                id_impacto,
                id_estado
            },
            { where: { id_evidencias: id } }
        );

        res.json({
            msg: `Se ha actualizado la evidencia: ${id}`,
        });
    } catch (error) {
        console.error('Error en el controlador updateEvidencia:', error);
        res.status(400).json({
            msg: `No se ha podido actualizar la evidencia con id: ${id}`,
            error,
        });
    }
}

export const buscarEvidencia = async (req: Request, res: Response) =>{
    const { searchTerm } = req.query;

    if (!searchTerm){
        return res.status(400).json({
            msg: 'El termino de busqueda no se proporcionó',
        });
    }

    try {
        const evidencias = await Evidencias.findAll({
            attributes: ['id_evidencias', 'nombre_corto_evidencia'],
            where: {
                [Op.or]: [
                    { id_evidencias: { [Op.like]: `%{searchTerm}%` } },
                    { nombre_corto_evidencia: { [Op.like]: `%{searchTerm}%` } },
                ],
            },
        });
        return res.json(evidencias);
    }   catch (error){
        return res.status(500).json({
            msg:'Ocurrió un error al buscar Evidencias',
        });
    }
};


