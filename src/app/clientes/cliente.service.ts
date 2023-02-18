import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './Cliente';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(res => res as Cliente[])
    );
  }

}
