import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'edisson',
    apellido: 'alonso',
    correo: 'edissonalonso@gmai.com',
    pais: 'CRI',
    genero:'M'
    
  }
  paises: any[] = [];
  constructor(private paisService:PaisService) { }

  ngOnInit() {
    this.paisService.getPaises()
      .subscribe(paises => {
        
        this.paises = paises;
        this.paises.unshift({
          nombre:'[Seleccione pais]',
          codigo:''
        });

      });
  }

  guardar(forma:NgForm) {
    console.log(forma.value);
    if (forma.invalid) {
      
      Object.values(forma.controls).forEach(control => {
        console.log(control);
        control.markAllAsTouched();
      });
      return;
    }
  }

}
