import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent  {

  public formSubmitted = false;

  //para manejar los campos del form
  public registerForm = this.fb.group({
    name: ['Oscar', Validators.required ],
    email: ['oscar@gmail.com', [Validators.required, Validators.email] ],
    password: ['123123', Validators.required ],
    password2: ['123123', Validators.required ],
    terminos: [ true , Validators.required ],
    role: ['1']
  },{ 
      validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) {   }

  crearUsuario(){
    this.formSubmitted = true;
    // console.log('Crear Usuario', this.registerForm.value);

    if ( this.registerForm.invalid ) {
      return;
    }

    // realizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
            // Navegar al Dashboard
            this.router.navigateByUrl('/');
        }, (err) => {
          //si sucede un error
          // console.warn(err); 
          Swal.fire('Error', err.error.errors[0].detail, 'error'); 
        } );
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2 ) && this.formSubmitted ) {
        return true;
    } else {
      return false;
    }
  }

  campoNoValido(campo: string): boolean {

    if ( this.registerForm.get(campo).invalid && this.formSubmitted ){
      return true;
    } else {
      return false
    }

  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }
  
  passwordsIguales(pass1Name: string, pass2Name: string) {
    return ( FormGroup: FormGroup )  => {
      const pass1Control = FormGroup.get(pass1Name);
      const pass2Control = FormGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({noEsIgual: true})
      }

    }

  }

}
