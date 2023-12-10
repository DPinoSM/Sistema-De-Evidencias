"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debilidades = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Debilidades extendiendo el modelo y las interfaces
class Debilidades extends sequelize_1.Model {
}
exports.Debilidades = Debilidades;
// Inicializa el modelo Debilidades
Debilidades.init({
    id_debilidades: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion_debilidades: { type: sequelize_1.DataTypes.STRING },
    estado_debilidades: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
    sequelize: connection_1.default,
    modelName: 'debilidades',
    timestamps: false,
    freezeTableName: true,
});
// Exporta el modelo Debilidades
exports.default = Debilidades;
