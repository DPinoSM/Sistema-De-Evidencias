//Jonathan Molina Gonzalez
//Modelo detalle_revisor
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleRevisor = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.DetalleRevisor = connection_1.default.define('detalle_revisor', {
    "id_detalle_Revisor": { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    "revisado_revisor": { type: sequelize_1.DataTypes.BOOLEAN },
    "estado_revisor": {type: sequelize_1.DataTypes.BOOLEAN },
    "comentario_revisor": {type: sequelize_1.DataTypes.STRING}
}, {
    freezeTableName: true,
    timestamps: false,
});
//fin
