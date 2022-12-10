import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private token;
  constructor() {

    this.token = localStorage.getItem('token');
    /*     if(this.token===null){
          this.token = "templogin";
        } */

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("paso por el interceptor");

    const headers = new HttpHeaders({

      'Content-Type': 'application/json',
      'Authorization': this.token,
    });

    if (request.url.includes('authenticate')) {
      return next.handle(request);
    }

    const reqClone = request.clone({
      headers: headers
    });

    return next.handle(reqClone).pipe(
      catchError(this.myErrorHandler)
    );
  }

  myErrorHandler(error: HttpErrorResponse) {
    console.log("Sucedió un error");
    console.log("registrado en el log file");
    console.warn(error);
    return throwError('Custom Error');
  }
}
