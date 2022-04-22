import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NAVIGATE_LOGIN } from './models/url';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';



@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
    private routerService: RouterService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isUserAuthenticated().then(isValid => {
      if (!isValid) {
        this.routerService.routeTo(NAVIGATE_LOGIN);
      }
      return isValid;
    });
  }
}
