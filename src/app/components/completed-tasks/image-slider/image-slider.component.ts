import { Component, Input, OnInit } from '@angular/core';
import { NgbAccordion } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent implements OnInit {
  @Input() imageAfter: any;
  @Input() imageBefore: any;
  @Input() idTask: any;

  constructor() { }

  ngOnInit() {
    this.idTask = 'task-'+ this.idTask;
  }

}
