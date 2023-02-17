import { Component, OnInit } from '@angular/core';
import { Cliente } from './Cliente';
import { CLIENTES } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  constructor(){}

  clientes: Cliente[] = [];

  ngOnInit(){
    this.clientes = CLIENTES;
  }
}
