import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Residencia } from '../models/residencia.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'Authorization' : `Bearer ${ this.token }`
      }
    }
  }

  
  buscar(
    tipo: 'users' | 'residentials' | 'streets',
    termino: string,
    pagina: number = 1
  ) {

    const url = `${ base_url }/${ tipo }?page=${ pagina }&q=${ termino }`;
    return this.http.get<any[]>(url, this.headers)
                .pipe(map( (resp: any) =>  resp.data));
  }

}
