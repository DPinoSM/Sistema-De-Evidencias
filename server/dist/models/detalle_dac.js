"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_DAC = void 0;
// Importa las dependencias necesarias
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Detalle_DAC extendiendo el modelo y las interfaces
class Detalle_DAC extends sequelize_1.Model {
}
exports.Detalle_DAC = Detalle_DAC;
// Inicializa el modelo Detalle_DAC
Detalle_DAC.init({
    id_detalle_dac: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    revisado_dac: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    estado_dac: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comentario_dac: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: connection_1.default,
    freezeTableName: true,
    timestamps: false,
    modelName: 'detalle_dac', // Asegúrate de incluir el nombre del modelo aquí
});
exports.default = Detalle_DAC;
