import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  
  public usuarios: Usuario[] = [];
  public imgSubs: Subscription;
  public totalUsuarios: number = 0;
  public page: number = 1;
  public total_pages: number = 1;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService) { }

    private transformarUsuarios ( resultados: any[]): Usuario[] {

    return resultados.map(
      element => new Usuario(element.attributes.name, element.attributes.email, '', element.attributes.image.url, element.attributes.role, element.attributes.google, element.attributes.uid)
    );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
                      .pipe(delay(100))
                      .subscribe( img => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.page)
          .subscribe( ({usuarios, meta}) => {
            this.totalUsuarios = meta.pagination.total;
            this.total_pages = meta.pagination.total_pages;
            this.usuarios = usuarios;
            this.cargando = false;
          });
  }

  cambiarPagina( valor: number) {
    this.page += valor

    if (this.page < 1) {
      this.page = 1;
    } else if (this.page > this.total_pages) {
      this.page -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    this.busquedasService.buscar('users', termino)
        .subscribe( resp =>  {
          this.usuarios = this.transformarUsuarios(resp);
        } );

  }

  eliminar( usuario: Usuario){

    if ( usuario.uid == this.usuarioService.uid ) {
      return Swal.fire('Error', 'No se puede borrar el usuario actual', 'error');
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Deseas borrar el usuario: ${ usuario.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioService.eliminarUsuario(usuario)
            .subscribe(resp => {
          
              this.cargarUsuarios();

              Swal.fire(
                  'Usuario borrado',
                  `${ usuario.name } fue eliminado correctamente`,
                  'success'
                );
            });
      }
    })

  }

  cambiarRole(usuario: Usuario) {
    console.log(usuario);
    this.usuarioService.actualizarUsuario(usuario)
        .subscribe(resp => {
          console.log(resp);
        });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('users', usuario.uid, usuario.imageUrl, 'user[image]');
  }

}
