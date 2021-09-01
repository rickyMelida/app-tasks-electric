import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-technician',
  templateUrl: './form-technician.component.html',
  styleUrls: ['./form-technician.component.scss'],
})
export class FormTechnicianComponent implements OnInit {
  @Input() title: any;

  technicianData: any = {
    name: '',
    position: 'junior',
    turn: 'manana',
    username: '',
    email: '',
    password: '',
    rol: 'user'
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss({});
  }

  getData() {
    console.log(this.technicianData);
    this. technicianData = {
      name: '',
      position: 'junior',
      turn: 'manana',
      username: '',
      email: '',
      password: '',
      rol: 'user'
    }
    
  }

}
