"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('Sistema de evidencias', 'postgres', 'popi09', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.default = sequelize;
