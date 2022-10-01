import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  obtenerUsuarios() {
    return this.http.get(`${this.url}/usuario`).toPromise();
    }

  registrarUsuario(usuario: any) {
    return this.http.post(`${this.url}/usuario`, usuario).toPromise();
    }
  registrarEmail(email: any) {
    return this.http.post(`${this.url}/email`, email).toPromise();
    }
}
