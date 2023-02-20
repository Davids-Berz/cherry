import { ClienteService } from './cliente.service';
import { Cliente } from './Cliente';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  cliente: Cliente = new Cliente();
  title: string = 'Crear Cliente';

  ngOnInit(): void {
    //carga clientes para ver por id
    this.cargarCliente();
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe((json) => {
      this.router.navigate(['/clientes']);
      this.infoSawlFire('Nuevo Cliente', `Cliente ${json.cliente.nombre} creado con exito`, 'success')
    });
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getcliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      this.infoSawlFire('Cliente Actualizado', 'cliente actualizado correctamente', 'success' )
    });
  }

  infoSawlFire(title: string, content:string, status?: SweetAlertIcon): void {
    Swal.fire(
      title,
      content,
      status
    );
  }
}
