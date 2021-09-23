import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Message } from 'src/app/models/message.interface';
import { Technician } from 'src/app/models/technician.interface';
import { TechnicianService } from 'src/app/services/technician.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { FormTechnicianComponent } from '../form-technician/form-technician.component';

@Component({
  selector: 'app-list-technician',
  templateUrl: './list-technician.component.html',
  styleUrls: ['./list-technician.component.scss'],
})
export class ListTechnicianComponent implements OnInit {
  technicians: Array<Technician> = new Array();
  message: Message = {
    type: 'success', 
    text: ''
  };

  constructor(
    private techService: TechnicianService, 
    private userService: UsersServiceService,
    private modalController: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.loading();
  }

  async openModalAddTechnician(task) {
    const modal = await this.modalController.create({
      component: FormTechnicianComponent,
      swipeToClose: true,
      componentProps: {
        'title': 'Agregar Nuevo Técnico'
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

  deleteTechnician(id) {
    this.techService.deleteTechnician(localStorage.getItem('token'), id).toPromise()
    .then((res: any)=>{
      this.userService.deleteUser(localStorage.getItem('token'), id).toPromise()
      .then((resUser:any)=>{
        this.message.text = res.message;
        
        this.loading().then(()=>{
          this.messageToast(this.message);
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

  async messageToast(message: Message) {
    const toast = await this.toastController.create({
      message: message.text,
      duration: 2000,
      color: message.type
    });
    toast.present();
  }

  async loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Tecnicos...',
      duration: 1500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();

    this.techService.getTechnicians(localStorage.getItem('token'))
      .toPromise()
      .then((res: any) => {
        this.technicians = res.techs;
      })
      .catch(err => {
        console.log(`error`);
      });
    
    
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
            this.deleteTechnician(id);
          }
        }
      ]
    });

    await alert.present();
  }

}
