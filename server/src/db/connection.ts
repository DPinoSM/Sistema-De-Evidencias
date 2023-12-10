import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('Sistema de Evidencias', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
});
export default sequelize; 
