import { Sequelize,DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/connection';
import { Unidad } from './unidad';
import { Detalle_Revisor } from './detalle_revisor';
import { Detalle_DAC } from './detalle_dac';
import { Detalle_Comite } from './detalle_comite';
import { User } from './user';
import { Debilidades } from './debilidades';
import { AmbitoGeografico } from './ambito_geografico';
import { AmbitoAcademico } from './ambito_academico';
import { Registro } from './registro';
import { Carrera } from './carrera';
import { Facultad } from './facultad';
import { Proceso } from './proceso';
import { Impacto } from './impacto';
import { Estado } from './estado';
import { Criterio } from './criterio';

interface EvidenciasAttributes {
  id_evidencias: number;
  numero_folio: string;
  correo_usuario: string;
  rut_usuario: number;
  fecha_evidencia: Date;
  numero_de_mejoras: number;
  descripcion: string;
  resultado: string;
  almacenamiento: string;
  unidades_personas_evidencias: number;
  palabra_clave: string;
  nombre_corto_evidencia: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  asistentes_internos_autoridades: number;
  asistentes_internos_administrativos: number;
  asistentes_internos_docentes: number;
  asistentes_internos_estudiantes: number;
  asistentes_externos_autoridades: number;
  asistentes_externos_administrativos: number;
  asistentes_externos_docentes: number;
  asistentes_externos_estudiantes: number;
  archivo_adjunto: Buffer;
  id_detalle_revisor: number;
  id_detalle_dac: number;
  id_detalle_comite: number;
  id_usuario: number;
  id_debilidades: number;
  id_criterios: number;
  id_unidad: number;
  id_ambito_geografico: number;
  id_ambito_academico: number;
  id_registro: number;
  id_carrera: number;
  id_facultad: number;
  id_procesos: number;
  id_impacto: number;
  id_estado: number;
}

interface EvidenciasCreationAttributes extends Optional<EvidenciasAttributes, 'id_evidencias'> {}

export class Evidencias
  extends Model<EvidenciasAttributes, EvidenciasCreationAttributes>
  implements EvidenciasAttributes {
  public id_evidencias!: number;
  public numero_folio!: string;
  public correo_usuario!: string;
  public rut_usuario!: number;
  public fecha_evidencia!: Date;
  public numero_de_mejoras!: number;
  public descripcion!: string;
  public resultado!: string;
  public almacenamiento!: string;
  public unidades_personas_evidencias!: number;
  public palabra_clave!: string;
  public nombre_corto_evidencia!: string;
  public fecha_creacion!: Date;
  public fecha_actualizacion!: Date;
  public asistentes_internos_autoridades!: number;
  public asistentes_internos_administrativos!: number;
  public asistentes_internos_docentes!: number;
  public asistentes_internos_estudiantes!: number;
  public asistentes_externos_autoridades!: number;
  public asistentes_externos_administrativos!: number;
  public asistentes_externos_docentes!: number;
  public asistentes_externos_estudiantes!: number;
  public archivo_adjunto!: Buffer;
  public id_detalle_revisor!: number;
  public id_detalle_dac!: number;
  public id_detalle_comite!: number;
  public id_usuario!: number;
  public id_debilidades!: number;
  public id_criterios!: number;
  public id_unidad!: number;
  public id_ambito_geografico!: number;
  public id_ambito_academico!: number;
  public id_registro!: number;
  public id_carrera!: number;
  public id_facultad!: number;
  public id_procesos!: number;
  public id_impacto!: number;
  public id_estado!: number;


static initModel(sequelize: Sequelize) {
    Evidencias.init(
    {
        id_evidencias: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        numero_folio: { type: DataTypes.STRING },
        correo_usuario: { type: DataTypes.STRING },
        rut_usuario: { type: DataTypes.INTEGER },
        fecha_evidencia: { type: DataTypes.DATE },
        numero_de_mejoras: { type: DataTypes.INTEGER },
        descripcion: { type: DataTypes.STRING },
        resultado: { type: DataTypes.STRING },
        almacenamiento: { type: DataTypes.STRING },
        unidades_personas_evidencias: { type: DataTypes.INTEGER },
        palabra_clave: { type: DataTypes.STRING },
        nombre_corto_evidencia: { type: DataTypes.STRING },
        fecha_creacion: { type: DataTypes.DATE },
        fecha_actualizacion: { type: DataTypes.DATE },
        asistentes_internos_autoridades: { type: DataTypes.INTEGER },
        asistentes_internos_administrativos: { type: DataTypes.INTEGER },
        asistentes_internos_docentes: { type: DataTypes.INTEGER },
        asistentes_internos_estudiantes: { type: DataTypes.INTEGER },
        asistentes_externos_autoridades: { type: DataTypes.INTEGER },
        asistentes_externos_administrativos: { type: DataTypes.INTEGER },
        asistentes_externos_docentes: { type: DataTypes.INTEGER },
        asistentes_externos_estudiantes: { type: DataTypes.INTEGER },
        archivo_adjunto: { type: DataTypes.BLOB('long') },
        id_detalle_revisor: { type: DataTypes.INTEGER},
        id_detalle_dac: { type: DataTypes.INTEGER},
        id_detalle_comite: { type: DataTypes.INTEGER},
        id_usuario: { type: DataTypes.INTEGER },
        id_debilidades: { type: DataTypes.INTEGER },
        id_criterios: { type: DataTypes.INTEGER },
        id_unidad: { type: DataTypes.INTEGER },
        id_ambito_geografico: { type: DataTypes.INTEGER },
        id_ambito_academico: { type: DataTypes.INTEGER },
        id_registro: { type: DataTypes.INTEGER },
        id_carrera: { type: DataTypes.INTEGER },
        id_facultad: { type: DataTypes.INTEGER },
        id_procesos: { type: DataTypes.INTEGER },
        id_impacto: { type: DataTypes.INTEGER },
        id_estado: { type: DataTypes.INTEGER },
        },
        {
        sequelize,
        modelName: 'Evidencias',
        timestamps: false,
        freezeTableName: true,
        }
    );

    // Resto de la configuración y asociaciones...


    Evidencias.belongsTo(Detalle_Revisor, {foreignKey: 'id_detalle_revisor', as: 'detalle_revisor'});
    Evidencias.belongsTo(Detalle_DAC, {foreignKey: 'id_detalle_dac'});
    Evidencias.belongsTo(Detalle_Comite, {foreignKey: 'id_detalle_comite'});
    Evidencias.belongsTo(User, {foreignKey: 'id_usuario'});
    Evidencias.belongsTo(Debilidades, {foreignKey: 'id_debilidades'});
    Evidencias.belongsTo(Criterio, {foreignKey: 'id_criterios'});
    Evidencias.belongsTo(Unidad, { foreignKey: 'id_unidad' });
    Evidencias.belongsTo(AmbitoGeografico, {foreignKey: 'id_ambito_geografico'});
    Evidencias.belongsTo(AmbitoAcademico, {foreignKey: 'id_ambito_academico'});
    Evidencias.belongsTo(Registro, {foreignKey: 'id_registro'});
    Evidencias.belongsTo(Carrera, {foreignKey: 'id_carrera'});
    Evidencias.belongsTo(Facultad, {foreignKey: 'id_facultad'});
    Evidencias.belongsTo(Proceso, {foreignKey: 'id_procesos'});
    Evidencias.belongsTo(Impacto, {foreignKey: 'id_impacto'});
    Evidencias.belongsTo(Estado, {foreignKey: 'id_estado'});
}
}

Evidencias.initModel(sequelize);
