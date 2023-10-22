"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.User = connection_1.default.define('usuarios', {
    "id_usuario": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "rut_usuario": { type: sequelize_1.DataTypes.STRING },
    "nombre_usuario": { type: sequelize_1.DataTypes.STRING },
    "apellido1_usuario": { type: sequelize_1.DataTypes.STRING },
    "apellido2_usuario": { type: sequelize_1.DataTypes.STRING },
    "clave_usuario": { type: sequelize_1.DataTypes.STRING },
    "correo_usuario": { type: sequelize_1.DataTypes.STRING },
    "estado_usuario": { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, {
    timestamps: false,
    freezeTableName: true
});
