import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthenticationService,
    private nav: NavController,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const authenticated = this.authService.token() !== null;

    console.log(authenticated);

    if (authenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
