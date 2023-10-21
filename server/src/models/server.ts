import express, {Application} from 'express';
import cors from 'cors';
import routesRoles from '../routes/roles';
import routesUser from '../routes/user';
import routerUnidad from '../routes/unidad';
import routerRegistro from '../routes/registro';
import routerCriterio from '../routes/criterio';
import routerProceso from '../routes/proceso';
import routerAmbitoAcademico from '../routes/ambito_academico';
import routerFacultad from '../routes/facultad';
import { Rol } from './rol';
import { User } from './user';
import { Unidad } from './unidad';
import { Registro } from './registro';
import {Criterio} from './criterio';
import { Proceso } from './proceso';
import { AmbitoAcademico } from './ambito_academico';
import { Facultad } from './facultad';

class Server {
    private app: Application;
    private port: string ;
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();    
    }
    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Corriendo en el puerto ' + this.port);
        })
    }
    routes(){
        this.app.use('/api/roles',routesRoles);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/unidad', routerUnidad);
        this.app.use('/api/registro', routerRegistro);
        this.app.use('/api/criterio', routerCriterio);
        this.app.use('/api/proceso', routerProceso);
        this.app.use('/api/ambitoacademico', routerAmbitoAcademico);
        this.app.use('api/facultad', routerFacultad);
    }
    midlewares() {
        //parseo body
        this.app.use(express.json());
        //cors
        this.app.use(cors());
    }
    async dbConnect(){
        try{
            await Rol.sync()
            await User.sync()
            await Unidad.sync()
            await Registro.sync()
            await Criterio.sync()
            await Proceso.sync()
            await AmbitoAcademico.sync()
            await Facultad.sync()
        }catch (error){
            console.error('No se ha podido conectar a la base de datos');
        }
    }
}
export default Server;