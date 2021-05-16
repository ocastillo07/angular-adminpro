import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})

export class SidebarComponent  {

  menuItems: any[];
  public usuario: Usuario;

  constructor(private SidebarService: SidebarService,
              private usuarioService: UsuarioService) {
    this.menuItems = SidebarService.menu;
    this.usuario = usuarioService.usuario;
   }

   logout() {
    this.usuarioService.logout();
  }

  

}
