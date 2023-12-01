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
import routerAmbitoGeografico from '../routes/ambito_geografico';
import routerCarrera from '../routes/carrera';
import routerEstado from '../routes/estado';
import routerImpacto from '../routes/impacto';
import routerDac from '../routes/detalle_dac';
import routerComite from '../routes/detalle_comite';
import routerDebilidades from '../routes/debilidades';
import routerRevisor from '../routes/detalle_revisor';
import routerEvidencias from '../routes/evidencias';
import { Rol } from './rol';
import { User } from './user';
import { Unidad } from './unidad';
import { Registro } from './registro';
import { Criterio} from './criterio';
import { Proceso } from './proceso';
import { AmbitoAcademico } from './ambito_academico';
import { Facultad } from './facultad';
import { AmbitoGeografico } from './ambito_geografico';
import { Carrera } from './carrera';
import { Estado } from './estado';
import { Impacto } from './impacto';
import { Detalle_DAC } from './detalle_dac';
import { Detalle_Comite} from './detalle_comite';
import { Debilidades} from './debilidades';
import { Detalle_Revisor } from './detalle_revisor';
import { Evidencias } from './evidencias';
import router from '../routes/roles';


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
        this.app.use('/api/criterios', routerCriterio);
        this.app.use('/api/proceso', routerProceso);
        this.app.use('/api/ambitoacademico', routerAmbitoAcademico);
        this.app.use('/api/facultad', routerFacultad);
        this.app.use('/api/ambitogeografico', routerAmbitoGeografico);
        this.app.use('/api/carrera', routerCarrera);
        this.app.use('/api/estado', routerEstado);
        this.app.use('/api/impacto', routerImpacto);
        this.app.use('/api/dac', routerDac);
        this.app.use('/api/comite', routerComite);
        this.app.use('/api/debilidades', routerDebilidades);
        this.app.use('/api/revisor', routerRevisor);
        this.app.use('/api/evidencias', routerEvidencias);
    }
    midlewares() {
        //parseo body
        this.app.use(express.json({ limit: '10mb'}));
        this.app.use(express.urlencoded({ extended: true, limit: '10mb'}));
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
            await AmbitoGeografico.sync()
            await Carrera.sync()
            await Estado.sync()
            await Impacto.sync()
            await Detalle_DAC.sync()
            await Detalle_Comite.sync()
            await Debilidades.sync()
            await Detalle_Revisor.sync()
            await Evidencias.sync()
        }catch (error){
            console.error('No se ha podido conectar a la base de datos');
        }
    }
}
export default Server;