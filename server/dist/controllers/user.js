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
exports.buscarUsuario = exports.updateUser = exports.deleteUser = exports.getUser = exports.loginUser = exports.getUsers = exports.newUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rol_1 = require("../models/rol");
const unidad_1 = require("../models/unidad");
const sequelize_1 = require("sequelize");
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rut_usuario, nombre_usuario, apellido1_usuario, apellido2_usuario, clave_usuario, correo_usuario, estado_usuario, id_rol, id_unidad, } = req.body;
        // Obtén la lista de roles disponibles
        const roles = yield rol_1.Rol.findAll({
            attributes: ['id_rol', 'nombre_rol'],
        });
        const hashedPassword = yield bcrypt_1.default.hash(clave_usuario, 10);
        const rutUsuario = yield user_1.User.findOne({ where: { rut_usuario } });
        if (rutUsuario) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese RUT',
            });
        }
        const newUser = yield user_1.User.create({
            rut_usuario,
            nombre_usuario,
            apellido1_usuario,
            apellido2_usuario,
            clave_usuario: hashedPassword,
            correo_usuario,
            estado_usuario,
            id_rol,
            id_unidad,
        });
        const usuarioConRelaciones = yield newUser.reload();
        return res.json({
            msg: 'Usuario creado correctamente',
            usuario: usuarioConRelaciones,
            roles, // Envía la lista de roles
        });
    }
    catch (error) {
        console.error('Error en el controlador newUser:', error);
        res.status(400).json({
            msg: 'Ocurrió un error',
            error,
        });
    }
});
exports.newUser = newUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listUsers = yield user_1.User.findAll({
            attributes: [
                'id_usuario',
                'rut_usuario',
                'nombre_usuario',
                'apellido1_usuario',
                'apellido2_usuario',
                'correo_usuario',
                'estado_usuario',
            ],
            include: [
                { model: rol_1.Rol, attributes: ['nombre_rol'] },
                { model: unidad_1.Unidad, attributes: ['nombre_unidad'] },
            ],
        });
        res.json(listUsers);
    }
    catch (error) {
        console.error('Error en el controlador getUsers:', error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor',
            error,
        });
    }
});
exports.getUsers = getUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rut_usuario, clave_usuario } = req.body;
    try {
        // Validación de usuario
        const usuario = yield user_1.User.findOne({ where: { rut_usuario } });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El RUT ingresado no es válido',
            });
        }
        // Validación de contraseña
        const passwordValida = yield bcrypt_1.default.compare(clave_usuario, usuario.clave_usuario);
        if (!passwordValida) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta',
            });
        }
        // Generar token JWT con el rol del usuario
        const token = jsonwebtoken_1.default.sign({
            rut_usuario,
            role: usuario.id_rol,
        }, process.env.SECRET_KEY || 'HS384', { expiresIn: '40' });
        // Enviar el token y el rol como parte de la respuesta JSON
        res.json({ token, rol: usuario.id_rol });
    }
    catch (error) {
        console.error('Error en el controlador loginUser:', error);
        res.status(500).json({
            msg: 'Error en el servidor',
            error,
        });
    }
});
exports.loginUser = loginUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const idUser = yield user_1.User.findOne({ where: { id_usuario: id } });
        if (!idUser) {
            return res.status(400).json({
                msg: 'El usuario indicado no existe',
            });
        }
        res.json(idUser);
    }
    catch (error) {
        console.error('Error en el controlador getUser:', error);
        res.status(400).json({
            msg: 'Ha ocurrido un error',
            error,
        });
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const idUser = yield user_1.User.findOne({ where: { id_usuario: id } });
        if (!idUser) {
            return res.status(400).json({
                msg: `El usuario ${id} no existe`,
            });
        }
        yield user_1.User.destroy({ where: { id_usuario: id } });
        res.json({
            msg: `Se ha eliminado al usuario: ${id}`,
        });
    }
    catch (error) {
        console.error('Error en el controlador deleteUser:', error);
        res.status(400).json({
            msg: `No se ha podido eliminar el usuario ${id}`,
            error,
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { rut_usuario, nombre_usuario, apellido1_usuario, apellido2_usuario, clave_usuario, correo_usuario, estado_usuario, id_rol, id_unidad, } = req.body;
        const idUser = yield user_1.User.findOne({ where: { id_usuario: id } });
        if (!idUser) {
            return res.status(400).json({
                msg: `El id ${id} de usuario no existe`,
            });
        }
        // Obtén la lista de roles disponibles
        const roles = yield rol_1.Rol.findAll({
            attributes: ['id_rol', 'nombre_rol'],
        });
        yield user_1.User.update({
            rut_usuario,
            nombre_usuario,
            apellido1_usuario,
            apellido2_usuario,
            clave_usuario,
            correo_usuario,
            estado_usuario,
            id_rol,
            id_unidad,
        }, { where: { id_usuario: id } });
        res.json({
            msg: `Se ha actualizado al usuario: ${id}`,
            roles, // Envía la lista de roles
        });
    }
    catch (error) {
        console.error('Error en el controlador updateUser:', error);
        res.status(400).json({
            msg: `No se ha podido actualizar el usuario con rut: ${id}`,
            error,
        });
    }
});
exports.updateUser = updateUser;
const buscarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (!searchTerm) {
        return res.status(400).json({
            msg: 'El termino de busqueda no se proporcionó',
        });
    }
    try {
        const users = yield user_1.User.findAll({
            attributes: ['id_usuario', 'nombre_usuario'],
            where: {
                [sequelize_1.Op.or]: [
                    { id_usuario: { [sequelize_1.Op.like]: `%{searchTerm}%` } },
                    { nombre_usuario: { [sequelize_1.Op.like]: `%{searchTerm}%` } },
                ],
            },
        });
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Ocurrió un error al buscar Usuarios',
        });
    }
});
exports.buscarUsuario = buscarUsuario;
