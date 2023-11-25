"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_Comite = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Detalle_Comite = connection_1.default.define('detalle_comite', {
    id_detalle_comite: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    revisado_comite: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    estado_comite: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comentario_comite: { type: sequelize_1.DataTypes.STRING }
}, {
    freezeTableName: true,
    timestamps: false,
});
