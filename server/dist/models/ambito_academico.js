"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbitoAcademico = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase AmbitoAcademico extendiendo el modelo y las interfaces
class AmbitoAcademico extends sequelize_1.Model {
}
exports.AmbitoAcademico = AmbitoAcademico;
// Inicializa el modelo AmbitoAcademico
AmbitoAcademico.init({
    id_ambito_academico: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_ambito_academico: { type: sequelize_1.DataTypes.STRING },
    estado_ambito_academico: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
    sequelize: connection_1.default,
    modelName: 'ambito_academico',
    timestamps: false,
    freezeTableName: true,
});
// Exporta el modelo AmbitoAcademico
exports.default = AmbitoAcademico;
