import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  }

  public pruebaGetProtegido(tkn) {


    this.httpOptions.headers = this.httpOptions.headers.set('access-token', 'Bearer ' + tkn);

    try {
      return this.http.get(environment.SERVER_URL + 'pruebagetProtegida', this.httpOptions);
    } catch (ex) {
      console.log(ex);
      return ex;
    }

  }

  public ejecuta(data) {
    return this.http.post(environment.SERVER_URL + 'EjecutaConsulta/', data);
  }
}
