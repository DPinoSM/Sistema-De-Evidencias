"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proceso = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Proceso = connection_1.default.define("procesos", {
    "id_procesos": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "codigo_procesos": { type: sequelize_1.DataTypes.STRING },
    "nombre_procesos": { type: sequelize_1.DataTypes.STRING },
    "estado_procesos": { type: sequelize_1.DataTypes.BOOLEAN }
}, {
    freezeTableName: true,
    timestamps: false,
});
