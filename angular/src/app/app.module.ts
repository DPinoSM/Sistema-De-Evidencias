import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './Rutas/app-routing.module';
import { TokenInterceptor } from './Principal/login/token-interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './Principal/login/login.component';
import { AdminComponent } from './Principal/admin/admin.component';
import { InicioComponent } from './Principal/inicio/inicio.component';
import { ListarolComponent } from './componentes/lista-rol/listarol.component';
import { AuthService } from './services/auth.service';
import { ListaAmbitosAComponent } from './componentes/lista-ambitos-a/lista-ambitos-a.component';
import { ListaUnidadComponent } from './componentes/lista-unidad/lista-unidad.component';
import { ListaCriteriosComponent } from './componentes/lista-criterios/lista-criterios.component';
import { ListaProcesosComponent } from './componentes/lista-procesos/lista-procesos.component';
import { ListaRegistrosComponent } from './componentes/lista-registros/lista-registros.component';
import { ListaAmbitoGComponent } from './componentes/lista-ambito-g/lista-ambito-g.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidenavComponent } from './dashboard/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    InicioComponent,
    ListarolComponent,
    ListaAmbitosAComponent,
    ListaUnidadComponent,
    ListaCriteriosComponent,
    ListaProcesosComponent,
    ListaRegistrosComponent,
    ListaAmbitoGComponent,
    ListaUsuariosComponent,
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
