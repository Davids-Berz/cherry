import { Cliente } from './Cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente();
  title:string = 'Crear Cliente'
  constructor() {}

  ngOnInit(): void {}

  create(): void {
    console.log('clicked!')
    console.log(this.cliente)
  }
}
