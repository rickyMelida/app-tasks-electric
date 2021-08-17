import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Hour } from 'src/app/models/hours.interface';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
})
export class AreaChartComponent implements OnInit {
  @Input() data: any;
  hours: Array<Hour> = new Array();

  myDataTable = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ]
  dataExist: boolean = false;

  public pieChart: GoogleChartInterface;


  public columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ],
    //firstRowIsData: true,
    options: { 'title': 'Tasks Column' },
  };

  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
    this.loading();
  }

  setDataTableForName(arr: Array<Hour>, filter: string) {
    let result = [];
    let dataP = [];
    result.push(['Técnicos', 'Horas Hombre'])
    arr.forEach(res=>{
      dataP.push(res.name);
      dataP.push(res.hours);
      result.push(dataP);
      dataP = [];
    });

    return result;

  }

  hourForInt(hourStr: string): number {
    let minutes = parseFloat(hourStr.slice(3, 5));
    let hour = parseFloat(hourStr.slice(0, 2));

    return hour + (minutes/60);

  }

  async loading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando Tareas...',
      duration: 1500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();

    try {
      
      this.hours = this.orderTask(JSON.parse(this.data).hours);
      
      this.myDataTable = this.setDataTableForName(this.hours, 'name');
      this.pieChart = {
        chartType: 'PieChart',
        dataTable: this.myDataTable,
        options: { 'title': 'Tasks' },
      };
      this.dataExist = true;
      
    } catch (error) {
      console.log(error);
      this.dataExist = false;
    }
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
