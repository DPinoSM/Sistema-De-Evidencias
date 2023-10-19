"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unidad = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Unidad = connection_1.default.define('unidad', {
    "id_unidad": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true },
    "nombre_unidad": { type: sequelize_1.DataTypes.STRING },
    "unidad_defecto": { type: sequelize_1.DataTypes.BOOLEAN }
}, {
    freezeTableName: true,
    timestamps: false,
});
