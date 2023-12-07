"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facultad = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Facultad extendiendo el modelo y las interfaces
class Facultad extends sequelize_1.Model {
}
exports.Facultad = Facultad;
// Inicializa el modelo Facultad
Facultad.init({
    id_facultad: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_facultad: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: connection_1.default,
    modelName: 'facultad',
    timestamps: false,
    freezeTableName: true,
});
// Exporta el modelo Facultad
exports.default = Facultad;
