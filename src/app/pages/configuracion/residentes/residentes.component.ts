import { Component, OnInit } from '@angular/core';
import { Residente } from 'src/app/models/residente.model';
import { ResidenteService } from 'src/app/services/residente.service';

@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styles: [
  ]
})
export class ResidentesComponent implements OnInit {

  public cargando: boolean = true;
  public totalResidentes: number = 0;
  public totalPages: number = 1;
  public page: number = 1;
  public residentes: Residente[] =[];

  constructor(private residenteService: ResidenteService) { }

  ngOnInit(): void {
      this.cargarResidentes();

  }

  cargarResidentes() {
    this.cargando = true;
    this.residenteService.cargarResidentes()
          .subscribe( ({residentes, meta}) => {
            this.totalResidentes = meta.pagination.total;
            this.totalPages = meta.pagination.total_pages;
            this.residentes = residentes;
            this.cargando = false;
          });
  }



  buscar(termino:string) {
    return "hola";
  }

}
