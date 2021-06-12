import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './dashboard/progress/progress.component';
import { Grafica1Component } from './dashboard/grafica1/grafica1.component';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { PromesasComponent } from './dashboard/promesas/promesas.component';
import { RxjsComponent } from './dashboard/rxjs/rxjs.component';
import { PerfilComponent } from './account/perfil/perfil.component';
import { ResidenciasComponent } from './configuracion/residencias/residencias.component';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import { CallesComponent } from './configuracion/calles/calles.component';
import { CuotasComponent } from './configuracion/cuotas/cuotas.component';
import { LotificacionComponent } from './configuracion/lotificacion/lotificacion.component';
import { ResidenciaComponent } from './configuracion/residencias/residencia.component';
import { ResidentesComponent } from './configuracion/residentes/residentes.component';
import { ResidenteComponent } from './configuracion/residentes/residente/residente.component';


const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      // Dashboard
      { path: '', component: DashboardComponent, data: { titulo: "Dashboard"} },
      { path: 'progress', component: ProgressComponent, data: { titulo: "ProgresBar"} },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: "Graficas"} },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: "Account Settings"} },
      { path: 'promesas', component: PromesasComponent, data: { titulo: "Promesas"} },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: "RXJS"} },
      { path: 'perfil', component: PerfilComponent, data: { titulo: "Perfil de Usuario"} },

      //Configuracion
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: "Usuarios"} },
      { path: 'residencias', component: ResidenciasComponent, data: { titulo: "Residencias"} },
      { path: 'residencias/:id', component: ResidenciaComponent, data: { titulo: "Residencias"} },
      { path: 'calles', component: CallesComponent, data: { titulo: "Calles"} },
      { path: 'residentes', component: ResidentesComponent, data: { titulo: "Residentes"} },
      { path: 'residentes/:id', component: ResidenteComponent, data: { titulo: "Residentes"} },
      { path: 'cuotas', component: CuotasComponent, data: { titulo: "Cuotas"} },
      { path: 'lotificacion', component: LotificacionComponent, data: { titulo: "Lotificación"} },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
