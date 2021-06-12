import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Residente } from '../models/residente.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ResidenteService {

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

  cargarResidentes(pagina: number = 1){
    const url = `${ base_url }/residentials/${ this.residential }/residents?page=${ pagina }`;
    return this.http.get(url, this.headers)
            .pipe(
              map( (resp:any) => {
                const residentes = resp.data.map( (element: any) => {
                  const residente = new Residente(
                        element.id, 
                        element.attributes.name, 
                        element.attributes.last_name, 
                        element.attributes.email, 
                        element.attributes.sex, 
                        element.attributes.phone, 
                        element.attributes.cel_phone, 
                        element.attributes.status
                  )
                  return residente;
                })
                
                return {
                  residentes,
                  meta: resp.meta
                };
              })
            );

  }

  crearResidente(residente: Residente){
    const url = `${ base_url }/residentials`;
    return this.http.post(url, residente, this.headers);
  }

  obtenerResidente(id:string){
    const url = `${ base_url }/residentials/${ id }`;
    return this.http.get(url, this.headers);
  }

  actualizarResidente(residente: Residente){
    const url = `${ base_url }/residentials/${residente.id}`;
    return this.http.put(url, residente, this.headers);
  }

  eliminarResidente(residente: Residente){
    const url = `${ base_url }/residentials/${residente.id}`;
    return this.http.delete(url, this.headers);
  }

}
