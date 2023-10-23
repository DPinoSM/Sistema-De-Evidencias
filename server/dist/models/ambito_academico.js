"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbitoAcademico = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.AmbitoAcademico = connection_1.default.define('ambito_academico', {
    "id_ambito_academico": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "nombre_ambito_academico": { type: sequelize_1.DataTypes.STRING },
    "estado_ambito_academico": { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, {
    freezeTableName: true,
    timestamps: false,
});
