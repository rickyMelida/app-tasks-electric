import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Message } from 'src/app/models/message.interface';
import { TechnicianService } from 'src/app/services/technician.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-form-technician',
  templateUrl: './form-technician.component.html',
  styleUrls: ['./form-technician.component.scss'],
})
export class FormTechnicianComponent implements OnInit {
  @Input() title: any;
  @Input() id: any;
  newTech: boolean = false;

  technicianData: any = {
    name: '',
    position: 'junior',
    turn: 'manana',
    username: '',
    email: '',
    password: '',
    checkPassword: '',
    rol: 'user'
  }

  response: Message = {
    type: '',
    text: ''
  }


  constructor(
    private modalController: ModalController, 
    private technicianService: TechnicianService,
    private userService: UsersServiceService,
    public toastController: ToastController,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
    this.loadData();
    
  }

  closeModal() {
    this.modalController.dismiss({});
  }

  getData() {
    this.technicianService.setTechnician(localStorage.getItem('token'), this.technicianData).toPromise()
    .then((resTech:any)=>{
      
      this.userService.setUser(localStorage.getItem('token'), this.technicianData).toPromise()
      .then((resUser:any)=>{ 
        this.response = {
          text: resTech.message,
          type: 'success'
        };
        this.messageToast(this.response);
        this.resetForm();
      })
      .catch((errUser)=>{ 
        console.log(errUser) 
      })
      
    })
    .catch((errTech: any)=>{
      console.log(errTech);
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

  resetForm() {
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

  async loadData() {
    const load = await this.loadingController.create({
      message: 'Cargando Datos..',
      duration: 1500
    });

    await load.present();
    const {role, data} = await load.onDidDismiss();

    !this.id ? this.newTech=true : this.getDataById(this.id);;
    
  }

  getDataById(id) {
    this.newTech = false;
    this.technicianService.getTechnicianById(localStorage.getItem('token'), id).toPromise()
    .then((res: any)=>{
      this.technicianData = res.technician;
      
    })
    .catch((err:any)=>{
      console.log(err);
      
    })
  }

}
