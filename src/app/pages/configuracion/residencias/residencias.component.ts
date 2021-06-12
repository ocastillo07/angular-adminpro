import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Residencia } from 'src/app/models/residencia.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ResidenciaService } from 'src/app/services/residencia.service';

@Component({
  selector: 'app-residencias',
  templateUrl: './residencias.component.html',
  styles: [
  ]
})
export class ResidenciasComponent implements OnInit, OnDestroy {

  public residencias: Residencia[] = [];
  public totalResidencias: number = 0;
  public page: number = 1;
  public total_pages: number = 1;
  public cargando: boolean = true;
  private subs: Subscription;

  constructor(private residenciaService: ResidenciaService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    
    this.cargarResidencias();
    this.subs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarResidencias() );
  }

  private transformarResidencias ( resultados: any[]): Residencia[] {
    
    return resultados.map(
      element => new Residencia(
        element.id, 
        element.attributes.name, 
        element.attributes.full_name, 
        element.attributes.rfc, 
        element.attributes.address, 
        element.attributes.postal_code, 
        element.attributes.city, 
        element.attributes.state, 
        element.attributes.time_zone, 
        element.attributes.rules, 
        element.attributes.logo, 
        element.attributes.plan, 
        element.attributes.status
      )
    );
  }

  cargarResidencias() {
    this.cargando = true;
    this.residenciaService.cargarResidencias()
          .subscribe( ({residencias, meta}) => {
            this.totalResidencias = meta.pagination.total;
            this.total_pages = meta.pagination.total_pages;
            this.residencias = residencias;
            this.cargando = false;
          });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarResidencias();
    }

    this.busquedasService.buscar('residentials', termino)
        .subscribe( resp =>  {
          console.log(resp);
          this.residencias = this.transformarResidencias(resp);
        } );

  }

  abrirModal(residencia: Residencia) {
    this.modalImagenService.abrirModal('residentials', residencia.id, residencia.logo, 'logo');
  }

  borrarResidencia(residencia:Residencia){
    
    Swal.fire({
      title: '¿Borrar residencia?',
      text: `Deseas borrar la Residencia: ${ residencia.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarla!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.residenciaService.eliminarResidencia(residencia)
            .subscribe(resp => {
          
              this.cargarResidencias();

              Swal.fire(
                  'Residencia borrada',
                  `${ residencia.name } fue eliminada correctamente`,
                  'success'
                );
            });
      }
    })

  }

}
