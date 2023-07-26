import {Injectable} from '@angular/core'
import {AnonymousSubject, Subject} from "rxjs/internal/Subject"
import {map, Observable, Observer} from "rxjs"
import {Tank} from "../models/tank.model"
import {Dose} from "../models/dose.model"
import {Cup} from "../models/cup.model"

const URL = "ws://7.tcp.eu.ngrok.io:14708"

interface WebSocketMessage {
  type: string
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private subject: AnonymousSubject<MessageEvent>
  private messages: Subject<WebSocketMessage>
  public errors: Subject<string> = new Subject<string>()
  public statuses: Subject<number> = new Subject<number>()

  constructor() {
    this.messages = <Subject<WebSocketMessage>>this.connect(URL).pipe(
      map(
        (response: MessageEvent): WebSocketMessage => {
          return JSON.parse(response.data)
        }
      )
    )
    this.messages.subscribe(msg => {
      console.log(msg)
      if (msg.type == "error") {
        this.errors.next(msg.data.msg)
      } else if (msg.type == "status") {
        this.statuses.next(msg.data.remaining_time)
      }
    });
  }

  private connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url)
      console.log("Successfully connected: " + url)
    }
    return this.subject
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url)
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs)
      ws.onerror = obs.error.bind(obs)
      ws.onclose = obs.complete.bind(obs)
      return ws.close.bind(ws)
    })
    let observer = {
      error: (err: any) => {console.error(err)},
      complete: () => {},
      next: (data: Object) => {
        console.log('WebSocketMessage sent to websocket: ', data)
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data))
        }
      }
    }
    return new AnonymousSubject<MessageEvent>(observer, observable)
  }

  public blend(alcohol: Tank, soft: Tank, dose: Dose, cup: Cup) {
    this.messages.next({type: "blend", data: {
        cup_size: cup.size,
        ratios: {
          [alcohol.id]: dose.alcohol,
          [soft.id]: 1 - dose.alcohol
        }
      }
    })
  }

  public refill(tank: Tank) {
    this.messages.next({type: "refill", data: {
        pump: tank.id
      }
    })
  }
}
