/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalServerConfigurationPage } from '../modal-server-configuration/modal-server-configuration.page';
import { TokenResponse } from '../models/responseToken.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  dataUser: any;
  alert: boolean = false;
  messageError: string;
  server: string = !localStorage.getItem('server') ? 'firebase' : localStorage.getItem('server');

  constructor(private authService: AuthService, private router: Router, public modalController: ModalController) {
    this.dataUser = { username: '', email: '', password: '' };
  }

  ngOnInit() {
    localStorage.clear();
    localStorage.setItem('ip', '127.0.0.1');
    localStorage.setItem('port', '5000');
  }

  getDataUser() {
    this.authService.signin(this.dataUser).toPromise()
      .then((res: any) => {
        localStorage.setItem('username', res.username);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/main']);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async presentModal() {
    const modal = this.modalController.create({
      component: ModalServerConfigurationPage,
      cssClass: 'my-styles'
    });

    const  data  = (await modal).onDidDismiss().then((res: any)=>{
      this.server = res.data.data.serv;

    }).catch(err=>{
      console.log(err);
      
    })

    return (await modal).present();
  }


}
