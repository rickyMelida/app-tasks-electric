import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTechnicianComponent } from './list-technician/list-technician.component'
import { FormTechnicianComponent } from './form-technician/form-technician.component';
import { ModalDeleteTechnicianComponent } from './modal-delete-technician/modal-delete-technician.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListTechnicianComponent, 
    FormTechnicianComponent, 
    ModalDeleteTechnicianComponent
  ],
  exports: [
    ListTechnicianComponent,
    FormTechnicianComponent,
    ModalDeleteTechnicianComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class TechnicianModule { }
