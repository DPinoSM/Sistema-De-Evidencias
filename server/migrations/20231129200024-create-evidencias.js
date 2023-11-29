'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Evidencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_evidencias: {
        type: Sequelize.INTEGER
      },
      numero_folio: {
        type: Sequelize.STRING
      },
      fecha_evidencia: {
        type: Sequelize.DATE
      },
      numero_de_mejoras: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      resultado: {
        type: Sequelize.STRING
      },
      almacenamiento: {
        type: Sequelize.STRING
      },
      unidades_personas_evidencia: {
        type: Sequelize.STRING
      },
      palabra_clave: {
        type: Sequelize.STRING
      },
      nombre_corto_evidencia: {
        type: Sequelize.STRING
      },
      fecha_creacion: {
        type: Sequelize.DATE
      },
      fecha_Actualizacion: {
        type: Sequelize.DATE
      },
      id_detalle_revisor_evidencias: {
        type: Sequelize.INTEGER
      },
      id_detalle_dac_evidencias: {
        type: Sequelize.INTEGER
      },
      id_detalle_comite_evidencias: {
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER
      },
      id_debilidades: {
        type: Sequelize.INTEGER
      },
      id_criterios: {
        type: Sequelize.INTEGER
      },
      id_unidad: {
        type: Sequelize.INTEGER
      },
      id_ambito_geografico: {
        type: Sequelize.INTEGER
      },
      id_ambito_academico: {
        type: Sequelize.INTEGER
      },
      id_registros: {
        type: Sequelize.INTEGER
      },
      id_carrera: {
        type: Sequelize.INTEGER
      },
      id_facultad: {
        type: Sequelize.INTEGER
      },
      id_procesos: {
        type: Sequelize.INTEGER
      },
      id_impacto: {
        type: Sequelize.INTEGER
      },
      id_estado: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_detalle_revisor_evidencias: {
        type: Sequelize.INTEGER,
        references: {
          model: 'detalle_revisor',
          key: 'id_detalle_revisor'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_detalle_dac_evidencias: {
        type: Sequelize.INTEGER,
        references: {
          model: 'detalle_dac',
          key: 'id_detalle_dac'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_detalle_comite_evidencias: {
        type: Sequelize.INTEGER,
        references: {
          model: 'detalle_comite',
          key: 'id_detalle_comite'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_debilidades: {
        type: Sequelize.INTEGER,
        references: {
          model: 'debilidades',
          key: 'id_debilidades'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_criterios: {
        type: Sequelize.INTEGER,
        references: {
          model: 'criterios',
          key: 'id_criterios'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_unidad: {
        type: Sequelize.INTEGER,
        references: {
          model: 'unidad',
          key: 'id_unidad'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_ambito_geografico: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ambito_geografico',
          key: 'id_ambito_geografico'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_registros: {
        type: Sequelize.INTEGER,
        references: {
          model: 'registro',
          key: 'id_registro'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_carrera: {
        type: Sequelize.INTEGER,
        references: {
          model: 'carrera',
          key: 'id_carrera'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_facultad: {
        type: Sequelize.INTEGER,
        references: {
          model: 'facultad',
          key: 'id_facultad'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_procesos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'procesos',
          key: 'id_procesos'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_impacto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'impacto',
          key: 'id_impacto'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_estado: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estado',
          key: 'id_estado'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Evidencias');
  }
};