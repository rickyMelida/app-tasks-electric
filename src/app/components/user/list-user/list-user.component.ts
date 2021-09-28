import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.interface';
import { TechnicianService } from 'src/app/services/technician.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { FormTechnicianComponent } from '../../technician/form-technician/form-technician.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {

  users: Array<User> = new Array();

  constructor(private userService: UsersServiceService, 
              private technicianService: TechnicianService,
              private modalController: ModalController,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController
  ) {}
  ngOnInit() {
    this.loading();
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

  async modalUpdate(id, username) {
    const modal = await this.modalController.create({
      component: FormTechnicianComponent,
      swipeToClose: true,
      componentProps: {
        'id': id,
        'title': 'Modificar Usuario'
      }
    });

    //const { data } = await modal.onWillDismiss();
    //console.log(data);
    
    return await modal.present();
    
  }

  async presentAlertConfirm(id, username) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar Técnico!',
      message: '<strong>¿Estas seguro que desea eliminar este usuario?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Eliminar',
          cssClass: 'warning',
          handler: () => {
            this.deleteUser(id);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteUser(id) {
    this.technicianService.deleteTechnician(localStorage.getItem('token'), id).toPromise()
    .then((res: any)=>{
      this.userService.deleteUser(localStorage.getItem('token'), id).toPromise()
      .then((resUser:any)=>{
        this.loading().then(()=>{
          this.messageToast(resUser.message);
        })
      })
      .catch((errUser)=> {
        console.log(errUser);
      })
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  async loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Tecnicos...',
      duration: 1500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();

    this.userService.getUsers(localStorage.getItem('token'))
      .toPromise()
      .then((res: any) => {
        this.users = res.users;
      })
      .catch(err => {
        console.log(`error`);
      });
    
    
  }

  async messageToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
  

}
