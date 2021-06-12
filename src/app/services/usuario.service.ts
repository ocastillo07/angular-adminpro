import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
const client_id = environment.client_id;
const client_secret = environment.client_secret;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public usuario: Usuario;

  constructor( private http: HttpClient,
                private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get refresh_token():string {
    return localStorage.getItem('refresh_token') || '';
  }

  get uid():string {
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'Authorization' : `Bearer ${ this.token }`
      }
    }
  }

  login( formData: RegisterForm ) {

    return this.http.post(`${ base_url }/oauth/token`, { 
                'email': formData.email,
                'password': formData.password,
                'grant_type': 'password',
                'client_id': client_id,
                'client_secret': client_secret
                } )
                .pipe(
                  tap( (resp: any) =>{
                    // console.log(resp.access_token);   
                    localStorage.setItem('token', resp.access_token); 
                    localStorage.setItem('refresh_token', resp.refresh_token); 
                    localStorage.setItem('residential', resp.user.residential_default); 
                  })
                );
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('residential');

    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {
    return this.http.post(`${ base_url }/oauth/token`, {
              'grant_type': 'refresh_token',
              'client_id': client_id,
              'client_secret': client_secret,
              'refresh_token': this.refresh_token
    }).pipe(
      map( (resp: any) => {
        const { email, name, phone, image, role, google, id } = resp.user;
        this.usuario = new Usuario( name , email, '', image.url, role, google, id);
        // console.log(`ID User: ${this.uid}`);
        //almacenar el token
        localStorage.setItem('token', resp.access_token); 
        localStorage.setItem('refresh_token', resp.refresh_token); 
        localStorage.setItem('residential', resp.user.residential_default);
        return true;
      }),
      catchError( error => of(false))  
    );
  }

  crearUsuario( formData: RegisterForm ) {

    const user = formData;

    return this.http.post(`${ base_url }/signup`, { user } )
              .pipe(
                tap( (resp: any) =>{
                  // console.log('Respuesta Registro: ',resp);    
                  localStorage.setItem('token', resp.data.attributes.token.access_token);
                  localStorage.setItem('refresh_token', resp.data.attributes.token.refresh_token);
                })
              );

  }

  actualizarPerfil( data:{email:string, name:string, role:string}) {
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${ base_url }/users/${ this.uid }`, data, this.headers)
  }

  actualizarUsuario( usuario: Usuario) {
    
    return this.http.put(`${ base_url }/users/${ usuario.uid }`, usuario, this.headers)
  }

  cargarUsuarios(pagina: number = 1){
    const url = `${ base_url }/users?page=${ pagina }`;
    return this.http.get<CargarUsuario>(url, this.headers)
              .pipe(
                map( resp => {
                  const usuarios = resp.data.map( (element: any) => {
                    const user = new Usuario(
                          element.attributes.name, 
                          element.attributes.email, 
                          'password', 
                          element.attributes.image, 
                          element.attributes.role, 
                          element.attributes.google, 
                          element.id)
                    return user;
                  });

                  return {
                    usuarios,
                    meta: resp.meta
                  };
                })
              )

  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${ base_url }/users/${ usuario.uid }`;
    return this.http.delete(url, this.headers);
  }

}
