import { Request, Response } from 'express';
import { Evidencias } from '../models/evidencias';
import { Unidad } from '../models/unidad';
import { Model, Op } from 'sequelize';
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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

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

        const numeroFolio = await Evidencias.findOne({ where: { numero_folio: numero_folio } });

        if (numero_folio === undefined || numero_folio === null) {
            return res.status(400).json({
              msg: 'El campo "numero_folio" es requerido.',
            });
          }
          

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
                { model: Detalle_Revisor, as: 'detalle_revisor', attributes: ['revisado_revisor','comentario_revisor'] },
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
};

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
                    { 'id_evidencias': { [Op.like]: `%${searchTerm}%` } },
                    { 'nombre_corto_evidencia': { [Op.like]: `%${searchTerm}%` } },
                ],
            }as unknown as Record<string,any>,
        });
        return res.json(evidencias);
    }   catch (error){
        return res.status(500).json({
            msg:'Ocurrió un error al buscar Evidencias',
        });
    }
};

pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  interface TDocumentDefinitions {
    content: any[]
    styles: Record<string,any>;
  }

export const generarPDF = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Obtener los detalles de la evidencia por ID
    const evidencia = await Evidencias.findByPk(id);

    

    if (!evidencia) {
      return res.status(404).send('Evidencia no encontrada');
    }

    const detalleRevisor = await Detalle_Revisor.findOne({
        where: {id_detalle_revisor: evidencia.id_detalle_revisor},
    });
    const detalleDac = await Detalle_DAC.findOne({
        where: {id_detalle_dac: evidencia.id_detalle_dac},
    });
    const detalleComite = await Detalle_Comite.findOne({
        where: {id_detalle_comite: evidencia.id_detalle_comite},
    });
    const nameUser = await User.findOne({
        where: {id_usuario: evidencia.id_usuario},
    });
    const descripcionDebilidades = await Debilidades.findOne({
        where: {id_debilidades: evidencia.id_debilidades},
    });
    const detalleCriterios = await Criterio.findOne({
        where: {id_criterios: evidencia.id_criterios},
    });
    const nameUnidad = await Unidad.findOne({
        where: {id_unidad: evidencia.id_unidad},
    });
    const nameAmbitoGeografico = await AmbitoGeografico.findOne({
        where: {id_ambito_geografico: evidencia.id_ambito_geografico},
    });
    const nameAmbitoAcademico = await AmbitoAcademico.findOne({
        where: {id_ambito_academico: evidencia.id_ambito_academico},
    });
    const detalleRegistro = await Registro.findOne({
        where: {id_registro: evidencia.id_registro},
    });
    const nameCarrera = await Carrera.findOne({
        where: {id_carrera: evidencia.id_carrera},
    });
    const nameFacultad = await Facultad.findOne({
        where: {id_facultad: evidencia.id_facultad},
    });
    const nameProceso = await Proceso.findOne({
        where: {id_procesos: evidencia.id_procesos},
    });
    const typeImpacto = await Impacto.findOne({
        where: {id_impacto: evidencia.id_impacto},
    });
    const typeEstado = await Estado.findOne({
        where: {id_estado: evidencia.id_estado},
    }); 



    // Crear la definición del documento PDF
    const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: `Evidencia: ${evidencia.nombre_corto_evidencia}`, style: 'header' },
        { text: '\nDetalles de la Evidencia:\n\n', style: 'subheader' },
        
        // Crear una tabla con los datos de la evidencia
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*'],
            body: [
              ['Campo', 'Valor'],
              ['Número de Folio', evidencia.numero_folio],
              ['Correo Usuario', evidencia.correo_usuario],
              ['Rut Usuario', evidencia.rut_usuario],
              ['Fecha de evidencia', evidencia.fecha_evidencia],
              ['Número de mejoras', evidencia.numero_de_mejoras],
              ['Descripción', evidencia.descripcion],
              ['Resultado', evidencia.resultado],
              ['Almacenamiento', evidencia.almacenamiento],
              ['Unidades de Personas de Evidencia', evidencia.unidades_personas_evidencias],
              ['Palabras Claves', evidencia.palabra_clave],
              ['Nombre Abreviado', evidencia.nombre_corto_evidencia],
              ['Fecha de Creación', evidencia.fecha_creacion],
              ['Fecha de Actualizacion', evidencia.fecha_actualizacion],
              ['Asistentes Internos Autoridades', evidencia.asistentes_internos_autoridades],
              ['Asistentes Internos Administrativos', evidencia.asistentes_internos_administrativos],
              ['Asistentes Internos Docentes', evidencia.asistentes_internos_docentes],
              ['Asistentes Internos Estudiantes', evidencia.asistentes_internos_estudiantes],
              ['Asistentes Externos Autoridades', evidencia.asistentes_externos_autoridades],
              ['Asistentes Externos Administrativos', evidencia.asistentes_externos_administrativos],
              ['Asistentes Externos Docentes', evidencia.asistentes_externos_docentes],
              ['Asistentes Externos Estudiantes', evidencia.asistentes_externos_estudiantes],
              ['Detalle Revisor', detalleRevisor?.comentario_revisor || 'No disponible'],
              ['Detalle Dac', detalleDac?.comentario_dac || 'No disponible'],
              ['Detalle Comite', detalleComite?.comentario_comite || 'No disponible'],
              ['Usuario',
                (nameUser?.nombre_usuario || '') +
                (nameUser?.apellido1_usuario ? ` ${nameUser.apellido1_usuario}` : '') +
                (nameUser?.apellido2_usuario ? ` ${nameUser.apellido2_usuario}` : '')
              ],
              ['Debilidades', descripcionDebilidades?.descripcion_debilidades || 'No disponibles'],
              ['Criterios', 
                [
                    detalleCriterios?.nombre_criterios || 'No disponible',
                    detalleCriterios?.descripcion_criterios || 'No disponible'
                ].join('\n'),
              ],
              ['Unidad', nameUnidad?.nombre_unidad || 'No disponible'],
              ['Ambito Geografico', nameAmbitoGeografico?.nombre_ambito_geografico || 'No disponible'],
              ['Ambito Academico', nameAmbitoAcademico?.nombre_ambito_academico || 'No disponible'],
              ['Registro', [
                detalleRegistro?.datos_registro || 'No disponible',
                detalleRegistro?.contenido_registro || 'No disponible'
              ].join('\n'),
              ],
              ['Carrera', nameCarrera?.nombre_carrera || 'No disponible'],
              ['Facultad', nameFacultad?.nombre_facultad || 'No disponible'],
              ['Proceso', nameProceso?.nombre_procesos || 'No disponible'],
              ['Impacto', typeImpacto?.interno_externo || 'No disponible'],
              ['Estado', typeEstado?.online_presencial || 'No disponible'],
            ],
          },
        } as any,
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 14,
          bold: true,
        },
      },
    };

    // Crear el PDF
    const pdfDoc = pdfMake.createPdf(documentDefinition);

    // Enviar el PDF como respuesta
    pdfDoc.getBuffer((result: Buffer) => {
        try {
            res.attachment(`evidencia_${id}.pdf`);
            res.type('application/pdf');
            res.end(result, 'binary');
        } catch (error) {
          console.error('Error procesando imagen', error);
          res.status(500).send('Error proceso de imagen');
        }
      });
    } catch (error) {
      console.error('Error al generar el PDF', error);
      res.status(500).send('Error interno del servidor');
    }
};

export const getEvidenciasByUsuario = async (req: Request, res: Response) => {
    const { id_usuario } = req.params;

    // Validar que id_usuario sea un número antes de continuar
    if (isNaN(+id_usuario)) {
        return res.status(400).json({
            msg: 'El parámetro id_usuario debe ser un número válido.',
        });
    }

    try {
        const evidenciasUsuario = await Evidencias.findAll({
            where: {
                id_usuario: +id_usuario,
                id_detalle_revisor: {
                    [Op.or]: [
                        { [Op.eq]: null },
                        { [Op.ne]: null },
                    ],
                },
                id_detalle_dac: {
                    [Op.or]: [
                        { [Op.eq]: null },
                        { [Op.ne]: null },
                    ],
                },
                id_detalle_comite: {
                    [Op.or]: [
                        { [Op.eq]: null },
                        { [Op.ne]: null },
                    ],
                },
            } as unknown as Record<string, any>,
        });

        if (!evidenciasUsuario || evidenciasUsuario.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron evidencias para el usuario indicado',
            });
        }

        res.json(evidenciasUsuario);
    } catch (error) {
        console.error('Error en el controlador getEvidenciasByUsuario:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error,
        });
    }
};


export const filtrarEvidenciasPorAprobacion = async (req: Request, res: Response) => {
    const { estado } = req.params;

    try {
        // Obtén todas las evidencias de la base de datos
        const todasLasEvidencias = await Evidencias.findAll();

        // Filtra las evidencias según el estado proporcionado
        const evidenciasFiltradas = await Promise.all(todasLasEvidencias.map(async (evidencia) => {
            const detalleRevisor = await Detalle_Revisor.findOne({
                where: { id_detalle_revisor: evidencia.id_detalle_revisor },
            });
            const detalleDac = await Detalle_DAC.findOne({
                where: { id_detalle_dac: evidencia.id_detalle_dac },
            });
            const detalleComite = await Detalle_Comite.findOne({
                where: { id_detalle_comite: evidencia.id_detalle_comite },
            });

            const estadoEvidencia = determinarEstadoEvidencia(detalleRevisor, detalleDac, detalleComite);

            // Devuelve la evidencia solo si coincide con el estado proporcionado
            return estadoEvidencia === estado ? evidencia : null;
        }));

        // Devuelve la lista de evidencias filtradas
        const evidenciasFiltradasSinNulos = evidenciasFiltradas.filter(e => e !== null);

        // Devuelve la lista de evidencias filtradas
        res.json(evidenciasFiltradasSinNulos);

    } catch (error) {
        console.error('Error al filtrar evidencias por aprobación:', error);
        res.status(500).json({ error: 'Ocurrió un error al filtrar evidencias por aprobación' });
    }
};

// Función para determinar el estado de una evidencia
const determinarEstadoEvidencia = (detalleRevisor: any, detalleDac: any, detalleComite: any): string => {
    if (detalleRevisor?.revisado_revisor === true && detalleDac?.revisado_dac === true && detalleComite?.revisado_comite === true) {
        return 'Aprobada';
    } else if (detalleRevisor?.revisado_revisor === false || detalleDac?.revisado_dac === false || detalleComite?.revisado_comite === false) {
        return 'Rechazada';
    } else {
        return 'En espera';
    }
};
