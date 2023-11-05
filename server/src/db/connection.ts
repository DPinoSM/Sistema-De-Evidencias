import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('Sistema de evidencias', 'postgres', 'popi09', {
    host: 'localhost',
    dialect: 'postgres',
});
export default sequelize; 