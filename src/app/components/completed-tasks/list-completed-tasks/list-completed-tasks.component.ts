/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Task } from 'src/app/models/task.interface';
import { DetailFinishedTaskComponent } from '../detail-finished-task/detail-finished-task.component';
import { IonInfiniteScroll } from '@ionic/angular';
import { TasksServicesService } from 'src/app/services/tasks-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-completed-tasks',
  templateUrl: './list-completed-tasks.component.html',
  styleUrls: ['./list-completed-tasks.component.scss'],
})
export class ListCompletedTasksComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @Input() buttonUp: any; 

  tasksFinished: Array<Task> = new Array();
  tasksPartial: Array<Task> = new Array();
  index = 0;

  existTasks: boolean;
  dataExample = "dataExample";

  constructor(
    public modalController: ModalController,
    private loadingController: LoadingController,
    private taskService: TasksServicesService,
    private router: Router
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
      .then((res: any) => {
        this.tasksFinished = res.tasks;

        if (this.tasksFinished !== undefined) {
          this.loadPartialData();
          this.existTasks = true;
        } else {
          this.existTasks = false;
        }
      })
      .catch(err => {
        console.log(err);

      });
  }

  getTasks() {
    return this.taskService.getFinishedTasks(localStorage.getItem('token')).toPromise();
  }

  loadPartialData() {
    if (this.tasksFinished.length <= 5) {
      for (const key in this.tasksFinished) {
        this.tasksPartial.push(this.tasksFinished[key]);
      }
    } else {
      this.tasksPartial = this.tasksFinished.splice(0, 5);
    }
  }

  loadMoreData(event) {
    if (this.tasksPartial.length === this.tasksFinished.length) {
      return event.target.complete();
    } else {
      if (this.tasksFinished.length >= 5) {
        this.tasksPartial.push(...this.tasksFinished.splice(0, 5));
      } else {
        this.tasksPartial.push(...this.tasksFinished.splice(0, this.tasksFinished.length));
        return event.target.complete();
      }
    }
  }

  loadData(event) {
    setTimeout(() => {
      this.loadMoreData(event);
    }, 1000);
  }

  async openModal(task) {
    const modal = await this.modalController.create({
      component: DetailFinishedTaskComponent,
      swipeToClose: true,
      componentProps: {
        data: task
      }
    });

    return await modal.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      event.target.complete();
      this.router.navigate(['/main', 'tasks']);
    }, 2000);
  }
}
