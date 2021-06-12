import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Calle } from 'src/app/models/calle.model';
import { CalleService } from 'src/app/services/calle.service';

@Component({
  selector: 'app-calles',
  templateUrl: './calles.component.html',
  styles: [
  ]
})
export class CallesComponent implements OnInit {

  public calles: Calle[] = [];
  public totalCalles: number = 0;
  public page: number = 1;
  public total_pages: number = 1;
  public cargando: boolean = true;
  // private subs: Subscription;
  
  constructor(private calleService: CalleService) { }

  ngOnInit(): void {
    this.cargarCalles();
  }

  cargarCalles() {
    this.cargando = true;
    this.calleService.cargarCalles()
          .subscribe( ({calles, meta}) => {
            this.totalCalles = meta.pagination.total;
            this.total_pages = meta.pagination.total_pages;
            this.calles = calles;
            this.cargando = false;
          });
  }

  buscar(termino:string) {
    return 'hola';
  }

  borrarCalle(calle:Calle) {

  }

}
