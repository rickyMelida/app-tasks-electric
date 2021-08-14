/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.page.html',
  styleUrls: ['./modal-login.page.scss'],
})
export class ModalLoginPage implements OnInit {
  dataAdmin: any;
  alert: boolean;
  messageError: string = 'Debes iniciar sesión como administrador, para ver esta sección.';
  token = localStorage.getItem('token');

  constructor(
    private authService: AuthService,
    private router: Router,
    private nav: NavController
  ) {
    this.dataAdmin = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
    this.isAdmin(this.token);
  }

  closeSession() {
    this.nav.navigateBack('/login');
  }

  authAdmin() {
    this.authService.signinAdmin(this.dataAdmin).toPromise()
    .then((res: any)=> {  
      this.redirect(true, res.token);
      
    })
    .catch(err=>{
      this.messageError = 'Usuario no válido.' 
    });

  }

  resetToken(token) {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }

  isAdmin(token): any {
    let res: boolean;

    this.authService.verifyToken(localStorage.getItem('token'))
        .toPromise()
        .then((res: any) => {
          res = res.user.rol === 'Admin' ? true : false;
          this.redirect(res, token);
        })
        .catch(error => {
          res = false;
          this.redirect(res, token);
        });
  }


  redirect(flag: boolean, token: string): any {
    if (flag) {
      localStorage.setItem('token', token)
      this.router.navigate(['/', 'main-admin']);
    }
  }
}
