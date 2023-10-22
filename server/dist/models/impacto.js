"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Impacto = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Impacto = connection_1.default.define('impacto', {
    "id_impacto": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "interno_externo": { type: sequelize_1.DataTypes.BOOLEAN }
}, {
    freezeTableName: true,
    timestamps: false,
});
