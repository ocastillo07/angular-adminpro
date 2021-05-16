import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarAvatar(
    archivo: File,
    tipo: 'usuarios' | 'residentias',
    id: string
  ) {

    try {

      const url = `${ base_url }/users/${id}`;
      const formData = new FormData();
      formData.append('user[image]', archivo);

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
      console.log(error);
      return false;
    }
  }



}
