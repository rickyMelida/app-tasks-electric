import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GoogleChartInterface } from 'ng2-google-charts/ng2-google-charts';
import { Hour } from 'src/app/models/hours.interface';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit, OnChanges {
  @Input() data: any;
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Country', 'Hours',],
      ['Germany', 700],
      ['USA', 300],
      ['Brazil', 400],
      ['Canada', 500],
      ['France', 600],
      ['RU', 1000]
    ],
    options: {title: 'Tareas'}
  };
  hours: Array<Hour>;
  dataExist: boolean = true;
  filter: string;

  constructor(private loadingController: LoadingController) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.loading();
  }

  ngOnInit() {
    this.loading();
  }

  setDataTable(arr: Array<Hour>, filter: string) {
    let dataTablePie = this.columnChart.dataTable;

    dataTablePie[0][0] = filter;

    for(let j=1; j < dataTablePie.length; j++) {
      arr.forEach(element=>{
        if(element.name == dataTablePie[j][0]) {
          dataTablePie[j][1] = element.hours;
          dataTablePie[j][0] = element[filter];
        } 
      })
    }

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
      this.filter = JSON.parse(this.data).filter;

      this.filter == 'turn'  ?  this.setDataTable(this.hours, this.filter) :  this.draw(this.hours, this.filter);
      
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

  draw(arr: Array<any>, filter) {
    let dataTableColum = this.columnChart.dataTable;
    dataTableColum[0][0] = filter;

    arr.forEach((element, i)=>{
      dataTableColum[i+1][1] = element.hours;
      dataTableColum[i+1][0] = element[filter];
    })

    for(let j=arr.length-1; j <= dataTableColum.length; j++) {
      console.log(`cuenta ${j} veces`);
      dataTableColum.pop();
      
    }

    
    this.columnChart.component.draw();
  }

}
