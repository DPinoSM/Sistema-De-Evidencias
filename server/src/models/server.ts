import express, {Application} from 'express';
import cors from 'cors';
import routesRoles from '../routes/roles';
import routesUser from '../routes/user';
import routerUnidad from '../routes/unidad';
import routerRegistro from '../routes/registro';
import routerCriterio from '../routes/criterio';
import routerProceso from '../routes/proceso';
import { Rol } from './rol';
import { User } from './user';
import { Unidad } from './unidad';
import { Registro } from './registro';
import {Criterio} from './criterio';
import { Proceso } from './proceso';

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
            console.log('Corriendo en el puertoo ' + this.port);
        })
    }
    routes(){
        this.app.use('/api/roles',routesRoles);
        this.app.use('/api/users', routesUser);
        this.app.use('/api/unidad', routerUnidad);
        this.app.use('/api/registro', routerRegistro);
        this.app.use('/api/criterio', routerCriterio);
        this.app.use('/api/proceso', routerProceso);
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
        }catch (error){
            console.error('No se ha podido conectar a la base de datos');
        }
    }
}
export default Server;