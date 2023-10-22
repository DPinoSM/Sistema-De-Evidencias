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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const roles_1 = __importDefault(require("../routes/roles"));
const user_1 = __importDefault(require("../routes/user"));
const unidad_1 = __importDefault(require("../routes/unidad"));
const registro_1 = __importDefault(require("../routes/registro"));
const criterio_1 = __importDefault(require("../routes/criterio"));
const proceso_1 = __importDefault(require("../routes/proceso"));
const ambito_academico_1 = __importDefault(require("../routes/ambito_academico"));
const facultad_1 = __importDefault(require("../routes/facultad"));
<<<<<<< HEAD
=======
const ambito_geografico_1 = __importDefault(require("../routes/ambito_geografico"));
const carrera_1 = __importDefault(require("../routes/carrera"));
>>>>>>> 59ec8f7cba26c991e09130da6e4cce01e77e1b71
const rol_1 = require("./rol");
const user_2 = require("./user");
const unidad_2 = require("./unidad");
const registro_2 = require("./registro");
const criterio_2 = require("./criterio");
const proceso_2 = require("./proceso");
const ambito_academico_2 = require("./ambito_academico");
const facultad_2 = require("./facultad");
<<<<<<< HEAD
=======
const ambito_geografico_2 = require("./ambito_geografico");
const carrera_2 = require("./carrera");
>>>>>>> 59ec8f7cba26c991e09130da6e4cce01e77e1b71
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/roles', roles_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/unidad', unidad_1.default);
        this.app.use('/api/registro', registro_1.default);
        this.app.use('/api/criterio', criterio_1.default);
        this.app.use('/api/proceso', proceso_1.default);
        this.app.use('/api/ambitoacademico', ambito_academico_1.default);
        this.app.use('api/facultad', facultad_1.default);
<<<<<<< HEAD
=======
        this.app.use('/api/ambitogeografico', ambito_geografico_1.default);
        this.app.use('api/carrera', carrera_1.default);
>>>>>>> 59ec8f7cba26c991e09130da6e4cce01e77e1b71
    }
    midlewares() {
        //parseo body
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield rol_1.Rol.sync();
                yield user_2.User.sync();
                yield unidad_2.Unidad.sync();
                yield registro_2.Registro.sync();
                yield criterio_2.Criterio.sync();
                yield proceso_2.Proceso.sync();
                yield ambito_academico_2.AmbitoAcademico.sync();
                yield facultad_2.Facultad.sync();
<<<<<<< HEAD
=======
                yield ambito_geografico_2.AmbitoGeografico.sync();
                yield carrera_2.Carrera.sync();
>>>>>>> 59ec8f7cba26c991e09130da6e4cce01e77e1b71
            }
            catch (error) {
                console.error('No se ha podido conectar a la base de datos');
            }
        });
    }
}
exports.default = Server;
