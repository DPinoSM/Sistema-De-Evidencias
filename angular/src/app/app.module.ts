import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './Rutas/app-routing.module';
import { TokenInterceptor } from './componentes/Principal/login/token-interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/Principal/login/login.component';
import { AdminComponent } from './componentes/Principal/admin/admin.component';
import { InicioComponent } from './componentes/Principal/inicio/inicio.component';
import { ListarolComponent } from './componentes/lista-rol/listarol.component';
import { AddEditRolesComponent } from './componentes/add-edit-roles/add-edit-roles.component';
import { AuthService } from './services/auth.service';
import { ListaAmbitosAComponent } from './componentes/lista-ambitos-a/lista-ambitos-a.component';
import { AddEditAaComponent } from './componentes/add-edit-aa/add-edit-aa.component';
import { ListaUnidadComponent } from './componentes/lista-unidad/lista-unidad.component';
import { ListaCriteriosComponent } from './componentes/lista-criterios/lista-criterios.component';
import { ListaProcesosComponent } from './componentes/lista-procesos/lista-procesos.component';
import { ListaRegistrosComponent } from './componentes/lista-registros/lista-registros.component';
import { ListaAmbitoGComponent } from './componentes/lista-ambito-g/lista-ambito-g.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { AddEditUserComponent } from './componentes/add-edit-user/add-edit-user.component';
import { AddEditUnidComponent } from './componentes/add-edit-unid/add-edit-unid.component';
import { AddEditRegComponent } from './componentes/add-edit-reg/add-edit-reg.component';
import { AddEditCriComponent } from './componentes/add-edit-cri/add-edit-cri.component';
import { AddEditAgComponent } from './componentes/add-edit-ag/add-edit-ag.component';
import { HeaderComponent } from './componentes/dashboard/header/header.component';
import { SidenavComponent } from './componentes/dashboard/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    InicioComponent,
    ListarolComponent,
    AddEditRolesComponent,
    ListaAmbitosAComponent,
    AddEditAaComponent,
    ListaUnidadComponent,
    ListaCriteriosComponent,
    ListaProcesosComponent,
    ListaRegistrosComponent,
    ListaAmbitoGComponent,
    ListaUsuariosComponent,
    AddEditUserComponent,
    AddEditUnidComponent,
    AddEditRegComponent,
    AddEditCriComponent,
    AddEditAgComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
