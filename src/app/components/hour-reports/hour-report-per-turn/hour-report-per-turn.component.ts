import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Hour } from 'src/app/models/hours.interface';

@Component({
  selector: 'app-hour-report-per-turn',
  templateUrl: './hour-report-per-turn.component.html',
  styleUrls: ['./hour-report-per-turn.component.scss'],
})
export class HourReportPerTurnComponent implements OnInit {
  @Input() data: any;

  myData: Array<Hour> = new Array();
  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
    this.loading()
    
  }
  
  async loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Tareas...',
      duration: 1500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    
    this.myData = this.orderTask(JSON.parse(this.data).hours);
   
  }

  orderTask(taskData: Array<Hour>) {
    let sortData = [];
    let res = [];

    taskData.forEach(element => {
      let usr = sortData.find(user => user.name == element.name);
      !usr ? sortData.push(element) : res.push(element);
    });
    
    res.forEach(dataRes => {
      sortData.forEach(db => {
        if(db.name == dataRes.name) db.hours += dataRes.hours; 
      });
    });
    
    return sortData;
  }

}
