import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResidenciaService {

  constructor( private http: HttpClient,
                private router: Router) { }

  get token(){
    return localStorage.getItem('token') || '';
  }
}
