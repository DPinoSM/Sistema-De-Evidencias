"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_Revisor = void 0;
// Importa las dependencias necesarias
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Detalle_Revisor extendiendo el modelo y las interfaces
class Detalle_Revisor extends sequelize_1.Model {
}
exports.Detalle_Revisor = Detalle_Revisor;
// Inicializa el modelo Detalle_Revisor
Detalle_Revisor.init({
    id_detalle_revisor: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    revisado_revisor: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    estado_revisor: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comentario_revisor: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: connection_1.default,
    modelName: 'Detalle_Revisor',
    timestamps: false,
    freezeTableName: true,
});
// Define la relación con Evidencias
// Exporta el modelo Detalle_Revisor
exports.default = Detalle_Revisor;
