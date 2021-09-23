import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TechnicianService } from 'src/app/services/technician.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {

  @Input() data: any;
  @Input() id: any;
  userData: any = {
    name: '',
    position: 'junior',
    turn: 'manana',
    username: '',
    email: '',
    password: '',
    checkPassword: '',
    rol: 'user',
    id: ''
  };


  constructor( private modalController: ModalController, 
               private userService: UsersServiceService,
               private technicianService: TechnicianService
  ) { }

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

  updateUser() {
    this.userData['_id'] = this.id;
    this.userService.updateUser(localStorage.getItem('token'), this.userData).toPromise()
    .then((res: any)=>{
      this.technicianService.updateTechnician(localStorage.getItem('token'), this.userData).toPromise()
      .then((resTech: any) => {
        console.log(`Se modifica los datos del usuario`);
        
      })
      .catch((errTech: any)=> {
        console.log(`Error gafarral Sr. Burn!`);
        
      })
      
      
    })
    .catch((err: any)=>{
      console.log(`Error gafarral Sr. Burn!`);
      
    })
    
  }
}
