import { ClienteService } from './cliente.service';
import { Cliente } from './Cliente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  cliente: Cliente = new Cliente();
  title:string = 'Crear Cliente'
  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {}

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente =>  {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito`, 'success')
      } 
    )
  }
}
