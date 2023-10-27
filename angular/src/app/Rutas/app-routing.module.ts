import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InicioComponent } from '../componentes/Principal/inicio/inicio.component';
import { LoginComponent } from '../componentes/Principal/login/login.component';
import { AdminComponent } from '../componentes/Principal/admin/admin.component';
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
import { AddEditAgComponent } from '../componentes/add-edit-ag/add-edit-ag.component';
import { ListaUsuariosComponent } from '../componentes/lista-usuarios/lista-usuarios.component';
import { AddEditUserComponent } from '../componentes/add-edit-user/add-edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },

  { path: 'rol', component: ListarolComponent },
  { path: 'unidad', component: ListaUnidadComponent },
  { path: 'registro', component: ListaRegistrosComponent },
  { path: 'ambitoA', component: ListaAmbitosAComponent },
  { path: 'criterio', component: ListaCriteriosComponent },
  { path: 'process', component: ListaProcesosComponent },
  { path: 'ambitoG', component: ListaAmbitoGComponent },
  { path: 'usuarios', component: ListaUsuariosComponent},


  { path: 'addR', component: AddEditRolesComponent },
  { path: 'addU', component: AddEditUnidComponent },
  { path: 'addRg', component: AddEditRegComponent },
  { path: 'addC', component: AddEditCriComponent },
  { path: 'addAmbitoA', component: AddEditAaComponent },
  { path: 'addAmbG', component: AddEditAgComponent},
  { path: 'addUsuario', component:AddEditUserComponent},

  { path: 'editR/:id', component: AddEditRolesComponent },
  { path: 'editU/:id', component: AddEditUnidComponent },
  { path: 'editRg/:id', component: AddEditRegComponent },
  { path: 'editC/:id', component: AddEditRegComponent },
  { path: 'editAmbitoA/:id', component: AddEditAaComponent },
  { path: 'editAmbG/:id', component: AddEditAgComponent},
  { path: 'editUsuario/:id', component:AddEditUserComponent} ,
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
