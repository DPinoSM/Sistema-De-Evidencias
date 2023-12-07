"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Criterio = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Criterio extendiendo el modelo y las interfaces
class Criterio extends sequelize_1.Model {
}
exports.Criterio = Criterio;
// Inicializa el modelo Criterio
Criterio.init({
    id_criterios: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_criterios: { type: sequelize_1.DataTypes.STRING },
    codigo_criterios: { type: sequelize_1.DataTypes.INTEGER },
    descripcion_criterios: { type: sequelize_1.DataTypes.STRING },
    estado_criterios: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
    sequelize: connection_1.default,
    modelName: 'criterios',
    timestamps: false,
    freezeTableName: true,
});
// Exporta el modelo Criterio
exports.default = Criterio;
