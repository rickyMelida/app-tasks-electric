/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Task } from 'src/app/models/task.interface';
import { FormClosePendingComponent } from '../form-close-pending/form-close-pending.component';
import { DetailPendingTaskComponent } from '../detail-pending-task/detail-pending-task.component';
import { IonInfiniteScroll } from '@ionic/angular';
import { TasksServicesService } from 'src/app/services/tasks-services.service';

@Component({
  selector: 'app-list-pending-tasks',
  templateUrl: './list-pending-tasks.component.html',
  styleUrls: ['./list-pending-tasks.component.scss'],
})
export class ListPendingTasksComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  pendingTasks: Array<Task> = new Array();
  tasksPartial: Array<Task> = new Array();
  existTasks: boolean;

  constructor( private modalController: ModalController, 
               private loadingController: LoadingController, 
               private tasks: TasksServicesService
  ) { }

  ngOnInit() {
    this.loading();
  }
 
  async loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Tareas...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.getTasks()
      .then((res: any)=>{
        this.pendingTasks = res.tasks;
        
        if (this.pendingTasks !== undefined) {
          this.loadPartialData();
          this.existTasks = true;
        } else {
          this.existTasks = false;
        }
      })
      .catch(err=>{
        console.log(err); 
      })
  }

  getTasks() {
    return this.tasks.getPendingTasks(localStorage.getItem('token')).toPromise();
  }
  
  loadPartialData() {
    if (this.pendingTasks.length <= 5) {
      for (const key in this.pendingTasks) {
        this.tasksPartial.push(this.pendingTasks[key]);
      }
    } else {
      this.tasksPartial = this.pendingTasks.splice(0, 5);
    }
  }

  loadMoreData(event) {
    if (this.tasksPartial.length === this.pendingTasks.length) {
      return event.target.complete();
    }else {
      if(this.pendingTasks.length >= 5) {
        this.tasksPartial.push(...this.pendingTasks.splice(0, 5));
      }else {
        this.tasksPartial.push(...this.pendingTasks.splice(0, this.pendingTasks.length));
        return event.target.complete();
      }
    }


  }

  loadData(event) {
    setTimeout(() => {
      this.loadMoreData(event);
    }, 1000);
  }

  async openModalDetails(task) {
    const modal = await this.modalController.create({
      component: DetailPendingTaskComponent,
      swipeToClose: true,
      componentProps: {
        'data': task
      }
    });

    return await modal.present();
  }

  async openModalClosePending(task) {
    const modal = await this.modalController.create({
      component: FormClosePendingComponent,
      swipeToClose: true,
      componentProps: {
        // eslint-disable-next-line quote-props
        'data': task
      }
    });

    return await modal.present();
  }
}
