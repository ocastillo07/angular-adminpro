import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { PerfilComponent } from './account/perfil/perfil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './dashboard/progress/progress.component';
import { Grafica1Component } from './dashboard/grafica1/grafica1.component';
import { PromesasComponent } from './dashboard/promesas/promesas.component';
import { RxjsComponent } from './dashboard/rxjs/rxjs.component';
import { ResidenciasComponent } from './configuracion/residencias/residencias.component';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import { CallesComponent } from './configuracion/calles/calles.component';
import { CuotasComponent } from './configuracion/cuotas/cuotas.component';
import { LotificacionComponent } from './configuracion/lotificacion/lotificacion.component';
import { ResidenciaComponent } from './configuracion/residencias/residencia.component';
import { ResidentesComponent } from './configuracion/residentes/residentes.component';
import { ResidenteComponent } from './configuracion/residentes/residente/residente.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    ResidenciasComponent,
    UsuariosComponent,
    CallesComponent,
    CuotasComponent,
    LotificacionComponent,
    ResidenciaComponent,
    ResidentesComponent,
    ResidenteComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule 
  ]
})
export class PagesModule { }
