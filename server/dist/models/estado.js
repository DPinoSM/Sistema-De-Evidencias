"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estado = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Define la clase Estado extendiendo el modelo y las interfaces
class Estado extends sequelize_1.Model {
}
exports.Estado = Estado;
// Inicializa el modelo Estado
Estado.init({
    id_estado: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    online_presencial: { type: sequelize_1.DataTypes.STRING },
}, {
    sequelize: connection_1.default,
    modelName: 'estado',
    timestamps: false,
    freezeTableName: true,
});
// Exporta el modelo Estado
exports.default = Estado;
