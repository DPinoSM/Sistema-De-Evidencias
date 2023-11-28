import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InicioComponent } from '../Principal/inicio/inicio.component';
import { LoginComponent } from '../Principal/login/login.component';
import { AdminComponent } from '../Principal/admin/admin.component';
import { ListarolComponent } from '../componentes/lista-rol/listarol.component';
import { ListaUnidadComponent } from '../componentes/lista-unidad/lista-unidad.component';
import { ListaAmbitosAComponent } from '../componentes/lista-ambitos-a/lista-ambitos-a.component';
import { ListaAmbitoGComponent } from '../componentes/lista-ambito-g/lista-ambito-g.component';
import { ListaCriteriosComponent } from '../componentes/lista-criterios/lista-criterios.component';
import { ListaProcesosComponent } from '../componentes/lista-procesos/lista-procesos.component';
import { ListaUsuariosComponent } from '../componentes/lista-usuarios/lista-usuarios.component';
import { ListaRegistrosComponent } from '../componentes/lista-registros/lista-registros.component';
import { ListaFacultadComponent } from '../componentes/lista-facultad/lista-facultad.component';
import { DacComponent } from '../Principal/dac/dac.component';
import { ComiteComponent } from '../Principal/comite/comite.component';
import { ResponsableComponent } from '../Principal/responsable/responsable.component';
import { AuthGuard } from '../utils/auth.guard';
import { ListaEvidenciasComponent } from '../componentes/lista-evidencias/lista-evidencias.component';
import { NewEvidenciaComponent } from '../componentes/new-evidencia/new-evidencia.component';
import { ListaDebilidadComponent } from '../componentes/lista-debilidad/lista-debilidad.component';
import { ListaImpactoComponent } from '../componentes/lista-impacto/lista-impacto.component';
import { ListaCarreraComponent } from '../componentes/lista-carrera/lista-carrera.component';
import { ListaEstadoComponent } from '../componentes/lista-estado/lista-estado.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'dac', component: DacComponent, canActivate: [AuthGuard], data: { rol: 2 } },
  { path: 'comite', component: ComiteComponent, canActivate: [AuthGuard], data: { rol: 3 } },
  { path: 'responsable', component: ResponsableComponent, canActivate: [AuthGuard], data: { rol: 4 } },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard], data: { rol: 5 } },


  { path: 'rol', component: ListarolComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'unidad', component: ListaUnidadComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'registro', component: ListaRegistrosComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'ambitoA', component: ListaAmbitosAComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'criterio', component: ListaCriteriosComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'process', component: ListaProcesosComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'ambitoG', component: ListaAmbitoGComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'usuarios', component: ListaUsuariosComponent, canActivate: [AuthGuard], data: { rol: 1 }},
  { path: 'facultad', component: ListaFacultadComponent, canActivate: [AuthGuard], data: { rol: 1 }},
  { path: 'debilidad', component: ListaDebilidadComponent, canActivate: [AuthGuard], data: { rol: 1}},
  { path: 'evidencias', component: ListaEvidenciasComponent},
  { path: 'Cevidencias', component: NewEvidenciaComponent},
  { path: 'impacto', component: ListaImpactoComponent},
  { path: 'carrera', component: ListaCarreraComponent},
  { path: 'estado', component: ListaEstadoComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
