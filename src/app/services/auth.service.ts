import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }



  public authenticate(data) {
    return this.http.post(environment.SERVER_URL + '/users/authenticate', data);
  }
  public logout() {
    return this.http.get(environment.SERVER_URL + '/rims');
  }
  public register(data) {
    return this.http.delete(`${environment.SERVER_URL}/rims/${data.sku}`);
  }

  public forgotPassword(data) {
    return this.http.delete(`${environment.SERVER_URL}/rims/${data.sku}`);
  }

}
