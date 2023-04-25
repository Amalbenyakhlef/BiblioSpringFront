import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import jwtDecode from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constants';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
  // this service is to make a guard on every used Token for authentification
  constructor(){}
  
  /*
  constructor(
    public auth: AuthService,
    public router: Router,
    private snackbarService: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot):boolean {
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token:any = localStorage.getItem('token');

    var tokenPayLoad: any;
    try {
      tokenPayLoad = jwtDecode(token);
    } catch {
      // if you are not authorized you will be redirected to home page directly !!!!
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let expectedRole = '';
    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == tokenPayLoad.role) {
        expectedRole = tokenPayLoad.role;
      }
    }

    if (tokenPayLoad.role == 'user' || tokenPayLoad.role == 'admin') {
      if (this.auth.isAuthentificated() && tokenPayLoad.role == expectedRole) {
        return true;
      }
      this.snackbarService.openSnackBar(
        GlobalConstants.unauthorized,
        GlobalConstants.error
      );
      this.router.navigate(['/biblio/dashboard']);
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }*/
}
