"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Product = connection_1.default.define('rol_usuarios', {
    "COD_ROL": { type: sequelize_1.DataTypes.INTEGER },
    "NOMBRE_ROL": { type: sequelize_1.DataTypes.STRING }
});
