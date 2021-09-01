import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {

  @Input() data: any;

  userData: any = {
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
    console.log(this.data);
    
  }

  closeModal() {
    this.modalController.dismiss({});
  }

  getData() {
    console.log(this.userData);
    this. userData = {
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
