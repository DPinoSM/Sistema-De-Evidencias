"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detalle_DAC = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Detalle_DAC = connection_1.default.define('detalle_dac', {
    id_detalle_dac: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    revisado_dac: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    estado_dac: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comentario_dac: { type: sequelize_1.DataTypes.STRING }
}, {
    freezeTableName: true,
    timestamps: false,
});
