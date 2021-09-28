import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  redirect(flag: boolean): any {
    if (!flag) {
      this.router.navigate(['main', 'login-admin']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let tokenValidate;

    const token: boolean = localStorage.getItem('token') != null ? true : false;

    if (token) {
      this.authService.verifyToken(localStorage.getItem('token'))
        .toPromise()
        .then((res: any) => {
          tokenValidate = res.user.res.rol === 'Admin' ? true : false;
          this.redirect(tokenValidate);
        })
        .catch(error => {
          tokenValidate = false;
          this.redirect(tokenValidate);
        });
    } else {
      console.log(`No existe el token admin`);
    }

    this.redirect(token);

    return token;
  }
}
