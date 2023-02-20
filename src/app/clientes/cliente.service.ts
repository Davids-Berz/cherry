import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Cliente } from './Cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient, private router: Router) {}

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint).pipe(map((res) => res as Cliente[]));
  }

  create(cliente: Cliente): Observable<any> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          this.infoSawlFire('error al crear usuario', e.error.mensaje, 'error');
          return throwError(() => new Error(e));
        })
      );
  }

  getcliente(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        this.infoSawlFire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => new Error(e));
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          this.infoSawlFire('error al editar', e.error.mensaje, 'error');
          return throwError(() => new Error(e));
        })
      );
  }

  delete(id: Number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    }).pipe(
      catchError(e => {
        this.infoSawlFire('error al eliminar', e.error.mensaje, 'error')
        return throwError(() => new Error(e))
      })
    );;
  }

  infoSawlFire(title: string, content: string, status?: SweetAlertIcon): void {
    Swal.fire(title, content, status);
  }
}
