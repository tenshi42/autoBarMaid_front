import {Component, OnInit} from '@angular/core';
import {Type, TypeCodeEnum, TypeEnum} from "./models/type.model";
import {Cup} from "./models/cup.model";
import cupData from '../assets/cups.json';
import {Cocktail} from "./models/cocktail.model";
import cocktailData from '../assets/cocktails.json';
import {Tank} from "./models/tank.model";
import tankData from '../assets/tanks.json';
import {Dose} from "./models/dose.model";
import doseData from "../assets/doses.json";
import {WebSocketService} from "./services/web-socket.service";
import {MessageService} from "primeng/api";
import {faFillDrip} from "@fortawesome/free-solid-svg-icons/faFillDrip";
import {faGears} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'AutoBarMaid';

  typeCodeEnum = TypeCodeEnum
  typeOptions = TypeEnum
  type: Type

  cocktailOptions: Cocktail[] = cocktailData
  cocktail?: Cocktail

  tanks: Tank[]

  alcoholOptions: Tank[]
  alcohol?: Tank

  softOptions: Tank[]
  soft?: Tank

  doseOptions: Dose[] = doseData
  dose: Dose

  cupOptions: Cup[] = cupData
  cup: Cup

  blendingIcon = faFillDrip
  blending: boolean = false
  fullTime: number
  remainingTime: number

  administrationIcon = faGears
  administrating: boolean = false

  constructor(private webSocketService: WebSocketService, private toastService: MessageService) {}

  ngOnInit(): void {
    this.type = this.typeOptions[0]
    this.tanks = tankData
    let localStorageTanksString = localStorage.getItem('tanks');
    if (localStorageTanksString) {
      let localStorageTanks: Tank[] = JSON.parse(localStorageTanksString)
      this.tanks.forEach(tank => tank.enabled = localStorageTanks.find(lst => lst.id == tank.id)!.enabled)
    }
    this.alcoholOptions = this.tanks.filter(t => t.type == 'ALCOHOL')
    this.softOptions = this.tanks.filter(t => t.type == 'SOFT')
    this.dose = this.doseOptions[1]
    this.cup = this.cupOptions[0]

    this.webSocketService.errors.subscribe(error => {
      this.toastService.add({severity: 'error', summary: 'Erreur', detail: error})
      this.blending = false
    })

    this.webSocketService.statuses.subscribe(status => {
      if (this.fullTime == 0) {
        this.fullTime = status
      }
      this.remainingTime = status
      this.blending = status != 0
    })
  }

  isCocktailDisabled(cocktail: Cocktail) {
    return this.tanks.some(t => [cocktail.alcohol, cocktail.soft].includes(t.id) && !t.enabled)
  }

  blend() {
    this.blending = true
    this.fullTime = 0
    this.remainingTime = 0
    if (this.type.code == this.typeCodeEnum.COCKTAIL) {
      this.webSocketService.blend(this.alcoholOptions.find(a => a.id === this.cocktail!.alcohol)!, this.softOptions.find(s => s.id === this.cocktail!.soft)!, this.dose, this.cup)
    } else if (this.type.code == this.typeCodeEnum.FLASH) {
      this.webSocketService.blend(this.alcohol!, this.soft!, this.dose, this.cup)
    }
  }

  administrationVisibleChanged() {
    if (!this.alcohol?.enabled) {
      this.alcohol = undefined
    }
    if (!this.soft?.enabled) {
      this.soft = undefined
    }
    if (this.cocktail && this.isCocktailDisabled(this.cocktail)) {
      this.cocktail = undefined
    }
  }
}
