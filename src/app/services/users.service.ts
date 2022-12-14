import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

 

  public save(data) {
    return this.http.post(environment.SERVER_URL + '/users', data);
  }
  public getAll() {
    return this.http.get(environment.SERVER_URL + '/users');
  }
  public delete(data) {
    return this.http.delete(`${environment.SERVER_URL}/users/${data._id}` );
  }
}
