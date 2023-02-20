import { ClienteService } from './cliente.service';
import { Cliente } from './Cliente';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  
  constructor(private clienteService: ClienteService, private router: Router,
              private activatedRoute: ActivatedRoute) {}

  cliente: Cliente = new Cliente();
  title: string = 'Crear Cliente';

  ngOnInit(): void {
    this.cargarCliente()
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Nuevo Cliente',
        `Cliente ${cliente.nombre} creado con exito`,
        'success'
      );
    });
  }

  cargarCliente():void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id) {
        this.clienteService.getcliente(id).subscribe(
          cliente => this.cliente = cliente
        )
      }
    })
  }

}
