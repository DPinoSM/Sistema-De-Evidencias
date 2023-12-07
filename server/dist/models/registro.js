"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registro = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Registro extendiendo el modelo y las interfaces
class Registro extends sequelize_1.Model {
}
exports.Registro = Registro;
// Inicializa el modelo Registro
Registro.init({
    id_registro: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    datos_registro: { type: sequelize_1.DataTypes.STRING },
    contenido_registro: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: connection_1.default,
    modelName: 'registro',
    timestamps: false,
    freezeTableName: true,
});
// Exporta el modelo Registro
exports.default = Registro;
