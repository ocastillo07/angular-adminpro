import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenAvatar: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService ) { 
      this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      name: [ this.usuario.name, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email ]],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
          .subscribe( resp => {
            const {name, email} = this.perfilForm.value;
            this.usuario.name = name;
            this.usuario.email = email;
            Swal.fire("Guardado", "Usuario actualizado!", 'success');
          },
          (err) => {
            Swal.fire("Error", err.error.errors[0].detail, 'error');
          });
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
     this.fileUploadService.actualizarAvatar(this.imagenAvatar, 'usuarios', this.usuario.uid)
        .then( img => {
          this.usuario.image = img;
          Swal.fire("Guardado", "Imagen de usuario actualizada!", 'success');
        }).catch( err => {
          Swal.fire("Error", 'No se pudo subir la imagen', 'error');
        });
   }

}
