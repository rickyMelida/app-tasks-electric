import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Technician } from 'src/app/models/technician.interface';
import { TechnicianService } from 'src/app/services/technician.service';
import { FormTechnicianComponent } from '../form-technician/form-technician.component';

@Component({
  selector: 'app-list-technician',
  templateUrl: './list-technician.component.html',
  styleUrls: ['./list-technician.component.scss'],
})
export class ListTechnicianComponent implements OnInit {
  technicians: Array<Technician> = new Array();

  constructor(private techService: TechnicianService, private modalController: ModalController) { }

  ngOnInit() {
    this.techService.getTechnicians(localStorage.getItem('token'))
      .toPromise()
      .then((res: any) => {
        this.technicians = res.techs;
      })
      .catch(err => {
        console.log(`error`);
      });
  }

  async openModalAddTechnician(task) {
    const modal = await this.modalController.create({
      component: FormTechnicianComponent,
      swipeToClose: true,
      componentProps: {
        'title': 'Técnico'
      }
    });

    return await modal.present();
  }

}
