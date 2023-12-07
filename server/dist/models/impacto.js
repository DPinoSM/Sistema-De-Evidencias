"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Impacto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Impacto extendiendo el modelo y las interfaces
class Impacto extends sequelize_1.Model {
}
exports.Impacto = Impacto;
// Inicializa el modelo Impacto
Impacto.init({
    id_impacto: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    interno_externo: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: connection_1.default,
    modelName: 'impacto',
    timestamps: false,
    freezeTableName: true,
});
// Exporta el modelo Impacto
exports.default = Impacto;
