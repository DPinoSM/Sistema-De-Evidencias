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


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: 'dac', component: DacComponent, canActivate: [AuthGuard], data: { rol: 2 } },
  { path: 'comite', component: ComiteComponent, canActivate: [AuthGuard], data: { rol: 3 } },
  { path: 'responsable', component: ResponsableComponent, canActivate: [AuthGuard], data: { rol: 4 } },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard], data: { rol: 5 } },


  { path: 'rol', component: ListarolComponent },
  { path: 'unidad', component: ListaUnidadComponent },
  { path: 'registro', component: ListaRegistrosComponent },
  { path: 'ambitoA', component: ListaAmbitosAComponent },
  { path: 'criterio', component: ListaCriteriosComponent },
  { path: 'process', component: ListaProcesosComponent },
  { path: 'ambitoG', component: ListaAmbitoGComponent },
  { path: 'usuarios', component: ListaUsuariosComponent},
  { path: 'facultad', component: ListaFacultadComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
