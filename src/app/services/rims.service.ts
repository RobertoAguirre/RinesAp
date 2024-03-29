import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RimsService {
  constructor(private http: HttpClient) {}

  public save(data) {
    return this.http.post(environment.SERVER_URL + '/rims', data);
  }
  public getAll() {
    return this.http.get(environment.SERVER_URL + '/rims');
  }

  public getAllByBrand(brand) {
    return this.http.get(
      `${environment.SERVER_URL}/rims/getRimsByBrand/${brand}`
    );
  }
  public delete(data) {
    return this.http.delete(`${environment.SERVER_URL}/rims/${data.sku}`);
  }

  public favoriteRim(data) {
    return this.http.patch(`${environment.SERVER_URL}/rims/${data.sku}`, data);
  }

  public sendToPrint(data, labelColor) {
    if (labelColor === 'ORANGE') {
      return this.http.post(
        `${environment.SERVER_URL}/print/printorangelabel`,
        data
      );
    } else {
      return this.http.post(
        `${environment.SERVER_URL}/print/printgreenlabel`,
        data
      );
    }
  }
}
