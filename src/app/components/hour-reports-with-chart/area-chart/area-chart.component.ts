import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GoogleChartInterface } from 'ng2-google-charts/ng2-google-charts';
import { Hour } from 'src/app/models/hours.interface';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
})
export class AreaChartComponent implements OnInit, OnChanges {
  @Input() data: any;
  hours: Array<Hour> = new Array();
  dataExist: boolean = false;
  filter: string;
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
    ['Técnicos', 'Horas Hombre'],
    ['Ricardo Melida', 0],
    ['Miller Sosa', 0],
    ['Ramon Coronel', 0],
    ['Luis Rotela', 0],
    ['Victor Velazquez', 0]
  ],
  options: {'title': 'Tasks'},
};

  constructor(private loadingController: LoadingController) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading();
  }

  ngOnInit() {
    this.loading();    
  }

  setDataTable(arr: Array<Hour>, filter: string) {
    let dataTablePie = this.pieChart.dataTable;

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
    let dataTablePie = this.pieChart.dataTable;
    dataTablePie[0][0] = filter;

    arr.forEach((element, i)=>{
        dataTablePie[i+1][1] = element.hours;
        dataTablePie[i+1][0] = element[filter];
    })
    
    this.pieChart.component.draw();
  }
}
