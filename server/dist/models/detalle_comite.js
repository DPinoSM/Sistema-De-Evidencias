"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_Comite = void 0;
// Importa las dependencias necesarias
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Detalle_Comite extendiendo el modelo y las interfaces
class Detalle_Comite extends sequelize_1.Model {
}
exports.Detalle_Comite = Detalle_Comite;
// Inicializa el modelo Detalle_Comite
Detalle_Comite.init({
    id_detalle_comite: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    revisado_comite: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    estado_comite: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comentario_comite: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: connection_1.default,
    freezeTableName: true,
    timestamps: false,
    modelName: 'detalle_comite', // Asegúrate de incluir el nombre del modelo aquí
});
// Exporta el modelo Detalle_Comite
exports.default = Detalle_Comite;
