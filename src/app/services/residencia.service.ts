import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Residencia } from '../models/residencia.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ResidenciaService {

  constructor( private http: HttpClient,
                private router: Router) { }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'Authorization' : `Bearer ${ this.token }`
      }
    }
  }

  cargarResidencias(pagina: number = 1){
    const url = `${ base_url }/residentials?page=${ pagina }`;
    return this.http.get(url, this.headers)
            .pipe(
              map( (resp:any) => {
                const residencias = resp.data.map( (element: any) => {
                  const residencia = new Residencia(
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
                  return residencia;
                })
                
                return {
                  residencias,
                  meta: resp.meta
                };
              })
            );

  }

  crearResidencia(residencia: Residencia){
    const url = `${ base_url }/residentials`;
    return this.http.post(url, residencia, this.headers);
  }

  obtenerResidencia(id:string){
    const url = `${ base_url }/residentials/${ id }`;
    return this.http.get(url, this.headers);
  }

  actualizarResidencia(residencia: Residencia){
    const url = `${ base_url }/residentials/${residencia.id}`;
    return this.http.put(url, residencia, this.headers);
  }

  eliminarResidencia(residencia: Residencia){
    const url = `${ base_url }/residentials/${residencia.id}`;
    return this.http.delete(url, this.headers);
  }

}
