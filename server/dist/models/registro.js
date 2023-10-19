"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registro = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Registro = connection_1.default.define('registro', {
    "id_registro": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    "datos_registro": { type: sequelize_1.DataTypes.STRING },
    "contenido_registro": { type: sequelize_1.DataTypes.STRING }
}, {
    freezeTableName: true,
    timestamps: false,
});
