"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_Revisor = void 0;
//JONATHAN MOLINA 
//MODELS DETALLE REVISOR
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Detalle_Revisor = connection_1.default.define('detalle_revisor', {
    id_detalle_revisor: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    revisado_revisor: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    estado_revisor: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comentario_revisor: { type: sequelize_1.DataTypes.STRING }
}, {
    freezeTableName: true,
    timestamps: false,
});
