"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbitoGeografico = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase AmbitoGeografico extendiendo el modelo y las interfaces
class AmbitoGeografico extends sequelize_1.Model {
}
exports.AmbitoGeografico = AmbitoGeografico;
// Inicializa el modelo AmbitoGeografico
AmbitoGeografico.init({
    id_ambito_geografico: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_ambito_geografico: { type: sequelize_1.DataTypes.STRING },
    estado_ambito_geografico: { type: sequelize_1.DataTypes.BOOLEAN },
}, {
    sequelize: connection_1.default,
    modelName: 'ambito_geografico',
    timestamps: false,
    freezeTableName: true,
});
// Exporta el modelo AmbitoGeografico
exports.default = AmbitoGeografico;
