"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbitoGeografico = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.AmbitoGeografico = connection_1.default.define("ambito_geografico", {
    "id_ambito_geografico": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "nombre_ambito_geografico": { type: sequelize_1.DataTypes.STRING },
    "estado_ambito_geografico": { type: sequelize_1.DataTypes.BOOLEAN }
}, {
    freezeTableName: true,
    timestamps: false,
});
