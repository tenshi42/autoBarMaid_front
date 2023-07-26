import {Component, Input} from '@angular/core';

@Component({
  selector: 'abm-blending',
  templateUrl: './blending.component.html'
})
export class BlendingComponent {

  @Input()
  visible: boolean

  @Input()
  fullTime: number

  @Input()
  remainingTime: number

  constructor() {}

}
