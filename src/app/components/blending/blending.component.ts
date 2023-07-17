import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'abm-blending',
  templateUrl: './blending.component.html'
})
export class BlendingComponent implements OnInit {

  @Input()
  visible: boolean

  @Input()
  fullTime: number

  @Input()
  remainingTime: number

  constructor() { }

  ngOnInit(): void {
  }

}
