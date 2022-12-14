import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http: HttpClient) { }



  public save(data) {
    return this.http.post(environment.SERVER_URL + '/brands', data);
  }
  public getOne(brand){
    return this.http.get(`${environment.SERVER_URL}/brands/${brand}`);
  }
  public getAll() {
    return this.http.get(environment.SERVER_URL + '/brands');
  }
  public delete(data) {
    return this.http.delete(`${environment.SERVER_URL}/brands/${data._id}`);
  }


}
