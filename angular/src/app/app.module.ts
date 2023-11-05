// modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './Rutas/app-routing.module';

//componentes
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
import { ListaFacultadComponent } from './componentes/lista-facultad/lista-facultad.component';
import { DacComponent } from './Principal/dac/dac.component';
import { ComiteComponent } from './Principal/comite/comite.component';
import { ResponsableComponent } from './Principal/responsable/responsable.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';


//interceptores
import { AddTokenInterceptor } from './utils/add-token.interceptor';


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
    ListaFacultadComponent,
    ListaAmbitoGComponent,
    ListaUsuariosComponent,
    HeaderComponent,
    SidenavComponent,
    DacComponent,
    ComiteComponent,
    ResponsableComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
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
      useClass: AddTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
