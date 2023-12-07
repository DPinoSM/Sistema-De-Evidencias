"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unidad = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Unidad extendiendo el modelo y las interfaces
class Unidad extends sequelize_1.Model {
}
exports.Unidad = Unidad;
// Inicializa el modelo Unidad
Unidad.init({
    id_unidad: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_unidad: { type: sequelize_1.DataTypes.STRING },
    unidad_defecto: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
    sequelize: connection_1.default,
    modelName: 'unidad',
    timestamps: false,
    freezeTableName: true,
});
// Exporta el modelo Unidad
exports.default = Unidad;
