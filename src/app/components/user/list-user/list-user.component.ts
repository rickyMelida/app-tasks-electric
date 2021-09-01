import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.interface';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { FormTechnicianComponent } from '../../technician/form-technician/form-technician.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {

  constructor(private userService: UsersServiceService, private modalController: ModalController) { }
  users: Array<User> = new Array();
  ngOnInit() {
    this.userService.getUsers(localStorage.getItem('token'))
    .toPromise()
    .then((res: any)=>{
      this.users = res.users;
    })
    .catch(err=>{
      console.log(err);
    })
  }

  async openModalAddUser(task) {
    const modal = await this.modalController.create({
      component: FormTechnicianComponent,
      swipeToClose: true,
      componentProps: {
        'title': 'Usuario'
      }
    });

    return await modal.present();
  }

}
