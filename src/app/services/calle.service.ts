import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Calle } from '../models/calle.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CalleService {

  constructor(private http: HttpClient) { }

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

  get residential():string {
    return localStorage.getItem('residential') || '';
  }

  cargarCalles(pagina: number = 1){
    const url = `${ base_url }/residentials/${ this.residential }/streets?page=${ pagina }`;
    return this.http.get(url, this.headers)
            .pipe(
              map( (resp:any) => {
                const calles = resp.data.map( (element: any) => {
                  const calle = new Calle(
                        element.id, 
                        element.attributes.name, 
                        element.attributes.status
                  )
                  return calle;
                })
                
                return {
                  calles,
                  meta: resp.meta
                };
              })
            );

  }

  crearResidencia(calle: Calle){
    const url = `${ base_url }/residentials`;
    return this.http.post(url, calle, this.headers);
  }

  obtenerResidencia(id:string){
    const url = `${ base_url }/residentials/${ id }`;
    return this.http.get(url, this.headers);
  }

  actualizarResidencia(calle: Calle){
    const url = `${ base_url }/residentials/${calle.id}`;
    return this.http.put(url, calle, this.headers);
  }

  eliminarResidencia(calle: Calle){
    const url = `${ base_url }/residentials/${calle.id}`;
    return this.http.delete(url, this.headers);
  }

}


