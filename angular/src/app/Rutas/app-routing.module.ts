import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InicioComponent } from '../componentes/inicio/inicio.component';
import { LoginComponent } from '../componentes/login/login.component';
import { AdminComponent } from '../componentes/admin/admin.component';
import { AddEditRolesComponent } from '../componentes/add-edit-roles/add-edit-roles.component';
import { ListarolComponent } from '../componentes/lista-rol/listarol.component';
import { ListaUnidadComponent } from '../componentes/lista-unidad/lista-unidad.component';
import { AddEditUnidComponent } from '../componentes/add-edit-unid/add-edit-unid.component';
import { AddEditRegComponent } from '../componentes/add-edit-reg/add-edit-reg.component';
import { ListaRegistrosComponent } from '../componentes/lista-registros/lista-registros.component';
import { ListaAmbitosAComponent } from '../componentes/lista-ambitos-a/lista-ambitos-a.component';
import { ListaAmbitoGComponent } from '../componentes/lista-ambito-g/lista-ambito-g.component';
import { ListaCriteriosComponent } from '../componentes/lista-criterios/lista-criterios.component';
import { ListaProcesosComponent } from '../componentes/lista-procesos/lista-procesos.component';
import { AddEditCriComponent } from '../componentes/add-edit-cri/add-edit-cri.component';
import { AddEditAaComponent } from '../componentes/add-edit-aa/add-edit-aa.component';
import { NavbarComponent } from '../componentes/navbar/navbar.component';
import { AddEditProcesosComponent } from '../componentes/add-edit-procesos/add-edit-procesos.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'rol', component: ListarolComponent },
  { path: 'unidad', component: ListaUnidadComponent },
  { path: 'registro', component: ListaRegistrosComponent },
  { path: 'ambitoA', component: ListaAmbitosAComponent },
  { path: 'ambitoG', component: ListaAmbitoGComponent },
  { path: 'criterio', component: ListaCriteriosComponent },
  { path: 'procesos', component: ListaProcesosComponent },
  { path: 'navbar', component: NavbarComponent },

  { path: 'addR', component: AddEditRolesComponent },
  { path: 'addU', component: AddEditUnidComponent },
  { path: 'addRg', component: AddEditRegComponent },
  { path: 'addC', component: AddEditCriComponent },
  { path: 'addP', component: AddEditProcesosComponent},
  { path: 'addAmbitoA', component: AddEditAaComponent },

  { path: 'editR/:id', component: AddEditRolesComponent },
  { path: 'editU/:id', component: AddEditUnidComponent },
  { path: 'editRg/:id', component: AddEditRegComponent },
  { path: 'editC/:id', component: AddEditRegComponent },
  { path: 'editP/:id', component: AddEditProcesosComponent },
  { path: 'editAmbitoA/:id', component: AddEditAaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
