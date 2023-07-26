import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tank} from "../../models/tank.model";
import {WebSocketService} from "../../services/web-socket.service";

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

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {}

  refill(tank: Tank) {
    this.webSocketService.refill(tank)
  }

  onChange() {
    localStorage.setItem('tanks', JSON.stringify(this.tanks))
  }
}
