'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        type: Sequelize.INTEGER
      },
      rut_usuario: {
        type: Sequelize.STRING
      },
      nombre_usuario: {
        type: Sequelize.STRING
      },
      apellido1_usuario: {
        type: Sequelize.STRING
      },
      apellido2_usuario: {
        type: Sequelize.STRING
      },
      clave_usuario: {
        type: Sequelize.STRING
      },
      correo_usuario: {
        type: Sequelize.STRING
      },
      estado_usuario: {
        type: Sequelize.BOOLEAN
      },
      id_rol: {
        type: Sequelize.INTEGER
      },
      id_unidad: {
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
            // Clave foránea para la tabla Rol
      id_rol: {
        type: Sequelize.INTEGER,
        references: {
          model: 'rol',
          key: 'id_rol',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      // Clave foránea para la tabla Unidad
      id_unidad: {
        type: Sequelize.INTEGER,
        references: {
          model: 'unidad',
          key: 'id_unidad',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};