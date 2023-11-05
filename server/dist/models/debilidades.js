"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debilidades = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const criterio_1 = require("./criterio");
exports.Debilidades = connection_1.default.define("debilidades", {
    id_debilidades: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion_debilidades: {
        type: sequelize_1.DataTypes.STRING(70),
    },
    estado_debilidades: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    id_criterios: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});
exports.Debilidades.belongsTo(criterio_1.Criterio, { foreignKey: "id_criterios" });
