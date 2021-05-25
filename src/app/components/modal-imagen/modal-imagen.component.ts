import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenAvatar: File;
  public imgTemp: any = null;
  

  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File){
    this.imagenAvatar = file;

    if (!file) {
      return this.imgTemp = null;
     }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen(){
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    const params = this.modalImagenService.params;
    console.log(tipo, id, this.imagenAvatar);
    this.fileUploadService.actualizarAvatar(tipo, id, this.imagenAvatar, params)
       .then( img => {
         Swal.fire("Guardado", "Imagen actualizada correctamente!", 'success');
         
         this.modalImagenService.nuevaImagen.emit(img);

         this.cerrarModal();
       }).catch( err => {
         Swal.fire("Error", 'No se pudo subir la imagen', 'error');
       });
  }


}
