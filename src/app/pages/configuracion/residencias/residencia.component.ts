import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ResidenciaService } from 'src/app/services/residencia.service';
import { Residencia } from 'src/app/models/residencia.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-residencia',
  templateUrl: './residencia.component.html',
  styles: [
  ]
})
export class ResidenciaComponent implements OnInit {

  public residenciaForm: FormGroup;
  public residenciaSeleccionada: Residencia;
  public imagenAvatar: File;
  public imgTemp: any = null;

  constructor(  private fb: FormBuilder,
                private residenciaService: ResidenciaService,
                private router: Router,
                private activateRouter: ActivatedRoute,
                private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {

    this.residenciaForm = this.fb.group({
      name: ["", Validators.required],
      full_name: ["", Validators.required],
      rfc: ["", Validators.required],
      address: ["", Validators.required],
      colony: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      postal_code: ["", Validators.required],
      time_zone: ["", ],
      rules: ["", ],
      plan: ["", ],
      logo: ["", ],
      status: [true, Validators.required]
    })

    this.activateRouter.params.subscribe( ({ id }) => this.cargarResidencia(id));
  }

  cargarResidencia(id:string) {
    
    if ( id === 'nuevo' ) {
      return;
    }

    
    this.residenciaService.obtenerResidencia(id)
    .subscribe( (resp:any) => {
            this.residenciaSeleccionada = resp.data.attributes; 
            this.residenciaForm.setValue(resp.data.attributes);
            this.residenciaSeleccionada.id = resp.data.id;
          }, (err) => {
            //realizar el redirect a resicencias
            return this.router.navigateByUrl(`/dashboard/residencias`);
          });
  }


  guardarResidencia() {
    const {name} = this.residenciaForm.value;

    if (this.residenciaSeleccionada) {
      // Actualizar
      const data= {
        ...this.residenciaForm.value,
        id: this.residenciaSeleccionada.id
      }

      this.residenciaService.actualizarResidencia( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ name } actualizada correctamente`, 'success');
        })

    } else {
      // Crear
      this.residenciaService.crearResidencia(this.residenciaForm.value)
            .subscribe( (resp:any) =>{
              Swal.fire('Creado', `${name} creado correctamente`, 'success');
              this.router.navigateByUrl(`/dashboard/residencias/${ resp.data.id}`)
            });
    }
    
    
  }

  abrirModal(residencia: Residencia) {
    if (residencia === undefined) {
      Swal.fire('Logo', 'No puede subir el logo hasta que registre una Residencia', 'warning');
    } else {
      this.modalImagenService.abrirModal('residentials', residencia.id, residencia.logo, 'logo');
    }
  }

}
