import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../core/services/web-sockets/web-socket';
import { Message } from '../shared/models/messages.model';
import { Event } from '../shared/models/events.model';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.scss']
})
export class SpeechRecognitionComponent implements OnInit {
  ioConnection: any;
  messages: Message[] = []
  event: Event
  message: string
  constructor(private socketService: WebSocketService) {
    this.event = new Event()
  }

  ngOnInit() {
    this.initIoConnection();
  }

  initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
        console.log(this.messages)
      });


    this.socketService.onEvent(this.event.CONNECT)
      .subscribe(() => {
        console.log('connected');
        // this.sendNotification('sandeep', Action.JOINED);
      });

    this.socketService.onEvent(this.event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
        // this.sendNotification('sandeep', Action.JOINED);
      });
  }
  sendMessage(message: string): void{ 
    console.log("message",message)
    if(!message) {
      return;
    }
    this.socketService.send({
      name:'vedika',
      message: message
    });
    // this.messageContent = null;
  }

  getTimeStamp(){
    const timeStamp = new Date()
    return timeStamp;
  }

}
