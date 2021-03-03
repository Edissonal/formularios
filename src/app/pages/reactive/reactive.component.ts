import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;
  constructor(private fb: FormBuilder,
              private validadores:ValidadoresService) {
    this.crearFormulario();
    this.cargardata();
    this.crearListeners();
  }

  ngOnInit() {
  }

  

 
  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNovalido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  
  get apellidoNovalido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNovalido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get usuarioNovalido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get distritoNovalido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }
  get ciudadNovalido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pass1Novalido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2Novalido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
     
    return (pass1 === pass2) ? false : true;
  }



  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera ] ],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', ,this.validadores.existeusuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([])

    }, {
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });
    
  }

  crearListeners() {
  //  this.forma.valueChanges.subscribe(valor => {
  //    console.log(valor);
   // });
   // this.forma.statusChanges.subscribe(status => console.log({ status }));
    
    this.forma.get('nombre').valueChanges.subscribe(console.log)
  }

  cargardata() {
    //this.forma.setValue({
      this.forma.reset({
      nombre:'fernando',
      apellido: 'alonso',
      correo: 'edissonalonso@gail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'cundinamarca',
        ciudad:'soacha'
      }
    
    });
  }

  agregarpasatimepo() {
    this.pasatiempos.push(this.fb.control(''));
  }
  BorrarPasatiempo(i:number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      
      return Object.values(this.forma.controls).forEach(control => {
       // console.log(control);
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAllAsTouched()
          );
        } else {
          control.markAllAsTouched();
        }
      });
    }
    this.forma.reset({
      nombre:'sin nombre'
    });
  }
}