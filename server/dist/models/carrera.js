"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrera = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Carrera = connection_1.default.define('carrera', {
    "id_carrera": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "nombre_carrera": { type: sequelize_1.DataTypes.STRING },
    "area": { type: sequelize_1.DataTypes.STRING },
    "cantidad_matriculados": { type: sequelize_1.DataTypes.INTEGER }
}, {
    freezeTableName: true,
    timestamps: false,
});
