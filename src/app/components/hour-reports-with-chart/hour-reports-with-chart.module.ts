import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { ColumnChartComponent } from './column-chart/column-chart.component';



@NgModule({
  declarations: [AreaChartComponent, ColumnChartComponent],
  exports: [
    AreaChartComponent,
    ColumnChartComponent
  ],
  imports: [
    CommonModule,
    Ng2GoogleChartsModule
  ]
})
export class HourReportsWithChartModule { }
