"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facultad = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Facultad = connection_1.default.define('facultad', {
    "id_facultad": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "nombre_facultad": { type: sequelize_1.DataTypes.STRING },
    "telefono_facultad": { type: sequelize_1.DataTypes.INTEGER }
}, {
    freezeTableName: true,
    timestamps: false,
});
