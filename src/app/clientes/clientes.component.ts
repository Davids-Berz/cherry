import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './Cliente';
import { CLIENTES } from './clientes.json';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  constructor(private clienteService: ClienteService) {}

  clientes: Cliente[] = [];

  ngOnInit() {
    this.clienteService
      .getClientes()
      .subscribe((clientes) => (this.clientes = clientes));
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Eliminar Cliente',
      text: `Seguro que desea eliminar el cliente? ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(cliente.id)
        this.clienteService.delete(cliente.id).subscribe(
          res => {
            this.clientes = this.clientes.filter(clienteDelete => clienteDelete !== cliente )
            Swal.fire(
              'Eliminado!',
              `El cliente ${res.nombre} ah sido eliminado.`,
              'success'
            )
          }
        )
       
      }
    })
  }
}
