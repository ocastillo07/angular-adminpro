import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarAvatar(
    tipo: 'users'|'residentials',
    id: string,
    archivo: File,
    params: string = 'user[image]'
  ) {

    try {

      const url = `${ base_url }/${ tipo }/${id}`;
      const formData = new FormData();
      formData.append(params, archivo);
      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token') || '' }`
        },
        body: formData
      });

      const data = await resp.json();
    
      return data.data.attributes.image.url;

    } catch (error) {
      return false;
    }
  }



}
