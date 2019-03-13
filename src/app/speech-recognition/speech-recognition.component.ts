// import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../core/services/web-sockets/web-socket';
import { Message } from '../shared/models/messages.model';
import { Event } from '../shared/models/events.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpeechNotification } from '../shared/models/speech-models/speech-notification';
import { SpeechError } from '../shared/models/speech-models/speech-error';
import { ActionContext } from '../shared/models/speech-models/strategy/action-context';
import { SpeechRecognizerService } from '../core/services/speech-services/speech-recognizer.service';

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
  finalTranscript = '';
  recognizing = false;
  notification: string;
  languages: string[] = ['en-US', 'es-ES'];
  currentLanguage: string;

  actionContext: ActionContext = new ActionContext();
  constructor(private socketService: WebSocketService,
    private changeDetector: ChangeDetectorRef,
    private speechRecognizer: SpeechRecognizerService) {
    this.event = new Event()
  }

  ngOnInit() {
    this.initIoConnection();
    this.currentLanguage = 'en-US';
    this.speechRecognizer.initialize(this.currentLanguage);
    this.initRecognition();
    this.notification = null;
  }

  initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
        // console.log(this.messages)
      });


    this.socketService.onEvent(this.event.CONNECT)
      .subscribe(() => {                                                                                                        
        console.log('connected to socket');
      });

    this.socketService.onEvent(this.event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }
  
  sendMessage(message: any): void {
    this.socketService.send(message);
  }

  getTimeStamp() {
    return new Date();
  }

  startButton(event) {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      return;
    }

    this.speechRecognizer.start(event.timeStamp);
  }

  stopButton() {
    this.speechRecognizer.stop();
  }

  onSelectLanguage(language: string) {
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.notification = 'I\'m listening...';
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${message}`;
          this.actionContext.processMessage(message, this.currentLanguage);
          this.detectChanges();
          this.actionContext.runAction(message, this.currentLanguage);
          this.sendMessage(message);
          console.log('message: ',message);
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }

}
