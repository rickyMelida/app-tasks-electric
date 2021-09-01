import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TasksServicesService } from 'src/app/services/tasks-services.service';

@Component({
  selector: 'app-hour-report',
  templateUrl: './hour-report.page.html',
  styleUrls: ['./hour-report.page.scss'],
})
export class HourReportPage implements OnInit {
  hours: any;
  filter: string;
  constructor(private loadingController: LoadingController, private taskServices: TasksServicesService) { }

  ngOnInit() {
    this.filter = 'turn';
    this.loading();
  }

  loadHours(filter) {
    this.taskServices.getHours(localStorage.getItem('token')).toPromise()
    .then((res: any)=>{
      res.hours.forEach(element => {
        element.hours = this.parseHourToInteger(element.hours);
      });
      this.hours = JSON.stringify({hours: res.hours, filter: filter});
    })
    .catch((err: any) => {
      console.log(err);
    })
  }

  async loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Tareas...',
      duration: 1000
    });
    await loading.present();
    this.loadHours(this.filter);

    const { role, data } = await loading.onDidDismiss();
  }

  parseHourToInteger(hour: string) {
    const minutes = parseFloat(hour.slice(3, 5));
    const hourStr = parseFloat(hour.slice(0, 2));

    return hourStr + (minutes/60);
  }

  changeFilter(event) {
    this.loading();
  }

}
