import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'users'|'residentials';
  public id: string;
  public img: string = '';
  public params:string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
      tipo: 'users' | 'residentials', 
      id:string, 
      img: string,
      params: string
    ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;
    this.params = params;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
