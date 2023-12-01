// modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
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


//interceptores
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { ListaEvidenciasComponent } from './componentes/lista-evidencias/lista-evidencias.component';
import { NewEvidenciaComponent } from './componentes/new-evidencia/new-evidencia.component';
import { ListaDebilidadComponent } from './componentes/lista-debilidad/lista-debilidad.component';
import { ListaCarreraComponent } from './componentes/lista-carrera/lista-carrera.component';
import { ListaImpactoComponent } from './componentes/lista-impacto/lista-impacto.component';
import { ListaEstadoComponent } from './componentes/lista-estado/lista-estado.component';


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
    ListaEvidenciasComponent,
    NewEvidenciaComponent,
    ListaDebilidadComponent,
    ListaCarreraComponent,
    ListaImpactoComponent,
    ListaEstadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true,
    },
    { provide: 'CHUNK_SIZE', useValue: 1024 * 1024 }
  ],  
  bootstrap: [AppComponent],
})
export class AppModule {}
