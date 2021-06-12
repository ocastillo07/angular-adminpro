import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: "Main", url: '/'},
        { titulo: "ProgressBar", url: 'progress'},
        { titulo: "Graficas", url: 'grafica1'},
        { titulo: "Promesas", url: 'promesas'},
        { titulo: "RXJS", url: 'rxjs'},
        
      ]
    },

    {
      titulo: 'Configuración',
      icono: 'mdi mdi-settings',
      submenu: [
        { titulo: "Usuarios", url: 'usuarios', icono: 'mdi mdi-account-multiple'},
        { titulo: "Residencias", url: 'residencias', icono: 'mdi mdi-home-modern'},
        { titulo: "Calles", url: 'calles', icono: 'mdi mdi-road'},
        { titulo: "Residentes", url: 'residentes', icono: 'mdi mdi-human-greeting'},
        { titulo: "Cuotas", url: 'cuotas', icono: 'mdi mdi-cash'},
        { titulo: "Lotificación", url: 'lotificacion', icono: 'mdi mdi-map'},
      ]
    }
  ];


  constructor() { }
}
