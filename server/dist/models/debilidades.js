//Jonathan Molina Gonzalez
//Modelo debilidades
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleRevisor = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.DetalleRevisor = connection_1.default.define('detalle_revisor', {
    "id_debilidades": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "descripcion_debilidades": { type: sequelize_1.DataTypes.STRING },
    "estado_debilidades": {type: sequelize_1.DataTypes.BOOLEAN },
    "id_criterios": {type: sequelize_1.DataTypes.INTEGER}
}, {
    freezeTableName: true,
    timestamps: false,
});
debilidades.belongsTo(criterios, { foreignKey: 'id_criterios' });

module.exports = debilidades;
 
//fin

