"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.loginUser = exports.getUsers = exports.newUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario, nombre_usuario, apellido1_usuario, apellido2_usuario, clave_usuario, correo_usuario, estado_usuario } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(clave_usuario, 10);
    const rutUsuario = yield user_1.User.findOne({ where: { rut_usuario: rut_usuario } });
    if (rutUsuario) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con ese rut'
        });
    }
    try {
        yield user_1.User.create({
            "rut_usuario": rut_usuario,
            "nombre_usuario": nombre_usuario,
            "apellido1_usuario": apellido1_usuario,
            "apellido2_usuario": apellido2_usuario,
            "clave_usuario": hashedPassword,
            "correo_usuario": correo_usuario,
            "estado_usuario": estado_usuario
        });
        return res.json({
            msg: 'Usuario creado correctamentee'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newUser = newUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsers = yield user_1.User.findAll({ attributes: ['id_usuario', 'rut_usuario', 'nombre_usuario', 'apellido1_usuario', 'apellido2_usuario', 'correo_usuario', 'estado_usuario', 'id_rol', 'id_unidad'] });
    res.json(listUsers);
});
exports.getUsers = getUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario, clave_usuario } = req.body;
    // validacion de usuario
    const usuario = yield user_1.User.findOne({ where: { rut_usuario: rut_usuario } });
    if (!usuario) {
        return res.status(400).json({
            msg: 'El rut ingresado no es valido'
        });
    }
    //validacion del password
    const passwordValida = yield bcrypt_1.default.compare(clave_usuario, usuario.clave_usuario);
    if (!passwordValida) {
        return res.status(400).json({
            msg: 'Contraseña Incorrecta'
        });
    }
    else {
        // generar token
        const token = jsonwebtoken_1.default.sign({
            rut_usuario: rut_usuario
        }, process.env.SECRET_KEY || 'PRUEBA1'); // , {expiresIn: '10000'} como tercer parametro para timepo de expiracion del token
        res.json({ token, rol: usuario.Rol.id_rol });
    }
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idUser = yield user_1.User.findOne({ where: { id_usuario: id } });
    if (!idUser) {
        return res.status(400).json({
            msg: "El usuario indicado no existe"
        });
    }
    try {
        res.json(idUser);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ha ocurrido un error",
            error
        });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idUser = yield user_1.User.findOne({ where: { id_usuario: id } });
    if (!idUser) {
        return res.status(400).json({
            msg: "El usuario " + id + " no existe"
        });
    }
    try {
        yield user_1.User.destroy({ where: { id_usuario: id } });
        res.json({
            msg: "Se ha eliminado al usuario: " + id
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido eliminar el usuario " + id,
            error
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const idUser = yield user_1.User.findOne({ where: { id_usuario: id } });
    if (!idUser) {
        return res.status(400).json({
            msg: "El id " + id + " de usuario no existe"
        });
    }
    try {
        const { nombre_usuario, apellido1_usuario, apellido2_usuario, clave_usuario, correo_usuario, estado_usuario } = req.body;
        yield user_1.User.update({
            nombre_usuario: nombre_usuario,
            apellido1_usuario: apellido1_usuario,
            apellido2_usuario: apellido2_usuario,
            clave_usuario: clave_usuario,
            correo_usuario: correo_usuario,
            estado_usuario: estado_usuario
        }, { where: { id_usuario: id }
        });
        res.json({
            msg: "Se ha actualizado al usuario: " + id
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "No se ha podido actualizar el usuario con rut: " + id,
            error
        });
    }
});
exports.updateUser = updateUser;
