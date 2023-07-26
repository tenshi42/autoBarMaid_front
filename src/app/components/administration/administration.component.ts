import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tank} from "../../models/tank.model";

@Component({
  selector: 'abm-administration',
  templateUrl: './administration.component.html',
})
export class AdministrationComponent implements OnInit {

  @Input()
  visible: boolean

  @Output()
  visibleChange = new EventEmitter<boolean>()

  @Input()
  tanks: Tank[]

  constructor() {}

  ngOnInit(): void {}

  refill(tank: Tank) {

  }

  onChange() {
    localStorage.setItem('tanks', JSON.stringify(this.tanks))
  }
}
