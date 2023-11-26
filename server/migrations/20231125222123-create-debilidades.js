'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Debilidades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_debilidades: {
        type: Sequelize.INTEGER
      },
      descripcion_debilidades: {
        type: Sequelize.STRING
      },
      estado_debilidades: {
        type: Sequelize.BOOLEAN
      },
      id_criterios: {
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

      id_criterios: {
        type: Sequelize.INTEGER,
        references: {
          model: 'criterio',
          key: 'id_criterios',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Debilidades');
  }
};