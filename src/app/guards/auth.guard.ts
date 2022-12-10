import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authservice:AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated){
      return true;
    }else{
      const navigation = this.router.getCurrentNavigation();
      console.log('nav: ', navigation);

      let url = '/';
      if(navigation){
        url= navigation.extractedUrl.toString();
      }

      this.router.navigateByUrl('/login');
      return false;

    }
    //return this.checkUserLogin(route);
    
    //return true; //if this is true the route is accessible, basically doing nothing
  }




}
