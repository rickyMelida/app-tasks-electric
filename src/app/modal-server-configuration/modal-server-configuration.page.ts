import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-server-configuration',
  templateUrl: './modal-server-configuration.page.html',
  styleUrls: ['./modal-server-configuration.page.scss'],
})
export class ModalServerConfigurationPage implements OnInit {

  server: any = {
    serv: 'firebase',
    ip: '',
    port: ''
  };


  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  getData() {
    localStorage.setItem('ip', this.server.ip);
    localStorage.setItem('server', this.server.serv);
    localStorage.setItem('port', this.server.port);
    this.modalController.dismiss({  data: this.server});
  }

}
