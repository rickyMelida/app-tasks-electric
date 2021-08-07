/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message.interface';
import { Task } from 'src/app/models/task.interface';
import { ImageStorageService } from 'src/app/services/image-storage.service';
import { TasksServicesService } from 'src/app/services/tasks-services.service';


@Component({
  selector: 'app-form-completed-tasks',
  templateUrl: './form-completed-tasks.component.html',
  styleUrls: ['./form-completed-tasks.component.scss'],
})
export class FormCompletedTasksComponent implements OnInit {

  completedTask: Task;
  image_before: Array<File> = null;
  image_after: Array<File> = null;
  urlImageBefore: Observable<string>;
  urlImageAfter: Observable<string>;

  typesTask: string[] = [
    'Rutinas',
    'Asistencia',
    'Mantenimiento',
    'Correctivo',
    'Salon de Evento',
    'Marketing',
    'Bussiness Center',
    'Gimnasio',
    'TICS'
  ];
  selectedQuantity: any;
  taskSelect = 'Rutinas';
  message: Message = {
    text: '',
    type: ''
  };

  alertError = false;
  messageError: Array<string>;

  constructor(
    private taskServices: TasksServicesService,
    private storageService: ImageStorageService,
    public toastController: ToastController
  ) {
    this.reset();
  }

  ngOnInit() {
  }

  save() {
    this.completedTask.username = localStorage.getItem('username');
    this.messageError = new Array();
    const validateForm = this.validateForm(this.completedTask, this.image_before, this.image_after);

    if (validateForm.length === 0) {
      const data = new FormData();

      for (let i = 0; i < this.image_after.length; i++) {
        data.append('image_after', this.image_after[i], this.image_after[i].name);
        data.append('image_before', this.image_before[i], this.image_before[i].name);
        data.append('data', JSON.stringify(this.completedTask));
      }

      this.taskServices.addFinishedTask(data, localStorage.getItem('token')).toPromise()
        .then((res: any) => {
          this.message = {
            text: res.message,
            type: 'success'
          };
          this.messageToast(this.message);
          this.reset();
        })
        .catch((err: any) => {
          this.message = {
            text: err.message,
            type: 'danger'
          };
        });

    } else {
      this.alertError = true;
      for (const err of validateForm) {
        this.messageError.push(err);
      }
    }

  }

  getImageBefore(event) {
    this.image_before = event.target.files;
  }

  getImageAfter(event) {
    this.image_after = event.target.files;
  }

  hoursMan() {
    if (this.completedTask.start_time && this.completedTask.end_time) {
      const hourStart = moment(this.completedTask.start_time, 'HH:mm:ss');
      const hourEnd = moment(this.completedTask.end_time, 'HH:mm:ss');

      return this.completedTask.hour_man = moment.utc(hourEnd.diff(hourStart)).format('HH:mm');
    }
    return this.completedTask.hour_man = '00:00';
  }

  uploadImageStorage(pathfile: string) {

    this.storageService.uploadImageBefore(this.image_before[0], pathfile).snapshotChanges()
      .subscribe(
        res => {
          console.log(`Subio la imagen`);
        },
        err => {
          console.log(`Error al subir`);
        }
      );
  }

  reset() {
    this.completedTask = {
      type: 'Rutinas',
      description: '',
      start_time: '',
      end_time: '',
      hour_man: '',
      turn: '',
    };
    this.image_before = null;
    this.image_after = null;
  }

  async messageToast(message: Message) {
    const toast = await this.toastController.create({
      message: message.text,
      duration: 2000,
      color: message.type
    });
    toast.present();
  }

  validateForm(data: Task, imageBefore: Array<File>, imageAfter: Array<File>) {
    const error: Array<string> = new Array();
    if (data.turn === '') { error.push('Falta agregar el turno'); }
    if (data.start_time === '') { error.push('Falta agregar la hora de inicio'); }
    if (data.end_time === '') { error.push('Falta agregar la hora final'); }
    if (data.description === '') { error.push('Falta agregar la descripcion'); }
    if (imageBefore === null) { error.push('Falta la imagen del antes'); }
    if (imageAfter === null) { error.push('Falta la imagen del despues'); }

    return error;
  }
}
